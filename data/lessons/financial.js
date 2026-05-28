export const financialLessons = [
  {
    id: "pmt",
    title: "PMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Loan Mastery: The PMT Function",
      description: "The PMT function calculates the periodic payment for a loan based on constant payments and a constant interest rate.",
      concept: "Think of it as a budget planner. If you want to borrow $10,000 for a car at 5% interest over 3 years, PMT tells you exactly how much you need to pay each month."
    },
    internalLogic: "Excel uses the standard formula for an annuity: PMT = [P * i * (1+i)^n] / [(1+i)^n - 1], where P is Principal, i is Interest Rate, and n is number of periods. It solves this equation based on your inputs to find the 'break-even' payment.",
    whyItExists: "Calculating interest and principal split for monthly payments manually is mathematically complex. PMT automates this, making it essential for loan officers, real estate agents, and personal finance.",
    whenToUse: "Use PMT whenever you are calculating fixed payments for a loan or an investment with a fixed interest rate.",
    realWorldUseCases: [
      "Calculating monthly mortgage payments.",
      "Determining monthly car loan installments.",
      "Planning savings goals (how much to save monthly to reach $1M).",
      "Analyzing business equipment lease payments."
    ],
    businessExample: {
      scenario: "A business wants to take a $50,000 loan for a new delivery truck at 6% annual interest over 5 years. How much will they pay monthly?",
      formula: "=PMT(6%/12, 5*12, 50000)"
    },
    syntax: "=PMT(rate, nper, pv, [fv], [type])",
    syntaxBreakdown: [
      { arg: "rate", desc: "The interest rate for the loan. IMPORTANT: If making monthly payments, divide the annual rate by 12." },
      { arg: "nper", desc: "The total number of payments. For a 5-year monthly loan, use 5*12 = 60." },
      { arg: "pv", desc: "Present Value. The total amount that a series of future payments is worth now (the loan amount)." },
      { arg: "fv", desc: "Optional. The 'Future Value' or cash balance you want to reach after the last payment is made. Defaults to 0." },
      { arg: "type", desc: "Optional. 0 = Payment at end of period (default). 1 = Payment at start of period." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Monthly Car Loan",
        table: {
          headers: ["Loan Amount", "Annual Rate", "Years", "Monthly Payment"],
          rows: [
            ["20000", "4.5%", "5", "=PMT(B2/12, C2*12, A2)"]
          ]
        },
        stepByStep: [
          "Excel takes the 4.5% rate and divides by 12 to get the monthly rate.",
          "It takes 5 years and multiplies by 12 to get 60 payment periods.",
          "It uses the $20,000 as the starting debt.",
          "The result (shown as a negative number because it's money leaving your pocket) is the monthly cost."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mixing Units.", desc: "If payments are monthly, your rate MUST be monthly (rate/12) and your nper MUST be monthly (years*12)." },
      { title: "Forgetting the negative sign.", desc: "Excel shows PMT results as negative numbers. To see it as positive, put a minus sign before the function: =-PMT(...)." }
    ],
    limitations: "PMT assumes the interest rate and payment amounts never change during the life of the loan.",
    bestPractices: [
      "Always use cell references for Rate, Nper, and PV so you can test different 'What-If' scenarios easily.",
      "Check the 'type' argument if your loan requires payments on the 1st of the month (Type 1)."
    ],
    proTips: [
      "Use PMT inside the Goal Seek tool to find exactly what interest rate you need to afford a specific monthly payment."
    ],
    relatedFunctions: ["FV", "PV", "IPMT", "PPMT", "NPER", "RATE"],
    comparison: "PMT gives the total payment. IPMT gives only the Interest part. PPMT gives only the Principal part.",
    miniChallenge: {
      question: "You have a $5,000 loan, 10% annual interest, and 12 monthly payments. Write the formula.",
      expectedAnswer: "=PMT(10%/12, 12, 5000)"
    },
    practice: {
      instructions: "In cell B4, calculate the monthly payment for a $10,000 loan (B1) at 5% annual interest (B2) over 3 years (B3).",
      initialData: [["Setting", "Value"], ["Loan", 10000], ["Rate", "5%"], ["Years", 3], ["Monthly PMT", ""]],
      targetCell: [4, 1],
      expectedFormula: "PMT(B2/12,B3*12,B1)",
      expectedValue: -300
    }
  },
  {
    id: "fv",
    title: "Future Value: FV",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Investment Growth: FV",
      description: "The FV function calculates the future value of an investment based on a constant interest rate and periodic, constant payments.",
      concept: "Think of it as a crystal ball for your savings. If you save $100 every month at 5% interest for 10 years, FV tells you exactly how much money you will have at the end."
    },
    internalLogic: "Excel uses the standard future value formula for an annuity: FV = P * [(1+i)^n - 1] / i. It calculates the compound interest for each period and adds it to the total.",
    whyItExists: "Compound interest is hard to calculate by hand, especially when you are making monthly contributions. FV handles the complex math of growth over time.",
    whenToUse: "Use FV to plan for retirement, save for a big purchase, or calculate the eventual size of an investment account.",
    realWorldUseCases: [
      "Calculating how much a 401(k) will be worth in 20 years.",
      "Estimating the future value of a child's college savings fund.",
      "Planning a savings goal for a house down payment.",
      "Calculating the maturity value of a fixed-term bond."
    ],
    businessExample: {
      scenario: "A business saves $1,000 every month at 4% annual interest. They want to know how much they will have after 5 years for expansion.",
      formula: "=FV(4%/12, 5*12, -1000)"
    },
    syntax: "=FV(rate, nper, pmt, [pv], [type])",
    syntaxBreakdown: [
      { arg: "rate", desc: "The interest rate per period (Annual Rate / 12 for monthly)." },
      { arg: "nper", desc: "Total number of payment periods (Years * 12 for monthly)." },
      { arg: "pmt", desc: "The amount paid each period. Note: Use a negative number if you are 'giving' the money to the bank." },
      { arg: "pv", desc: "Optional. The present value (starting balance). Use a negative number." }
    ],
    detailedExamples: [
      {
        title: "Example 1: Basic Savings",
        table: {
          headers: ["Monthly Save", "Rate", "Years", "Future Total"],
          rows: [
            ["100", "5%", "10", "=FV(5%/12, 10*12, -100)"]
          ]
        },
        stepByStep: [
          "Excel applies the monthly interest (5%/12) to the $100 payments.",
          "It compounds this for 120 months.",
          "The result is the final balance of the account."
        ]
      }
    ],
    commonMistakes: [
      { title: "Mixing Units.", desc: "Ensure rate and nper both use the same time period (usually monthly)." },
      { title: "Sign convention.", desc: "If money is leaving your pocket (saving), use a negative sign for the PMT and PV arguments." }
    ],
    proTips: [
      "If you aren't making monthly payments but just have a starting amount, set PMT to 0 and use PV."
    ],
    relatedFunctions: ["PV", "PMT", "NPER", "RATE"],
    miniChallenge: {
      question: "Which function calculates the future size of an investment?",
      expectedAnswer: "=FV()"
    },
    practice: {
      instructions: "In cell B4, use FV to calculate the future value of $100/month (B1) at 5% annual interest (B2) over 5 years (B3).",
      initialData: [["PMT", -100], ["Rate", "5%"], ["Years", 5], ["FV", ""]],
      targetCell: [3, 1],
      expectedFormula: "FV(B2/12,B3*12,B1)",
      expectedValue: 6800
    }
  },
  {
    id: "pv",
    title: "Present Value: PV",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Today's Worth: PV",
      description: "The PV function calculates the present value of a loan or an investment, based on a constant interest rate.",
      concept: "Think of it as 'reverse compounding'. If someone promises to give you $10,000 in 5 years, PV tells you how much that promise is worth in today's money."
    },
    internalLogic: "Excel calculates how much you would need to invest today, at a given interest rate, to reach a specific future goal or series of payments.",
    whyItExists: "Money today is worth more than money in the future because you could be earning interest on it. PV helps you compare the value of different financial deals.",
    whenToUse: "Use PV to value bonds, evaluate business investments, or determine if a 'buy now, pay later' deal is actually worth it.",
    realWorldUseCases: [
      "Valuing an insurance annuity.",
      "Determining the current worth of a future inheritance.",
      "Evaluating a business project's 'Net Present Value' (NPV).",
      "Calculating how much you need to invest today to pay for a future expense."
    ],
    businessExample: {
      scenario: "A client offers to pay you $50,000 in 3 years. If the current interest rate is 5%, how much is that offer worth to you today?",
      formula: "=PV(5%, 3, 0, -50000)"
    },
    syntax: "=PV(rate, nper, pmt, [fv], [type])",
    syntaxBreakdown: [
      { arg: "rate", desc: "The interest rate per period." },
      { arg: "nper", desc: "The total number of periods." },
      { arg: "pmt", desc: "The payment made each period. 0 if only a lump sum at the end." },
      { arg: "fv", desc: "Optional. The future value you want to receive." }
    ],
    commonMistakes: [
      { title: "Sign convention.", desc: "If the result should be 'money you get', ensure your PMT or FV inputs are negative (money you give up). Excel follows cash flow direction." },
      { title: "Unit mismatch.", desc: "Ensure rate and nper use the same periods. If nper is in months, your annual rate must be divided by 12." }
    ],
    relatedFunctions: ["FV", "PMT", "NPV"],
    miniChallenge: {
      question: "Which function calculates the present value (today's worth) of a future lump sum?",
      expectedAnswer: "=PV()"
    },
    practice: {
      instructions: "In cell B4, use PV to find the current worth of receiving $10,000 (B1) in 5 years (B3) at a 5% interest rate (B2).",
      initialData: [["Goal", 10000], ["Rate", "5%"], ["Years", 5], ["PV", ""]],
      targetCell: [3, 1],
      expectedFormula: "PV(B2,B3,0,B1)",
      expectedValue: -7835
    }
  }
];
