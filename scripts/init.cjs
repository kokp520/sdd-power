const fs = require('fs');
const path = require('path');

function initProject(projectRoot) {
  const sddDir = path.join(projectRoot, '.sdd');
  const templatesDir = path.join(sddDir, 'templates');
  
  if (!fs.existsSync(templatesDir)) {
    fs.mkdirSync(templatesDir, { recursive: true });
  }

  const skillAssetsDir = path.join(__dirname, '../assets/templates');
  const files = fs.readdirSync(skillAssetsDir);

  files.forEach(file => {
    const src = path.join(skillAssetsDir, file);
    const dest = path.join(templatesDir, file);
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied template: ${file}`);
    }
  });

  const configPath = path.join(sddDir, 'config.json');
  if (!fs.existsSync(configPath)) {
    const defaultConfig = {
      pipeline: [
        { name: 'specify', type: 'standard' },
        { name: 'plan', type: 'standard', require_approval: true },
        { name: 'test-plan', type: 'standard' },
        { name: 'task', type: 'standard' },
        { name: 'analyze', type: 'standard' }
      ]
    };
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log('Created default config.json');
  }

  const constitutionPath = path.join(sddDir, 'CONSTITUTION.md');
  if (!fs.existsSync(constitutionPath)) {
    fs.copyFileSync(path.join(skillAssetsDir, 'CONSTITUTION.md'), constitutionPath);
    console.log('Created default CONSTITUTION.md');
  }

  console.log('SDD Power initialization complete.');
}

const projectRoot = process.argv[2] || process.cwd();
initProject(projectRoot);
