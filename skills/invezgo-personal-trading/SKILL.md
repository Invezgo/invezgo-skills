---
name: invezgo-personal-trading
description: Retrieve personal Invezgo account data without using the MCP server. Use when the user asks about their watchlists, watchlist detail, portfolio, portfolio summary, trading journal, trade history, trade summary, or trade summary chart.
---

# Invezgo Personal Trading

Use this skill for authenticated, account-specific data.
Treat relative paths in this skill as relative to the skill folder.

1. Confirm that `INVEZGO_API_KEY` belongs to the user's own Invezgo account before calling any tool.
2. Use the skill script:
   `node scripts/run.mjs --list-tools`
3. Read [tool-reference.md](references/tool-reference.md) for the exact commands.
4. Use explicit date ranges for `journal`, `journal-summary`, `trade`, `trade-summary`, and `trade-summary-chart`.
5. Keep the response focused on holdings, PnL, hit rate, journal patterns, or watchlist contents instead of dumping every field back to the user.
