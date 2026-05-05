const fs = require('fs');
const path = require('path');
const { loadState, saveState } = require('../utils/state.cjs');

/**
 * 分析 SPEC 內容並自動偵測模式與相關檔案
 * @param {string} projectRoot 
 */
async function analyzeContext(projectRoot) {
  const state = loadState(projectRoot);
  let specPath = path.join(projectRoot, '.sdd/SPEC.md');
  
  // 優先讀取專案內的 SPEC，不存在則嘗試範本（僅供測試或初次執行）
  if (!fs.existsSync(specPath)) {
    specPath = path.join(projectRoot, 'assets/templates/SPEC.md');
  }

  if (!fs.existsSync(specPath)) {
    console.warn('SPEC.md not found, skipping analysis.');
    return state;
  }

  const content = fs.readFileSync(specPath, 'utf8');
  const criticalKeywords = ['refactor', 'migration', 'rewrite', 'breaking change', '重構', '遷移'];
  const foundKeywords = criticalKeywords.filter(k => content.toLowerCase().includes(k.toLowerCase()));
  
  // 智慧模式切換邏輯：關鍵字偵測或內容長度
  if (foundKeywords.length > 0 || content.length > 500) {
    state.mode = 'strict';
    console.log(`[ANALYSIS] Detected high complexity. Switching to STRICT mode.`);
  } else {
    state.mode = 'guided';
  }

  // 引導式檔案列舉 (以 SPEC 中的關鍵字進行簡單搜尋)
  const commonDomains = ['auth', 'user', 'api', 'db', 'config', 'service', 'handler', 'util'];
  const detectedDomains = commonDomains.filter(d => content.toLowerCase().includes(d.toLowerCase()));
  
  let relatedFiles = [];
  try {
    // 使用 Node.js 20+ 原生支援的遞迴讀取
    const allFiles = fs.readdirSync(projectRoot, { recursive: true });
    
    relatedFiles = allFiles.filter(file => {
      // 忽略常見目錄
      if (file.includes('node_modules') || file.includes('.git') || file.includes('.superpowers')) return false;
      
      const fileName = path.basename(file).toLowerCase();
      return detectedDomains.some(domain => fileName.includes(domain));
    });
  } catch (err) {
    console.error('Failed to scan directory:', err);
  }

  state.context = {
    ...state.context,
    relatedFiles: [...new Set(relatedFiles)].slice(0, 20), // 限制數量避免過大
    analysis: {
      foundKeywords,
      specLength: content.length,
      timestamp: new Date().toISOString()
    }
  };

  saveState(projectRoot, state);
  return state;
}

module.exports = { analyzeContext };
