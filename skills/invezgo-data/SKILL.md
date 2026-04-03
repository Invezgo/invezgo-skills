---
name: invezgo-data
description: Fetch Indonesian public stock, index, ownership, financial, news, sector, broker flow, profile, and community post data from Invezgo without using the MCP server. Use when the user asks about BEI or IDX stocks, company profiles, stock search, top movers, charts, technical indicators, intraday or order book data, shareholder composition, financial statements, disclosures, corporate actions, indexes, sectors, broker summary, accumulation, inventory, momentum, sankey flow, public profiles, or community posts.
---

# Invezgo Data

Use this skill to replace the public data and broker flow parts of the Invezgo MCP server with direct API calls.
Treat relative paths in this skill as relative to the skill folder.

1. Confirm authentication first.
   Prefer `INVEZGO_API_KEY` in the shell environment.
   Get or manage your API key at: https://invezgo.com/setting/api
   Do not inline the API key in commands unless the user explicitly asks for that.
2. Use the skill script:
   `node scripts/run.mjs --list-tools`
3. Pick the narrowest tool that matches the request.
   Use `search`, `search-user`, and `search-stock` when discovery starts from keywords or usernames.
   Use `information`, `financial`, and `keystat` for company and fundamental questions.
   Use `chart`, `chart-multi-time`, `chart-indicator`, `intraday`, `intraday-data`, `order-book`, `price-diary`, `price-seasonal`, `price-table`, and `time-table` for price action.
   Use `news`, `disclosure`, and `calendar` for catalysts and corporate events.
   Use `profile*` and `posts*` tools for public profile and community-content analysis.
   Use `list-index`, `index-chart`, `intraday-index`, `sector-stalker`, `sector-rotation`, `top-change`, `top-foreign`, `top-accumulation`, and `top-ritel` for market-wide analysis.
   Use the `shareholder*` tools for ownership questions.
   Use `summary-stock`, `summary-broker`, `inventory-stock`, `inventory-broker`, `momentum`, `intraday-inventory`, `sankey`, `broker-stalker`, and `broker-stalker-list` for broker behavior.
   Use `shareholder-relation`, `shareholder-classification`, and `shareholder-classify-table` for non-chart ownership mapping and classification views.
4. Read [tool-reference.md](references/tool-reference.md) when you need exact parameters or examples.
5. Summarize the useful parts of the JSON instead of pasting the whole payload unless the user asks for raw output.

Notes:
- `shareholder-number` and `shareholder-ksei` are simplified here to match the live API path. The MCP schemas exposed extra date fields, but the endpoint itself only uses `code` and, for KSEI, `range`.
- These calls bypass `src/server.ts` entirely. They do not require the local FastMCP server to be running.
