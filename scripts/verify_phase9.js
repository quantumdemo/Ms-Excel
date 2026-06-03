
import * as ProbEnforcement from '../lib/probability-enforcement.js';

const assertNear = (name, actual, expected, precision = 1e-6) => {
  if (typeof actual === 'string') {
    if (actual === expected) {
      console.log(`[PASS] ${name}: ${actual}`);
    } else {
      console.error(`[FAIL] ${name}: expected ${expected}, got ${actual}`);
    }
    return;
  }
  const diff = Math.abs(actual - expected);
  if (diff < precision) {
    console.log(`[PASS] ${name}: ${actual} (expected ~${expected})`);
  } else {
    console.error(`[FAIL] ${name}: expected ${expected}, got ${actual} (diff: ${diff})`);
  }
};

console.log("--- PHASE 9: PROBABILITY DISTRIBUTIONS VERIFICATION ---");

// Normal
assertNear("NORM.S.DIST(0, TRUE)", ProbEnforcement.NORM_S_DIST(0, true), 0.5);
assertNear("NORM.S.DIST(1, TRUE)", ProbEnforcement.NORM_S_DIST(1, true), 0.8413447);
assertNear("NORM.DIST(10, 10, 2, TRUE)", ProbEnforcement.NORM_DIST(10, 10, 2, true), 0.5);
assertNear("NORM.S.INV(0.5)", ProbEnforcement.NORM_S_INV(0.5), 0);
assertNear("NORM.S.INV(0.8413447)", ProbEnforcement.NORM_S_INV(0.8413447), 1);
assertNear("PHI(0)", ProbEnforcement.PHI(0), 0.3989423);

// Discrete
assertNear("BINOM.DIST(2, 10, 0.5, FALSE)", ProbEnforcement.BINOM_DIST(2, 10, 0.5, false), 0.0439453);
assertNear("BINOM.DIST(5, 10, 0.5, TRUE)", ProbEnforcement.BINOM_DIST(5, 10, 0.5, true), 0.6230469);
assertNear("BINOM.INV(10, 0.5, 0.5)", ProbEnforcement.BINOM_INV(10, 0.5, 0.5), 5);
assertNear("POISSON.DIST(2, 5, FALSE)", ProbEnforcement.POISSON_DIST(2, 5, false), 0.0842243);
assertNear("POISSON.DIST(2, 5, TRUE)", ProbEnforcement.POISSON_DIST(2, 5, true), 0.124652);
assertNear("EXPON.DIST(1, 1, TRUE)", ProbEnforcement.EXPON_DIST(1, 1, true), 0.6321206);
assertNear("HYPGEOM.DIST(1, 4, 8, 20, FALSE)", ProbEnforcement.HYPGEOM_DIST(1, 4, 8, 20, false), 0.3632611);
assertNear("NEGBINOM.DIST(2, 5, 0.5, FALSE)", ProbEnforcement.NEGBINOM_DIST(2, 5, 0.5, false), 0.1171875);

// Advanced
assertNear("GAMMA(5)", ProbEnforcement.gamma(5), 24);
assertNear("GAMMALN(5)", ProbEnforcement.gammln(5), Math.log(24));
assertNear("GAMMA.DIST(1, 2, 3, TRUE)", ProbEnforcement.GAMMA_DIST(1, 2, 3, true), 0.0446249);
assertNear("GAMMA.INV(0.0446249, 2, 3)", ProbEnforcement.GAMMA_INV(0.0446249, 2, 3), 1);
assertNear("BETA.DIST(0.5, 2, 2, TRUE)", ProbEnforcement.BETA_DIST(0.5, 2, 2, true), 0.5);
assertNear("BETA.INV(0.5, 2, 2)", ProbEnforcement.BETA_INV(0.5, 2, 2), 0.5);
assertNear("WEIBULL.DIST(1, 2, 3, TRUE)", ProbEnforcement.WEIBULL_DIST(1, 2, 3, true), 0.1051607);

// Tests
assertNear("Z.TEST({1,2,3,4,5}, 3)", ProbEnforcement.Z_TEST([[1,2,3,4,5]], 3), 0.5);
assertNear("T.DIST(1, 10, TRUE)", ProbEnforcement.T_DIST(1, 10, true), 0.8295534);
assertNear("F.DIST(1, 10, 10, TRUE)", ProbEnforcement.F_DIST(1, 10, 10, true), 0.5);
assertNear("CHISQ.DIST(1, 1, TRUE)", ProbEnforcement.CHISQ_DIST(1, 1, true), 0.6826895);

// Edge Cases & Errors
assertNear("NORM.DIST(1, 1, 0, TRUE)", ProbEnforcement.NORM_DIST(1, 1, 0, true), "#NUM!");
assertNear("NORM.INV(-1, 0, 1)", ProbEnforcement.NORM_INV(-1, 0, 1), "#NUM!");
assertNear("BINOM.DIST(-1, 10, 0.5, FALSE)", ProbEnforcement.BINOM_DIST(-1, 10, 0.5, false), "#NUM!");

console.log("--- VERIFICATION COMPLETE ---");

// Feedback Fix Verification
assertNear("GAMMALN(0)", ProbEnforcement.gammln(0), "#NUM!");
assertNear("GAMMA(-1)", ProbEnforcement.gamma(-1), "#NUM!");
assertNear("GAMMA(172)", ProbEnforcement.gamma(172), "#NUM!");
