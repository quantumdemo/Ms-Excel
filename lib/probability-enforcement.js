/**
 * Probability Distributions Enforcement Layer for SheetLab.
 * Phase 9: Probability Distributions
 */

import { IS_NUMBER, TO_NUMBER, IS_ERROR } from './evaluation-pipeline.js';

// --- CORE NUMERICAL UTILITIES ---

/**
 * Log Gamma function (Lanczos approximation)
 * Returns the natural logarithm of the Gamma function of x.
 */
export const gammln = (xx) => {
  if (xx <= 0) return "#NUM!";
  let x = xx;
  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  const cof = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5
  ];
  for (let j = 0; j <= 5; j++) {
    y++;
    ser += cof[j] / y;
  }
  return -tmp + Math.log(2.5066282746310005 * ser / x);
};

export const gamma = (x) => {
  if (x > 171) return "#NUM!";
  if (x <= 0 && Math.abs(x - Math.round(x)) < 1e-10) return "#NUM!";
  const res = gammln(x);
  return typeof res === 'string' ? res : Math.exp(res);
};

/**
 * Lower Incomplete Gamma function P(a, x)
 * Series representation.
 */
const gser = (a, x) => {
  const gln = gammln(a);
  if (x <= 0) return 0;
  let ap = a;
  let sum = 1 / a;
  let delta = sum;
  for (let n = 1; n <= 100; n++) {
    ap++;
    delta *= x / ap;
    sum += delta;
    if (Math.abs(delta) < Math.abs(sum) * 3e-12) break;
  }
  return sum * Math.exp(-x + a * Math.log(x) - gln);
};

/**
 * Upper Incomplete Gamma function Q(a, x) = 1 - P(a, x)
 * Continued fraction representation.
 */
const gcf = (a, x) => {
  const gln = gammln(a);
  let b = x + 1 - a;
  let c = 1 / 1e-30;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i <= 100; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = b + an / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < 3e-12) break;
  }
  return h * Math.exp(-x + a * Math.log(x) - gln);
};

export const lowerIncompleteGamma = (a, x) => {
  if (x < 0 || a <= 0) return 0;
  if (x < a + 1) return gser(a, x);
  return 1 - gcf(a, x);
};

export const upperIncompleteGamma = (a, x) => {
  if (x < 0 || a <= 0) return 1;
  if (x < a + 1) return 1 - gser(a, x);
  return gcf(a, x);
};

/**
 * Incomplete Beta function I_x(a, b)
 */
export const incompleteBeta = (a, b, x) => {
  if (x < 0 || x > 1) return NaN;
  if (x === 0) return 0;
  if (x === 1) return 1;

  if (x > (a + 1) / (a + b + 2)) {
      return 1 - incompleteBeta(b, a, 1 - x);
  }

  const gln = gammln(a + b) - gammln(a) - gammln(b);
  const bt = Math.exp(gln + a * Math.log(x) + b * Math.log(1 - x));

  // Continued fraction
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= 100; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    h *= d * c;

    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    h *= d * c;

    if (Math.abs(d * c - 1) < 3e-12) break;
  }

  return bt * h / a;
};

/**
 * Error Function
 */
export const erf = (x) => {
  return x < 0 ? -lowerIncompleteGamma(0.5, x * x) : lowerIncompleteGamma(0.5, x * x);
};

/**
 * Complementary Error Function
 */
export const erfc = (x) => {
  return 1 - erf(x);
};

/**
 * Inverse Error Function
 * Rational approximation for accuracy and performance.
 */
export const erfInv = (p) => {
  if (p >= 1) return Infinity;
  if (p <= -1) return -Infinity;
  const sign = p < 0 ? -1 : 1;
  const x = Math.abs(p);

  let res;
  if (x <= 0.7) {
    const t = x * x;
    res = x * (((-0.140543331 * t + 0.914624893) * t - 1.503833505) * t + 0.833108426) /
          ((((0.015068285 * t - 0.300583928) * t + 1.141270541) * t - 1.571533036) * t + 1);
  } else {
    const t = Math.sqrt(-Math.log(1 - x));
    res = (((0.010328 * t + 0.802738) * t + 2.220674) * t + 1.850264) /
          (((0.000215 * t + 0.091171) * t + 0.930597) * t + 1);
  }
  return sign * res;
};

