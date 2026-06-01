## AVEDEV Function
### Average Absolute Deviation: AVEDEV Function
The AVEDEV function calculates the average of the absolute deviations of data points from their mean. It's a measure of spread — how far, on average, each data point is from the centre.

Think of it as a dispersion measurer: "On average, how far does each value stray from the mean, regardless of direction?"

### Syntax
`=AVEDEV(number1, [number2], ...)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **number1** | The first number or range. |
| **number2** | Optional additional numbers or ranges (up to 255). |

### Detailed Example
#### Example: Consistency of Production Output

| Day | Units | Deviation from Mean | Absolute Deviation |
|-----|-------|--------------------|--------------------|
| Mon | 100 | -20 | 20 |
| Tue | 120 | 0 | 0 |
| Wed | 110 | -10 | 10 |
| Thu | 130 | 10 | 10 |
| Fri | 140 | 20 | 20 |
| **Mean** | 120 | **AVEDEV** | **12** |

Formula: `=AVEDEV(B2:B6)`

| Result |
|--------|
| 12 |

**How it works:**
1. Mean = (100 + 120 + 110 + 130 + 140) / 5 = 120.
2. Absolute deviations: |100-120|=20, |120-120|=0, |110-120|=10, |130-120|=10, |140-120|=20.
3. AVEDEV = average of absolute deviations = (20+0+10+10+20) / 5 = 12.

### Common Mistakes
- **AVEDEV uses absolute values** — it doesn't square deviations like variance/standard deviation.
- **Text and logical values in ranges are ignored** — use AVERAGEA if they should be included.
- **AVEDEV is less commonly used than STDEV** but is more intuitive for non-technical audiences.

### Pro Tips
- AVEDEV is useful for quality control: a low AVEDEV means consistent output.
- For normally distributed data, AVEDEV ≈ 0.8 × standard deviation.

---

## AVERAGE Function
### Arithmetic Mean: AVERAGE Function
The AVERAGE function calculates the arithmetic mean of a set of numbers — sum divided by count. It's the most common measure of central tendency.

Think of it as the balancing point: "If all values were equal, what would each one be?"

### Syntax
`=AVERAGE(number1, [number2], ...)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **number1** | The first number or range. |
| **number2** | Optional additional numbers or ranges (up to 255). |

### Detailed Example
#### Example: Monthly Sales Average

| Month | Sales |
|-------|-------|
| Jan | £12,000 |
| Feb | £15,000 |
| Mar | £11,000 |
| Apr | £14,000 |
| May | £13,000 |

Formula: `=AVERAGE(B2:B6)`

| Result |
|--------|
| £13,000 |

**How it works:**
1. Sum = 12,000 + 15,000 + 11,000 + 14,000 + 13,000 = 65,000.
2. Count = 5.
3. Average = 65,000 / 5 = 13,000.

#### What AVERAGE Ignores

| Cell Value | Included? |
|------------|-----------|
| Numbers | Yes |
| Text | No (ignored) |
| Blank | No (ignored) |
| TRUE/FALSE | No (ignored) |
| Zero (0) | Yes (counted) |

| Data | Formula | Result |
|------|---------|--------|
| 10, 20, "text", (blank), 30 | `=AVERAGE(A1:A5)` | 20 (sum 60, count 3) |

### Common Mistakes
- **AVERAGE ignores text, blanks, and logical values** — zeros are included. Use AVERAGEA to include logical values.
- **Hidden rows are still included** — AVERAGE doesn't respect filtering. Use SUBTOTAL(101, range) to ignore hidden rows.
- **Outliers can skew the average** — consider TRIMMEAN or MEDIAN for skewed data.

### Pro Tips
- AVERAGE is the foundation of descriptive statistics. Pair with STDEV.S for a complete picture of centre + spread.
- For conditional averages, use AVERAGEIF or AVERAGEIFS.

---

