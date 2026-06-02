/**
 * Date & Time Enforcement Layer for SheetLab
 * Ensures Excel-compatible date serial logic and overflow handling using UTC.
 */

import { IS_EMPTY, IS_NUMBER, IS_ERROR } from './evaluation-pipeline.js';

const EPOCH_UTC = Date.UTC(1899, 11, 30);
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const toSerial = (date) => {
    if (date === null || date === undefined) return null;
    let timestamp;
    if (date instanceof Date) {
        if (isNaN(date.getTime())) return "#VALUE!";
        timestamp = date.getTime();
    } else if (typeof date === 'number') {
        timestamp = date;
    } else {
        return "#VALUE!";
    }

    const diff = timestamp - EPOCH_UTC;
    let serial = diff / MS_PER_DAY;
    if (serial < 61) serial -= 1;
    return serial;
};

export const fromSerial = (serial) => {
    if (!IS_NUMBER(serial)) return "#VALUE!";
    let adjustedSerial = serial;
    if (serial < 60) adjustedSerial += 1;
    else if (serial === 60) return new Date(Date.UTC(1900, 2, 1));
    return new Date(EPOCH_UTC + Math.round(adjustedSerial * MS_PER_DAY));
};

export const parseDate = (val) => {
    if (IS_EMPTY(val)) return null;
    if (IS_NUMBER(val)) return val;
    if (typeof val === 'string') {
        const d = new Date(val);
        if (!isNaN(d.getTime())) return toSerial(d.getTime());
        return "#VALUE!";
    }
    return "#VALUE!";
};

export const dateConstruct = (y, m, d) => {
    if (IS_EMPTY(y) || IS_EMPTY(m) || IS_EMPTY(d)) return null;
    let year = Math.trunc(Number(y));
    if (year >= 0 && year <= 1899) year += 1900;
    const timestamp = Date.UTC(year, Math.trunc(Number(m)) - 1, Math.trunc(Number(d)));
    return toSerial(timestamp);
};

export const timeConstruct = (h, m, s) => {
    if (IS_EMPTY(h) || IS_EMPTY(m) || IS_EMPTY(s)) return null;
    const totalSeconds = Math.trunc(Number(h)) * 3600 + Math.trunc(Number(m)) * 60 + Math.trunc(Number(s));
    const secondsInDay = (totalSeconds % 86400 + 86400) % 86400;
    return secondsInDay / 86400;
};

export const extractComponent = (serial, component) => {
    if (IS_EMPTY(serial)) return null;
    const d = fromSerial(serial);
    if (IS_ERROR(d)) return d;
    switch (component) {
        case 'year': return d.getUTCFullYear();
        case 'month': return d.getUTCMonth() + 1;
        case 'day': return d.getUTCDate();
        case 'hour': return d.getUTCHours();
        case 'minute': return d.getUTCMinutes();
        case 'second': return d.getUTCSeconds();
        default: return "#VALUE!";
    }
};

const getWeekendDays = (weekend) => {
    if (IS_EMPTY(weekend)) return [0, 6];
    if (typeof weekend === 'string' && weekend.length === 7) {
        const days = [];
        for (let i = 0; i < 7; i++) if (weekend[i] === '1') days.push((i + 1) % 7);
        return days;
    }
    const w = Math.trunc(Number(weekend));
    if (isNaN(w)) return "#NUM!";
    switch (w) {
        case 1: return [0, 6];
        case 2: return [0, 1];
        case 3: return [1, 2];
        case 4: return [2, 3];
        case 5: return [3, 4];
        case 6: return [4, 5];
        case 7: return [5, 6];
        case 11: return [0];
        case 12: return [1];
        case 13: return [2];
        case 14: return [3];
        case 15: return [4];
        case 16: return [5];
        case 17: return [6];
        default: return "#NUM!";
    }
};

const isWeekend = (date, weekendDays) => weekendDays.includes(date.getUTCDay());

const isHoliday = (date, holidays) => {
    if (!holidays || !Array.isArray(holidays)) return false;
    const serial = toSerial(date);
    return holidays.some(h => {
        const hSerial = parseDate(h);
        return hSerial !== null && !IS_ERROR(hSerial) && Math.floor(hSerial) === Math.floor(serial);
    });
};

