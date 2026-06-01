def get_detailed_stats():
    return {
        "avedev": {
            "intro_title": "Average Absolute Deviation",
            "desc": "The AVEDEV function calculates the average of the absolute deviations of data points from their mean. It's a measure of spread — how far, on average, each data point is from the centre.",
            "concept": "dispersion measurer: \"On average, how far does each value stray from the mean, regardless of direction?\"",
            "syntax": "=AVEDEV(number1, [number2], ...)",
            "breakdown": [{"arg": "number1", "desc": "The first number or range."}, {"arg": "number2", "desc": "Optional additional numbers or ranges (up to 255)."}],
            "why": "Useful for quality control: a low AVEDEV means consistent output.",
            "when": "Use AVEDEV when you want to measure spread using absolute values.",
            "examples": [{
                "title": "Consistency of Production Output",
                "table": {"headers": ["Day", "Units", "Absolute Deviation"], "rows": [["Mon", "100", "20"], ["Tue", "120", "0"], ["Wed", "110", "10"], ["Thu", "130", "10"], ["Fri", "140", "20"]]},
                "stepByStep": ["Mean = 120", "Absolute deviations: |100-120|=20, |120-120|=0, etc.", "AVEDEV = (20+0+10+10+20)/5 = 12."]
            }],
            "mistakes": [{"title": "Absolute Values", "desc": "AVEDEV uses absolute values, not squares."}],
            "tips": ["Useful for quality control.", "AVEDEV ≈ 0.8 × standard deviation."],
            "mini": {"q": "If Mean=100 and value=80, what is the absolute deviation?", "a": "20"},
            "practice": {"i": "Calculate AVEDEV for B2:B6.", "d": [["Day", "Units"], ["Mon", 100], ["Tue", 120], ["Wed", 110], ["Thu", 130], ["Fri", 140], ["Res", ""]], "t": [6,1], "f": "AVEDEV(B2:B6)", "v": 12}
        },
        "average": {
            "intro_title": "Arithmetic Mean",
            "desc": "The AVERAGE function calculates the arithmetic mean of a set of numbers — sum divided by count.",
            "concept": "balancing point: \"If all values were equal, what would each one be?\"",
            "syntax": "=AVERAGE(number1, [number2], ...)",
            "breakdown": [{"arg": "number1", "desc": "The first number or range."}, {"arg": "number2", "desc": "Optional additional numbers."}],
            "why": "The foundation of descriptive statistics.",
            "when": "Use to find the typical value in a dataset.",
            "examples": [{
                "title": "Monthly Sales Average",
                "table": {"headers": ["Month", "Sales"], "rows": [["Jan", "12000"], ["Feb", "15000"], ["Mar", "11000"]]},
                "stepByStep": ["Sum = 38000", "Count = 3", "Average = 12666.67"]
            }],
            "mistakes": [{"title": "Zeros vs Blanks", "desc": "Zeros are counted, blanks are ignored."}],
            "tips": ["Pair with STDEV.S.", "Use MEDIAN if data is skewed."],
            "mini": {"q": "Average of 10, 20, 30?", "a": "20"},
            "practice": {"i": "Find average sales in B2:B4.", "d": [["M", "S"], ["Jan", 12000], ["Feb", 15000], ["Mar", 11000], ["Avg", ""]], "t": [4,1], "f": "AVERAGE(B2:B4)", "v": 12666.67},
            "diff": "Beginner", "xp": 150
        },
        "averagea": {
            "intro_title": "Average Including Text and Logical Values",
            "desc": "Calculates the average of values, including text (evaluated as 0) and logical values (TRUE=1, FALSE=0).",
            "concept": "inclusive average: \"Count every cell, even if it's not a number.\"",
            "syntax": "=AVERAGEA(value1, [value2], ...)",
            "breakdown": [{"arg": "value1", "desc": "First value/range."}, {"arg": "value2", "desc": "Optional additional data."}],
            "why": "Ensures every non-blank response counts.",
            "when": "Use for surveys with text responses.",
            "examples": [{
                "title": "Survey with Text",
                "table": {"headers": ["R", "S"], "rows": [["A", "8"], ["B", "N/A"]]},
                "stepByStep": ["N/A counts as 0.", "Average = (8+0)/2 = 4."]
            }],
            "mistakes": [{"title": "Text is 0", "desc": "Can lower the average significantly."}],
            "tips": ["Use for data validation."],
            "mini": {"q": "What is TRUE treated as in AVERAGEA?", "a": "1"},
            "practice": {"i": "Find AVERAGEA for B2:B3.", "d": [["R", "S"], ["A", 8], ["B", "N/A"], ["Res", ""]], "t": [3,1], "f": "AVERAGEA(B2:B3)", "v": 4}
        },
        "averageif": {
            "intro_title": "Conditional Average (Single Criterion)",
            "desc": "Calculates the average of numbers in a range that meet a specified condition.",
            "concept": "filtered average: \"What's the average sales, but only for the North region?\"",
            "syntax": "=AVERAGEIF(range, criteria, [average_range])",
            "breakdown": [{"arg": "range", "desc": "Cells to check."}, {"arg": "criteria", "desc": "The condition."}, {"arg": "average_range", "desc": "Optional cells to average."}],
            "why": "Allows for quick segment averages.",
            "when": "Use to average a subset of data.",
            "examples": [{
                "title": "Average Sales by Region",
                "table": {"headers": ["Region", "Sales"], "rows": [["North", "500"], ["South", "300"], ["North", "700"]]},
                "stepByStep": ["Checks A2:A4 for 'North'.", "Rows 2 and 4 match.", "Average: (500+700)/2 = 600."]
            }],
            "mistakes": [{"title": "Range Size", "desc": "Must be same size."}],
            "tips": ["Use wildcards (*)."],
            "mini": {"q": "Average values > 10 in B1:B10?", "a": "=AVERAGEIF(B1:B10, \">10\")"},
            "practice": {"i": "Average North sales.", "d": [["R", "S"], ["North", 500], ["South", 300], ["North", 700], ["Res", ""]], "t": [4,1], "f": "AVERAGEIF(A2:A4,\"North\",B2:B4)", "v": 600}
        },
        "averageifs": {
            "intro_title": "Conditional Average (Multiple Criteria)",
            "desc": "Calculates the average of numbers that meet multiple conditions simultaneously.",
            "concept": "multi-filter average: \"What's the average sales for North region in Q1?\"",
            "syntax": "=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)",
            "breakdown": [{"arg": "average_range", "desc": "The range to average."}, {"arg": "criteria_range1", "desc": "First range to check."}, {"arg": "criteria1", "desc": "First condition."}],
            "why": "Handles complex intersections of data.",
            "when": "Use with two or more conditions.",
            "examples": [{
                "title": "Multi-Filter Average",
                "table": {"headers": ["Region", "Q", "Sales"], "rows": [["North", "Q1", "500"], ["North", "Q2", "600"], ["North", "Q1", "700"]]},
                "stepByStep": ["Matches North AND Q1.", "Rows 2 and 4 match.", "Result = 600."]
            }],
            "mistakes": [{"title": "Arg Order", "desc": "average_range is FIRST."}],
            "tips": ["More powerful than AVERAGEIF."],
            "mini": {"q": "In AVERAGEIFS, does avg_range come first or last?", "a": "First"},
            "practice": {"i": "Avg sales North Q1.", "d": [["R", "Q", "S"], ["North", "Q1", 500], ["North", "Q2", 600], ["North", "Q1", 700], ["Res", ""]], "t": [4,2], "f": "AVERAGEIFS(C2:C4,A2:A4,\"North\",B2:B4,\"Q1\")", "v": 600}
        },
        "beta.dist": {
            "intro_title": "Beta Probability Distribution",
            "desc": "Returns the beta distribution — a continuous probability distribution defined on the interval [0,1].",
            "concept": "proportion modeller: \"What's the probability that a task is 70% complete?\"",
            "syntax": "=BETA.DIST(x, alpha, beta, cumulative, [A], [B])",
            "breakdown": [{"arg": "x", "desc": "Value to evaluate."}, {"arg": "alpha", "desc": "Shape parameter > 0."}, {"arg": "beta", "desc": "Shape parameter > 0."}, {"arg": "cumulative", "desc": "TRUE/FALSE."}],
            "why": "Used for modeling proportions or percentages.",
            "when": "Project management (PERT).",
            "examples": [{
                "title": "Project Probability",
                "table": {"headers": ["x", "α", "β", "Cum"], "rows": [["0.5", "2", "2", "TRUE"]]},
                "stepByStep": ["Symmetric distribution.", "x=0.5 is midpoint.", "Result = 0.5."]
            }],
            "mistakes": [{"title": "Alpha/Beta", "desc": "Must be > 0."}],
            "tips": ["Inverse is BETA.INV."],
            "mini": {"q": "BETA.DIST interval?", "a": "[0, 1]"},
            "practice": {"i": "BETA.DIST for x=0.5, α=2, β=2.", "d": [["x", "α", "β"], [0.5, 2, 2], ["Res", ""]], "t": [2,0], "f": "BETA.DIST(0.5,2,2,TRUE)", "v": 0.5},
            "diff": "Advanced", "xp": 300
        },
        "beta.inv": {
            "intro_title": "Inverse Beta Distribution",
            "desc": "Returns the inverse of the beta cumulative distribution — given a probability, it returns the x value.",
            "concept": "beta quantile finder: \"What completion time corresponds to an 80% probability?\"",
            "syntax": "=BETA.INV(probability, alpha, beta, [A], [B])",
            "breakdown": [{"arg": "prob", "desc": "Probability between 0-1."}, {"arg": "alpha", "desc": "Shape parameter."}, {"arg": "beta", "desc": "Shape parameter."}],
            "why": "Finds thresholds for proportions.",
            "when": "Risk analysis.",
            "examples": [{
                "title": "Quantile",
                "table": {"headers": ["P", "α", "β"], "rows": [["0.5", "2", "2"]]},
                "stepByStep": ["Cumulative P = 0.5.", "α=2, β=2.", "Result = 0.5."]
            }],
            "mistakes": [{"title": "Prob Range", "desc": "Must be 0 to 1."}],
            "tips": ["P80 estimates."],
            "mini": {"q": "Is BETA.INV the inverse of BETA.DIST?", "a": "Yes"},
            "practice": {"i": "BETA.INV for P=0.5, α=2, β=2.", "d": [["P", "α", "β"], [0.5, 2, 2], ["Res", ""]], "t": [2,0], "f": "BETA.INV(0.5,2,2)", "v": 0.5},
            "diff": "Advanced", "xp": 300
        },
        "binom.dist": {
            "intro_title": "Binomial Distribution",
            "desc": "Returns the binomial distribution probability — fixed trials, independent outcomes.",
            "concept": "coin-flip calculator: \"Chance of 7 heads in 10 flips?\"",
            "syntax": "=BINOM.DIST(number_s, trials, probability_s, cumulative)",
            "breakdown": [{"arg": "successes", "desc": "Count of successes."}, {"arg": "trials", "desc": "Total trials."}, {"arg": "prob", "desc": "Prob per trial."}],
            "why": "Models yes/no outcomes.",
            "when": "Quality control defects.",
            "examples": [{
                "title": "Defects",
                "table": {"headers": ["S", "T", "P"], "rows": [["2", "20", "0.05"]]},
                "stepByStep": ["P(X=2).", "Result = 0.1887."]
            }],
            "mistakes": [{"title": "Trials", "desc": "Positive integer only."}],
            "tips": ["Binary outcomes only."],
            "mini": {"q": "BINOM.DIST fixed trials?", "a": "Yes"},
            "practice": {"i": "Prob of 2 success in 20 trials, p=0.05.", "d": [["S", "T", "P"], [2, 20, 0.05], ["Res", ""]], "t": [2,0], "f": "BINOM.DIST(2,20,0.05,FALSE)", "v": 0.188712351},
            "diff": "Advanced", "xp": 300
        },
        "binom.inv": {
            "intro_title": "Inverse Binomial Distribution",
            "desc": "Returns the smallest number of successes where the cumulative binomial >= alpha.",
            "concept": "binomial threshold finder: \"How many successes for 95% confidence?\"",
            "syntax": "=BINOM.INV(trials, probability_s, alpha)",
            "breakdown": [{"arg": "trials", "desc": "Total trials."}, {"arg": "prob", "desc": "Prob of success."}, {"arg": "alpha", "desc": "Target cumulative probability."}],
            "why": "Determines confidence thresholds.",
            "when": "Inventory planning.",
            "examples": [{
                "title": "Confidence",
                "table": {"headers": ["T", "P", "A"], "rows": [["100", "0.1", "0.95"]]},
                "stepByStep": ["Cumulative hits 0.95 at x=15.", "Result = 15."]
            }],
            "mistakes": [{"title": "Alpha", "desc": "Probability, not %."}],
            "tips": ["Result is an integer."],
            "mini": {"q": "BINOM.INV result type?", "a": "Integer"},
            "practice": {"i": "Find threshold for 100 trials, p=0.1, alpha=0.95.", "d": [["T", "P", "A"], [100, 0.1, 0.95], ["Res", ""]], "t": [2,0], "f": "BINOM.INV(100,0.1,0.95)", "v": 15},
            "diff": "Advanced", "xp": 300
        },
        "chisq.dist": {
            "intro_title": "Chi-Square Distribution",
            "desc": "Returns the chi-square distribution — used for independence and goodness-of-fit.",
            "concept": "categorical analyser: \"Probability of observing this chi-square statistic?\"",
            "syntax": "=CHISQ.DIST(x, deg_freedom, cumulative)",
            "breakdown": [{"arg": "x", "desc": "Statistic value."}, {"arg": "df", "desc": "Degrees of freedom."}],
            "why": "Basis for categorical hypothesis testing.",
            "when": "Testing for association.",
            "examples": [{
                "title": "Goodness of Fit",
                "table": {"headers": ["x", "df"], "rows": [["7.815", "3"]]},
                "stepByStep": ["P(X<=7.815).", "Result = 0.95."]
            }],
            "mistakes": [{"title": "X value", "desc": "Must be >= 0."}],
            "tips": ["Right tail is 1 - DIST."],
            "mini": {"q": "Can chi-square be negative?", "a": "No"},
            "practice": {"i": "CHISQ.DIST for x=7.815, df=3.", "d": [["x", "df"], [7.815, 3], ["Res", ""]], "t": [2,0], "f": "CHISQ.DIST(7.815,3,TRUE)", "v": 0.95},
            "diff": "Advanced", "xp": 300
        }
    }
