const fs = require('fs');
const path = require('path');

/**
 * Scans the project root for common architectural patterns.
 * @param {string} root - The absolute path to the project root.
 * @returns {string[]} - A list of identified patterns.
 */
function scanProjectPattern(root) {
  const patterns = [];
  if (fs.existsSync(path.join(root, 'internal'))) patterns.push('Internal/Pkg Structure');
  if (fs.existsSync(path.join(root, 'cmd'))) patterns.push('CLI Command Structure');
  if (fs.existsSync(path.join(root, 'src'))) patterns.push('Web Application Structure');
  if (fs.existsSync(path.join(root, 'package.json'))) patterns.push('Node.js Project (package.json)');
  if (fs.existsSync(path.join(root, 'go.mod'))) patterns.push('Go Module (go.mod)');
  return patterns;
}

module.exports = { scanProjectPattern };
