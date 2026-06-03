
import { CellRegistry } from '../lib/excel-core.js';

const registry = new CellRegistry(20, 10);

function test(formula, expected, tolerance = 1e-9) {
    registry.updateCell('A1', formula);
    const result = registry.getCell('A1').computed;

    const isClose = (a, b) => {
        if (typeof a !== typeof b) return false;
        if (typeof a === 'number') return Math.abs(a - b) < tolerance;
        if (Array.isArray(a)) {
            if (a.length !== b.length) return false;
            return a.every((v, i) => isClose(v, b[i]));
        }
        return JSON.stringify(a) === JSON.stringify(b);
    };

    const pass = isClose(result, expected);
    console.log(`${pass ? '✅' : '❌'} ${formula} => ${JSON.stringify(result)} (Expected: ${JSON.stringify(expected)})`);
    return pass;
}

console.log("--- PHASE 8: REGRESSION & FORECASTING ---");

let allPassed = true;

// 1. FORECAST (Simple linear: y = 2x + 1)
// x: 1, 2, 3 -> y: 3, 5, 7.  For x=4, y=9.
allPassed &= test('=FORECAST(4, {3,5,7}, {1,2,3})', 9);

// 2. LINEST (Simple linear: y = 2x + 1)
// Returns [m, b] -> [2, 1]
allPassed &= test('=LINEST({3,5,7}, {1,2,3})', [[2, 1]]);

// 3. TREND (Simple linear: y = 2x + 1)
// For x=4, 5 -> y: 9, 11
allPassed &= test('=TREND({3;5;7}, {1;2;3}, {4;5})', [[9], [11]]);

// 4. LOGEST (Exponential: y = 2 * 3^x)
// x: 1, 2, 3 -> y: 6, 18, 54. Returns [m, b] -> [3, 2]
allPassed &= test('=LOGEST({6,18,54}, {1,2,3})', [[3, 2]]);

// 5. GROWTH (Exponential: y = 2 * 3^x)
// For x=4 -> y: 2 * 3^4 = 2 * 81 = 162
allPassed &= test('=GROWTH({6,18,54}, {1,2,3}, {4})', [[162]]);

// 6. Multi-variable LINEST
// y = 2*x1 + 3*x2 + 5
// x1: 1, 2, 3
// x2: 0, 2, 1 (Changed to avoid collinearity with x1 and const)
// y: (2*1+3*0+5)=7, (2*2+3*2+5)=15, (2*3+3*1+5)=14
allPassed &= test('=LINEST({7;15;14}, {1,0; 2,2; 3,1})', [[3, 2, 5]]);

// 7. LINEST with stats
// Just verify it returns 5 rows and r2 is 1 for perfect fit
registry.updateCell('A1', '=LINEST({3,5,7}, {1,2,3}, TRUE, TRUE)');
const linestStats = registry.getCell('A1').computed;
const statsPass = Array.isArray(linestStats) && linestStats.length === 5 && Math.abs(linestStats[2][0] - 1) < 1e-9;
console.log(`${statsPass ? '✅' : '❌'} LINEST with stats check (Perfect fit R2=1)`);
allPassed &= statsPass;

// 8. Singular Matrix handling
// y = x1 + x2, but x1 and x2 are same (collinear)
// x1: 1, 2, 3
// x2: 1, 2, 3
allPassed &= test('=LINEST({2,4,6}, {1,1; 2,2; 3,3})', "#NUM!");

console.log("\n--- STABILITY & PERFORMANCE ---");
// Larger dataset
const largeY = Array(100).fill(0).map((_, i) => [i * 2 + 1]);
const largeX = Array(100).fill(0).map((_, i) => [i]);

// Manually populate cells to avoid literal limit and spill issues in test script
for(let i=0; i<100; i++) {
    registry.updateCell(`B${i+1}`, largeY[i][0]);
    registry.updateCell(`C${i+1}`, largeX[i][0]);
}

const start = Date.now();
registry.updateCell('D1', '=LINEST(B1:B100, C1:C100)');
const perfRes = registry.getCell('D1').computed;
const perfPass = Array.isArray(perfRes) && Math.abs(perfRes[0][0] - 2) < 1e-9 && Math.abs(perfRes[0][1] - 1) < 1e-9;
console.log(`${perfPass ? '✅' : '❌'} Large LINEST => ${JSON.stringify(perfRes)}`);
allPassed &= perfPass;
console.log(`Performance: 100-row regression took ${Date.now() - start}ms`);

if (allPassed) {
    console.log("\n✅ ALL PHASE 8 TESTS PASSED!");
} else {
    console.log("\n❌ SOME TESTS FAILED!");
    process.exit(1);
}
