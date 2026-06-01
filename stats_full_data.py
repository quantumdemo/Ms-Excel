stats_data = {}

def add_stat(id, data):
    stats_data[id] = data

add_stat("avedev", {
    "intro_title": "Average Absolute Deviation",
    "desc": "The AVEDEV function calculates the average of the absolute deviations of data points from their mean. It's a measure of spread — how far, on average, each data point is from the centre.",
    "concept": "dispersion measurer: \"On average, how far does each value stray from the mean, regardless of direction?\"",
    "syntax": "=AVEDEV(number1, [number2], ...)",
    "breakdown": [
        {"arg": "number1", "desc": "The first number or range."},
        {"arg": "number2", "desc": "Optional additional numbers or ranges (up to 255)."}
    ],
    "why": "It's a useful measure of dispersion that is more intuitive for non-technical audiences than standard deviation.",
    "when": "Use AVEDEV when you want to know the average distance of data points from the mean without squaring the differences.",
    "cases": ["Quality control in manufacturing.", "Analyzing consistency in student test scores."],
    "biz": {"scenario": "A production manager wants to see how much daily output varies from the average.", "formula": "=AVEDEV(B2:B6)"},
    "examples": [{
        "title": "Consistency of Production Output",
        "table": {
            "headers": ["Day", "Units", "Dev from Mean", "Abs Dev"],
            "rows": [["Mon", "100", "-20", "20"], ["Tue", "120", "0", "0"], ["Wed", "110", "-10", "10"], ["Thu", "130", "10", "10"], ["Fri", "140", "20", "20"], ["Mean", "120", "AVEDEV", "12"]]
        },
        "stepByStep": [
            "Calculate the Mean: (100+120+110+130+140)/5 = 120.",
            "Find absolute deviations: |100-120|=20, |120-120|=0, |110-120|=10, |130-120|=10, |140-120|=20.",
            "Average the absolute deviations: (20+0+10+10+20)/5 = 12."
        ]
    }],
    "mistakes": [
        {"title": "Absolute Values", "desc": "AVEDEV uses absolute values, not squared deviations like Variance."},
        {"title": "Text in Ranges", "desc": "Text and logical values in ranges are ignored."}
    ],
    "tips": [
        "A low AVEDEV means high consistency.",
        "For normally distributed data, AVEDEV is about 0.8 times the standard deviation."
    ],
    "miniChallenge": {"question": "If the mean is 50 and your values are 40 and 60, what is the AVEDEV?", "expectedAnswer": "10"},
    "practice": {
        "instructions": "In cell B7, calculate the AVEDEV for the units produced (B2:B6).",
        "initialData": [["Day", "Units"], ["M", 100], ["T", 120], ["W", 110], ["T", 130], ["F", 140], ["Res", ""]],
        "targetCell": [6, 1],
        "expectedFormula": "AVEDEV(B2:B6)",
        "expectedValue": 12
    }
})

add_stat("average", {
    "intro_title": "Arithmetic Mean",
    "desc": "The AVERAGE function calculates the arithmetic mean of a set of numbers — sum divided by count. It's the most common measure of central tendency.",
    "concept": "balancing point: \"If all values were equal, what would each one be?\"",
    "syntax": "=AVERAGE(number1, [number2], ...)",
    "breakdown": [
        {"arg": "number1", "desc": "The first number or range."},
        {"arg": "number2", "desc": "Optional additional numbers or ranges."}
    ],
    "why": "Standardizing data sets into a single representative value.",
    "when": "Use to find the 'average' of a group of numbers.",
    "cases": ["Monthly sales average.", "Average customer spend.", "Response time analysis."],
    "biz": {"scenario": "Calculate the average monthly sales.", "formula": "=AVERAGE(B2:B6)"},
    "examples": [{
        "title": "Monthly Sales Average",
        "table": {
            "headers": ["Month", "Sales"],
            "rows": [["Jan", "12000"], ["Feb", "15000"], ["Mar", "11000"], ["Apr", "14000"], ["May", "13000"]]
        },
        "stepByStep": [
            "Sum the values: 12000+15000+11000+14000+13000 = 65000.",
            "Count the items: 5 months.",
            "Divide Sum by Count: 65000 / 5 = 13000."
        ]
    }],
    "mistakes": [
        {"title": "Zeros vs Blanks", "desc": "AVERAGE ignores blanks but includes zeros in the calculation."},
        {"title": "Hidden Rows", "desc": "AVERAGE includes filtered-out rows. Use SUBTOTAL to ignore them."}
    ],
    "tips": [
        "Foundation of descriptive statistics.",
        "Outliers can heavily skew the average."
    ],
    "miniChallenge": {"question": "What is the average of 10, 20, and 60?", "expectedAnswer": "30"},
    "practice": {
        "instructions": "In cell B7, find the average of the sales in B2:B6.",
        "initialData": [["Month", "Sales"], ["Jan", 12000], ["Feb", 15000], ["Mar", 11000], ["Apr", 14000], ["May", 13000], ["Avg", ""]],
        "targetCell": [6, 1],
        "expectedFormula": "AVERAGE(B2:B6)",
        "expectedValue": 13000,
        "diff": "Beginner", "xp": 150
    }
})

# ... I will add all 93 in the full script ...