/**
 * Inverse of the standard normal cumulative distribution
 */
export const normSInv = (p) => {
  if (p <= 0 || p >= 1) return NaN;
  // Based on Wichura's algorithm for high precision
  const q = p - 0.5;
  if (Math.abs(q) <= 0.425) {
    const r = 0.180625 - q * q;
    return q * (((((((2.5090809287301226727e+3 * r +
                   3.3430575383552394314e+4) * r +
                   6.7265770927309441145e+4) * r +
                   4.5921953931549871457e+4) * r +
                   1.3731693765509461125e+4) * r +
                   1.9715909503065514427e+3) * r +
                   1.3314166789178437745e+2) * r +
                   3.3871328727963666080e+0) /
                (((((((5.2264952788528545610e+3 * r +
                   2.8729085737560647559e+4) * r +
                   3.9307895800092710610e+4) * r +
                   2.1213790570154142161e+4) * r +
                   5.3941960214083340110e+3) * r +
                   6.8718700749205790830e+2) * r +
                   4.2313330701600911252e+1) * r + 1);
  } else {
    const r = Math.sqrt(-Math.log(q < 0 ? p : 1 - p));
    let x;
    if (r <= 5) {
      const r2 = r - 1.6;
      x = (((((((7.74545014278341407640e-4 * r2 +
               0.0227238449892691845833) * r2 +
               0.241780725177450611770) * r2 +
               1.27045825244436834258) * r2 +
               3.64784832476320460504) * r2 +
               5.76949722146069140550) * r2 +
               4.63033784615654529590) * r2 +
               1.42343711074968357734) /
          (((((((1.05075007164441684324e-9 * r2 +
               5.47593808499534494600e-4) * r2 +
               0.0151986665636164571966) * r2 +
               0.148103976427480074590) * r2 +
               0.688459139454497753566) * r2 +
               1.67638483018380384940) * r2 +
               2.15315012068603131174) * r2 + 1);
    } else {
      const r2 = r - 5;
      x = (((((((2.01033439929228813265e-7 * r2 +
               2.71155556874348757815e-5) * r2 +
               0.00124266094738807843860) * r2 +
               0.0265321895265761230930) * r2 +
               0.296560571828504891230) * r2 +
               1.78482653991729133580) * r2 +
               5.46378491116411436990) * r2 +
               6.65790464350110377720) /
          (((((((2.04426310338993978538e-15 * r2 +
               1.4215117583164458887e-7) * r2 +
               1.8463183175100546818e-5) * r2 +
               7.868691311456132591e-4) * r2 +
               0.0148753612908506148525) * r2 +
               0.136929880922735805310) * r2 +
               0.599832206555887937690) * r2 + 1);
    }
    return q < 0 ? -x : x;
  }
};

// --- NORMAL DISTRIBUTIONS ---

export const NORM_S_DIST = (z, cumulative) => {
  if (cumulative) {
    return 0.5 * (1 + erf(z / Math.sqrt(2)));
  } else {
    return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  }
};

export const NORM_DIST = (x, mean, standard_dev, cumulative) => {
  if (standard_dev <= 0) return "#NUM!";
  const z = (x - mean) / standard_dev;
  if (cumulative) {
    return NORM_S_DIST(z, true);
  } else {
    return NORM_S_DIST(z, false) / standard_dev;
  }
};

export const NORM_S_INV = (probability) => {
  if (probability <= 0 || probability >= 1) return "#NUM!";
  return normSInv(probability);
};

export const NORM_INV = (probability, mean, standard_dev) => {
  if (probability <= 0 || probability >= 1) return "#NUM!";
  if (standard_dev <= 0) return "#NUM!";
  return normSInv(probability) * standard_dev + mean;
};

export const PHI = (x) => {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
};

// --- DISCRETE DISTRIBUTIONS ---