export const netWorkDaysIntl = (startSerial, endSerial, weekend = 1, holidays = []) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(endSerial)) return null;
    const weekendDays = getWeekendDays(weekend);
    if (IS_ERROR(weekendDays)) return weekendDays;
    if (startSerial > endSerial) {
        const res = netWorkDaysIntl(endSerial, startSerial, weekend, holidays);
        return IS_ERROR(res) ? res : -res;
    }
    let count = 0;
    let current = fromSerial(startSerial);
    const end = fromSerial(endSerial);
    current.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);
    while (current <= end) {
        if (!isWeekend(current, weekendDays) && !isHoliday(current, holidays)) count++;
        current.setUTCDate(current.getUTCDate() + 1);
    }
    return count;
};

export const workDayIntl = (startSerial, days, weekend = 1, holidays = []) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(days)) return null;
    const weekendDays = getWeekendDays(weekend);
    if (IS_ERROR(weekendDays)) return weekendDays;
    let current = fromSerial(startSerial);
    current.setUTCHours(0, 0, 0, 0);
    let remaining = Math.abs(days);
    const step = days >= 0 ? 1 : -1;
    while (remaining > 0) {
        current.setUTCDate(current.getUTCDate() + step);
        if (!isWeekend(current, weekendDays) && !isHoliday(current, holidays)) remaining--;
    }
    return toSerial(current);
};

export const yearFrac = (startSerial, endSerial, basis = 0) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(endSerial)) return null;
    if (startSerial > endSerial) return yearFrac(endSerial, startSerial, basis);
    if (startSerial === endSerial) return 0;
    const d1 = fromSerial(startSerial), d2 = fromSerial(endSerial);
    switch (basis) {
        case 0: return days360(startSerial, endSerial, false) / 360;
        case 1: {
            const y1 = d1.getUTCFullYear(), y2 = d2.getUTCFullYear();
            if (y1 === y2) return (endSerial - startSerial) / (isLeapYear(y1) ? 366 : 365);
            let totalDays = 0;
            for (let y = y1; y <= y2; y++) totalDays += (isLeapYear(y) ? 366 : 365);
            return (endSerial - startSerial) / (totalDays / (y2 - y1 + 1));
        }
        case 2: return (endSerial - startSerial) / 360;
        case 3: return (endSerial - startSerial) / 365;
        case 4: return days360(startSerial, endSerial, true) / 360;
        default: return "#NUM!";
    }
};

export const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

export const days360 = (startSerial, endSerial, method = false) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(endSerial)) return null;
    const d1 = fromSerial(startSerial), d2 = fromSerial(endSerial);
    let Y1 = d1.getUTCFullYear(), M1 = d1.getUTCMonth() + 1, D1 = d1.getUTCDate();
    let Y2 = d2.getUTCFullYear(), M2 = d2.getUTCMonth() + 1, D2 = d2.getUTCDate();

    const isLastDayOfFeb = (y, m, d) => m === 2 && d === new Date(Date.UTC(y, m, 0)).getUTCDate();

    if (method) {
        if (D1 === 31) D1 = 30;
        if (D2 === 31) D2 = 30;
    } else {
        if (isLastDayOfFeb(Y1, M1, D1)) {
            if (isLastDayOfFeb(Y2, M2, D2)) D2 = 30;
            D1 = 30;
        }
        if (D1 === 31) D1 = 30;
        if (D2 === 31 && D1 >= 30) D2 = 30;
    }
    return (Y2 - Y1) * 360 + (M2 - M1) * 30 + (D2 - D1);
};

