const fs = require('fs');
const path = require('path');

const SDD_CONFIG_PATH = '.sdd/config.json';

function loadConfig(projectRoot) {
  const fullPath = path.join(projectRoot, SDD_CONFIG_PATH);
  const defaultConfig = {
    pipeline: [
      { name: 'specify', type: 'standard' },
      { name: 'plan', type: 'standard', require_approval: true },
      { name: 'test-plan', type: 'standard' },
      { name: 'task', type: 'standard' },
      { name: 'analyze', type: 'standard' }
    ],
    constitution_path: '.sdd/CONSTITUTION.md'
  };

  if (fs.existsSync(fullPath)) {
    try {
      const userConfig = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      return { ...defaultConfig, ...userConfig };
    } catch (e) {
      console.warn('Failed to parse .sdd/config.json, using defaults.');
    }
  }
  return defaultConfig;
}

module.exports = { loadConfig };
