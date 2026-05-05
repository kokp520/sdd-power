const { loadConfig } = require('./utils/config.cjs');
const { loadState, saveState } = require('./utils/state.cjs');

/**
 * Generates structured context for the current step.
 * @param {string} stepName 
 * @param {string} projectRoot 
 * @param {object} state 
 */
async function generateStepContext(stepName, projectRoot, state) {
  const { scanProjectPattern } = require('./utils/analysis.cjs');
  const patterns = scanProjectPattern(projectRoot);
  return {
    step: stepName,
    mode: state.mode || 'guided',
    patterns: patterns,
    timestamp: new Date().toISOString()
  };
}

async function runPipeline(projectRoot, targetStep = null) {
  const config = loadConfig(projectRoot);
  let state = loadState(projectRoot);

  const pipeline = config.pipeline;
  const startIndex = targetStep 
    ? pipeline.findIndex(s => s.name === targetStep) 
    : (state.current_step ? pipeline.findIndex(s => s.name === state.current_step) + 1 : 0);

  if (startIndex === -1) {
    console.error(`Step ${targetStep} not found in pipeline.`);
    return;
  }

  for (let i = startIndex; i < pipeline.length; i++) {
    const step = pipeline[i];
    console.log(`Running step: ${step.name}...`);

    // In a real implementation, we would call the actual step logic here.
    // For this prototype, we simulate the execution.
    
    state.current_step = step.name;
    saveState(projectRoot, state);

    if (step.require_approval) {
      const context = await generateStepContext(step.name, projectRoot, state);
      console.log(`[PAUSED] Step ${step.name} requires approval.`);
      console.log(`[CONTEXT] ${JSON.stringify(context)}`);
      break; 
    }
  }

  console.log('Pipeline execution finished or paused for approval.');
}

module.exports = { runPipeline, generateStepContext };

// Run if called directly
if (require.main === module) {
  const projectRoot = process.argv[2] || process.cwd();
  const targetStep = process.argv[3] || null;
  runPipeline(projectRoot, targetStep).catch(console.error);
}
