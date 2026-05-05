const fs = require('fs');
const path = require('path');

/**
 * Scans the project root for common architectural patterns.
 * @param {string} root - The absolute path to the project root.
 * @returns {string[]} - A list of identified patterns.
 */
function scanProjectPattern(root) {
  const patterns = [];
  if (fs.existsSync(path.join(root, 'internal'))) {
    patterns.push('Internal/Pkg Structure');
  }
  return patterns;
}

module.exports = { scanProjectPattern };
