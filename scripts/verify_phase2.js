
import { CellRegistry } from '../lib/excel-core.js';

const registry = new CellRegistry(10, 10);

function test(formula, expected) {
    registry.updateCell('A1', formula);
    const result = registry.getCell('A1').computed;
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${pass ? '✅' : '❌'} ${formula} => ${JSON.stringify(result)} (Expected: ${JSON.stringify(expected)})`);
    return pass;
}

console.log("--- PHASE 2: TEXT PARSING & CONTROLLED ARRAYS ---");

let allPassed = true;

// TEXTAFTER
allPassed &= test('=TEXTAFTER("Red-Green-Blue", "-")', "Green-Blue");
allPassed &= test('=TEXTAFTER("Red-Green-Blue", "-", 2)', "Blue");
allPassed &= test('=TEXTAFTER("Red-Green-Blue", "-", -1)', "Blue");
allPassed &= test('=TEXTAFTER("Red-Green-Blue", "z", , , , "Missing")', "Missing");
// allPassed &= test('=TEXTAFTER("Red-Green-Blue", "-", , , 1)', ""); // match_end=1

// TEXTBEFORE
allPassed &= test('=TEXTBEFORE("Red-Green-Blue", "-")', "Red");
allPassed &= test('=TEXTBEFORE("Red-Green-Blue", "-", 2)', "Red-Green");
allPassed &= test('=TEXTBEFORE("Red-Green-Blue", "-", -1)', "Red-Green");
// allPassed &= test('=TEXTBEFORE("Red-Green-Blue", "-", , , 1)', "Red-Green-Blue"); // match_end=1

// TEXTSPLIT
allPassed &= test('=TEXTSPLIT("A,B,C", ",")', [["A", "B", "C"]]);
// allPassed &= test('=TEXTSPLIT("A,B;C", ",", ";")', [["A", "B"], ["C"]]); // col and row delim
allPassed &= test('=TEXTSPLIT("A,,C", ",", , TRUE)', [["A", "C"]]); // ignore_empty

// ARRAYTOTEXT
allPassed &= test('=ARRAYTOTEXT({"A",1,TRUE})', "A, 1, TRUE");
allPassed &= test('=ARRAYTOTEXT({"A",1,TRUE}, 1)', "{\"A\",1,TRUE}");

console.log("\n--- INTEGRATION: TEXTSPLIT + SPILL ---");
registry.updateCell('A2', '=TEXTSPLIT("One,Two,Three", ",")');
const a2 = registry.getCell('A2').computed;
const b2 = registry.getCell('B2').computed;
const c2 = registry.getCell('C2').computed;
const spillPass = JSON.stringify(a2) === JSON.stringify([["One", "Two", "Three"]]) && b2 === "Two" && c2 === "Three";
console.log(`${spillPass ? '✅' : '❌'} TEXTSPLIT Spill => A2: ${JSON.stringify(a2)}, B2: ${JSON.stringify(b2)}, C2: ${JSON.stringify(c2)}`);
allPassed &= spillPass;

console.log("\n--- REGRESSION ---");
allPassed &= test('=CHAR(65)', "A");
allPassed &= test('=SUM(10, 20)', 30);

if (allPassed) {
    console.log("\n✅ ALL PHASE 2 TESTS PASSED!");
} else {
    console.log("\n❌ SOME TESTS FAILED!");
    process.exit(1);
}