export const BINOM_DIST = (number_s, trials, probability_s, cumulative) => {
  if (trials < 0 || probability_s < 0 || probability_s > 1 || number_s < 0 || number_s > trials) return "#NUM!";
  const n = Math.floor(trials);
  const k = Math.floor(number_s);
  const p = probability_s;

  if (cumulative) {
    return incompleteBeta(n - k, k + 1, 1 - p);
  } else {
    // nCk * p^k * (1-p)^(n-k)
    // Use logs for stability
    const ln_nck = gammln(n + 1) - gammln(k + 1) - gammln(n - k + 1);
    return Math.exp(ln_nck + k * Math.log(p) + (n - k) * Math.log(1 - p));
  }
};

export const BINOM_INV = (trials, probability_s, alpha) => {
  if (trials < 0 || probability_s < 0 || probability_s > 1 || alpha < 0 || alpha > 1) return "#NUM!";
  const n = Math.floor(trials);
  let low = 0;
  let high = n;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (BINOM_DIST(mid, n, probability_s, true) < alpha) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

export const POISSON_DIST = (x, mean, cumulative) => {
  if (x < 0 || mean <= 0) return "#NUM!";
  const k = Math.floor(x);
  if (cumulative) {
    return upperIncompleteGamma(k + 1, mean);
  } else {
    // (e^-mean * mean^k) / k!
    return Math.exp(-mean + k * Math.log(mean) - gammln(k + 1));
  }
};

export const HYPGEOM_DIST = (sample_s, number_sample, population_s, number_pop, cumulative) => {
  if (sample_s < 0 || number_sample < 0 || population_s < 0 || number_pop < 0) return "#NUM!";
  if (number_sample > number_pop || population_s > number_pop) return "#NUM!";

  const x = Math.floor(sample_s);
  const n = Math.floor(number_sample);
  const M = Math.floor(population_s);
  const N = Math.floor(number_pop);

  const prob = (k) => {
    // (MCk * (N-M)C(n-k)) / NCn
    // log(nCk) = gammln(n+1) - gammln(k+1) - gammln(n-k+1)
    const ln_num = (gammln(M + 1) - gammln(k + 1) - gammln(M - k + 1)) +
                   (gammln(N - M + 1) - gammln(n - k + 1) - gammln(N - M - (n - k) + 1));
    const ln_den = gammln(N + 1) - gammln(n + 1) - gammln(N - n + 1);
    return Math.exp(ln_num - ln_den);
  };

  if (cumulative) {
    let sum = 0;
    // Optimization: limit range to valid values
    const start = Math.max(0, n - (N - M));
    const end = Math.min(x, n, M);
    for (let i = start; i <= end; i++) {
      sum += prob(i);
    }
    return Math.min(1, sum);
  } else {
    if (x < Math.max(0, n - (N - M)) || x > Math.min(n, M)) return 0;
    return prob(x);
  }
};

export const NEGBINOM_DIST = (number_f, number_s, probability_s, cumulative) => {
  if (probability_s < 0 || probability_s > 1 || number_f < 0 || number_s < 1) return "#NUM!";
  const f = Math.floor(number_f);
  const s = Math.floor(number_s);
  const p = probability_s;

  if (cumulative) {
    return incompleteBeta(s, f + 1, p);
  } else {
    // (f+s-1)C(s-1) * p^s * (1-p)^f
    const ln_comb = gammln(f + s) - gammln(s) - gammln(f + 1);
    return Math.exp(ln_comb + s * Math.log(p) + f * Math.log(1 - p));
  }
};

// --- ADDITIONAL DISTRIBUTIONS ---

export const EXPON_DIST = (x, lambda, cumulative) => {
  if (x < 0 || lambda <= 0) return "#NUM!";
  if (cumulative) {
    return 1 - Math.exp(-lambda * x);
  } else {
    return lambda * Math.exp(-lambda * x);
  }
};

// --- ADVANCED DISTRIBUTIONS ---

export const GAMMA_DIST = (x, alpha, beta, cumulative) => {
  if (x < 0 || alpha <= 0 || beta <= 0) return "#NUM!";
  if (cumulative) {
    return lowerIncompleteGamma(alpha, x / beta);
  } else {
    // (x^(alpha-1) * e^(-x/beta)) / (beta^alpha * Gamma(alpha))
    return Math.exp((alpha - 1) * Math.log(x) - x / beta - alpha * Math.log(beta) - gammln(alpha));
  }
};

export const GAMMA_INV = (probability, alpha, beta) => {
  if (probability < 0 || probability >= 1 || alpha <= 0 || beta <= 0) return "#NUM!";
  if (probability === 0) return 0;
  // Iterative search for inverse
  let x = alpha * beta; // Initial guess (mean)
  for (let i = 0; i < 100; i++) {
    const p = GAMMA_DIST(x, alpha, beta, true);
    const pdf = GAMMA_DIST(x, alpha, beta, false);
    const diff = p - probability;
    if (Math.abs(diff) < 1e-12) break;
    // Newton-Raphson
    const step = diff / pdf;
    x -= step;
    if (x <= 0) x = 0.5 * (x + step); // Backtrack if non-positive
  }
  return x;
};

export const BETA_DIST = (x, alpha, beta, cumulative, A = 0, B = 1) => {
  if (x < A || x > B || alpha <= 0 || beta <= 0 || A === B) return "#NUM!";
  const y = (x - A) / (B - A);
  if (cumulative) {
    return incompleteBeta(alpha, beta, y);
  } else {
    const gln = gammln(alpha + beta) - gammln(alpha) - gammln(beta);
    return Math.exp(gln + (alpha - 1) * Math.log(y) + (beta - 1) * Math.log(1 - y)) / (B - A);
  }
};

export const BETA_INV = (probability, alpha, beta, A = 0, B = 1) => {
  if (probability < 0 || probability > 1 || alpha <= 0 || beta <= 0 || A === B) return "#NUM!";
  if (probability === 0) return A;
  if (probability === 1) return B;
  // Iterative search
  let x = alpha / (alpha + beta); // Initial guess (mean)
  for (let i = 0; i < 100; i++) {
    const p = incompleteBeta(alpha, beta, x);
    const gln = gammln(alpha + beta) - gammln(alpha) - gammln(beta);
    const pdf = Math.exp(gln + (alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - x));
    const diff = p - probability;
    if (Math.abs(diff) < 1e-12) break;
    const step = diff / pdf;
    x -= step;
    if (x <= 0 || x >= 1) x = 0.5 * (x + step); // Backtrack
  }
  return A + x * (B - A);
};

export const WEIBULL_DIST = (x, alpha, beta, cumulative) => {
  if (x < 0 || alpha <= 0 || beta <= 0) return "#NUM!";
  if (cumulative) {
    return 1 - Math.exp(-Math.pow(x / beta, alpha));
  } else {
    return (alpha / Math.pow(beta, alpha)) * Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha));
  }
};

