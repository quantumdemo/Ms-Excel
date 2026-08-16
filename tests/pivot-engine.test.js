import { computePivotTable, generatePivotSheetGrid, evaluateAggregation, resolveField } from '../lib/pivot-engine.js';
import { parseNaturalLanguagePivotIntent } from '../app/api/ai/coach/route.js';

// Primary Example Dataset
const mockDataset = [
  { Region: 'Lagos', Product: 'Laptop', Quantity: 10, Sales: 1000, Profit: 200, 'Order ID': 101, 'Customer ID': 'CUST_A', 'Order Date': '2024-01-15' },
  { Region: 'Lagos', Product: 'Phone', Quantity: 20, Sales: 600, Profit: 100, 'Order ID': 102, 'Customer ID': 'CUST_B', 'Order Date': '2024-01-20' },
  { Region: 'Lagos', Product: 'Laptop', Quantity: 7, Sales: 700, Profit: 140, 'Order ID': 103, 'Customer ID': 'CUST_A', 'Order Date': '2024-02-10' },
  { Region: 'Abuja', Product: 'Laptop', Quantity: 15, Sales: 1500, Profit: 300, 'Order ID': 104, 'Customer ID': 'CUST_C', 'Order Date': '2024-01-18' },
  { Region: 'Abuja', Product: 'Phone', Quantity: 5, Sales: 150, Profit: 30, 'Order ID': 105, 'Customer ID': 'CUST_D', 'Order Date': '2024-02-05' },
  { Region: 'Ibadan', Product: 'Phone', Quantity: 8, Sales: 240, Profit: 48, 'Order ID': 106, 'Customer ID': 'CUST_E', 'Order Date': '2024-02-14' },
];

const headers = ['Region', 'Product', 'Quantity', 'Sales', 'Profit', 'Order ID', 'Customer ID', 'Order Date'];

// Required Test Dataset from Prompt
const testPromptDataset = [
  { Product: 'Apple', Price: 100, Quantity: 10, Region: 'East' },
  { Product: 'Apple', Price: 150, Quantity: 20, Region: 'West' },
  { Product: 'Banana', Price: 200, Quantity: 15, Region: 'East' },
  { Product: 'Banana', Price: 100, Quantity: 5, Region: 'West' },
  { Product: 'Cherry', Price: 300, Quantity: 25, Region: 'North' },
];
const promptHeaders = ['Product', 'Price', 'Quantity', 'Region'];

// Dynamic Schema Dataset A
const datasetA = [
  { Department: 'Engineering', Employee: 'Alice', Salary: 120000, Location: 'Lagos' },
  { Department: 'Engineering', Employee: 'Bob', Salary: 140000, Location: 'Abuja' },
  { Department: 'Marketing', Employee: 'Charlie', Salary: 90000, Location: 'Lagos' },
  { Department: 'Marketing', Employee: 'David', Salary: 110000, Location: 'Ibadan' },
];
const headersA = ['Department', 'Employee', 'Salary', 'Location'];

// Dynamic Schema Dataset B
const datasetB = [
  { Student: 'Eve', Class: 'Grade 10', Score: 95, Subject: 'Math' },
  { Student: 'Frank', Class: 'Grade 10', Score: 88, Subject: 'Math' },
  { Student: 'Grace', Class: 'Grade 10', Score: 92, Subject: 'Science' },
];
const headersB = ['Student', 'Class', 'Score', 'Subject'];

// Dynamic Schema Dataset C (Different Column Ordering)
const datasetC = [
  { Revenue: '$1,500', City: 'Kano', Item: 'Widget A', Units: 50 },
  { Revenue: '$2,500', City: 'Kano', Item: 'Widget B', Units: 70 },
  { Revenue: '$3,000', City: 'Port Harcourt', Item: 'Widget A', Units: 100 },
];
const headersC = ['Revenue', 'City', 'Item', 'Units'];

