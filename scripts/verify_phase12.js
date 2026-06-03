/**
 * Phase 12 Verification Script: Bond and Securities Functions
 */

import { CellRegistry } from '../lib/excel-core.js';

const registry = new CellRegistry();

const testCases = [
    // --- PRICE & YIELD ---
    {
        formula: 'PRICE("2008-02-15", "2017-11-15", 0.0575, 0.065, 100, 2, 0)',
        expected: 94.63,
        tolerance: 0.1,
        label: 'PRICE Basic'
    },
    {
        formula: 'YIELD("2008-02-15", "2017-11-15", 0.0575, 95.04, 100, 2, 0)',
        expected: 0.0645,
        tolerance: 0.001,
        label: 'YIELD Basic'
    },

    // --- DURATION ---
    {
        formula: 'DURATION("2008-01-01", "2016-01-01", 0.08, 0.09, 2, 1)',
        expected: 5.99,
        tolerance: 0.1,
        label: 'DURATION Basic'
    },
    {
        formula: 'MDURATION("2008-01-01", "2016-01-01", 0.08, 0.09, 2, 1)',
        expected: 5.73,
        tolerance: 0.1,
        label: 'MDURATION Basic'
    },

    // --- TREASURY BILLS ---
    {
        formula: 'TBILLPRICE("1999-03-31", "1999-06-01", 0.0913)',
        expected: 98.43,
        tolerance: 0.1,
        label: 'TBILLPRICE Basic'
    },
    {
        formula: 'TBILLYIELD("1999-03-31", "1999-06-01", 98.45)',
        expected: 0.0914,
        tolerance: 0.001,
        label: 'TBILLYIELD Basic'
    },

    // --- OTHER SECURITIES ---
    {
        formula: 'DISC("1999-01-25", "1999-06-15", 97.975, 100, 0)',
        expected: 0.052,
        tolerance: 0.001,
        label: 'DISC Basic'
    },
    {
        formula: 'RECEIVED("1999-02-15", "1999-05-15", 1000000, 0.0575, 0)',
        expected: 1014584.65,
        tolerance: 0.1,
        label: 'RECEIVED Basic'
    },
    {
        formula: 'ACCRINT("2008-03-01", "2008-08-31", "2008-05-01", 0.1, 1000, 2, 0)',
        expected: 16.6666,
        tolerance: 0.01,
        label: 'ACCRINT Basic'
    },
    {
        formula: 'TBILLEQ("1999-03-31", "1999-06-01", 0.0913)',
        expected: 0.09404,
        tolerance: 0.0001,
        label: 'TBILLEQ Basic'
    }
];

async function runTests() {
    console.log('--- Phase 12: Bond and Securities Functions Verification ---\n');
    let passed = 0;

    for (const test of testCases) {
        try {
            const formula = test.formula.startsWith('=') ? test.formula : '=' + test.formula;
            registry.updateCell('A1', formula);
            const result = registry.getCell('A1').computed;

            let success = false;
            if (typeof test.expected === 'string' && test.expected.startsWith('#')) {
                success = result === test.expected;
            } else {
                success = Math.abs(result - test.expected) <= (test.tolerance || 1e-9);
            }

            if (success) {
                console.log(`✅ [PASS] ${test.label}: ${test.formula} = ${result}`);
                passed++;
            } else {
                console.error(`❌ [FAIL] ${test.label}: ${test.formula}`);
                console.error(`   Expected: ${test.expected}, Got: ${result}`);
            }
        } catch (e) {
            console.error(`💥 [ERROR] ${test.label}: ${e.message}`);
        }
    }

    console.log(`\nVerification Complete: ${passed}/${testCases.length} tests passed.`);
    process.exit(passed === testCases.length ? 0 : 1);
}

runTests();
