export const financialLessons = [
  {
    id: "pv",
    title: "Present Value: PV Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Present Value: PV Function",
      description: "The PV function calculates the present value of an investment or loan — the total amount that a series of future payments is worth right now, given a specified interest rate.",
      concept: "Think of it as a time machine for money: 'How much would I need to invest today to reach a future goal, or what's the current value of future cash flows?'"
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
      scenario: "A client offers to pay you ₦50,000 in 3 years. If the current interest rate is 5%, how much is that offer worth to you today?",
      formula: "=PV(5%, 3, 0, -50000)"
    },
    syntax: "=PV(rate, nper, pmt, [fv], [type])",
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pmt", desc: "Payment made each period (constant)." },
      { arg: "fv", desc: "Optional. Future value after the last payment (default 0)." },
      { arg: "type", desc: "Optional. 0 = end of period (default), 1 = beginning." }
    ],
    detailedExamples: [
      {
        title: "Example: Loan Present Value",
        description: "You're offered monthly payments of ₦500 for 5 years at an annual interest rate of 6%. What's the present value (the loan amount)?",
        table: {
          headers: ["Rate (per period)", "NPER", "PMT", "FV", "Type", "Formula", "Result"],
          rows: [
            ["0.005", "60", "-500", "0", "0", "=PV(0.06/12, 60, -500, 0, 0)", "₦25,862.78"]
          ]
        },
        stepByStep: [
          "Annual rate 6% divided by 12 = 0.5% per month.",
          "60 monthly payments of ₦500 (entered as negative — outgoing).",
          "PV returns ₦25,862.78 — the amount you could borrow today."
        ]
      },
      {
        title: "Investment Required for a Future Goal",
        table: {
          headers: ["Goal", "Rate", "Years", "PMT", "Formula", "Amount Today"],
          rows: [
            ["₦100,000", "5%", "10", "0", "=PV(0.05, 10, 0, 100000)", "₦61,391.33"]
          ]
        },
        stepByStep: [
          "You need to invest ₦61,391.33 today at 5% to reach ₦100,000 in 10 years."
        ]
      }
    ],
    commonMistakes: [
      { title: "Sign convention.", desc: "Outgoing payments should be negative; PV returns a positive amount for inflows." },
      { title: "Rate mismatch.", desc: "Rate must match the period — monthly payments need a monthly rate (annual/12)." }
    ],
    proTips: [
      "PV is the foundation of bond pricing. It answers 'What's this worth today?'",
      "Use PV with FV to handle balloon payments: =PV(rate, nper, pmt, balloon, type)."
    ],
    relatedFunctions: ["FV", "PMT", "NPV"],
    miniChallenge: {
      question: "Which function calculates the present value (today's worth) of a future lump sum?",
      expectedAnswer: "=PV()"
    },
    practice: {
      instructions: "In cell B4, find the current worth of receiving ₦10,000 (B1) in 5 years (B3) at a 5% interest rate (B2).",
      initialData: [["Goal", 10000], ["Rate", "5%"], ["Years", 5], ["PV", ""]],
      targetCell: [3, 1],
      expectedFormula: "PV(B2,B3,0,B1)",
      expectedValue: -7835.261664134989
    }
  },
  {
    id: "accrint",
    title: "Accrued Interest for Periodic Securities: ACCRINT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Accrued Interest for Periodic Securities: ACCRINT Function",
      description: "The ACCRINT function calculates the accrued interest for a security that pays periodic interest. It tells you how much interest has accumulated between the issue date and the settlement date.",
      concept: "Think of it as the interest tally: 'How much interest has built up since the bond was issued or last paid?'"
    },
    syntax: "=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis], [calc_method])",
    syntaxBreakdown: [
      { arg: "issue", desc: "The security's issue date." },
      { arg: "first_interest", desc: "The date of the first interest payment." },
      { arg: "settlement", desc: "The settlement date (when you buy it)." },
      { arg: "rate", desc: "Annual coupon rate (as a decimal)." },
      { arg: "par", desc: "Par value (face value) of the security." },
      { arg: "frequency", desc: "Coupon payments per year: 1=annual, 2=semi-annual, 4=quarterly." },
      { arg: "basis", desc: "Optional. Day-count basis." },
      { arg: "calc_method", desc: "Optional. TRUE = accrued from issue; FALSE = from last coupon." }
    ],
    detailedExamples: [
      {
        title: "Example: Accrued Interest on a Bond Purchase",
        table: {
          headers: ["Bond Detail", "Value"],
          rows: [
            ["Issue Date", "01/01/2026"],
            ["First Interest", "01/07/2026"],
            ["Settlement", "15/03/2026"],
            ["Annual Rate", "5%"],
            ["Par Value", "₦1,000"],
            ["Frequency", "2 (semi-annual)"],
            ["Basis", "1 (Actual/Actual)"],
            ["Result", "₦10.14"]
          ]
        },
        stepByStep: [
          "From 1 Jan to 15 Mar = 73 days (Actual/Actual).",
          "Semi-annual coupon = 5% * ₦1,000 / 2 = ₦25 per period.",
          "Accrued = ₦25 * (73 / 181.5) ≈ ₦10.14."
        ]
      }
    ],
    commonMistakes: [
      { title: "Wrong Frequency.", desc: "Using annual when the bond is semi-annual gives wrong results." },
      { title: "Date order.", desc: "Settlement must be after issue." }
    ],
    proTips: [
      "ACCRINT is essential for bond pricing: the buyer compensates the seller for accrued interest.",
      "For bonds where you want accrued from the last coupon date, set calc_method to FALSE."
    ],
    relatedFunctions: ["ACCRINTM", "PRICE", "YIELD"],
    miniChallenge: {
      question: "Which function calculates accrued interest for a security that pays periodic interest?",
      expectedAnswer: "=ACCRINT()"
    },
    practice: {
      instructions: "In cell B2, calculate accrued interest for a bond issued on 01/01/2026 (A2), with first interest on 07/01/2026 (A3), settlement 03/15/2026 (A4), 5% rate (A5), ₦1000 par (A6), semi-annual frequency (2), and Actual/Actual basis (1).",
      initialData: [["Item", "Value"], ["Issue", "2026-01-01"], ["First Int", "2026-07-01"], ["Settlement", "2026-03-15"], ["Rate", 0.05], ["Par", 1000], ["Result", ""]],
      targetCell: [6, 1],
      expectedFormula: "ACCRINT(B2,B3,B4,B5,B6,2,1)",
      expectedValue: 10.138121546961326
    }
  },
  {
    id: "accrintm",
    title: "Accrued Interest at Maturity: ACCRINTM Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Accrued Interest at Maturity: ACCRINTM Function",
      description: "The ACCRINTM function calculates the accrued interest for a security that pays interest only at maturity (a zero-coupon or single-payment bond).",
      concept: "Think of it as the simple interest counter: 'How much interest has built up from issue to settlement on this one-payment security?'"
    },
    syntax: "=ACCRINTM(issue, settlement, rate, par, [basis])",
    syntaxBreakdown: [
      { arg: "issue", desc: "The issue date." },
      { arg: "settlement", desc: "The settlement date." },
      { arg: "rate", desc: "Annual coupon rate." },
      { arg: "par", desc: "Par value." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    detailedExamples: [
      {
        title: "Example: Interest on a One-Year Note",
        description: "A ₦5,000 note issued 01/01/2026 at 4%, settling 01/04/2026.",
        table: {
          headers: ["Detail", "Value"],
          rows: [
            ["Issue Date", "01/01/2026"],
            ["Settlement", "01/04/2026"],
            ["Annual Rate", "4%"],
            ["Par Value", "₦5,000"],
            ["Basis", "1 (Actual/Actual)"],
            ["Result", "₦49.32"]
          ]
        },
        stepByStep: [
          "1 Jan to 1 Apr = 90 days (2026 is not a leap year, so 90/365).",
          "Annual interest = 4% * ₦5,000 = ₦200.",
          "Accrued = ₦200 * (90/365) = ₦49.32."
        ]
      }
    ],
    commonMistakes: [
      { title: "Periodic vs Maturity.", desc: "Use ACCRINT for bonds with regular coupon payments." },
      { title: "Basis defaults.", desc: "Omitting basis defaults to US 30/360, which may be inaccurate for your region." }
    ],
    proTips: [
      "ACCRINTM is simpler than ACCRINT because there's no frequency to specify.",
      "For zero-coupon bonds, accrued interest plus the issue price equals the redemption value."
    ],
    relatedFunctions: ["ACCRINT", "INTRATE", "RECEIVED"],
    miniChallenge: {
      question: "Does ACCRINTM handle periodic interest payments?",
      expectedAnswer: "No"
    },
    practice: {
      instructions: "In cell B2, find the accrued interest at maturity for a ₦5,000 note (B5) issued 01/01/2026 (B2) at 4% (B4), settling 04/01/2026 (B3) using basis 1.",
      initialData: [["Item", "Value"], ["Issue", "2026-01-01"], ["Settlement", "2026-04-01"], ["Rate", 0.04], ["Par", 5000], ["Result", ""]],
      targetCell: [6, 1],
      expectedFormula: "ACCRINTM(B2,B3,B4,B5,1)",
      expectedValue: 49.31506849315068
    }
  },
  {
    id: "amordegrc",
    title: "Depreciation (French Declining Balance): AMORDEGRC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Depreciation (French Declining Balance with Coefficient): AMORDEGRC Function",
      description: "The AMORDEGRC function calculates depreciation for an asset using the French declining balance method, applying a coefficient to accelerate depreciation. It's specific to French accounting standards.",
      concept: "Think of it as the French tax depreciation engine: the depreciation rate accelerates based on asset life and a legally defined coefficient."
    },
    syntax: "=AMORDEGRC(cost, date_purchased, first_period, salvage, period, rate, [basis])",
    syntaxBreakdown: [
      { arg: "cost", desc: "Purchase cost of the asset." },
      { arg: "date_purchased", desc: "Date the asset was acquired." },
      { arg: "first_period", desc: "End date of the first depreciation period." },
      { arg: "salvage", desc: "Salvage value at end of life." },
      { arg: "period", desc: "The period for which to calculate depreciation (0-based)." },
      { arg: "rate", desc: "Depreciation rate." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    detailedExamples: [
      {
        title: "Example: Depreciating Office Equipment",
        table: {
          headers: ["Period", "Formula", "Depreciation"],
          rows: [
            ["0", "=AMORDEGRC(10000, DATE(2026,1,1), DATE(2026,12,31), 1000, 0, 0.2, 1)", "₦2,500"],
            ["1", "=AMORDEGRC(10000, DATE(2026,1,1), DATE(2026,12,31), 1000, 1, 0.2, 1)", "₦1,875"]
          ]
        },
        stepByStep: [
          "AMORDEGRC uses specific French coefficients based on asset life.",
          "Period 0 covers the first year.",
          "Depreciation is accelerated in early periods."
        ]
      }
    ],
    commonMistakes: [
      { title: "Period numbering.", desc: "Period 0 is the first period, not period 1." },
      { title: "LINC vs DEGRC.", desc: "Use AMORLINC for straight-line French depreciation." }
    ],
    proTips: [
      "AMORDEGRC is specific to French GAAP. For standard declining balance, use DB or DDB.",
      "The coefficient accelerates depreciation: shorter asset lives get higher coefficients."
    ],
    relatedFunctions: ["AMORLINC", "DB", "DDB"],
    miniChallenge: {
      question: "Is the first period in AMORDEGRC 0 or 1?",
      expectedAnswer: "0"
    },
    practice: {
      instructions: "In cell B2, calculate depreciation for period 0 for an asset costing 10000 (B2), purchased 01/01/2026 (B3), first period ends 12/31/2026 (B4), salvage 1000 (B5), rate 20% (B6), basis 1.",
      initialData: [["Item", "Value"], ["Cost", 10000], ["Date", "2026-01-01"], ["First Per", "2026-12-31"], ["Salvage", 1000], ["Rate", 0.2], ["Result", ""]],
      targetCell: [7, 1],
      expectedFormula: "AMORDEGRC(B2,B3,B4,B5,0,B6,1)",
      expectedValue: 2500
    }
  },
  {
    id: "amorlinc",
    title: "Depreciation (French Straight-Line): AMORLINC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Depreciation (French Straight-Line): AMORLINC Function",
      description: "The AMORLINC function calculates depreciation for an asset using the French straight-line method. It's the counterpart to AMORDEGRC but without the declining balance coefficient.",
      concept: "Think of it as the French linear depreciation tool: equal depreciation per accounting period, prorated for the first and last periods."
    },
    syntax: "=AMORLINC(cost, date_purchased, first_period, salvage, period, rate, [basis])",
    syntaxBreakdown: [
      { arg: "cost", desc: "Purchase cost." },
      { arg: "date_purchased", desc: "Acquisition date." },
      { arg: "first_period", desc: "End date of first depreciation period." },
      { arg: "salvage", desc: "Salvage value." },
      { arg: "period", desc: "Period number (0 = first)." },
      { arg: "rate", desc: "Depreciation rate." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    detailedExamples: [
      {
        title: "Example: Straight-Line Depreciation (French)",
        table: {
          headers: ["Period", "Formula", "Depreciation"],
          rows: [
            ["0", "=AMORLINC(10000, DATE(2026,1,1), DATE(2026,12,31), 1000, 0, 0.2, 1)", "₦2,000"],
            ["1", "=AMORLINC(10000, DATE(2026,1,1), DATE(2026,12,31), 1000, 1, 0.2, 1)", "₦2,000"]
          ]
        },
        stepByStep: [
          "AMORLINC applies straight-line depreciation: ₦10,000 * 20% = ₦2,000 per year.",
          "The first period may be prorated based on dates.",
          "The last period adjusts to reach the salvage value exactly."
        ]
      }
    ],
    commonMistakes: [
      { title: "Function confusion.", desc: "AMORLINC is straight-line; AMORDEGRC is declining balance." }
    ],
    proTips: [
      "Use AMORLINC for French GAAP reporting.",
      "For non-French straight-line, use the simpler SLN function."
    ],
    relatedFunctions: ["AMORDEGRC", "SLN"],
    miniChallenge: {
      question: "Which French depreciation function uses straight-line method?",
      expectedAnswer: "AMORLINC"
    },
    practice: {
      instructions: "In cell B2, calculate straight-line depreciation (French) for period 0 of a 10000 asset (B2).",
      initialData: [["Item", "Value"], ["Cost", 10000], ["Date", "2026-01-01"], ["First Per", "2026-12-31"], ["Salvage", 1000], ["Rate", 0.2], ["Result", ""]],
      targetCell: [7, 1],
      expectedFormula: "AMORLINC(B2,B3,B4,B5,0,B6,1)",
      expectedValue: 2000
    }
  },
  {
    id: "coupdaybs",
    title: "Days from Coupon Start: COUPDAYBS Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Days from Coupon Start to Settlement: COUPDAYBS Function",
      description: "The COUPDAYBS function returns the number of days from the beginning of the coupon period to the settlement date. It's used in bond pricing to calculate accrued interest.",
      concept: "Think of it as the 'days into the coupon period' counter: 'How many days have passed since the last coupon payment?'"
    },
    syntax: "=COUPDAYBS(settlement, maturity, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "frequency", desc: "Coupon payments per year (1, 2, or 4)." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    detailedExamples: [
      {
        title: "Example: Bond Accrued Interest Component",
        table: {
          headers: ["Detail", "Value"],
          rows: [
            ["Settlement", "15/03/2026"],
            ["Maturity", "01/01/2031"],
            ["Frequency", "2 (semi-annual)"],
            ["Basis", "1 (Actual/Actual)"],
            ["Result", "73"]
          ]
        },
        stepByStep: [
          "Semi-annual coupons mean payments on 1 Jan and 1 Jul.",
          "Settlement 15 Mar falls between these.",
          "Days from last coupon (1 Jan) to settlement (15 Mar) = 73 days."
        ]
      }
    ],
    commonMistakes: [
      { title: "Function confusion.", desc: "Don't confuse with COUPDAYS (total days) or COUPDAYSNC (days to next)." }
    ],
    proTips: [
      "COUPDAYBS is used in the formula: Accrued = (COUPDAYBS / COUPDAYS) * coupon payment."
    ],
    relatedFunctions: ["COUPDAYS", "COUPDAYSNC", "ACCRINT"],
    miniChallenge: {
      question: "Which function gives days from the last coupon payment to settlement?",
      expectedAnswer: "COUPDAYBS"
    },
    practice: {
      instructions: "In cell B2, find days from coupon start to settlement for dates in A2 and A3.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Days", ""]],
      targetCell: [2, 1],
      expectedFormula: "COUPDAYBS(B1,B2,2,1)",
      expectedValue: 73
    }
  },
  {
    id: "coupdays",
    title: "Total Days in Coupon Period: COUPDAYS Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Total Days in the Coupon Period: COUPDAYS Function",
      description: "The COUPDAYS function returns the total number of days in the coupon period containing the settlement date.",
      concept: "Think of it as the coupon period length: 'How many days are there from the last coupon date to the next coupon date?'"
    },
    syntax: "=COUPDAYS(settlement, maturity, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    detailedExamples: [
      {
        title: "Example: Bond Coupon Period Length",
        table: {
          headers: ["Detail", "Value"],
          rows: [
            ["Settlement", "15/03/2026"],
            ["Maturity", "01/01/2031"],
            ["Frequency", "2"],
            ["Basis", "1"],
            ["Result", "181"]
          ]
        },
        stepByStep: [
          "The semi-annual period containing 15 Mar 2026 runs 1 Jan to 1 Jul.",
          "Total days in that span = 181 (Actual/Actual)."
        ]
      }
    ],
    proTips: [
      "In 30/360 convention (basis 0), COUPDAYS always returns 360/frequency (e.g., 180 for semi-annual)."
    ],
    relatedFunctions: ["COUPDAYBS", "COUPDAYSNC"],
    miniChallenge: {
      question: "What is the return for COUPDAYS if frequency is 2 and basis is 0?",
      expectedAnswer: "180"
    },
    commonMistakes: [{ title: "Invalid Frequency", desc: "Frequency must be 1, 2, or 4." }],
    practice: {
      instructions: "In cell B2, find total days in coupon period for B1 and B2.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Total Days", ""]],
      targetCell: [2, 1],
      expectedFormula: "COUPDAYS(B1,B2,2,1)",
      expectedValue: 181
    }
  },
  {
    id: "coupdaysnc",
    title: "Days to Next Coupon: COUPDAYSNC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Days from Settlement to Next Coupon: COUPDAYSNC Function",
      description: "The COUPDAYSNC function returns the number of days from the settlement date to the next coupon date.",
      concept: "Think of it as the 'days remaining to next payment' counter: 'How many days until the bondholder's next interest payment?'"
    },
    syntax: "=COUPDAYSNC(settlement, maturity, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Days Until Next Coupon",
        table: {
          headers: ["Detail", "Value"],
          rows: [
            ["Settlement", "15/03/2026"],
            ["Maturity", "01/01/2031"],
            ["Result", "108"]
          ]
        },
        stepByStep: [
          "Next coupon is 1 Jul.",
          "From 15 Mar to 1 Jul = 108 days.",
          "Note: COUPDAYBS (73) + COUPDAYSNC (108) = COUPDAYS (181)."
        ]
      }
    ],
    relatedFunctions: ["COUPNCD", "COUPDAYS"],
    miniChallenge: {
      question: "True or False: COUPDAYSNC returns days remaining in the period.",
      expectedAnswer: "True"
    },
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Settlement vs Maturity", desc: "Settlement date must be before maturity date." }],
    proTips: ["Use this to find the exact number of days until your next interest payment."],
    practice: {
      instructions: "In cell B2, find days to next coupon for B1 and B2.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Days Left", ""]],
      targetCell: [2, 1],
      expectedFormula: "COUPDAYSNC(B1,B2,2,1)",
      expectedValue: 108
    }
  },
  {
    id: "coupncd",
    title: "Next Coupon Date: COUPNCD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Next Coupon Date After Settlement: COUPNCD Function",
      description: "The COUPNCD function returns the next coupon date after the settlement date for a bond.",
      concept: "Think of it as asking: 'When is the next interest payment due?'"
    },
    syntax: "=COUPNCD(settlement, maturity, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Finding Next Payment Date",
        table: {
          headers: ["Settlement", "Maturity", "Frequency", "Result"],
          rows: [
            ["15/03/2026", "01/01/2031", "2", "01/07/2026"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Serial numbers.", desc: "COUPNCD returns a serial number. Format the cell as Date to see it." }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    proTips: ["Format the result as a date to make it readable."],
    miniChallenge: { question: "What does NCD stand for in COUPNCD?", expectedAnswer: "Next Coupon Date" },
    practice: {
      instructions: "In cell B2, find the next coupon date.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Date", ""]],
      targetCell: [2, 1],
      expectedFormula: "COUPNCD(B1,B2,2,1)",
      expectedValue: "VALID"
    }
  },
  {
    id: "coupnum",
    title: "Number of Coupons: COUPNUM Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Number of Coupons Remaining: COUPNUM Function",
      description: "The COUPNUM function returns the number of coupon payments remaining between the settlement date and the maturity date.",
      concept: "Think of it as asking: 'How many interest payments are left on this bond?'"
    },
    syntax: "=COUPNUM(settlement, maturity, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Remaining Payments",
        table: {
          headers: ["Detail", "Value"],
          rows: [
            ["Settlement", "15/03/2026"],
            ["Maturity", "01/01/2031"],
            ["Frequency", "2"],
            ["Result", "10"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Frequency Error", desc: "Frequency must be 1, 2, or 4." }],
    proTips: ["Use this to estimate the total remaining interest income from a bond."],
    miniChallenge: { question: "How many coupons are left if a bond matures in 5 years with semi-annual payments?", expectedAnswer: "10" },
    practice: {
      instructions: "In cell B2, find the number of coupons left.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Count", ""]],
      targetCell: [2, 1],
      expectedFormula: "COUPNUM(B1,B2,2,1)",
      expectedValue: 10
    }
  },
  {
    id: "couppcd",
    title: "Previous Coupon Date: COUPPCD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Previous Coupon Date Before Settlement: COUPPCD Function",
      description: "The COUPPCD function returns the previous coupon date before the settlement date.",
      concept: "Think of it as asking: 'When was the last interest payment before I bought this bond?'"
    },
    syntax: "=COUPPCD(settlement, maturity, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Last Coupon Date",
        table: {
          headers: ["Settlement", "Maturity", "Result"],
          rows: [
            ["15/03/2026", "01/01/2031", "01/01/2026"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Date Formatting", desc: "Ensure the output cell is formatted as a Date." }],
    proTips: ["Use this to verify the last time interest was paid on a security."],
    miniChallenge: { question: "What does PCD stand for?", expectedAnswer: "Previous Coupon Date" },
    practice: {
      instructions: "In cell B2, find the previous coupon date.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Prev Date", ""]],
      targetCell: [2, 1],
      expectedFormula: "COUPPCD(B1,B2,2,1)",
      expectedValue: "VALID"
    }
  },
  {
    id: "cumipmt",
    title: "Cumulative Interest Paid: CUMIPMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Cumulative Interest Paid: CUMIPMT Function",
      description: "The CUMIPMT function calculates the cumulative interest paid on a loan between two specified periods.",
      concept: "Think of it as the interest cost calculator: 'How much interest will I pay between year 2 and year 5 of my mortgage?'"
    },
    syntax: "=CUMIPMT(rate, nper, pv, start_period, end_period, type)",
    detailedExamples: [
      {
        title: "Example: First Year Interest",
        description: "₦200,000 mortgage, 25 years, 4.5% annual rate.",
        table: {
          headers: ["Rate", "NPER", "PV", "Start", "End", "Type", "Interest Paid"],
          rows: [
            ["0.045/12", "300", "200000", "1", "12", "0", "-₦8,903.23"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Sign outflow.", desc: "Result is negative as it's a cash outflow." }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pv", desc: "Present value (loan amount)." },
      { arg: "start_period", desc: "First period in the calculation." },
      { arg: "end_period", desc: "Last period in the calculation." },
      { arg: "type", desc: "Timing of payment (0 = end, 1 = start)." }
    ],
    proTips: ["Great for calculating the total interest tax deduction for a specific year."],
    miniChallenge: { question: "Is the result of CUMIPMT usually positive or negative?", expectedAnswer: "Negative" },
    practice: {
      instructions: "In cell B2, calculate total interest for periods 1 to 12 of a ₦200k loan (B2) at 4.5%/12 (B1) over 300 months.",
      initialData: [["Rate", 0.00375], ["PV", 200000], ["Interest", ""]],
      targetCell: [2, 1],
      expectedFormula: "CUMIPMT(B1,300,B2,1,12,0)",
      expectedValue: -8903.23098555891
    }
  },
  {
    id: "cumprinc",
    title: "Cumulative Principal: CUMPRINC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Cumulative Principal Paid: CUMPRINC Function",
      description: "The CUMPRINC function calculates the cumulative principal paid on a loan between two specified periods.",
      concept: "Think of it as the equity builder: 'How much of my loan balance have I paid off between year 1 and year 5?'"
    },
    syntax: "=CUMPRINC(rate, nper, pv, start_period, end_period, type)",
    detailedExamples: [
      {
        title: "Example: Principal Paid in Year 1",
        table: {
          headers: ["Rate", "NPER", "PV", "Start", "End", "Principal"],
          rows: [
            ["0.045/12", "300", "200000", "1", "12", "-₦3,208.90"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pv", desc: "Present value (loan amount)." },
      { arg: "start_period", desc: "First period in the calculation." },
      { arg: "end_period", desc: "Last period in the calculation." },
      { arg: "type", desc: "Timing of payment (0 = end, 1 = start)." }
    ],
    commonMistakes: [{ title: "Sign Convention", desc: "Result is negative as it represents principal reduction." }],
    proTips: ["Use this to see how much equity you have built in an asset over time."],
    miniChallenge: { question: "Does CUMPRINC include interest?", expectedAnswer: "No, only principal." },
    practice: {
      instructions: "In cell B2, calculate total principal for periods 1 to 12.",
      initialData: [["Rate", 0.00375], ["PV", 200000], ["Principal", ""]],
      targetCell: [2, 1],
      expectedFormula: "CUMPRINC(B1,300,B2,1,12,0)",
      expectedValue: -3208.9009848731386
    }
  },
  {
    id: "db",
    title: "Fixed-Declining Depreciation: DB Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Fixed-Declining Balance Depreciation: DB Function",
      description: "The DB function calculates depreciation for a specified period using the fixed-declining balance method.",
      concept: "Think of it as the asset write-off accelerator: more depreciation in early years, less in later years."
    },
    syntax: "=DB(cost, salvage, life, period, [month])",
    detailedExamples: [
      {
        title: "Example: Depreciating Computer Equipment",
        description: "₦5,000 cost, ₦500 salvage, 5-year life.",
        table: {
          headers: ["Year", "Depreciation", "Book Value"],
          rows: [
            ["1", "₦1,845.00", "₦3,155.00"],
            ["2", "₦1,164.20", "₦1,990.80"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "cost", desc: "Initial cost of the asset." },
      { arg: "salvage", desc: "Value at the end of depreciation." },
      { arg: "life", desc: "Number of periods (years) the asset is depreciated." },
      { arg: "period", desc: "The period for which you want to calculate depreciation." },
      { arg: "month", desc: "Optional. Number of months in the first year (default 12)." }
    ],
    commonMistakes: [{ title: "Period out of range", desc: "The period cannot be greater than the life of the asset." }],
    proTips: ["Commonly used for tax purposes where accelerated depreciation is allowed."],
    miniChallenge: { question: "Does DB depreciation increase or decrease over time?", expectedAnswer: "Decrease" },
    practice: {
      instructions: "In cell B2, calculate depreciation for year 1 of 5000 asset (B2) with 500 salvage and 5 year life.",
      initialData: [["Item", "Value"], ["Cost", 5000], ["Year 1 Dep", ""]],
      targetCell: [2, 1],
      expectedFormula: "DB(B2,500,5,1)",
      expectedValue: 1845
    }
  },
  {
    id: "ddb",
    title: "Double-Declining Depreciation: DDB Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Double-Declining Balance Depreciation: DDB Function",
      description: "The DDB function calculates depreciation using the double-declining balance method (or a custom factor).",
      concept: "Think of it as the fastest depreciation method: write off more value in early years, less later."
    },
    syntax: "=DDB(cost, salvage, life, period, [factor])",
    detailedExamples: [
      {
        title: "Example: DDB Depreciation",
        table: {
          headers: ["Year", "DDB Depreciation", "SLN Depreciation"],
          rows: [
            ["1", "₦2,000.00", "₦900.00"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "cost", desc: "Initial cost of the asset." },
      { arg: "salvage", desc: "Value at the end of depreciation." },
      { arg: "life", desc: "Number of periods the asset is depreciated." },
      { arg: "period", desc: "The period for which you want to calculate depreciation." },
      { arg: "factor", desc: "Optional. Rate at which the balance declines (default 2 for double)." }
    ],
    commonMistakes: [{ title: "Salvage floor", desc: "DDB will not depreciate below the salvage value." }],
    proTips: ["You can change the 'factor' to adjust the acceleration speed."],
    miniChallenge: { question: "What is the default factor for DDB?", expectedAnswer: "2" },
    practice: {
      instructions: "In cell B2, find year 1 depreciation for ₦5000 asset (B2) with 500 salvage and 5 year life.",
      initialData: [["Item", "Value"], ["Cost", 5000], ["Dep", ""]],
      targetCell: [2, 1],
      expectedFormula: "DDB(B2,500,5,1)",
      expectedValue: 2000
    }
  },
  {
    id: "disc",
    title: "Security Discount Rate: DISC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Discount Rate for a Security: DISC Function",
      description: "The DISC function calculates the discount rate for a security sold at a discount to its redemption value.",
      concept: "Think of it as the implied interest rate: 'What annualised return does this discounted price represent?'"
    },
    syntax: "=DISC(settlement, maturity, pr, redemption, [basis])",
    detailedExamples: [
      {
        title: "Example: T-Bill Discount Rate",
        description: "90-day T-bill sold at ₦98.50 per ₦100.",
        table: {
          headers: ["Price", "Redemption", "Result"],
          rows: [
            ["98.50", "100", "6.09%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "pr", desc: "The security's price per ₦100 face value." },
      { arg: "redemption", desc: "The security's redemption value per ₦100 face value." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Basis Error", desc: "Using the wrong basis can significantly impact the yield/discount result." }],
    proTips: ["Useful for comparing the returns of various Treasury bills."],
    miniChallenge: { question: "Does DISC calculate the coupon rate?", expectedAnswer: "No, it calculates the discount rate." },
    practice: {
      instructions: "In cell B2, find the discount rate for 98.5 price (B1) with 100 redemption.",
      initialData: [["Price", 98.5], ["Rate", ""]],
      targetCell: [1, 1],
      expectedFormula: "DISC(DATE(2026,1,15),DATE(2026,4,15),B1,100,1)",
      expectedValue: 0.06083333333333333
    }
  },
  {
    id: "dollarde",
    title: "Fractional to Decimal: DOLLARDE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Convert Fractional Dollar to Decimal: DOLLARDE Function",
      description: "The DOLLARDE function converts a dollar price expressed as a fraction into a decimal dollar amount.",
      concept: "Think of it as the fraction-to-decimal translator: 'What is 101.16 (101 and 16/32) as a decimal?'"
    },
    syntax: "=DOLLARDE(fractional_dollar, fraction)",
    detailedExamples: [
      {
        title: "Example: Bond Price Conversion",
        table: {
          headers: ["Quote", "Denominator", "Decimal Price"],
          rows: [
            ["101.16", "32", "101.50"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "fractional_dollar", desc: "The number expressed as a fraction (e.g., 1.02 for 1 and 2/32)." },
      { arg: "fraction", desc: "The denominator of the fraction (e.g., 32)." }
    ],
    commonMistakes: [{ title: "Confusing notation", desc: "The decimal part is the numerator, not a standard decimal value." }],
    proTips: ["Essential for working with older bond quotes that still use 32nds or 16ths."],
    miniChallenge: { question: "What is 1.08 with a fraction of 32 as a decimal?", expectedAnswer: "1.25" },
    practice: {
      instructions: "In cell B2, convert 101.16 (B2) using denominator 32.",
      initialData: [["Quote", 101.16], ["Decimal", ""]],
      targetCell: [1, 1],
      expectedFormula: "DOLLARDE(B1,32)",
      expectedValue: 101.5
    }
  },
  {
    id: "dollarfr",
    title: "Decimal to Fractional: DOLLARFR Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Convert Decimal Dollar to Fractional: DOLLARFR Function",
      description: "The DOLLARFR function converts a decimal dollar amount into a fractional dollar price.",
      concept: "Think of it as the decimal-to-fraction translator: 'What is 101.50 as a bond quote in 32nds?'"
    },
    syntax: "=DOLLARFR(decimal_dollar, fraction)",
    detailedExamples: [
      {
        title: "Example: Decimal to Quote",
        table: {
          headers: ["Decimal", "Denominator", "Fractional Quote"],
          rows: [
            ["101.5", "32", "101.16"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "decimal_dollar", desc: "The decimal number you want to convert." },
      { arg: "fraction", desc: "The denominator you want to use (e.g., 32)." }
    ],
    commonMistakes: [{ title: "Interpretation", desc: "The result 1.08 means 1 and 8/denominator, not 1.08 decimal." }],
    proTips: ["Use this to convert decimal calculations back into standard market quotes."],
    miniChallenge: { question: "What is 1.25 converted to 32nds?", expectedAnswer: "1.08" },
    practice: {
      instructions: "In cell B2, convert 101.5 (B1) using 32.",
      initialData: [["Decimal", 101.5], ["Quote", ""]],
      targetCell: [1, 1],
      expectedFormula: "DOLLARFR(B1,32)",
      expectedValue: 101.16
    }
  },
  {
    id: "duration",
    title: "Macaulay Duration: DURATION Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Macaulay Duration of a Bond: DURATION Function",
      description: "The DURATION function calculates the Macaulay duration of a security — the weighted average time to receive all cash flows.",
      concept: "Think of it as the bond's timer: 'How long, on average, do I wait to get my money back?'"
    },
    syntax: "=DURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Bond Duration",
        table: {
          headers: ["Coupon", "Yield", "Duration"],
          rows: [
            ["5%", "4.5%", "4.49 years"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "coupon", desc: "The annual coupon rate." },
      { arg: "yld", desc: "The annual yield." },
      { arg: "frequency", desc: "Coupon payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Yield vs Coupon", desc: "Make sure you don't swap the coupon rate and the market yield." }],
    proTips: ["Higher coupons lead to lower durations because you get your money back faster."],
    miniChallenge: { question: "What unit is duration measured in?", expectedAnswer: "Years" },
    practice: {
      instructions: "In cell B2, find the duration.",
      initialData: [["Settlement", "2026-01-01"], ["Maturity", "2031-01-01"], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "DURATION(B1,B2,0.05,0.045,2,1)",
      expectedValue: 4.494191419409886
    }
  },
  {
    id: "effect",
    title: "Effective Interest Rate: EFFECT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Effective Annual Interest Rate: EFFECT Function",
      description: "The EFFECT function calculates the effective annual interest rate given a nominal rate and the number of compounding periods per year.",
      concept: "Think of it as the truth detector: 'The bank says 5% nominal compounded monthly — what's the actual annual rate I'm paying?'"
    },
    syntax: "=EFFECT(nominal_rate, npery)",
    detailedExamples: [
      {
        title: "Example: Compounding Impact",
        table: {
          headers: ["Nominal", "Periods", "Effective Rate"],
          rows: [
            ["5%", "12", "5.12%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "nominal_rate", desc: "The nominal interest rate." },
      { arg: "npery", desc: "The number of compounding periods per year." }
    ],
    commonMistakes: [{ title: "Periods error", desc: "Ensure npery is an integer greater than 0." }],
    proTips: ["The more compounding periods, the higher the effective rate will be."],
    miniChallenge: { question: "If compounding is annual, is EFFECT different from nominal?", expectedAnswer: "No" },
    practice: {
      instructions: "In cell B2, find the effective rate for 5% (B1) compounded monthly (12).",
      initialData: [["Nominal", 0.05], ["Effective", ""]],
      targetCell: [1, 1],
      expectedFormula: "EFFECT(B1,12)",
      expectedValue: 0.051161897881733
    }
  },
  {
    id: "fv",
    title: "Future Value: FV Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Future Value of an Investment: FV Function",
      description: "The FV function calculates the future value of an investment based on periodic, constant payments and a constant interest rate.",
      concept: "Think of it as the savings goal calculator: 'If I save ₦200 a month for 20 years, how much will I have?'"
    },
    syntax: "=FV(rate, nper, pmt, [pv], [type])",
    detailedExamples: [
      {
        title: "Example: Savings Growth",
        table: {
          headers: ["Monthly", "Years", "Rate", "Result"],
          rows: [
            ["-₦200", "20", "6%", "₦92,408.18"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pmt", desc: "Payment made each period." },
      { arg: "pv", desc: "Optional. Present value (initial lump sum)." },
      { arg: "type", desc: "Optional. 0 = end of period, 1 = start." }
    ],
    commonMistakes: [{ title: "Period mismatch", desc: "Annual rate with monthly payments will give a massive error. Divide rate by 12." }],
    proTips: ["Set PV to 0 if you are starting with no initial savings."],
    miniChallenge: { question: "Does a higher interest rate increase or decrease FV?", expectedAnswer: "Increase" },
    practice: {
      instructions: "In cell B2, find future value of saving ₦200/mo (B1) for 20 years at 6%/12.",
      initialData: [["PMT", -200], ["FV", ""]],
      targetCell: [1, 1],
      expectedFormula: "FV(0.06/12,240,B1,0,0)",
      expectedValue: 92408.1804818131
    }
  },
  {
    id: "fvschedule",
    title: "Flexible Growth: FVSCHEDULE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Future Value with Variable Rates: FVSCHEDULE Function",
      description: "The FVSCHEDULE function calculates the future value of a lump sum after applying a series of variable interest rates.",
      concept: "Think of it as the flexible growth calculator: 'My ₦10,000 will earn 5%, 3%, then 7% — what's the final value?'"
    },
    syntax: "=FVSCHEDULE(principal, schedule)",
    detailedExamples: [
      {
        title: "Example: Varying Returns",
        table: {
          headers: ["Principal", "Rates", "Future Value"],
          rows: [
            ["₦10,000", "{5%, 3%, 7%}", "₦11,572.05"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "principal", desc: "The initial value." },
      { arg: "schedule", desc: "An array or range of interest rates to apply." }
    ],
    commonMistakes: [{ title: "Schedule format", desc: "Ensure rates in the schedule are decimals (0.05) or percentages (5%)." }],
    proTips: ["Useful for accounts with promotional rates that change every few months."],
    miniChallenge: { question: "Can the schedule contain negative rates?", expectedAnswer: "Yes, representing a loss." },
    practice: {
      instructions: "In cell B2, find FV of 10000 (B2) with rates in A2:A4.",
      initialData: [["Rates", ""], [0.05, 10000], [0.03, ""], [0.07, ""]],
      targetCell: [1, 2],
      expectedFormula: "FVSCHEDULE(B2,A2:A4)",
      expectedValue: 11572.05
    }
  },
  {
    id: "intrate",
    title: "Simple Interest Rate: INTRATE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Interest Rate for a Fully Invested Security: INTRATE Function",
      description: "The INTRATE function calculates the interest rate (discount rate) for a security that pays interest only at maturity.",
      concept: "Think of it as the simple interest rate finder: 'What's the annualised rate on this zero-coupon instrument?'"
    },
    syntax: "=INTRATE(settlement, maturity, investment, redemption, [basis])",
    detailedExamples: [
      {
        title: "Example: CD Rate",
        table: {
          headers: ["Investment", "Redemption", "Rate"],
          rows: [
            ["₦9,750", "₦10,000", "5.13%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The settlement date." },
      { arg: "maturity", desc: "The maturity date." },
      { arg: "investment", desc: "The amount invested." },
      { arg: "redemption", desc: "The amount received at maturity." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Invalid dates", desc: "Maturity must be after settlement." }],
    proTips: ["Use this for instruments that don't pay periodic interest, only a final lump sum."],
    miniChallenge: { question: "Does INTRATE account for compounding?", expectedAnswer: "No, it's a simple annual rate." },
    practice: {
      instructions: "In cell B2, find the interest rate.",
      initialData: [["Invest", 9750], ["Redeem", 10000], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "INTRATE(DATE(2026,1,1),DATE(2026,7,1),B1,B2,1)",
      expectedValue: 0.05165745856353591
    }
  },
  {
    id: "ipmt",
    title: "Interest Component: IPMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Interest Payment for a Specific Period: IPMT Function",
      description: "The IPMT function calculates the interest portion of a loan payment for a given period.",
      concept: "Think of it as the interest microscope: 'How much of my 24th mortgage payment is interest?'"
    },
    syntax: "=IPMT(rate, per, nper, pv, [fv], [type])",
    detailedExamples: [
      {
        title: "Example: Shift in Interest",
        table: {
          headers: ["Payment #", "Interest Part"],
          rows: [
            ["1", "-₦750.00"],
            ["120", "-₦517.53"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "per", desc: "The specific period for which you want the interest." },
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pv", desc: "Present value (loan amount)." },
      { arg: "fv", desc: "Optional. Future value or cash balance desired." },
      { arg: "type", desc: "Optional. 0 = end, 1 = start." }
    ],
    commonMistakes: [{ title: "Period out of range", desc: "The 'per' must be between 1 and nper." }],
    proTips: ["IPMT decreases every month as you pay down the principal."],
    miniChallenge: { question: "In which period is IPMT the highest?", expectedAnswer: "Period 1" },
    practice: {
      instructions: "In cell B2, find the interest for payment 1 of ₦200k loan (B2) at 4.5%/12 (B1).",
      initialData: [["Rate", 0.00375], ["PV", 200000], ["Interest", ""]],
      targetCell: [2, 1],
      expectedFormula: "IPMT(B1,1,300,B2)",
      expectedValue: -750
    }
  },
  {
    id: "irr",
    title: "Profitability Rate: IRR Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Internal Rate of Return: IRR Function",
      description: "The IRR function calculates the internal rate of return for a series of cash flows — the discount rate that makes the net present value zero.",
      concept: "Think of it as the investment's rate of return: 'At what annual rate does this project break even in present value terms?'"
    },
    syntax: "=IRR(values, [guess])",
    detailedExamples: [
      {
        title: "Example: Project Returns",
        table: {
          headers: ["Project", "IRR"],
          rows: [
            ["A", "18.7%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "values", desc: "An array or range of cash flows (must include at least one negative and one positive)." },
      { arg: "guess", desc: "Optional. A number you think is close to the result." }
    ],
    commonMistakes: [{ title: "No solution", desc: "If cash flows don't change sign, IRR returns #NUM!." }],
    proTips: ["IRR assumes reinvestment at the IRR rate, which can be overly optimistic."],
    miniChallenge: { question: "What does IRR stand for?", expectedAnswer: "Internal Rate of Return" },
    practice: {
      instructions: "In cell B2, find the IRR of flows in A2:A7.",
      initialData: [["Flows", ""], [-50000, ""], [12000, ""], [15000, ""], [18000, ""], [22000, ""], [25000, ""]],
      targetCell: [1, 1],
      expectedFormula: "IRR(A2:A7)",
      expectedValue: 0.18706346765796695
    }
  },
  {
    id: "ispmt",
    title: "Level Principal Interest: ISPMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Interest Payment for a Specific Period (Level Principal): ISPMT Function",
      description: "The ISPMT function calculates the interest paid in a specific period for a loan with level principal payments (even principal reduction).",
      concept: "Think of it as the interest calculator for straight-line principal loans: 'What interest do I pay in year 3 when the principal is reduced evenly?'"
    },
    syntax: "=ISPMT(rate, per, nper, pv)",
    detailedExamples: [
      {
        title: "Example: Equal Principal",
        table: {
          headers: ["Year", "Interest Part"],
          rows: [
            ["0", "-₦600.00"],
            ["1", "-₦400.00"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate for the loan." },
      { arg: "per", desc: "The period for which you want to find the interest." },
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pv", desc: "Present value of the loan." }
    ],
    commonMistakes: [{ title: "Zero-based period", desc: "Unlike IPMT, ISPMT periods are 0-based (0 is the first period)." }],
    proTips: ["This is used for 'level principal' loans, which are less common than standard amortized loans."],
    miniChallenge: { question: "Is the first period in ISPMT 0 or 1?", expectedAnswer: "0" },
    practice: {
      instructions: "In cell B2, find interest for period 0.",
      initialData: [["Rate", 0.06], ["PV", 10000], ["Interest", ""]],
      targetCell: [2, 1],
      expectedFormula: "ISPMT(B1,0,3,B2)",
      expectedValue: -600
    }
  },
  {
    id: "mduration",
    title: "Modified Duration: MDURATION Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Modified Duration of a Bond: MDURATION Function",
      description: "The MDURATION function calculates the modified duration of a security — the percentage price change for a 1% change in yield.",
      concept: "Think of it as the interest rate risk gauge: 'If yields rise by 1%, how much will this bond's price fall?'"
    },
    syntax: "=MDURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Risk Sensitivity",
        table: {
          headers: ["Macaulay", "Modified"],
          rows: [
            ["4.49", "4.39"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "coupon", desc: "The annual coupon rate." },
      { arg: "yld", desc: "The annual yield." },
      { arg: "frequency", desc: "Coupon payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Yield required", desc: "MDURATION requires the yield to maturity, not just the coupon rate." }],
    proTips: ["Modified duration is the best measure of a bond's price volatility."],
    miniChallenge: { question: "If modified duration is 5, how much does price drop if rates rise 1%?", expectedAnswer: "5%" },
    practice: {
      instructions: "In cell B2, find modified duration.",
      initialData: [["Settlement", "2026-01-01"], ["Maturity", "2031-01-01"], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "MDURATION(B1,B2,0.05,0.045,2,1)",
      expectedValue: 4.395297231696711
    }
  },
  {
    id: "mirr",
    title: "Realistic Return: MIRR Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Modified Internal Rate of Return: MIRR Function",
      description: "The MIRR function calculates the modified internal rate of return, addressing two IRR limitations: multiple IRRs and the reinvestment rate assumption.",
      concept: "Think of it as the realistic IRR: 'What's the return when I account for borrowing costs and what I actually earn on reinvested cash?'"
    },
    syntax: "=MIRR(values, finance_rate, reinvest_rate)",
    detailedExamples: [
      {
        title: "Example: Borrowing and Reinvestment",
        table: {
          headers: ["IRR", "MIRR"],
          rows: [
            ["15.8%", "13.2%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "values", desc: "An array or range of cash flows." },
      { arg: "finance_rate", desc: "Interest rate paid on money used in the flows." },
      { arg: "reinvest_rate", desc: "Interest rate received on reinvested cash flows." }
    ],
    commonMistakes: [{ title: "Rate mismatch", desc: "Ensure your rates match the period of your cash flows." }],
    proTips: ["MIRR is generally considered more accurate than IRR for project evaluation."],
    miniChallenge: { question: "What does the M in MIRR stand for?", expectedAnswer: "Modified" },
    practice: {
      instructions: "In cell B2, find MIRR for flows in A2:A6 (Fin: 6%, Re: 8%).",
      initialData: [["Flows", ""], [-100000, ""], [30000, ""], [-20000, ""], [60000, ""], [80000, ""]],
      targetCell: [1, 1],
      expectedFormula: "MIRR(A2:A6,0.06,0.08)",
      expectedValue: 0.13209051871279092
    }
  },
  {
    id: "nominal",
    title: "Reverse Compounding: NOMINAL Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Nominal Annual Interest Rate: NOMINAL Function",
      description: "The NOMINAL function calculates the nominal annual interest rate given the effective rate and the number of compounding periods per year.",
      concept: "Think of it as the reverse-compounding calculator: 'The effective rate is 5.12% compounded monthly — what's the nominal rate?'"
    },
    syntax: "=NOMINAL(effect_rate, npery)",
    syntaxBreakdown: [
      { arg: "effect_rate", desc: "The effective interest rate." },
      { arg: "npery", desc: "Number of compounding periods per year." }
    ],
    commonMistakes: [{ title: "Periods mismatch", desc: "Ensure npery matches how often interest is actually compounded." }],
    proTips: ["Use this to find the base rate before compounding effects are added."],
    miniChallenge: { question: "Is nominal rate usually higher or lower than effective rate?", expectedAnswer: "Lower" },
    practice: {
      instructions: "In cell B2, find nominal rate for 5.12% (B1) with 12 periods.",
      initialData: [["Effective", 0.051161897881733], ["Nominal", ""]],
      targetCell: [1, 1],
      expectedFormula: "NOMINAL(B1,12)",
      expectedValue: 0.05
    }
  },
  {
    id: "nper",
    title: "Loan Term Finder: NPER Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Number of Periods: NPER Function",
      description: "The NPER function calculates the number of payment periods for an investment or loan based on constant payments and a constant interest rate.",
      concept: "Think of it as the 'how long?' calculator: 'How many months to pay off this loan if I pay ₦500 a month?'"
    },
    syntax: "=NPER(rate, pmt, pv, [fv], [type])",
    detailedExamples: [
      {
        title: "Example: Debt Payoff",
        table: {
          headers: ["Balance", "Rate", "Payment", "Months"],
          rows: [
            ["₦5,000", "18%", "-₦200", "31"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "pmt", desc: "Payment made each period." },
      { arg: "pv", desc: "Present value (loan amount)." },
      { arg: "fv", desc: "Optional. Future value." },
      { arg: "type", desc: "Optional. 0 = end, 1 = start." }
    ],
    commonMistakes: [{ title: "Infinite loop", desc: "If your interest rate is high and payment is too low, you'll never pay off the loan!" }],
    proTips: ["Useful for determining when you will reach a specific savings goal."],
    miniChallenge: { question: "What does NPER return if the goal is already met?", expectedAnswer: "0" },
    practice: {
      instructions: "In cell B2, find months to pay off ₦5000 (B2) at 18%/12 (B1) with ₦200 payments (B3).",
      initialData: [["Rate", 0.015], ["PV", 5000], ["PMT", -200], ["Months", ""]],
      targetCell: [3, 1],
      expectedFormula: "NPER(B1,B3,B2)",
      expectedValue: 31.033621424726244
    }
  },
  {
    id: "npv",
    title: "Value Creation Test: NPV Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Net Present Value: NPV Function",
      description: "The NPV function calculates the net present value of an investment using a discount rate and a series of future cash flows.",
      concept: "Think of it as the value-creation test: 'Are these future cash flows worth more than the initial investment in today's money?'"
    },
    syntax: "=NPV(rate, value1, [value2], ...)",
    commonMistakes: [
      { title: "Period 0.", desc: "Initial investment is period 0 and should be added OUTSIDE the NPV function." }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "Discount rate over the length of one period." },
      { arg: "value1, value2, ...", desc: "Cash flows (1 to 254) occurring at equal intervals." }
    ],
    proTips: ["NPV is positive? The investment is generally a good idea."],
    miniChallenge: { question: "What does NPV stand for?", expectedAnswer: "Net Present Value" },
    practice: {
      instructions: "In cell B2, find NPV of flows in A2:A6 at 10% (B1).",
      initialData: [["Rate", 0.1], ["Flows", ""], [25000, ""], [35000, ""], [45000, ""], [40000, ""], [30000, ""]],
      targetCell: [1, 1],
      expectedFormula: "NPV(B1,A2:A6)",
      expectedValue: 130914.36437142416
    }
  },
  {
    id: "oddfprice",
    title: "Odd First Price: ODDFPRICE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Price of a Bond with an Odd First Period: ODDFPRICE Function",
      description: "The ODDFPRICE function calculates the price per ₦100 face value of a security with an odd (short or long) first coupon period.",
      concept: "Think of it as the bond pricer for non-standard first periods: 'How much should I pay for this bond when the first coupon payment isn't a full period away?'"
    },
    syntax: "=ODDFPRICE(settlement, maturity, issue, first_coupon, rate, yld, redemption, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "issue", desc: "Issue date." },
      { arg: "first_coupon", desc: "First coupon date." },
      { arg: "rate", desc: "Interest rate." },
      { arg: "yld", desc: "Annual yield." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Date Logic", desc: "Issue < Settlement < First Coupon < Maturity." }],
    proTips: ["Essential for pricing new-issue bonds that don't align with standard calendars."],
    miniChallenge: { question: "What does ODDF stand for?", expectedAnswer: "Odd First (Period)" },
    practice: {
      instructions: "In cell B2, find the price.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "ODDFPRICE(B1,B2,DATE(2026,1,1),DATE(2026,7,1),0.05,0.045,100,2,1)",
      expectedValue: 102.66533083838275
    }
  },
  {
    id: "oddfyield",
    title: "Odd First Yield: ODDFYIELD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Yield of a Bond with an Odd First Period: ODDFYIELD Function",
      description: "The ODDFYIELD function calculates the yield of a security with an odd (short or long) first coupon period, given its price.",
      concept: "Think of it as the reverse of ODDFPRICE: 'I know the price — what yield does that imply for this bond with an irregular first coupon?'"
    },
    syntax: "=ODDFYIELD(settlement, maturity, issue, first_coupon, rate, pr, redemption, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "issue", desc: "Issue date." },
      { arg: "first_coupon", desc: "First coupon date." },
      { arg: "rate", desc: "Interest rate." },
      { arg: "pr", desc: "Price per ₦100 face value." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Price mismatch", desc: "Ensure price is per ₦100 par value." }],
    proTips: ["Use this to find the actual return on a bond with an irregular start."],
    miniChallenge: { question: "Does ODDFYIELD return a percentage or currency?", expectedAnswer: "Percentage" },
    practice: {
      instructions: "In cell B2, find the yield.",
      initialData: [["Settlement", "2026-03-15"], ["Maturity", "2031-01-01"], ["Yield", ""]],
      targetCell: [2, 1],
      expectedFormula: "ODDFYIELD(B1,B2,DATE(2026,1,1),DATE(2026,7,1),0.05,102.5,100,2,1)",
      expectedValue: 0.04386718750000004
    }
  },
  {
    id: "oddlprice",
    title: "Odd Last Price: ODDLPRICE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Price of a Bond with an Odd Last Period: ODDLPRICE Function",
      description: "The ODDLPRICE function calculates the price per ₦100 face value of a security with an odd (short or long) last coupon period.",
      concept: "Think of it as the bond pricer for non-standard final periods: 'How much for this bond when the last coupon period isn't exactly 6 months?'"
    },
    syntax: "=ODDLPRICE(settlement, maturity, last_interest, rate, yld, redemption, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "last_interest", desc: "Last interest date." },
      { arg: "rate", desc: "Interest rate." },
      { arg: "yld", desc: "Annual yield." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Last Interest Date", desc: "This must be the date of the last standard coupon payment." }],
    proTips: ["Used for bonds approaching maturity with a non-standard final window."],
    miniChallenge: { question: "What does ODDL stand for?", expectedAnswer: "Odd Last (Period)" },
    practice: {
      instructions: "In cell B2, find the price.",
      initialData: [["Settlement", "2026-06-15"], ["Maturity", "2030-12-31"], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "ODDLPRICE(B1,B2,DATE(2030,7,1),0.05,0.045,100,2,1)",
      expectedValue: 102.16480537449557
    }
  },
  {
    id: "oddlyield",
    title: "Odd Last Yield: ODDLYIELD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Yield of a Bond with an Odd Last Period: ODDLYIELD Function",
      description: "The ODDLYIELD function calculates the yield of a security with an odd (short or long) last coupon period, given its price.",
      concept: "Think of it as the reverse of ODDLPRICE: 'I know the price of this bond with an irregular final coupon — what's the yield?'"
    },
    syntax: "=ODDLYIELD(settlement, maturity, last_interest, rate, pr, redemption, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "Settlement date." },
      { arg: "maturity", desc: "Maturity date." },
      { arg: "last_interest", desc: "Last interest date." },
      { arg: "rate", desc: "Interest rate." },
      { arg: "pr", desc: "Price per ₦100 face value." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Yield to maturity", desc: "This calculates YTM for a non-standard final period." }],
    proTips: ["Compare this with standard YIELD to see the impact of the final period length."],
    miniChallenge: { question: "Is ODDLYIELD for the first or last period?", expectedAnswer: "Last" },
    practice: {
      instructions: "In cell B2, find the yield.",
      initialData: [["Settlement", "2026-06-15"], ["Maturity", "2030-12-31"], ["Yield", ""]],
      targetCell: [2, 1],
      expectedFormula: "ODDLYIELD(B1,B2,DATE(2030,7,1),0.05,103,100,2,1)",
      expectedValue: 0.042128906249999986
    }
  },
  {
    id: "pduration",
    title: "Compounding Timer: PDURATION Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Periods to Reach a Target Value: PDURATION Function",
      description: "The PDURATION function calculates the number of periods required for an investment to grow from a present value to a future value at a specified compound rate.",
      concept: "Think of it as the compounding timer: 'How many years for my ₦5,000 to become ₦10,000 at 7%?'"
    },
    syntax: "=PDURATION(rate, pv, fv)",
    detailedExamples: [
      {
        title: "Example: Time to Double",
        table: {
          headers: ["Start", "Target", "Rate", "Result"],
          rows: [
            ["₦5,000", "₦10,000", "7%", "10.24 years"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "rate", desc: "The interest rate per period." },
      { arg: "pv", desc: "The present value." },
      { arg: "fv", desc: "The desired future value." }
    ],
    commonMistakes: [{ title: "PV/FV Sign", desc: "Both PV and FV must be positive for PDURATION to work." }],
    proTips: ["This is the most direct way to answer 'How long until I hit my goal?'."],
    miniChallenge: { question: "What happens if PV > FV?", expectedAnswer: "PDURATION returns #NUM! unless rate is negative." },
    practice: {
      instructions: "In cell B2, find years to double 5000 (B1) at 7% (B2).",
      initialData: [["PV", 5000], ["Rate", 0.07], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "PDURATION(B2,B1,10000)",
      expectedValue: 10.244768351058694
    }
  },
  {
    id: "ppmt",
    title: "Principal Component: PPMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Principal Payment for a Specific Period: PPMT Function",
      description: "The PPMT function calculates the principal portion of a loan payment for a given period.",
      concept: "Think of it as the equity tracker: 'How much of my 36th car payment goes toward actually reducing the balance?'"
    },
    syntax: "=PPMT(rate, per, nper, pv, [fv], [type])",
    syntaxBreakdown: [
      { arg: "rate", desc: "Interest rate per period." },
      { arg: "per", desc: "The specific period for which you want the principal part." },
      { arg: "nper", desc: "Total number of periods." },
      { arg: "pv", desc: "Present value (loan amount)." },
      { arg: "fv", desc: "Optional. Future value." },
      { arg: "type", desc: "Optional. 0 = end, 1 = start." }
    ],
    commonMistakes: [{ title: "Per vs Nper", desc: "Make sure 'per' is not larger than 'nper'." }],
    proTips: ["PPMT increases every month as interest (IPMT) decreases."],
    miniChallenge: { question: "What is IPMT + PPMT equal to?", expectedAnswer: "PMT (Total Payment)" },
    practice: {
      instructions: "In cell B2, find principal for payment 1.",
      initialData: [["Rate", 0.00375], ["PV", 200000], ["Principal", ""]],
      targetCell: [2, 1],
      expectedFormula: "PPMT(B1,1,300,B2)",
      expectedValue: -361.4326555197022
    }
  },
  {
    id: "price",
    title: "Bond Price: PRICE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Price of a Bond (Periodic Coupons): PRICE Function",
      description: "The PRICE function calculates the price per ₦100 face value of a security that pays periodic interest (coupons).",
      concept: "Think of it as the bond valuation engine: 'Given the coupon, yield, and maturity, what should this bond cost?'"
    },
    syntax: "=PRICE(settlement, maturity, rate, yld, redemption, frequency, [basis])",
    detailedExamples: [
      {
        title: "Example: Corporate Bond",
        table: {
          headers: ["Coupon", "Yield", "Result"],
          rows: [
            ["4%", "3.5%", "₦102.26"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "rate", desc: "The annual coupon rate." },
      { arg: "yld", desc: "The annual yield." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "frequency", desc: "Payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Redemption value", desc: "Usually 100, but can vary for certain bond types." }],
    proTips: ["Price and Yield have an inverse relationship: when yields go up, prices go down."],
    miniChallenge: { question: "If yield equals coupon rate, what is the price?", expectedAnswer: "100" },
    practice: {
      instructions: "In cell B2, find the price.",
      initialData: [["Settlement", "2026-02-15"], ["Maturity", "2031-02-15"], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "PRICE(B1,B2,0.04,0.035,100,2,1)",
      expectedValue: 102.26477103859654
    }
  },
  {
    id: "pricedisc",
    title: "Discounted Price: PRICEDISC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Price of a Discounted Security: PRICEDISC Function",
      description: "The PRICEDISC function calculates the price per ₦100 face value of a security that pays no coupon and is sold at a discount.",
      concept: "Think of it as the T-bill pricer: 'What do I pay today for ₦100 at maturity?'"
    },
    syntax: "=PRICEDISC(settlement, maturity, discount, redemption, [basis])",
    detailedExamples: [
      {
        title: "Example: Treasury Bill",
        table: {
          headers: ["Discount", "Result"],
          rows: [
            ["5%", "₦98.77"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "discount", desc: "The security's discount rate." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Discount vs Yield", desc: "PRICEDISC uses a discount rate, not a yield to maturity." }],
    proTips: ["The primary tool for calculating the current cost of Treasury bills."],
    miniChallenge: { question: "What is the redemption value for T-bills?", expectedAnswer: "100" },
    practice: {
      instructions: "In cell B2, find the price for 5% discount (B1).",
      initialData: [["Discount", 0.05], ["Price", ""]],
      targetCell: [1, 1],
      expectedFormula: "PRICEDISC(DATE(2026,1,15),DATE(2026,4,15),B1,100,1)",
      expectedValue: 98.76712328767123
    }
  },
  {
    id: "pricemat",
    title: "At-Maturity Price: PRICEMAT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Price of a Security Paying at Maturity: PRICEMAT Function",
      description: "The PRICEMAT function calculates the price per ₦100 face value of a security that pays interest only at maturity.",
      concept: "Think of it as the 'all-at-maturity' bond pricer: 'What do I pay for a bond that pays all its interest at the end?'"
    },
    syntax: "=PRICEMAT(settlement, maturity, issue, rate, yld, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "issue", desc: "The security's issue date." },
      { arg: "rate", desc: "The annual coupon rate." },
      { arg: "yld", desc: "The annual yield." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Issue Date", desc: "PRICEMAT requires the issue date to calculate total interest at the end." }],
    proTips: ["Ideal for evaluating certificates of deposit (CDs) that pay everything at once."],
    miniChallenge: { question: "Does PRICEMAT calculate periodic interest?", expectedAnswer: "No, only at maturity." },
    practice: {
      instructions: "In cell B2, find the price.",
      initialData: [["Settlement", "2026-02-01"], ["Maturity", "2027-02-01"], ["Price", ""]],
      targetCell: [2, 1],
      expectedFormula: "PRICEMAT(B1,B2,DATE(2026,2,1),0.04,0.038,1)",
      expectedValue: 100.1926782273603
    }
  },
  {
    id: "rate",
    title: "Interest Rate: RATE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Interest Rate per Period: RATE Function",
      description: "The RATE function calculates the interest rate per period of an annuity based on constant payments.",
      concept: "Think of it as the rate detective: 'What interest rate makes these payments equal this loan amount?'"
    },
    syntax: "=RATE(nper, pmt, pv, [fv], [type], [guess])",
    detailedExamples: [
      {
        title: "Example: Car Loan Rate",
        table: {
          headers: ["Loan", "Payments", "Months", "Result"],
          rows: [
            ["₦15,000", "-₦350", "48", "7.06%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "nper", desc: "Total number of payment periods." },
      { arg: "pmt", desc: "Payment made each period." },
      { arg: "pv", desc: "Present value (total amount that a series of future payments is worth now)." },
      { arg: "fv", desc: "Optional. Future value." },
      { arg: "type", desc: "Optional. 0 = end, 1 = start." },
      { arg: "guess", desc: "Optional. Your guess for what the rate will be." }
    ],
    commonMistakes: [{ title: "#NUM! Error", desc: "If RATE doesn't converge after 20 iterations, try a different guess." }],
    proTips: ["The result is the rate per period. Multiply by 12 to get the annual rate for monthly loans."],
    miniChallenge: { question: "What error does RATE show if it can't find a solution?", expectedAnswer: "#NUM!" },
    practice: {
      instructions: "In cell B4, find monthly rate for ₦15k loan (B3) and 48 payments (B1) of ₦350 (B2).",
      initialData: [["NPER", 48], ["PMT", -350], ["PV", 15000], ["Rate", ""]],
      targetCell: [3, 1],
      expectedFormula: "RATE(B1,B2,B3)",
      expectedValue: 0.004838612140880193
    }
  },
  {
    id: "received",
    title: "Maturity Amount: RECEIVED Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Amount Received at Maturity: RECEIVED Function",
      description: "The RECEIVED function calculates the total amount received at maturity for a fully invested security.",
      concept: "Think of it as the maturity payoff calculator: 'If I invest ₦9,750 today, what do I get back at maturity?'"
    },
    syntax: "=RECEIVED(settlement, maturity, investment, discount, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "investment", desc: "The amount invested." },
      { arg: "discount", desc: "The security's discount rate." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Investment Sign", desc: "Unlike many financial functions, investment here is usually positive." }],
    proTips: ["Use this to find the final cash you'll have in hand when a zero-coupon bond expires."],
    miniChallenge: { question: "Does RECEIVED include coupon payments?", expectedAnswer: "No, it's for non-periodic securities." },
    practice: {
      instructions: "In cell B2, find amount received for 9750 invest (B1) and 5% disc.",
      initialData: [["Invest", 9750], ["Result", ""]],
      targetCell: [1, 1],
      expectedFormula: "RECEIVED(DATE(2026,1,1),DATE(2026,7,1),B1,0.05,1)",
      expectedValue: 10000.000000000002
    }
  },
  {
    id: "rri",
    title: "Growth Rate: RRI Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Equivalent Interest Rate for Growth: RRI Function",
      description: "The RRI function calculates the equivalent compound annual growth rate (CAGR) required for an investment to grow over time.",
      concept: "Think of it as the growth rate calculator: 'What annual return turns ₦5,000 into ₦10,000 in 8 years?'"
    },
    syntax: "=RRI(nper, pv, fv)",
    detailedExamples: [
      {
        title: "Example: CAGR",
        table: {
          headers: ["Start", "Final", "Years", "Result"],
          rows: [
            ["₦5,000", "₦10,000", "8", "9.05%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "nper", desc: "Total number of periods." },
      { arg: "pv", desc: "Present value." },
      { arg: "fv", desc: "Future value." }
    ],
    commonMistakes: [{ title: "Negative Results", desc: "If FV is less than PV, RRI will correctly show a negative growth rate." }],
    proTips: ["Best used to calculate the performance of a stock or investment over several years."],
    miniChallenge: { question: "What is another name for RRI?", expectedAnswer: "CAGR" },
    practice: {
      instructions: "In cell B2, find CAGR for 5000 (B1) to 10000 in 8 years.",
      initialData: [["PV", 5000], ["Result", ""]],
      targetCell: [1, 1],
      expectedFormula: "RRI(8,B1,10000)",
      expectedValue: 0.09050773266525765
    }
  },
  {
    id: "sln",
    title: "Straight-Line Depreciation: SLN Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Straight-Line Depreciation: SLN Function",
      description: "The SLN function calculates the straight-line depreciation of an asset for one period.",
      concept: "Think of it as the even-split depreciator: 'The asset loses the same value every year until it reaches salvage.'"
    },
    syntax: "=SLN(cost, salvage, life)",
    detailedExamples: [
      {
        title: "Example: Office Furniture",
        table: {
          headers: ["Cost", "Salvage", "Life", "Result"],
          rows: [
            ["₦12,000", "₦2,000", "10", "₦1,000"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "cost", desc: "Initial cost of the asset." },
      { arg: "salvage", desc: "Value at end of depreciation." },
      { arg: "life", desc: "Number of periods the asset is depreciated." }
    ],
    commonMistakes: [{ title: "Life zero", desc: "Asset life must be greater than 0." }],
    proTips: ["The simplest and most transparent method for depreciation."],
    miniChallenge: { question: "Is SLN depreciation higher in year 1 than year 5?", expectedAnswer: "No, it's equal." },
    practice: {
      instructions: "In cell B2, find annual dep for ₦12k asset (B2).",
      initialData: [["Item", "Value"], ["Cost", 12000], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "SLN(B2,2000,10)",
      expectedValue: 1000
    }
  },
  {
    id: "syd",
    title: "Sum-of-Years' Depreciation: SYD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Sum-of-Years' Digits Depreciation: SYD Function",
      description: "The SYD function calculates depreciation using the sum-of-years' digits method — an accelerated method.",
      concept: "Think of it as the weighted countdown: earlier years get a larger fraction of the depreciable amount."
    },
    syntax: "=SYD(cost, salvage, life, per)",
    detailedExamples: [
      {
        title: "Example: Car Depreciation",
        table: {
          headers: ["Year", "Depreciation"],
          rows: [
            ["1", "₦6,666.67"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "cost", desc: "Initial cost of the asset." },
      { arg: "salvage", desc: "Value at end of depreciation." },
      { arg: "life", desc: "Number of periods the asset is depreciated." },
      { arg: "per", desc: "The period for which you want to find the depreciation." }
    ],
    commonMistakes: [{ title: "Period mismatch", desc: "Ensure the period is between 1 and the life of the asset." }],
    proTips: ["SYD is a middle ground between straight-line and double-declining balance."],
    miniChallenge: { question: "What does SYD stand for?", expectedAnswer: "Sum of Years' Digits" },
    practice: {
      instructions: "In cell B2, find year 1 dep for ₦25k asset (B2).",
      initialData: [["Item", "Value"], ["Cost", 25000], ["Result", ""]],
      targetCell: [2, 1],
      expectedFormula: "SYD(B2,5000,5,1)",
      expectedValue: 6666.666666666667
    }
  },
  {
    id: "tbilleq",
    title: "Bond-Equivalent Yield: TBILLEQ Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "T-Bill Bond-Equivalent Yield: TBILLEQ Function",
      description: "The TBILLEQ function converts a T-bill discount rate into a bond-equivalent yield (BEY) for comparison.",
      concept: "Think of it as the yield translator: 'What's the equivalent bond yield of this T-bill discount rate?'"
    },
    syntax: "=TBILLEQ(settlement, maturity, discount)",
    detailedExamples: [
      {
        title: "Example: Compare Bill vs Bond",
        table: {
          headers: ["Discount", "Result"],
          rows: [
            ["4.8%", "4.98%"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "settlement", desc: "The settlement date." },
      { arg: "maturity", desc: "The maturity date." },
      { arg: "discount", desc: "The T-bill's discount rate." }
    ],
    commonMistakes: [{ title: "Date range", desc: "The maturity must be within one year of the settlement." }],
    proTips: ["Use BEY (Bond Equivalent Yield) to compare T-bills directly with standard coupon bonds."],
    miniChallenge: { question: "Is BEY usually higher or lower than the discount rate?", expectedAnswer: "Higher" },
    practice: {
      instructions: "In cell B2, find yield for 4.8% discount (B1).",
      initialData: [["Discount", 0.048], ["Yield", ""]],
      targetCell: [1, 1],
      expectedFormula: "TBILLEQ(DATE(2026,1,15),DATE(2026,7,15),B1)",
      expectedValue: 0.04988156073111082
    }
  },
  {
    id: "tbillprice",
    title: "T-Bill Price: TBILLPRICE Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "T-Bill Price: TBILLPRICE Function",
      description: "The TBILLPRICE function calculates the price per ₦100 face value for a Treasury bill given a discount rate.",
      concept: "Think of it as the T-bill pricer: 'What do I pay for a T-bill with this discount rate?'"
    },
    syntax: "=TBILLPRICE(settlement, maturity, discount)",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The settlement date." },
      { arg: "maturity", desc: "The maturity date." },
      { arg: "discount", desc: "The T-bill's discount rate." }
    ],
    commonMistakes: [{ title: "Over one year", desc: "TBILLPRICE only works for T-bills maturing within one year." }],
    proTips: ["Prices are always quoted per ₦100 of the face value."],
    miniChallenge: { question: "If discount is 0%, what is the T-bill price?", expectedAnswer: "100" },
    practice: {
      instructions: "In cell B2, find price for 5% discount (B1).",
      initialData: [["Discount", 0.05], ["Price", ""]],
      targetCell: [1, 1],
      expectedFormula: "TBILLPRICE(DATE(2026,1,15),DATE(2026,4,15),B1)",
      expectedValue: 98.75
    }
  },
  {
    id: "tbillyield",
    title: "T-Bill Yield: TBILLYIELD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "T-Bill Yield: TBILLYIELD Function",
      description: "The TBILLYIELD function calculates the yield of a Treasury bill given its price.",
      concept: "Think of it as the T-bill return calculator: 'What annual return will I earn on this T-bill?'"
    },
    syntax: "=TBILLYIELD(settlement, maturity, pr)",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The settlement date." },
      { arg: "maturity", desc: "The maturity date." },
      { arg: "pr", desc: "The T-bill's price per ₦100 face value." }
    ],
    commonMistakes: [{ title: "Invalid Price", desc: "Price must be greater than 0." }],
    proTips: ["Use this to find your actual annualized return after buying a T-bill at a certain price."],
    miniChallenge: { question: "Does TBILLYIELD return a percentage?", expectedAnswer: "Yes" },
    practice: {
      instructions: "In cell B2, find yield for 98.75 price (B1).",
      initialData: [["Price", 98.75], ["Yield", ""]],
      targetCell: [1, 1],
      expectedFormula: "TBILLYIELD(DATE(2026,1,15),DATE(2026,4,15),B1)",
      expectedValue: 0.05063291139240506
    }
  },
  {
    id: "vdb",
    title: "Variable Depreciation: VDB Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Variable Declining Balance Depreciation: VDB Function",
      description: "The VDB function calculates depreciation using the double-declining balance method with the ability to switch to straight-line when beneficial.",
      concept: "Think of it as the smart, flexible depreciator: 'Use accelerated depreciation, but switch to straight-line when it gives a higher deduction.'"
    },
    syntax: "=VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])",
    detailedExamples: [
      {
        title: "Example: Partial Year",
        table: {
          headers: ["Range", "Depreciation"],
          rows: [
            ["0-0.5", "₦2,000"]
          ]
        }
      }
    ],
    syntaxBreakdown: [
      { arg: "cost", desc: "Initial cost of the asset." },
      { arg: "salvage", desc: "Value at end of depreciation." },
      { arg: "life", desc: "Number of periods the asset is depreciated." },
      { arg: "start_period", desc: "The starting period for the calculation." },
      { arg: "end_period", desc: "The ending period for the calculation." },
      { arg: "factor", desc: "Optional. Rate of declining balance." },
      { arg: "no_switch", desc: "Optional. TRUE = do not switch to straight-line; FALSE = switch (default)." }
    ],
    commonMistakes: [{ title: "Start vs End", desc: "Start period must be less than end period." }],
    proTips: ["VDB is the most powerful depreciation function in Excel because it handles partial years and switches methods automatically."],
    miniChallenge: { question: "Can VDB calculate depreciation for half a year?", expectedAnswer: "Yes" },
    practice: {
      instructions: "In cell B2, find dep for first 6 months (0 to 0.5) of ₦10k asset (B2).",
      initialData: [["Item", "Value"], ["Cost", 10000], ["Dep", ""]],
      targetCell: [2, 1],
      expectedFormula: "VDB(B2,1000,5,0,0.5)",
      expectedValue: 2000
    }
  },
  {
    id: "xirr",
    title: "Irregular IRR: XIRR Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Internal Rate of Return for Irregular Cash Flows: XIRR Function",
      description: "The XIRR function calculates the internal rate of return for a schedule of cash flows occurring at irregular intervals.",
      concept: "Think of it as the real-world IRR: 'What's my annualised return when I invested and withdrew money on these specific dates?'"
    },
    syntax: "=XIRR(values, dates, [guess])",
    syntaxBreakdown: [
      { arg: "values", desc: "A series of cash flows that correspond to a schedule of dates." },
      { arg: "dates", desc: "A schedule of payment dates that correspond to the cash flow payments." },
      { arg: "guess", desc: "Optional. A guess at the result." }
    ],
    commonMistakes: [{ title: "Length mismatch", desc: "Values and Dates must have the exact same number of entries." }],
    proTips: ["XIRR is much more accurate than IRR for real-world projects where money comes and goes on random dates."],
    miniChallenge: { question: "Must the first date in XIRR be the earliest?", expectedAnswer: "No, but it's good practice." },
    practice: {
      instructions: "In cell C1, find IRR for flows in B1:B4 and dates in A1:A4.",
      initialData: [["2025-01-01", -10000, ""], ["2025-03-15", -5000, ""], ["2025-06-30", 2000, ""], ["2026-06-15", 20000, ""]],
      targetCell: [0, 2],
      expectedFormula: "XIRR(B1:B4,A1:A4)",
      expectedValue: 0.1878
    }
  },
  {
    id: "xnpv",
    title: "Irregular NPV: XNPV Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Net Present Value for Irregular Cash Flows: XNPV Function",
      description: "The XNPV function calculates the net present value of a schedule of cash flows occurring at irregular intervals.",
      concept: "Think of it as the real-world NPV: 'What's the present value of these cash flows, which don't happen at regular periods?'"
    },
    syntax: "=XNPV(rate, values, dates)",
    syntaxBreakdown: [
      { arg: "rate", desc: "The discount rate to apply to the cash flows." },
      { arg: "values", desc: "A series of cash flows that correspond to a schedule of dates." },
      { arg: "dates", desc: "A schedule of payment dates." }
    ],
    commonMistakes: [{ title: "Date format", desc: "Ensure dates are valid Excel date serial numbers or DATE function results." }],
    proTips: ["Use XNPV for any project with irregular cash flow timing to avoid massive calculation errors."],
    miniChallenge: { question: "Does XNPV require equal time intervals?", expectedAnswer: "No" },
    practice: {
      instructions: "In cell D1, find XNPV for 8% (A1) and flows in B1:B3, dates C1:C3.",
      initialData: [[0.08, -50000, "2026-01-01", ""], [0, 10000, "2026-04-15", ""], [0, 15000, "2026-10-01", ""]],
      targetCell: [0, 3],
      expectedFormula: "XNPV(A1,B1:B3,C1:C3)",
      expectedValue: -27638.6
    }
  },
  {
    id: "yield",
    title: "Bond Yield: YIELD Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Yield of a Bond (Periodic Coupons): YIELD Function",
      description: "The YIELD function calculates the yield to maturity of a security that pays periodic interest, given its price.",
      concept: "Think of it as the bond return calculator: 'If I pay ₦102.50 for this bond, what annual return will I earn?'"
    },
    syntax: "=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "rate", desc: "Annual coupon rate." },
      { arg: "pr", desc: "Security's price per ₦100 face value." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "frequency", desc: "Coupon payments per year." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Wrong frequency", desc: "Matching the frequency to the bond's actual payment schedule is critical." }],
    proTips: ["This calculates the Yield to Maturity (YTM), the most standard measure of bond performance."],
    miniChallenge: { question: "What is the return for YIELD if price is 100 and coupon is 5%?", expectedAnswer: "5%" },
    practice: {
      instructions: "In cell B2, find the yield.",
      initialData: [["Settlement", "2026-02-15"], ["Maturity", "2031-02-15"], ["Yield", ""]],
      targetCell: [2, 1],
      expectedFormula: "YIELD(B1,B2,0.04,102.5,100,2,1)",
      expectedValue: 0.03444458007812502
    }
  },
  {
    id: "yielddisc",
    title: "Discount Instrument Yield: YIELDDISC Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Yield of a Discounted Security: YIELDDISC Function",
      description: "The YIELDDISC function calculates the annual yield of a security sold at a discount (no coupon).",
      concept: "Think of it as the discount instrument return calculator: 'What annual return do I earn buying this at a discount?'"
    },
    syntax: "=YIELDDISC(settlement, maturity, pr, redemption, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "pr", desc: "Security's price per ₦100 face value." },
      { arg: "redemption", desc: "Redemption value per ₦100 face value." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Price too high", desc: "Price should generally be less than redemption for a discount security." }],
    proTips: ["Use this for zero-coupon bonds to find their effective annual yield."],
    miniChallenge: { question: "Is YIELDDISC for coupon-paying bonds?", expectedAnswer: "No" },
    practice: {
      instructions: "In cell B2, find yield for 95 price (B1) and 100 redemption.",
      initialData: [["Price", 95], ["Yield", ""]],
      targetCell: [1, 1],
      expectedFormula: "YIELDDISC(DATE(2026,1,1),DATE(2027,1,1),B1,100,1)",
      expectedValue: 0.05263157894736842
    }
  },
  {
    id: "yieldmat",
    title: "At-Maturity Yield: YIELDMAT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Yield of a Security Paying at Maturity: YIELDMAT Function",
      description: "The YIELDMAT function calculates the annual yield of a security that pays all interest at maturity.",
      concept: "Think of it as the all-at-maturity yield calculator: 'What's my annual return on this CD?'"
    },
    syntax: "=YIELDMAT(settlement, maturity, issue, rate, pr, [basis])",
    syntaxBreakdown: [
      { arg: "settlement", desc: "The security's settlement date." },
      { arg: "maturity", desc: "The security's maturity date." },
      { arg: "issue", desc: "The security's issue date." },
      { arg: "rate", desc: "The annual coupon rate." },
      { arg: "pr", desc: "The security's price per ₦100 face value." },
      { arg: "basis", desc: "Optional. Day-count basis." }
    ],
    commonMistakes: [{ title: "Maturity Interest", desc: "This is only for securities that pay interest at maturity, not periodically." }],
    proTips: ["Use this to compare at-maturity bonds with other investment options."],
    miniChallenge: { question: "Does YIELDMAT require a frequency argument?", expectedAnswer: "No" },
    practice: {
      instructions: "In cell B2, find yield for price 100 (B3).",
      initialData: [["Settlement", "2026-02-01"], ["Maturity", "2027-02-01"], ["Price", 100], ["Yield", ""]],
      targetCell: [3, 1],
      expectedFormula: "YIELDMAT(B1,B2,DATE(2026,2,1),0.04,B3,1)",
      expectedValue: 0.04
    }
  },
  {
    id: "pmt",
    title: "PMT Function",
    category: "financial",
    difficulty: "Advanced",
    xp: 400,
    introduction: {
      title: "Loan Mastery: The PMT Function",
      description: "The PMT function calculates the periodic payment for a loan based on constant payments and a constant interest rate.",
      concept: "Think of it as a budget planner. If you want to borrow ₦10,000 for a car at 5% interest over 3 years, PMT tells you exactly how much you need to pay each month."
    },
    internalLogic: "Excel uses the standard formula for an annuity: PMT = [P * i * (1+i)^n] / [(1+i)^n - 1].",
    whyItExists: "Calculating interest and principal split for monthly payments manually is mathematically complex. PMT automates this.",
    whenToUse: "Use PMT whenever you are calculating fixed payments for a loan or an investment.",
    realWorldUseCases: [
      "Calculating monthly mortgage payments.",
      "Determining monthly car loan installments.",
      "Analyzing business equipment lease payments."
    ],
    businessExample: {
      scenario: "A business wants to take a ₦50,000 loan at 6% annual interest over 5 years. How much will they pay monthly?",
      formula: "=PMT(6%/12, 5*12, 50000)"
    },
    syntax: "=PMT(rate, nper, pv, [fv], [type])",
    syntaxBreakdown: [
      { arg: "rate", desc: "The interest rate for the loan. Divide by 12 for monthly." },
      { arg: "nper", desc: "Total number of payments. Years * 12 for monthly." },
      { arg: "pv", desc: "Present Value (loan amount)." }
    ],
    detailedExamples: [
      {
        title: "Example: Monthly Car Loan",
        table: {
          headers: ["Loan Amount", "Annual Rate", "Years", "Monthly Payment"],
          rows: [
            ["20000", "4.5%", "5", "₦372.86"]
          ]
        }
      }
    ],
    commonMistakes: [
      { title: "Mixing Units.", desc: "If payments are monthly, your rate MUST be monthly (rate/12)." }
    ],
    relatedFunctions: ["IPMT", "PPMT", "NPER", "RATE"],
    proTips: ["The result is negative because it represents a cash outflow from your pocket."],
    miniChallenge: { question: "What function calculates the principal part of a PMT?", expectedAnswer: "PPMT" },
    practice: {
      instructions: "In cell B5, calculate the monthly payment for a ₦10,000 loan (B2) at 5% annual interest (B3) over 3 years (B4).",
      initialData: [["Setting", "Value"], ["Loan", 10000], ["Rate", 0.05], ["Years", 3], ["Monthly PMT", ""]],
      targetCell: [4, 1],
      expectedFormula: "PMT(B3/12,B4*12,B2)",
      expectedValue: -299.7089710798221
    }
  }
];
