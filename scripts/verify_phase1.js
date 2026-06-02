
import { CellRegistry } from '../lib/excel-core.js';

const registry = new CellRegistry(10, 10);

function test(formula, expected) {
    registry.updateCell('A1', formula);
    const result = registry.getCell('A1').computed;
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? '✅' : '❌'} ${formula} => ${JSON.stringify(result)} (Expected: ${JSON.stringify(expected)})`);
    return pass;
}

console.log("--- PHASE 1: TEXT & FORMATTING (ENHANCED) ---");

let allPassed = true;

// CHAR
allPassed &= test('=CHAR(65)', "A");
allPassed &= test('=CHAR(255)', "ÿ");

// CODE
allPassed &= test('=CODE("Apple")', 65);

// REPT
allPassed &= test('=REPT("*-", 3)', "*-*-*-");

// T
allPassed &= test('=T("Text")', "Text");
allPassed &= test('=T(123)', "");

// FIXED & DOLLAR: Rounding Away From Zero
allPassed &= test('=FIXED(1.5, 0)', "2");
allPassed &= test('=FIXED(-1.5, 0)', "-2");
allPassed &= test('=DOLLAR(1234.567, 2)', "$1,234.57");
allPassed &= test('=DOLLAR(-1.5, 0)', "-$2");

// TEXT: Coercion
allPassed &= test('=TEXT("123.456", "0.00")', "123.46");

// TEXT: # vs 0
allPassed &= test('=TEXT(1.2, "0.00")', "1.20");
allPassed &= test('=TEXT(1.2, "0.##")', "1.2");
allPassed &= test('=TEXT(1.234, "0.##")', "1.23");

// TEXT: Blanks
registry.updateCell('B1', '');
allPassed &= test('=TEXT(B1, "0")', "0");

// TEXT: Percent
allPassed &= test('=TEXT(0.123, "0%")', "12%");

console.log("\n--- REGRESSION TESTING ---");
allPassed &= test('=SUM(1, 2, 3)', 6);
allPassed &= test('=IF(TRUE, "Yes", "No")', "Yes");

if (allPassed) {
    console.log("\n✅ ALL TESTS PASSED!");
} else {
    console.log("\n❌ SOME TESTS FAILED!");
    process.exit(1);
}
