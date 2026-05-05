const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { analyzeContext } = require('../../scripts/steps/analyze_context.cjs');

const testRoot = path.join(__dirname, 'test_project_task3');

function setup() {
  if (!fs.existsSync(testRoot)) fs.mkdirSync(testRoot, { recursive: true });
  const sddDir = path.join(testRoot, '.sdd');
  if (!fs.existsSync(sddDir)) fs.mkdirSync(sddDir, { recursive: true });
}

function teardown() {
  if (fs.existsSync(testRoot)) {
    fs.rmSync(testRoot, { recursive: true, force: true });
  }
}

async function runTests() {
  try {
    console.log('Running Task 3 tests...');
    setup();

    // Test Case 1: Detect Strict Mode via Keywords
    const specContent = 'This is a major REFACTOR of the auth system.';
    fs.writeFileSync(path.join(testRoot, '.sdd/SPEC.md'), specContent);
    
    // Create some dummy files to find
    fs.writeFileSync(path.join(testRoot, 'auth_service.go'), '');
    
    const state = await analyzeContext(testRoot);
    
    assert.strictEqual(state.mode, 'strict', 'Should switch to strict mode');
    assert.ok(state.context.relatedFiles.includes('auth_service.go'), 'Should find related files');
    assert.ok(state.context.analysis.foundKeywords.includes('refactor'), 'Should identify keywords');

    // Test Case 2: Normal Mode
    fs.writeFileSync(path.join(testRoot, '.sdd/SPEC.md'), 'Add a simple hello feature.');
    const state2 = await analyzeContext(testRoot);
    assert.strictEqual(state2.mode, 'guided', 'Should stay in guided mode for simple specs');

    console.log('✅ Task 3 tests passed');
  } catch (error) {
    console.error('❌ Task 3 tests failed:', error.message);
    process.exit(1);
  } finally {
    teardown();
  }
}

runTests();
