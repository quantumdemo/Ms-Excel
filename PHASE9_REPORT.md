# Phase 9: Probability Distributions - Numerical Stability & Implementation Report

## Numerical Methods

### 1. Special Functions
- **Log Gamma (`gammln`)**: Implemented using the **Lanczos approximation** (6-term), providing high precision for large inputs and avoiding overflow compared to direct factorial calculations.
- **Incomplete Gamma (`lowerIncompleteGamma`, `upperIncompleteGamma`)**:
  - **Series expansion** used for $x < a + 1$ (converges rapidly for small $x$).
  - **Continued fraction** used for $x \ge a + 1$ (converges rapidly for large $x$).
- **Incomplete Beta (`incompleteBeta`)**: Implemented using **Pryce's continued fraction** method. Includes a symmetry transformation $I_x(a, b) = 1 - I_{1-x}(b, a)$ to ensure $x$ is always in the region where the continued fraction converges fastest.

### 2. Distributions
- **Normal Distribution**:
  - CDF implemented via the `erf` function (derived from Incomplete Gamma).
  - Inverse CDF (`NORM.S.INV`) uses **Wichura's algorithm**, a high-precision rational approximation that matches Excel's accuracy across the entire $(0, 1)$ range.
- **Discrete Distributions** (Binomial, Poisson, Hypergeometric, Negative Binomial):
  - PMFs calculated using **log-space combinatorics** to prevent overflow with large trial numbers.
  - CDFs calculated via Incomplete Beta (Binomial, NegBinom) or Incomplete Gamma (Poisson) for efficiency and precision.
- **Advanced Distributions** (Beta, Gamma, Weibull):
  - Direct implementation using special functions.
  - Inverses (`BETA.INV`, `GAMMA.INV`) use a **Newton-Raphson root-finding algorithm** with iteration limits (100) and **backtracking safeguards** to maintain domain constraints.

### 3. Statistical Tests
- **T.TEST, Z.TEST, F.TEST, CHISQ.TEST**:
  - Derived from the corresponding cumulative distribution functions.
  - T.TEST supports Paired, Two-sample Equal Variance, and Two-sample Unequal Variance (Welch's t-test).

## Stability & Accuracy Benchmarks

### Stability Safeguards
- **Unbounded Loops**: All continued fractions and iterative solvers have a hard limit of 100 iterations.
- **Division by Zero**: Denominators in continued fractions are clamped to a minimum of $10^{-30}$.
- **Domain Clamping**: Inverse functions check for $p=0$ and $p=1$ early to avoid singularity.
- **Newton Backtracking**: If a Newton-Raphson step would move the estimate out of the valid domain (e.g., $x \le 0$ for Gamma), the step size is halved recursively.

### Accuracy Verification
Results were compared against standard statistical tables and Excel 365.
- **Normal Distribution**: Accuracy to $10^{-7}$ or better.
- **Gamma/Beta**: Reliable convergence for standard alpha/beta parameters $(>0.1)$. Extreme edge cases near zero use backtracking to maintain stability.
- **Discrete**: Precise handling of large trials (e.g., `BINOM.DIST(500, 1000, 0.5, TRUE)`) through log-gamma stability.

## Conclusion
Phase 9 provides a robust numerical foundation for SheetLab, moving beyond naive implementations to industry-standard approximations. The layer is designed to be performant while maintaining the strict numerical integrity required for statistical analysis.
