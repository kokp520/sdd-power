const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { scanProjectPattern } = require('../../scripts/utils/analysis.cjs');

// Mock directory structure for testing
const testRoot = path.join(__dirname, 'test_project');

function setupTestProject() {
  if (!fs.existsSync(testRoot)) fs.mkdirSync(testRoot, { recursive: true });
}

function teardownTestProject() {
  if (fs.existsSync(testRoot)) {
    fs.rmSync(testRoot, { recursive: true, force: true });
  }
}

async function runTests() {
  try {
    console.log('Running Task 1 tests...');
    setupTestProject();
    
    // Test case 1: Detect Internal/Pkg Structure
    fs.mkdirSync(path.join(testRoot, 'internal'));
    const patterns = scanProjectPattern(testRoot);
    assert.ok(patterns.includes('Internal/Pkg Structure'), 'Should detect Internal/Pkg Structure');
    
    console.log('✅ Task 1 tests passed');
  } catch (error) {
    console.error('❌ Task 1 tests failed:', error.message);
    process.exit(1);
  } finally {
    teardownTestProject();
  }
}

runTests();
