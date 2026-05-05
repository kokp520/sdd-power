<p align="center">
  <img src="assets/GPT_IMAGE_UGLY_1.png" alt="sdd-power" width="240" />
</p>

# SDD Power

<p align="center">
  <b>English</b> | <a href="README.zh-TW.md">繁體中文</a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/adiwu/pjm-spacer?style=flat&color=yellow)](https://github.com/adiwu/pjm-spacer/stargazers)

**Standardized SDD Pipeline for Gemini CLI Agents. Zero friction, total control.**

[Quick Start](#quick-start) | [Core Pipeline](#core-pipeline) | [Configuration](#configuration) | [Templates](#templates)

---

## 🚀 Quick Start

### 1. Package the skill
```bash
node /opt/homebrew/lib/node_modules/@google/gemini-cli/bundle/builtin/skill-creator/scripts/package_skill.cjs sdd-power/ .
```

### 2. Install to your favorite Agent

#### Gemini CLI
```bash
gemini skills install sdd-power.skill --scope user
/skills reload
```

#### Claude Code
```bash
claudecode skills install sdd-power.skill --scope user
/skills reload
```

#### Codex
```bash
codex skills install sdd-power.skill --scope user
/skills reload
```

### 3. Initialize your project
```bash
node scripts/init.cjs         # Setup .sdd/ environment
node scripts/engine.cjs       # Start the pipeline
```

---

## 🛠 Core Pipeline

`sdd-power` enforces a high-quality development lifecycle through a configuration-driven pipeline.

1.  **Specify**: Analyze requirements and generate `SPEC.md`.
2.  **Plan**: Technical design phase (Backend/Client/DB). **[Human Gate]**
3.  **Test-Plan**: Define test scenarios and acceptance criteria.
4.  **Task**: Break down technical debt into actionable items in `TASKS.md`.
5.  **Analyze**: Consistency check across all documents and standards.

---

## ⚙️ Configuration

Fully customizable via `.sdd/config.json`. Add your own scripts or enforce manual approvals at any stage.

```json
{
  "pipeline": [
    { "name": "specify", "type": "standard" },
    { 
      "name": "plan", 
      "require_approval": true, 
      "approval_message": "Please review the technical path." 
    },
    { "name": "security_check", "type": "script", "path": "scripts/audit.js" }
  ]
}
```

---

## 📂 Templates

Built-in high-quality templates found in `.sdd/templates/`:
- `SPEC.md`: User stories & requirements.
- `PLAN.md`: System architecture & DB changes.
- `TEST_PLAN.md`: Unit & Integration testing.
- `TASKS.md`: Execution tracking.
- `CONSTITUTION.md`: Project-specific coding standards.

---

## 📋 Requirements

- **Node.js 20+**
- **[Gemini CLI](https://github.com/google-gemini/gemini-cli)**

---

## 📄 License

MIT

---

<div align="center">
  Crafted for adiwu
</div>
