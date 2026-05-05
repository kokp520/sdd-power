---
name: sdd-power
description: 規格驅動開發 (SDD) 的標準化管線。提供 Specify, Plan, Task, Test-Plan 等步驟，支援人工審核機制與高度配置化。適用於需要結構化開發流程的專案。
---

# SDD Power

## 概述
`sdd-power` 是一個標準化開發流程的技能。它透過一個「管線 (Pipeline)」來管理從需求定義到分析的完整生命週期。

## 核心流程 (Pipeline)
1. **Specify**: 分析對話或文件，產出 `SPEC.md`。
2. **Plan**: 設計實作路徑，預設開啟 **[人工審核]**。
3. **Test-Plan**: 根據 PLAN 自動生成測試情境與測項。
4. **Task**: 將計畫與測試轉化為可執行的 `TASKS.md`。
5. **Analyze**: 跨文件一致性檢查。

## 使用指引

### 初始化
若專案尚未啟用，請先執行初始化：
- 建立 `.sdd/` 目錄。
- 複製 `assets/templates/` 中的所有範本到 `.sdd/templates/`（若需自訂）。
- 建立基礎的 `.sdd/CONSTITUTION.md`。

### 執行管線
使用 `node scripts/engine.cjs` 啟動管線。
- AI Agent 應該根據引擎的輸出（例如產出了 `SPEC.md`）來執行對應的內容生成任務。
- 當引擎輸出 `[PAUSED]` 並要求審核時，必須使用 `ask_user` 工具詢問使用者是否批准。

### 配置化
使用者可以透過修改 `.sdd/config.json` 來增加步驟（例如 `type: "script"`）或調整審核規則。

## 指令參考
- `sdd init`: 初始化專案環境。
- `sdd run`: 從目前進度執行管線。
- `sdd run [step]`: 執行特定步驟。

## 範本位置
- `assets/templates/SPEC.md`
- `assets/templates/PLAN.md`
- `assets/templates/TEST_PLAN.md`
- `assets/templates/TASKS.md`
- `assets/templates/CONSTITUTION.md`
