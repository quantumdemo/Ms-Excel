/**
 * Phase 11 Verification Script: Financial Advanced Functions
 * Tests: RRI, PDURATION, FVSCHEDULE, ISPMT, XNPV, XIRR
 */

import { CellRegistry } from '../lib/excel-core.js';

const registry = new CellRegistry();

const testCases = [
    // --- Medium Complexity ---
    { formula: 'RRI(8, 10000, 20000)', expected: 0.0905077, tolerance: 1e-6, label: 'RRI Basic' },
    { formula: 'PDURATION(0.05, 1000, 2000)', expected: 14.206699, tolerance: 1e-6, label: 'PDURATION Basic' },
    { formula: 'FVSCHEDULE(1, {0.09, 0.11, 0.1})', expected: 1.33089, tolerance: 1e-5, label: 'FVSCHEDULE Basic' },
    { formula: 'ISPMT(0.1, 1, 3, 1000)', expected: -100, tolerance: 1e-5, label: 'ISPMT Year 1' },
    { formula: 'ISPMT(0.1, 2, 3, 1000)', expected: -66.666667, tolerance: 1e-5, label: 'ISPMT Year 2' },

    // --- High Complexity (XNPV / XIRR) ---
    // Note: Dates in serial format or strings that can be parsed
    {
        formula: 'XNPV(0.09, {-10000, 2750, 4250, 3250, 2750}, {"2008-01-01", "2008-03-01", "2008-10-30", "2009-02-15", "2009-04-01"})',
        expected: 2086.65,
        tolerance: 0.01,
        label: 'XNPV Basic'
    },
    {
        formula: 'XIRR({-10000, 2750, 4250, 3250, 2750}, {"2008-01-01", "2008-03-01", "2008-10-30", "2009-02-15", "2009-04-01"})',
        expected: 0.37336,
        tolerance: 1e-4,
        label: 'XIRR Basic'
    },

    // --- Error Cases ---
    { formula: 'RRI(0, 100, 200)', expected: '#NUM!', label: 'RRI Zero NPER' },
    { formula: 'PDURATION(-0.05, 100, 200)', expected: '#NUM!', label: 'PDURATION Negative Rate' },
    { formula: 'XIRR({1000, 2000}, {"2020-01-01", "2021-01-01"})', expected: '#NUM!', label: 'XIRR No Sign Change' },

    // --- Regression ---
    { formula: 'PMT(0.08/12, 10*12, 5000)', expected: -60.6638, tolerance: 0.01, label: 'PMT Regression' },
    { formula: 'PV(0.08/12, 10*12, -60.66)', expected: 4999.68, tolerance: 0.1, label: 'PV Regression' },
    { formula: 'FV(0.06/12, 10, -200, -500, 1)', expected: 2581.40, tolerance: 0.01, label: 'FV Regression' }
];

async function runTests() {
    console.log('--- Phase 11: Financial Advanced Functions Verification ---\n');
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