function runTests() {
  console.log('--- STARTING PIVOT ENGINE SCENARIO TEST SUITE ---');
  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      passed++;
      console.log(`✅ [PASS] ${testName}`);
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      process.exitCode = 1;
    }
  }

  // TEST 1: Total quantity by region
  {
    const intent = parseNaturalLanguagePivotIntent("Total quantity by region", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['ROW_TOTAL__Quantity__SUM'] === 37, 'TEST 1: Total quantity by region (Lagos = 37)');
    assert(res.grandTotalValues['OVERALL__Quantity__SUM'] === 65, 'TEST 1: Grand Total quantity = 65');
  }

  // TEST 2: Average quantity by region
  {
    const intent = parseNaturalLanguagePivotIntent("Average quantity by region", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    const abujaRow = res.dataRows.find(r => r.tuple[0] === 'Abuja');
    assert(abujaRow && abujaRow.values['ROW_TOTAL__Quantity__AVERAGE'] === 10, 'TEST 2: Average quantity by region (Abuja = 10)');
  }

  // TEST 3: Maximum sales by product
  {
    const intent = parseNaturalLanguagePivotIntent("Maximum sales by product", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    const laptopRow = res.dataRows.find(r => r.tuple[0] === 'Laptop');
    assert(laptopRow && laptopRow.values['ROW_TOTAL__Sales__MAX'] === 1500, 'TEST 3: Maximum sales by product (Laptop = 1500)');
  }

  // TEST 4: Minimum profit by region
  {
    const intent = parseNaturalLanguagePivotIntent("Minimum profit by region", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['ROW_TOTAL__Profit__MIN'] === 100, 'TEST 4: Minimum profit by region (Lagos = 100)');
  }

  // TEST 5: Count orders by region
  {
    const intent = parseNaturalLanguagePivotIntent("Count orders by region", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['ROW_TOTAL__Order ID__COUNT'] === 3, 'TEST 5: Count orders by region (Lagos = 3)');
  }

  // TEST 6: Number of unique customers by region
  {
    const intent = parseNaturalLanguagePivotIntent("Number of unique customers by region", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['ROW_TOTAL__Customer ID__COUNTUNIQUE'] === 2, 'TEST 6: Unique customers in Lagos (Cust_A, Cust_B = 2)');
  }

  // TEST 7: Show sales by region and product
  {
    const intent = parseNaturalLanguagePivotIntent("Show sales by region and product", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, columns: intent.columns, values: intent.values });
    assert(res.columns.length === 1 && res.columns[0].field === 'Product', 'TEST 7: Column dimension set to Product');
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['Laptop__Sales__SUM'] === 1700, 'TEST 7: Lagos Laptop Sales = 1700');
  }

  // TEST 8: Show total sales and average profit by region
  {
    const res = computePivotTable({
      records: mockDataset,
      headers,
      rows: ['Region'],
      values: [
        { field: 'Sales', aggregation: 'SUM' },
        { field: 'Profit', aggregation: 'AVERAGE' }
      ]
    });
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['ROW_TOTAL__Sales__SUM'] === 2300, 'TEST 8: Total sales in Lagos = 2300');
    assert(lagosRow && Math.round(lagosRow.values['ROW_TOTAL__Profit__AVERAGE']) === 147, 'TEST 8: Average profit in Lagos = 147');
  }

  // TEST 9: Show total sales by region for laptops only
  {
    const intent = parseNaturalLanguagePivotIntent("Show total sales by region for laptops only", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values, filters: intent.filters });
    assert(res.totalRecordsEvaluated === 3, 'TEST 9: Filtered to 3 Laptop records');
    const lagosRow = res.dataRows.find(r => r.tuple[0] === 'Lagos');
    assert(lagosRow && lagosRow.values['ROW_TOTAL__Sales__SUM'] === 1700, 'TEST 9: Lagos Laptop Sales = 1700');
  }

  // TEST 10: Show sales by month
  {
    const intent = parseNaturalLanguagePivotIntent("Show sales by month", headers);
    const res = computePivotTable({ records: mockDataset, headers, rows: intent.rows, values: intent.values });
    assert(res.rows[0].dateGroupFunc === 'MONTH', 'TEST 10: Extracted Month date grouping');
    const janRow = res.dataRows.find(r => r.tuple[0].startsWith('Jan'));
    assert(janRow && janRow.values['ROW_TOTAL__Sales__SUM'] === 3100, 'TEST 10: January Sales = 3100');
  }

  // PROMPT REQUIRED TEST DATASET TESTS:
  {
    // Product + Price + SUM => Apple: 250, Banana: 300, Cherry: 300, Grand Total: 850
    const res = computePivotTable({ records: testPromptDataset, headers: promptHeaders, rows: ['Product'], values: [{ field: 'Price', aggregation: 'SUM' }] });
    const grid = generatePivotSheetGrid(res);
    assert(grid[2][1] === 'Sum of Price', 'Prompt Test: Header is Sum of Price');
    assert(grid[3][1] === 250, 'Prompt Test: Apple Sum of Price = 250');
    assert(grid[4][1] === 300, 'Prompt Test: Banana Sum of Price = 300');
    assert(grid[5][1] === 300, 'Prompt Test: Cherry Sum of Price = 300');
    assert(grid[6][1] === 850, 'Prompt Test: Grand Total Sum of Price = 850');
  }

  {
    // Product + Quantity + SUM => Apple: 30, Banana: 20, Cherry: 25, Grand Total: 75
    const res = computePivotTable({ records: testPromptDataset, headers: promptHeaders, rows: ['Product'], values: [{ field: 'Quantity', aggregation: 'SUM' }] });
    const grid = generatePivotSheetGrid(res);
    assert(grid[3][1] === 30, 'Prompt Test: Apple Sum of Quantity = 30');
    assert(grid[4][1] === 20, 'Prompt Test: Banana Sum of Quantity = 20');
    assert(grid[5][1] === 25, 'Prompt Test: Cherry Sum of Quantity = 25');
    assert(grid[6][1] === 75, 'Prompt Test: Grand Total Sum of Quantity = 75');
  }

  {
    // Product + Price + AVERAGE => Apple: 125, Banana: 150, Cherry: 300, Grand Total: 170
    const res = computePivotTable({ records: testPromptDataset, headers: promptHeaders, rows: ['Product'], values: [{ field: 'Price', aggregation: 'AVERAGE' }] });
    const grid = generatePivotSheetGrid(res);
    assert(grid[3][1] === 125, 'Prompt Test: Apple Average Price = 125');
    assert(grid[4][1] === 150, 'Prompt Test: Banana Average Price = 150');
    assert(grid[5][1] === 300, 'Prompt Test: Cherry Average Price = 300');
    assert(grid[6][1] === 170, 'Prompt Test: Grand Total Average Price = 170');
  }

  {
    // Region + Quantity + SUM => East: 25, West: 25, North: 25, Grand Total: 75
    const res = computePivotTable({ records: testPromptDataset, headers: promptHeaders, rows: ['Region'], values: [{ field: 'Quantity', aggregation: 'SUM' }] });
    const grid = generatePivotSheetGrid(res);
    const eastRow = grid.find(r => r[0] === 'East');
    const westRow = grid.find(r => r[0] === 'West');
    const northRow = grid.find(r => r[0] === 'North');
    const grandRow = grid.find(r => r[0] === 'Grand Total');
    assert(eastRow && eastRow[1] === 25, 'Prompt Test: East Sum Quantity = 25');
    assert(westRow && westRow[1] === 25, 'Prompt Test: West Sum Quantity = 25');
    assert(northRow && northRow[1] === 25, 'Prompt Test: North Sum Quantity = 25');
    assert(grandRow && grandRow[1] === 75, 'Prompt Test: Grand Total Sum Quantity = 75');
  }

  // DYNAMIC SCHEMA DATASET TESTS:
  {
    // Dataset A: Average salary by department
    const intent = parseNaturalLanguagePivotIntent("Average salary by department", headersA);
    const res = computePivotTable({ records: datasetA, headers: headersA, rows: intent.rows, values: intent.values });
    const grid = generatePivotSheetGrid(res);
    const engRow = grid.find(r => r[0] === 'Engineering');
    assert(engRow && engRow[1] === 130000, 'Dataset A: Engineering Average Salary = 130,000');
  }

  {
    // Dataset B: Maximum score by subject
    const intent = parseNaturalLanguagePivotIntent("Maximum score by subject", headersB);
    const res = computePivotTable({ records: datasetB, headers: headersB, rows: intent.rows, values: intent.values });
    const grid = generatePivotSheetGrid(res);
    const mathRow = grid.find(r => r[0] === 'Math');
    assert(mathRow && mathRow[1] === 95, 'Dataset B: Math Max Score = 95');
  }

  {
    // Dataset C: Total revenue by city (Reordered columns with formatted revenue e.g. "$1,500")
    const intent = parseNaturalLanguagePivotIntent("Total revenue by city", headersC);
    const res = computePivotTable({ records: datasetC, headers: headersC, rows: intent.rows, values: intent.values });
    const grid = generatePivotSheetGrid(res);
    const kanoRow = grid.find(r => r[0] === 'Kano');
    assert(kanoRow && kanoRow[1] === 4000, 'Dataset C: Kano Total Revenue = 4000 (Parsed from $1,500 + $2,500)');
  }

  console.log(`--- TEST RESULTS: ${passed}/${total} PASSED ---`);
}

runTests();
