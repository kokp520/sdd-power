const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { runPipeline } = require('../scripts/engine.cjs');

const projectRoot = path.join(__dirname, 'temp_project_engine');

function setup() {
  if (fs.existsSync(projectRoot)) {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(projectRoot, '.sdd'), { recursive: true });
  
  // Mock config
  const config = {
    pipeline: [
      { name: 'Step1', require_approval: true }
    ]
  };
  fs.writeFileSync(path.join(projectRoot, '.sdd/config.json'), JSON.stringify(config));
}

function teardown() {
  if (fs.existsSync(projectRoot)) {
    fs.rmSync(projectRoot, { recursive: true, force: true });
  }
}

async function runTests() {
  try {
    console.log('Running engine.cjs context tests...');
    setup();

    const logs = [];
    const originalLog = console.log;
    console.log = (msg) => logs.push(msg);

    try {
      // In engine.cjs, runPipeline is called immediately if imported as main,
      // but we exported it for testing or we can just require it.
      // The current engine.cjs calls runPipeline at the bottom.
      // We need to make sure we can call it.
      
      const { runPipeline } = require('../scripts/engine.cjs');
      await runPipeline(projectRoot);
    } finally {
      console.log = originalLog;
    }

    assert.ok(logs.some(l => l.includes('[PAUSED] Step Step1 requires approval.')), 'Should log PAUSED');
    assert.ok(logs.some(l => l.startsWith('[CONTEXT]')), 'Should log [CONTEXT]');
    
    const contextLine = logs.find(l => l.startsWith('[CONTEXT]'));
    const context = JSON.parse(contextLine.replace('[CONTEXT] ', ''));
    assert.strictEqual(context.step, 'Step1', 'Context step should be Step1');
    assert.strictEqual(context.mode, 'guided', 'Context mode should be guided');
    assert.ok(Array.isArray(context.patterns), 'Context should have patterns array');

    console.log('✅ engine.cjs context tests passed');
  } catch (error) {
    console.error('❌ engine.cjs context tests failed:', error.message);
    process.exit(1);
  } finally {
    teardown();
  }
}

runTests();
