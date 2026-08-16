import { computePivotTable, generatePivotSheetGrid, evaluateAggregation, resolveField } from '../lib/pivot-engine.js';
import { parseNaturalLanguagePivotIntent } from '../app/api/ai/coach/route.js';

const mockDataset = [
  { Region: 'Lagos', Product: 'Laptop', Quantity: 10, Sales: 1000, Profit: 200, 'Order ID': 101, 'Customer ID': 'CUST_A', 'Order Date': '2024-01-15' },
  { Region: 'Lagos', Product: 'Phone', Quantity: 20, Sales: 600, Profit: 100, 'Order ID': 102, 'Customer ID': 'CUST_B', 'Order Date': '2024-01-20' },
  { Region: 'Lagos', Product: 'Laptop', Quantity: 7, Sales: 700, Profit: 140, 'Order ID': 103, 'Customer ID': 'CUST_A', 'Order Date': '2024-02-10' },
  { Region: 'Abuja', Product: 'Laptop', Quantity: 15, Sales: 1500, Profit: 300, 'Order ID': 104, 'Customer ID': 'CUST_C', 'Order Date': '2024-01-18' },
  { Region: 'Abuja', Product: 'Phone', Quantity: 5, Sales: 150, Profit: 30, 'Order ID': 105, 'Customer ID': 'CUST_D', 'Order Date': '2024-02-05' },
  { Region: 'Ibadan', Product: 'Phone', Quantity: 8, Sales: 240, Profit: 48, 'Order ID': 106, 'Customer ID': 'CUST_E', 'Order Date': '2024-02-14' },
];

const headers = ['Region', 'Product', 'Quantity', 'Sales', 'Profit', 'Order ID', 'Customer ID', 'Order Date'];

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

  console.log(`--- TEST RESULTS: ${passed}/${total} PASSED ---`);
}

runTests();