export const weekday = (serial, returnType = 1) => {
    if (IS_EMPTY(serial)) return null;
    const jsDay = fromSerial(serial).getUTCDay();
    const rt = Math.trunc(Number(returnType));
    switch (rt) {
        case 1: return jsDay + 1;
        case 2: return jsDay === 0 ? 7 : jsDay;
        case 3: return jsDay === 0 ? 6 : jsDay - 1;
        case 11: return (jsDay + 6) % 7 + 1;
        case 12: return (jsDay + 5) % 7 + 1;
        case 13: return (jsDay + 4) % 7 + 1;
        case 14: return (jsDay + 3) % 7 + 1;
        case 15: return (jsDay + 2) % 7 + 1;
        case 16: return (jsDay + 1) % 7 + 1;
        case 17: return jsDay + 1;
        default: return "#NUM!";
    }
};

export const weekNum = (serial, returnType = 1) => {
    if (IS_EMPTY(serial)) return null;
    const rt = Math.trunc(Number(returnType));
    if (rt === 21) return isoWeekNum(serial);
    const d = fromSerial(serial);
    const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / MS_PER_DAY) + 1;
    const jan1Weekday = startOfYear.getUTCDay();
    let startDay;
    switch (rt) {
        case 1: case 17: startDay = 0; break;
        case 2: case 11: startDay = 1; break;
        case 12: startDay = 2; break;
        case 13: startDay = 3; break;
        case 14: startDay = 4; break;
        case 15: startDay = 5; break;
        case 16: startDay = 6; break;
        default: return "#NUM!";
    }
    const offset = (jan1Weekday - startDay + 7) % 7;
    return Math.floor((dayOfYear + offset - 1) / 7) + 1;
};

export const isoWeekNum = (serial) => {
    if (IS_EMPTY(serial)) return null;
    const d = fromSerial(serial);
    d.setUTCHours(0, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() + 3 - (d.getUTCDay() + 6) % 7);
    const week1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((d.getTime() - week1.getTime()) / MS_PER_DAY - 3 + (week1.getUTCDay() + 6) % 7) / 7);
};

export const eDate = (startSerial, months) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(months)) return null;
    const d = fromSerial(startSerial);
    const day = d.getUTCDate();
    d.setUTCMonth(d.getUTCMonth() + Math.trunc(Number(months)));
    if (d.getUTCDate() !== day) d.setUTCDate(0);
    return toSerial(d);
};

export const eoMonth = (startSerial, months) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(months)) return null;
    const d = fromSerial(startSerial);
    d.setUTCMonth(d.getUTCMonth() + Math.trunc(Number(months)) + 1);
    d.setUTCDate(0);
    return toSerial(d);
};

export const dateDif = (startSerial, endSerial, unit) => {
    if (IS_EMPTY(startSerial) || IS_EMPTY(endSerial)) return null;
    if (startSerial > endSerial) return "#NUM!";
    const d1 = fromSerial(startSerial), d2 = fromSerial(endSerial);
    const u = unit.toUpperCase();
    const y1 = d1.getUTCFullYear(), m1 = d1.getUTCMonth(), day1 = d1.getUTCDate();
    const y2 = d2.getUTCFullYear(), m2 = d2.getUTCMonth(), day2 = d2.getUTCDate();
    switch (u) {
        case "Y": {
            let diff = y2 - y1;
            if (m2 < m1 || (m2 === m1 && day2 < day1)) diff--;
            return diff;
        }
        case "M": {
            let diff = (y2 - y1) * 12 + (m2 - m1);
            if (day2 < day1) diff--;
            return diff;
        }
        case "D": return Math.floor(endSerial - startSerial);
        case "YM": {
            let diff = m2 - m1;
            if (day2 < day1) diff--;
            if (diff < 0) diff += 12;
            return diff;
        }
        case "YD": {
            const temp = new Date(Date.UTC(y1 + (dateDif(startSerial, endSerial, "Y")), m1, day1));
            return Math.floor((d2.getTime() - temp.getTime()) / MS_PER_DAY);
        }
        case "MD": {
            let prev;
            if (day2 >= day1) prev = new Date(Date.UTC(y2, m2, day1));
            else {
                prev = new Date(Date.UTC(y2, m2 - 1, day1));
                if (prev.getUTCDate() !== day1) prev.setUTCDate(0);
            }
            return Math.floor((d2.getTime() - prev.getTime()) / MS_PER_DAY);
        }
        default: return "#VALUE!";
    }
};
