---
name: invezgo-personal-trading
description: Retrieve personal Invezgo account data without using the MCP server. Use when the user asks about watchlists and watchlist groups, portfolio, journal and trade history, note updates, or personal alerts.
---

# Invezgo Personal Trading

Use this skill for authenticated, account-specific data.
Treat relative paths in this skill as relative to the skill folder.

1. Confirm that `INVEZGO_API_KEY` belongs to the user's own Invezgo account before calling any tool.
   Get or manage your API key at: https://invezgo.com/setting/api
2. Use the skill script:
   `node scripts/run.mjs --list-tools`
3. Read [tool-reference.md](references/tool-reference.md) for the exact commands.
4. Use explicit date ranges for `journal`, `journal-summary`, `trade`, `trade-summary`, and `trade-summary-chart`.
5. Use alert and note-update tools only for authenticated personal workflows, never for public analysis requests.
6. Keep the response focused on holdings, PnL, hit rate, journal patterns, watchlist organization, or alert behavior instead of dumping every field back to the user.
