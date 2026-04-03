---
name: invezgo-screener
description: Screen Indonesian stocks with Invezgo formulas and ownership reports without using the MCP server. Use when the user wants to translate natural-language criteria into a screener formula, run scans, inspect insider or major-holder reports, or manage saved screeners.
---

# Invezgo Screener

Use this skill for formula-driven scans and holder-report workflows.
Treat relative paths in this skill as relative to the skill folder.

1. Confirm `INVEZGO_API_KEY` is available.
   Get or manage your API key at: https://invezgo.com/setting/api
2. Use the skill script:
   `node scripts/run.mjs --list-tools`
3. Translate the user request into the smallest valid formula first.
   Prefer explicit comparisons and simple boolean joins.
   Quote the full formula in PowerShell.
4. Run `screener` with the translated formula.
5. Use `insider`, `above-five-percent`, or `above-one-percent` when the user wants ownership reports rather than a formula scan.
6. Use `screener-list`, `screener-save`, `screener-update`, and `screener-delete` when the request is about saved screener management.
7. Read [formula-cheatsheet.md](references/formula-cheatsheet.md) for the common variables and examples.
8. If the requested function or variable is unusual, read [formula-variables.md](references/formula-variables.md) before composing the formula.

Notes:
- Keep formulas readable. Avoid nesting many conditions until a smaller version works.
- Use `list-broker` or `search-stock` first if the formula depends on a broker or stock code the user has not confirmed.
