<p align="center">
  <img src="assets/GPT_IMAGE_UGLY_1.png" alt="sdd-power" width="240" />
</p>

# SDD Power

<p align="center">
  <b>English</b> | <a href="README.zh-TW.md">繁體中文</a>
</p>

**High-Performance SDD Pipeline for AI-Native Development.**

`sdd-power` provides a standardized Specification-Driven Development (SDD) framework that bridges the gap between raw requirements and executable tasks. It is designed to work seamlessly across different AI environments, including CLI agents and AI-integrated IDEs.

---

## 🛠 Core Pipeline

The pipeline enforces a structured development lifecycle to ensure code quality and architectural consistency:

1.  **Specify**: Analyze input and generate structured `SPEC.md`.
2.  **Plan**: Technical design phase (Architecture/Schema/Patterns). **[Human Approval]**
3.  **Test-Plan**: Define test scenarios and acceptance criteria.
4.  **Task**: Decompose plans into granular, actionable items in `TASKS.md`.
5.  **Analyze**: Smart consistency check across all documents and codebase.

---

## 🚀 Getting Started

### 1. Installation

Package the skill for your preferred environment:
```bash
node scripts/package.cjs .
```

Support for major AI platforms:
- **Gemini CLI / Claude Code / Codex**: `[agent] skills install sdd-power.skill --scope user`
- **Cursor / Windsurf / Roo Code**: Add `.sdd/CONSTITUTION.md` to your project rules or system prompts.

### 2. Initialization
```bash
node scripts/init.cjs         # Initialize .sdd/ environment
node scripts/engine.cjs       # Execute pipeline
```

---

## 📄 Document-Driven Workflow

`sdd-power` centers around three core documents that guide the AI through the development process:

1. **`SPEC.md` (The "What")**: Defines requirements and scope.
2. **`PLAN.md` (The "How")**: Technical strategy and architectural decisions. **Modify this to steer the AI's technical direction.**
3. **`TASKS.md` (The "Action")**: Granular task list. AI executes these one by one, ensuring high-fidelity implementation.

---

## 🧠 Smart Context Analysis

The engine adapts to your project's complexity:
- **Guided Mode**: AI scans your codebase, suggests relevant files, and asks for confirmation before planning.
- **Strict Mode**: Automatically active for large changes. Enforces `CONSTITUTION.md` rules and mandatory test coverage.

---

## 📋 Requirements

- **Node.js 20+**
- Compatible with any LLM-powered development tool.

---

## 📄 License

MIT