## AVERAGEA Function
### Average Including Text and Logical Values: AVERAGEA Function
The AVERAGEA function calculates the average of values, but unlike AVERAGE, it includes text (evaluated as 0) and logical values (TRUE=1, FALSE=0).

Think of it as the inclusive average: "Count every cell, even if it's not a number."

### Syntax
`=AVERAGEA(value1, [value2], ...)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **value1** | The first value or range. |
| **value2** | Optional additional values (up to 255). |

### Detailed Example
#### Example: Survey with Text Responses

| Respondent | Score |
|------------|-------|
| Alice | 8 |
| Ben | 7 |
| Carla | "N/A" |
| David | 9 |
| Elena | (blank) |

| Function | Formula | Result |
|----------|---------|--------|
| AVERAGE | `=AVERAGE(B2:B6)` | 8.0 (sum 24, count 3) |
| AVERAGEA | `=AVERAGEA(B2:B6)` | 6.0 (sum 24, count 4) |

**How it works:**
1. AVERAGE ignores "N/A" and the blank, so 24 / 3 = 8.0.
2. AVERAGEA counts "N/A" as 0 (counts it), but still ignores blanks, so 24 / 4 = 6.0.

#### How AVERAGEA Treats Values

| Value | Treated As |
|-------|------------|
| Number | The number itself |
| TRUE | 1 |
| FALSE | 0 |
| Text (any) | 0 |
| Blank cell | Ignored (not counted) |

### Common Mistakes
- **Text is treated as 0** — this can dramatically lower the average if many cells contain text.
- **Blank cells are still ignored** — they are not treated as 0.
- **AVERAGEA can hide data quality issues** — a low average might mean lots of non-numeric entries, not low values.

### Pro Tips
- Use AVERAGEA when every non-blank response should count, even if it's non-numeric.
- For data validation checks: `=IF(AVERAGE(range) <> AVERAGEA(range), "Non-numeric data present", "All numeric")`.

---

## AVERAGEIF Function
### Conditional Average (Single Criterion): AVERAGEIF Function
The AVERAGEIF function calculates the average of numbers in a range that meet a specified condition.

Think of it as a filtered average: "What's the average sales, but only for the North region?"

### Syntax
`=AVERAGEIF(range, criteria, [average_range])`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **range** | The range to evaluate against the criteria. |
| **criteria** | The condition (text, number, expression). |
| **average_range** | Optional. The range to average. If omitted, range is averaged. |

### Detailed Example
#### Example: Average Sales by Region

| Region | Sales |
|--------|-------|
| North | £500 |
| South | £300 |
| North | £700 |
| East | £400 |
| North | £600 |

| Criteria | Formula | Average |
|----------|---------|---------|
| "North" | `=AVERAGEIF(A2:A6, "North", B2:B6)` | £600 |
| ">400" | `=AVERAGEIF(B2:B6, ">400")` | £600 |

**How it works:**
1. AVERAGEIF checks A2:A6 for "North".
2. Rows 2, 4, and 5 match.
3. Averages corresponding B values: (500 + 700 + 600) / 3 = £600.

#### Criteria Variations

| Criteria | Description |
|----------|-------------|
| "North" | Exact text match |
| ">100" | Greater than 100 |
| "<>East" | Not equal to "East" |
| ">=500" | Greater than or equal to 500 |
| "?orth" | Single-character wildcard (matches "North", "Forth") |
| "*th" | Wildcard (matches "North", "South") |

### Common Mistakes
- **average_range and range must be the same size** — otherwise Excel misaligns them.
- **Criteria is case-insensitive** — "north" matches "North".
- **Empty cells in average_range are ignored** — they don't count toward the divisor.

### Pro Tips
- AVERAGEIF is perfect for quick segment averages without pivot tables.
- For multiple criteria, use AVERAGEIFS (note the reversed argument order).

---

## AVERAGEIFS Function
### Conditional Average (Multiple Criteria): AVERAGEIFS Function
The AVERAGEIFS function calculates the average of numbers that meet multiple conditions simultaneously. Unlike AVERAGEIF, it can handle several criteria at once.

Think of it as the multi-filter average: "What's the average sales for North region, in Q1, for Product X?"

### Syntax
`=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **average_range** | The range to average. |
| **criteria_range1** | The first range to evaluate. |
| **criteria1** | The first condition. |
| **criteria_range2** | Optional second range to evaluate. |
| **criteria2** | Optional second condition. |