// --- STATISTICAL TESTS ---

export const Z_TEST = (array, x, sigma) => {
  const vals = array.flat().filter(v => IS_NUMBER(v));
  if (vals.length === 0) return "#DIV/0!";
  const n = vals.length;
  const avg = vals.reduce((a, b) => a + b, 0) / n;
  const s = sigma || Math.sqrt(vals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / (n - 1));
  const z = (avg - x) / (s / Math.sqrt(n));
  return 1 - NORM_S_DIST(z, true);
};

export const T_DIST = (x, degrees_freedom, cumulative) => {
    if (degrees_freedom < 1) return "#NUM!";
    // Use incomplete beta: F(t) = 1 - 0.5 * I_{v/(v+t^2)}(v/2, 1/2)
    const v = degrees_freedom;
    const t2 = x * x;
    const ib = incompleteBeta(v / 2, 0.5, v / (v + t2));
    if (cumulative) {
        return x > 0 ? 1 - 0.5 * ib : 0.5 * ib;
    } else {
        const ln_pdf = gammln((v + 1) / 2) - gammln(v / 2) - 0.5 * Math.log(v * Math.PI) - ((v + 1) / 2) * Math.log(1 + t2 / v);
        return Math.exp(ln_pdf);
    }
};

export const T_TEST = (array1, array2, tails, type) => {
  const vals1 = array1.flat().filter(v => IS_NUMBER(v));
  const vals2 = array2.flat().filter(v => IS_NUMBER(v));
  const n1 = vals1.length;
  const n2 = vals2.length;
  if (n1 < 1 || n2 < 1) return "#DIV/0!";
  const m1 = vals1.reduce((a, b) => a + b, 0) / n1;
  const m2 = vals2.reduce((a, b) => a + b, 0) / n2;
  const v1 = n1 > 1 ? vals1.reduce((a, b) => a + Math.pow(b - m1, 2), 0) / (n1 - 1) : 0;
  const v2 = n2 > 1 ? vals2.reduce((a, b) => a + Math.pow(b - m2, 2), 0) / (n2 - 1) : 0;

  let t, df;
  if (type === 1) { // Paired
    if (n1 !== n2) return "#N/A";
    const diffs = vals1.map((v, i) => v - vals2[i]);
    const md = diffs.reduce((a, b) => a + b, 0) / n1;
    const sd = Math.sqrt(diffs.reduce((a, b) => a + Math.pow(b - md, 2), 0) / (n1 - 1));
    t = md / (sd / Math.sqrt(n1));
    df = n1 - 1;
  } else if (type === 2) { // Two-sample equal variance
    const sp2 = ((n1 - 1) * v1 + (n2 - 1) * v2) / (n1 + n2 - 2);
    t = (m1 - m2) / Math.sqrt(sp2 * (1 / n1 + 1 / n2));
    df = n1 + n2 - 2;
  } else { // Two-sample unequal variance
    t = (m1 - m2) / Math.sqrt(v1 / n1 + v2 / n2);
    df = Math.pow(v1 / n1 + v2 / n2, 2) / (Math.pow(v1 / n1, 2) / (n1 - 1) + Math.pow(v2 / n2, 2) / (n2 - 1));
  }

  const p = 1 - T_DIST(Math.abs(t), df, true);
  return tails === 1 ? p : 2 * p;
};

