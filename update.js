import { mathStatsLessons } from './backup.js';
import fs from 'fs';

const statsData = [
    { id: "avedev", title: "AVEDEV Function", desc: "Calculates the average of the absolute deviations of data points from their mean.", concept: "dispersion measurer" },
    // ...
];

// This is not working because I can't easily import from the current dir in a script like this
