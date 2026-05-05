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
    fs.mkdirSync(path.join(testRoot, 'internal'), { recursive: true });
    let patterns = scanProjectPattern(testRoot);
    assert.ok(patterns.includes('Internal/Pkg Structure'), 'Should detect Internal/Pkg Structure');
    
    // Test case 2: Detect CLI Command Structure
    fs.mkdirSync(path.join(testRoot, 'cmd'), { recursive: true });
    patterns = scanProjectPattern(testRoot);
    assert.ok(patterns.includes('CLI Command Structure'), 'Should detect CLI Command Structure');

    // Test case 3: Detect Web and PDM patterns
    fs.mkdirSync(path.join(testRoot, 'src'), { recursive: true });
    fs.writeFileSync(path.join(testRoot, 'package.json'), '{}');
    fs.writeFileSync(path.join(testRoot, 'go.mod'), 'module test');
    patterns = scanProjectPattern(testRoot);
    assert.ok(patterns.includes('Web Application Structure'), 'Should detect Web Application Structure');
    assert.ok(patterns.includes('Node.js Project (package.json)'), 'Should detect package.json');
    assert.ok(patterns.includes('Go Module (go.mod)'), 'Should detect go.mod');
    
    console.log('✅ All tests passed');
  } catch (error) {
    console.error('❌ Task 1 tests failed:', error.message);
    process.exit(1);
  } finally {
    teardownTestProject();
  }
}

runTests();
