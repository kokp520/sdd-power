const fs = require('fs');
const path = require('path');

const SDD_STATE_PATH = '.sdd/state.json';

function loadState(projectRoot) {
  const fullPath = path.join(projectRoot, SDD_STATE_PATH);
  const defaultState = { current_step: null, mode: 'guided', context: {}, history: [] };
  if (fs.existsSync(fullPath)) {
    try {
      const savedState = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      return { ...defaultState, ...savedState };
    } catch (e) {
      return defaultState;
    }
  }
  return defaultState;
}

function saveState(projectRoot, state) {
  const sddDir = path.join(projectRoot, '.sdd');
  if (!fs.existsSync(sddDir)) {
    fs.mkdirSync(sddDir, { recursive: true });
  }
  fs.writeFileSync(path.join(projectRoot, SDD_STATE_PATH), JSON.stringify(state, null, 2));
}

module.exports = { loadState, saveState };
