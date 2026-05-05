<p align="center">
  <img src="assets/GPT_IMAGE_UGLY_1.png" alt="sdd-power" width="240" />
</p>

# SDD Power

<p align="center">
  <a href="README.md">English</a> | <b>繁體中文</b>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**專為 Gemini CLI Agent 設計的標準化 SDD 管線。零學習成本，極致品質控管。**

[快速啟動](#快速啟動) | [核心流程](#核心流程) | [進階配置](#進階配置) | [文件範本](#文件範本)

---

## 🚀 快速啟動

### 1. 打包技能
```bash
node /opt/homebrew/lib/node_modules/@google/gemini-cli/bundle/builtin/skill-creator/scripts/package_skill.cjs sdd-power/ .
```

### 2. 安裝至您喜愛的 Agent

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

### 3. 初始化專案
```bash
node scripts/init.cjs         # 初始化 .sdd/ 環境與範本
node scripts/engine.cjs       # 啟動開發管線
```

---

## 🛠 核心流程 (Pipeline)

`sdd-power` 透過配置驅動的管線，為 **Gemini CLI Agent** 強制執行高品質的開發生命週期。

1.  **Specify (需求定義)**：分析對話，產出 `SPEC.md`。
2.  **Plan (技術規劃)**：設計實作路徑（後端/前端/資料庫）。 **[人工審核點]**
3.  **Test-Plan (測試規劃)**：定義測試情境與驗收標準。
4.  **Task (任務拆解)**：將計畫轉化為 `TASKS.md` 中的可執行項。
5.  **Analyze (智慧分析)**：自動掃描程式碼庫，確保實作、計畫與專案規範的一致性。

---

## 🧠 智慧分析與流程

SDD 引擎具備「智慧管線」功能，能自動適應您的專案架構。

### 引導模式 vs. 規範模式
- **引導模式 (預設)**：引擎會分析您的程式碼庫，建議合適的模式，並在關鍵關卡請求人工確認。非常適合探索新架構。
- **規範模式**：嚴格強制執行 `CONSTITUTION.md`（憲法）中定義的規範與管線步驟。適用於已成熟的生產環境。

### 執行流程
```mermaid
graph TD
    A[使用者請求] --> B{智慧分析}
    B -->|掃描架構模式| C[產出規格 SPEC]
    C --> D[規劃階段 Plan]
    D -->|人工審核| E[實作階段]
    E --> F{一致性檢查}
    F -->|通過| G[完成]
    F -->|失敗| D
```

---

## ⚙️ 進階配置

透過 `.sdd/config.json` 全面自訂流程。您可以隨時插入自定義腳本或設定人工審核。

```json
{
  "pipeline": [
    { "name": "specify", "type": "standard" },
    { 
      "name": "plan", 
      "require_approval": true, 
      "approval_message": "請審核技術實作路徑是否正確。" 
    },
    { "name": "security_check", "type": "script", "path": "scripts/audit.js" }
  ]
}
```

---

## 📂 文件範本

預設於 `.sdd/templates/` 提供高品質範本：
- `SPEC.md`：用戶故事與功能需求。
- `PLAN.md`：系統架構與資料庫異動。
- `TEST_PLAN.md`：單元測試與集成測試方案。
- `TASKS.md`：執行進度追蹤。
- `CONSTITUTION.md`：專案專屬的編碼規範（憲法）。

---

## 📋 系統需求

- **Node.js 20+**
- **[Gemini CLI](https://github.com/google-gemini/gemini-cli)**

---

## 📄 授權協議

MIT

---

<div align="center">
  由 adiwu 精心打造
</div>
