<p align="center">
  <img src="assets/GPT_IMAGE_UGLY_1.png" alt="sdd-power" width="240" />
</p>

# SDD Power

<p align="center">
  <a href="README.md">English</a> | <b>繁體中文</b>
</p>

**專為 AI 原生開發打造的高效能 SDD 管線。**

`sdd-power` 提供標準化的規格驅動開發 (SDD) 框架，將原始需求轉化為可執行的任務。本工具設計上具備高度通用性，支援各種 AI Agent、CLI 助理以及 AI 整合型 IDE。

---

## 🛠 核心管線 (Core Pipeline)

本管線強制執行結構化的開發生命週期，確保程式碼品質與架構一致性：

1.  **Specify (需求定義)**：分析輸入需求，生成結構化的 `SPEC.md`。
2.  **Plan (技術規劃)**：技術設計階段（架構/模式/Schema）。 **[需人工審核]**
3.  **Test-Plan (測試規劃)**：定義測試情境與驗收標準。
4.  **Task (任務拆解)**：將計畫拆解為 `TASKS.md` 中微型且可執行的項目。
5.  **Analyze (智慧分析)**：執行跨文件與程式碼庫的一致性檢查。

---

## 🚀 快速啟動

### 1. 安裝方式

針對您的開發環境打包技能：
```bash
node scripts/package.cjs .
```

支援主要 AI 平台：
- **Gemini CLI / Claude Code / Codex**: `[agent] skills install sdd-power.skill --scope user`
- **Cursor / Windsurf / Roo Code**: 將 `.sdd/CONSTITUTION.md` 加入專案規則或系統提示詞 (System Prompts)。

### 2. 專案初始化
```bash
node scripts/init.cjs         # 初始化 .sdd/ 環境與範本
node scripts/engine.cjs       # 執行管線
```

---

## 📄 文件驅動工作流

`sdd-power` 的核心在於透過三份關鍵文件引導 AI 進行開發：

1. **`SPEC.md` (做什麼)**：定義需求與範疇。
2. **`PLAN.md` (怎麼做)**：技術策略與架構決策。**透過修改此文件來引導 AI 的技術方向。**
3. **`TASKS.md` (執行點)**：微型任務清單。AI 將逐項執行，確保實作與計畫高度一致。

---

## 🧠 智慧上下文分析 (Smart Context Analysis)

引擎會根據專案的複雜度自動調整：
- **引導模式 (Guided Mode)**：AI 掃描程式碼庫，列出相關檔案並在規劃前請求您的確認。
- **規範模式 (Strict Mode)**：偵測到大型變動時自動啟動。強制執行 `CONSTITUTION.md` 規範與測試覆蓋率。

---

## 📋 系統需求

- **Node.js 20+**
- 相容於任何基於 LLM 的開發工具。

---

## 📄 授權協議

MIT
