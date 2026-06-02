
import { CellRegistry } from '../lib/excel-core.js';

const registry = new CellRegistry(10, 10);

function test(formula, expected) {
    registry.updateCell('A1', formula);
    const result = registry.getCell('A1').computed;
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? '✅' : '❌'} ${formula} => ${JSON.stringify(result)} (Expected: ${JSON.stringify(expected)})`);
    return pass;
}

console.log("--- PHASE 3: ARRAY STRUCTURE & MANIPULATION ---");

let allPassed = true;

// TRANSPOSE
allPassed &= test('=TRANSPOSE({1,2;3,4})', [[1, 3], [2, 4]]);
allPassed &= test('=TRANSPOSE({1,2,3})', [[1], [2], [3]]);

// SEQUENCE
allPassed &= test('=SEQUENCE(2, 3)', [[1, 2, 3], [4, 5, 6]]);
allPassed &= test('=SEQUENCE(3, 1, 10, -1)', [[10], [9], [8]]);

// CHOOSECOLS
allPassed &= test('=CHOOSECOLS({1,2,3;4,5,6}, 1, 3)', [[1, 3], [4, 6]]);
allPassed &= test('=CHOOSECOLS({1,2,3;4,5,6}, -1)', [[3], [6]]);

// CHOOSEROWS
allPassed &= test('=CHOOSEROWS({1,2,3;4,5,6}, 2)', [[4, 5, 6]]);
allPassed &= test('=CHOOSEROWS({1,2,3;4,5,6}, -1)', [[4, 5, 6]]);

// SORT
allPassed &= test('=SORT({3;1;2})', [[1], [2], [3]]);
allPassed &= test('=SORT({1, "B"; 2, "A"}, 2, -1)', [[1, "B"], [2, "A"]]); // Sort by 2nd col descending

console.log("\n--- INTEGRATION: PHASE 3 SPILL ---");
const spill_registry = new CellRegistry(10, 10);
spill_registry.updateCell('A2', '=SEQUENCE(2, 2)');
const a2_comp = spill_registry.getCell('A2').computed;
const b2_comp = spill_registry.getCell('B2').computed;
const a3_comp = spill_registry.getCell('A3').computed;
const b3_comp = spill_registry.getCell('B3').computed;
const spillPass = JSON.stringify(a2_comp) === JSON.stringify([[1, 2], [3, 4]]) &&
                  b2_comp === 2 &&
                  a3_comp === 3 &&
                  b3_comp === 4;
console.log(`${spillPass ? '✅' : '❌'} SEQUENCE Spill => A2: ${JSON.stringify(a2_comp)}, B2: ${b2_comp}, A3: ${a3_comp}, B3: ${b3_comp}`);
allPassed &= spillPass;

console.log("\n--- REGRESSION ---");
allPassed &= test('=TEXTJOIN("-", TRUE, "A", "B")', "A-B");
allPassed &= test('=TEXTAFTER("A.B.C", ".", 2)', "C");

if (allPassed) {
    console.log("\n✅ ALL PHASE 3 TESTS PASSED!");
} else {
    console.log("\n❌ SOME TESTS FAILED!");
    process.exit(1);
}
