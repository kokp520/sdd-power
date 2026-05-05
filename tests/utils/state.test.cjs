const assert = require('assert');
const { loadState, saveState } = require('../../scripts/utils/state.cjs');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, 'temp_project');

function setup() {
  if (fs.existsSync(projectRoot)) {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
  fs.mkdirSync(projectRoot, { recursive: true });
}

function teardown() {
  if (fs.existsSync(projectRoot)) {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

async function runTests() {
  try {
    console.log('Running state.cjs tests...');
    setup();

    const state = loadState(projectRoot);
    assert.strictEqual(state.mode, 'guided', 'Default mode should be guided');
    assert.deepStrictEqual(state.context, {}, 'Default context should be an empty object');

    console.log('✅ state.cjs tests passed');
  } catch (error) {
    console.error('❌ state.cjs tests failed:', error.message);
    process.exit(1);
  } finally {
    teardown();
  }
}

runTests();