### Detailed Example
#### Example: Average Sales by Region and Quarter

| Region | Quarter | Sales |
|--------|---------|-------|
| North | Q1 | £500 |
| North | Q2 | £600 |
| South | Q1 | £300 |
| North | Q1 | £700 |
| East | Q1 | £400 |

| Criteria | Formula | Average |
|----------|---------|---------|
| North AND Q1 | `=AVERAGEIFS(C2:C6, A2:A6, "North", B2:B6, "Q1")` | £600 |
| North OR Q2 | `=AVERAGEIFS(C2:C6, B2:B6, "Q1")` | £475 |

**How it works:**
1. AVERAGEIFS checks A2:A6 for "North" AND B2:B6 for "Q1".
2. Rows 2 and 4 match both.
3. Averages C2 and C4: (500 + 700) / 2 = £600.

### Common Mistakes
- **Argument order is different from AVERAGEIF** — average_range comes FIRST in AVERAGEIFS.
- **All criteria must be met** (AND logic, not OR). For OR logic, use multiple AVERAGEIF functions and average the results manually.
- **Ranges must be the same size and shape.**

### Pro Tips
- AVERAGEIFS is more powerful and consistent than AVERAGEIF. Many users standardise on AVERAGEIFS even for single criteria to avoid confusion.
- Use with named ranges for readable formulas: `=AVERAGEIFS(Sales, Region, "North", Qtr, "Q1")`.

---

## BETA.DIST Function
### Beta Probability Distribution: BETA.DIST Function
The BETA.DIST function returns the beta distribution — a continuous probability distribution defined on the interval [0,1]. It's commonly used to model random variables that represent proportions or percentages.

Think of it as the proportion modeller: "What's the probability that a task is 70% complete, given it typically ranges between 60-80%?"

### Syntax
`=BETA.DIST(x, alpha, beta, cumulative, [A], [B])`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **x** | The value between A and B at which to evaluate. |
| **alpha** | Shape parameter (must be > 0). |
| **beta** | Shape parameter (must be > 0). |
| **cumulative** | TRUE = cumulative distribution, FALSE = probability density. |
| **A** | Optional. Lower bound (default 0). |
| **B** | Optional. Upper bound (default 1). |

### Detailed Example
#### Example: Project Completion Probability
A task has an optimistic estimate of 10 days and a pessimistic estimate of 30 days. The most likely is 20 days. Model using a beta distribution with alpha=2, beta=2.

| x (days) | Alpha | Beta | Cumulative | A | B | Formula | Result |
|-----------|-------|------|------------|---|---|---------|--------|
| 20 | 2 | 2 | TRUE | 10 | 30 | `=BETA.DIST(20, 2, 2, TRUE, 10, 30)` | 0.50 |

**How it works:**
1. The beta distribution is scaled to the interval [A, B] = [10, 30].
2. x=20 is the midpoint, alpha=2 and beta=2 give a symmetric shape.
3. Cumulative probability at the midpoint is 0.50 (50% chance of being ≤ 20 days).

#### Density vs Cumulative

| x | Cumulative (TRUE) | Density (FALSE) |
|-----|-------------------|-----------------|
| 0.2 | `=BETA.DIST(0.2, 2, 5, TRUE)` → 0.26 | `=BETA.DIST(0.2, 2, 5, FALSE)` → 1.64 |
| 0.5 | → 0.81 | → 1.09 |
| 0.8 | → 0.99 | → 0.16 |