export const F_DIST = (x, df1, df2, cumulative) => {
    if (x < 0 || df1 < 1 || df2 < 1) return "#NUM!";
    if (cumulative) {
        return incompleteBeta(df1 / 2, df2 / 2, (df1 * x) / (df1 * x + df2));
    } else {
        const ln_pdf = (df1 / 2) * Math.log(df1) + (df2 / 2) * Math.log(df2) + (df1 / 2 - 1) * Math.log(x) -
                       ((df1 + df2) / 2) * Math.log(df1 * x + df2) - (gammln(df1 / 2) + gammln(df2 / 2) - gammln((df1 + df2) / 2));
        return Math.exp(ln_pdf);
    }
};

export const F_TEST = (array1, array2) => {
  const vals1 = array1.flat().filter(v => IS_NUMBER(v));
  const vals2 = array2.flat().filter(v => IS_NUMBER(v));
  if (vals1.length < 2 || vals2.length < 2) return "#DIV/0!";
  const m1 = vals1.reduce((a, b) => a + b, 0) / vals1.length;
  const m2 = vals2.reduce((a, b) => a + b, 0) / vals2.length;
  const v1 = vals1.reduce((a, b) => a + Math.pow(b - m1, 2), 0) / (vals1.length - 1);
  const v2 = vals2.reduce((a, b) => a + Math.pow(b - m2, 2), 0) / (vals2.length - 1);
  const f = v1 / v2;
  const df1 = vals1.length - 1;
  const df2 = vals2.length - 1;
  const p = 1 - F_DIST(f, df1, df2, true);
  return 2 * Math.min(p, 1 - p);
};

export const CHISQ_DIST = (x, df, cumulative) => {
    if (x < 0 || df < 1) return "#NUM!";
    if (cumulative) {
        return lowerIncompleteGamma(df / 2, x / 2);
    } else {
        return Math.exp((df / 2 - 1) * Math.log(x) - x / 2 - (df / 2) * Math.log(2) - gammln(df / 2));
    }
};

export const CHISQ_TEST = (actual_range, expected_range) => {
  const actual = actual_range.flat().filter(v => IS_NUMBER(v));
  const expected = expected_range.flat().filter(v => IS_NUMBER(v));
  if (actual.length !== expected.length) return "#N/A";
  if (actual.length === 0) return "#DIV/0!";
  let chi2 = 0;
  for (let i = 0; i < actual.length; i++) {
    chi2 += Math.pow(actual[i] - expected[i], 2) / expected[i];
  }
  return 1 - CHISQ_DIST(chi2, actual.length - 1, true);
};