### Common Mistakes
- **Alpha and beta must be > 0** — zero or negative returns `#NUM!`.
- **x must be between A and B** — outside returns `#NUM!`.
- **Default [A, B] is [0, 1]** — if your data ranges elsewhere, specify A and B.

### Pro Tips
- BETA.DIST is widely used in project management (PERT), Bayesian statistics, and modelling rates/proportions.
- For the inverse (finding x given a probability), use BETA.INV.

---

## BETA.INV Function
### Inverse Beta Distribution: BETA.INV Function
The BETA.INV function returns the inverse of the beta cumulative distribution — given a probability, it returns the corresponding x value.

Think of it as the beta quantile finder: "What completion time corresponds to an 80% probability?"

### Syntax
`=BETA.INV(probability, alpha, beta, [A], [B])`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **probability** | A probability between 0 and 1. |
| **alpha** | Shape parameter (> 0). |
| **beta** | Shape parameter (> 0). |
| **A** | Optional. Lower bound (default 0). |
| **B** | Optional. Upper bound (default 1). |

### Detailed Example
#### Example: PERT Project Time Estimate
Using the same project: optimistic=10, pessimistic=30, alpha=2, beta=2. What time has an 80% probability of completion?

| Probability | Alpha | Beta | A | B | Formula | Time |
|-------------|-------|------|---|---|---------|------|
| 0.80 | 2 | 2 | 10 | 30 | `=BETA.INV(0.8, 2, 2, 10, 30)` | 24.14 days |

**How it works:**
1. The cumulative probability is 0.80.
2. BETA.INV finds the x value where the cumulative distribution equals 0.80.
3. Result: 24.14 days — there's an 80% chance the task takes 24.14 days or less.

### Common Mistakes
- **Probability must be between 0 and 1** (inclusive).
- **Alpha and beta must be > 0.**
- **This is the inverse of BETA.DIST with cumulative=TRUE.**

### Pro Tips
- Use BETA.INV for PERT "P80" estimates: the date by which there's an 80% confidence of completion.
- In Bayesian analysis, BETA.INV gives credible intervals for proportions.

---

## BINOM.DIST Function
### Binomial Distribution: BINOM.DIST Function
The BINOM.DIST function returns the binomial distribution probability — the probability of a specific number of successes in a fixed number of independent trials, each with the same probability of success.

Think of it as the coin-flip probability calculator: "What's the chance of exactly 7 heads in 10 flips of a fair coin?"

### Syntax
`=BINOM.DIST(number_s, trials, probability_s, cumulative)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **number_s** | Number of successes. |
| **trials** | Total number of independent trials. |
| **probability_s** | Probability of success on each trial. |
| **cumulative** | TRUE = cumulative (≤ number_s), FALSE = exact (number_s). |

### Detailed Example
#### Example: Quality Control Defect Rate
A production line has a 5% defect rate. In a sample of 20 items, what's the probability of finding exactly 2 defects? At most 2?

| Number_s | Trials | Prob_s | Cumulative | Formula | Probability |
|----------|--------|--------|------------|---------|-------------|
| 2 | 20 | 0.05 | FALSE | `=BINOM.DIST(2, 20, 0.05, FALSE)` | 0.1887 (18.87%) |
| 2 | 20 | 0.05 | TRUE | `=BINOM.DIST(2, 20, 0.05, TRUE)` | 0.9245 (92.45%) |

**How it works:**
1. P(X = 2) = C(20,2) × (0.05)² × (0.95)¹⁸ = 190 × 0.0025 × 0.3972 = 0.1887.
2. P(X ≤ 2) = P(0) + P(1) + P(2) = 0.9245.
3. This means there's a 92.45% chance of finding 2 or fewer defects.

### Common Mistakes
- **Trials must be a positive integer** (truncated if not).
- **Probability_s must be between 0 and 1.**
- **Number_s must be between 0 and trials.**
- **Use FALSE for exact probability, TRUE for "at most".**

### Pro Tips
- BINOM.DIST models yes/no outcomes: defective/not, pass/fail, win/lose.
- For "at least k successes": `=1 - BINOM.DIST(k-1, trials, prob, TRUE)`.
- For the inverse (finding the number of successes for a given probability), use BINOM.INV.

---

## BINOM.INV Function
### Inverse Binomial Distribution: BINOM.INV Function
The BINOM.INV function returns the smallest number of successes for which the cumulative binomial distribution is greater than or equal to a given criterion value.

Think of it as the binomial threshold finder: "How many successes do I need to be 95% confident?"

### Syntax
`=BINOM.INV(trials, probability_s, alpha)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **trials** | Number of independent trials. |
| **probability_s** | Probability of success per trial. |
| **alpha** | The criterion probability (between 0 and 1). |

### Detailed Example
#### Example: Minimum Stock Level
A store sells an average of 1 in 10 visitors buying. In 100 visitors, what's the maximum number of buyers at 95% confidence?

| Trials | Probability_s | Alpha | Formula | Result |
|--------|---------------|-------|---------|--------|
| 100 | 0.10 | 0.95 | `=BINOM.INV(100, 0.10, 0.95)` | 15 |

**How it works:**
1. The cumulative binomial probability reaches 0.95 at x=15.
2. This means there's a 95% chance that 15 or fewer out of 100 visitors will buy.
3. Stock at least 15 units to meet demand with 95% confidence.

### Common Mistakes
- **Alpha is a probability (0-1), not a percentage.**
- **Result is an integer** — the smallest x where P(X ≤ x) ≥ alpha.
- **Not the same as finding the exact quantile** — the binomial distribution is discrete.

### Pro Tips
- BINOM.INV is useful for inventory planning, quality assurance sampling, and risk management.
- For finding the confidence interval around an observed proportion, use the normal approximation or beta distribution.

---

## CHISQ.DIST Function
### Chi-Square Distribution: CHISQ.DIST Function
The CHISQ.DIST function returns the chi-square distribution — a right-skewed distribution used extensively in hypothesis testing, particularly for independence tests and goodness-of-fit tests.

Think of it as the categorical data analyser: "What's the probability of observing this chi-square statistic under the null hypothesis?"

### Syntax
`=CHISQ.DIST(x, deg_freedom, cumulative)`

### Syntax Breakdown
| Part | Description |
|------|-------------|
| **x** | The chi-square statistic value (≥ 0). |
| **deg_freedom** | Degrees of freedom. |
| **cumulative** | TRUE = cumulative, FALSE = density. |

### Detailed Example
#### Example: Goodness-of-Fit Test
A chi-square test yields a statistic of 7.815 with 3 degrees of freedom. What's the p-value?

| x | df | Cumulative | Formula | p-value |
|---|----|------------|---------|---------|
| 7.815 | 3 | TRUE | `=CHISQ.DIST(7.815, 3, TRUE)` | 0.95 |

The p-value (right tail) = 1 – 0.95 = 0.05 — borderline significance.

**How it works:**
1. CHISQ.DIST returns the left-tail cumulative probability: P(X ≤ 7.815) = 0.95.
2. The right-tail p-value = 1 – 0.95 = 0.05.
3. If your significance level is 0.05, this is exactly on the boundary.

### Common Mistakes
- **x must be ≥ 0** — negative chi-square values don't exist.
- **deg_freedom must be a positive integer** — truncated if fractional.
- **For p-values, use 1 – CHISQ.DIST(x, df, TRUE)** for the right tail, or use CHISQ.TEST directly on your data.

### Pro Tips
- CHISQ.DIST is the underlying distribution for CHISQ.TEST. Use it to find critical values or p-values manually.
- For the inverse (critical value at a given significance), use CHISQ.INV.
