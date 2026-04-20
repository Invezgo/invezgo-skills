# Invezgo Stock Data Skills for AI Agents

AI stock data toolkit for Indonesian equities, IDX / BEI market analysis, portfolio review, and formula screening with agents such as OpenClaw, Codex, Claude-style coding agents, and other local AI runners that can execute shell commands.

This repository packages Invezgo access into reusable skills so an AI agent can fetch stock market data, run stock screeners, inspect broker flow, and review personal trading activity without standing up a separate MCP server.

## Why this repo

- Direct access to Invezgo endpoints through simple Node.js scripts
- Built for AI agents that need reliable command execution, not just human browsing
- Covers public IDX market data, screener workflows, and authenticated personal trading data
- Organized as portable skills with `SKILL.md`, `scripts/`, `references/`, and `agents/openai.yaml`
- Useful for OpenClaw, Codex, local CLI agents, and custom LLM automation workflows

## What you can do

- Fetch Indonesian stock data for IDX / BEI symbols such as `BBCA`, `TLKM`, `BBRI`, and `ASII`
- Retrieve company information, financial statements, disclosures, news, sector rotation, and index charts
- Inspect broker activity, accumulation, inventory, momentum, and sankey flow
- Screen stocks with natural-language-to-formula workflows
- Query insider activity and holders above one percent or five percent
- Review watchlists, portfolio, journal, and trade history for a personal Invezgo account

## Repository structure

```text
skills/
├── README.md
└── skills/
    ├── _shared/
    │   └── scripts/
    │       ├── invezgo-api.mjs
    │       └── invezgo-tools.mjs
    ├── invezgo-data/
    │   ├── SKILL.md
    │   ├── agents/openai.yaml
    │   ├── references/
    │   └── scripts/run.mjs
    ├── invezgo-personal-trading/
    │   ├── SKILL.md
    │   ├── agents/openai.yaml
    │   ├── references/
    │   └── scripts/run.mjs
    └── invezgo-screener/
        ├── SKILL.md
        ├── agents/openai.yaml
        ├── references/
        └── scripts/run.mjs
```

## Requirements

- Node.js 18+ recommended
- An active `INVEZGO_API_KEY`
- An AI agent or local shell that can run Node commands

Get your API key from: https://invezgo.com/setting/api

This repo uses built-in Node.js APIs, so there is no required `npm install` for the provided scripts.

## Quick start

### 1. Set your API key

If you do not have an API key yet, create it at: https://invezgo.com/setting/api

PowerShell:

```powershell
$env:INVEZGO_API_KEY="your_api_key_here"
```

Bash:

```bash
export INVEZGO_API_KEY="your_api_key_here"
```

### 2. Inspect available tools

Public stock data:

```powershell
node skills/invezgo-data/scripts/run.mjs --list-tools
```

Screener and ownership reports:

```powershell
node skills/invezgo-screener/scripts/run.mjs --list-tools
```

Personal trading data:

```powershell
node skills/invezgo-personal-trading/scripts/run.mjs --list-tools
```

### 3. Run your first query

Company information:

```powershell
node skills/invezgo-data/scripts/run.mjs information code=BBCA
```

Search stocks:

```powershell
node skills/invezgo-data/scripts/run.mjs search-stock query=bank cursor=1
```

Run a stock screener formula:

```powershell
node skills/invezgo-screener/scripts/run.mjs screener 'formula=close > 1000 && volume > 100000'
```

Review portfolio summary:

```powershell
node skills/invezgo-personal-trading/scripts/run.mjs portfolio-summary
```

## Skill routing guide for AI agents

Use this routing logic in your agent prompt or tool planner.

| User intent | Skill | Command entry point |
|---|---|---|
| Public market data, stock info, broker flow, financials, disclosures | `invezgo-data` | `node skills/invezgo-data/scripts/run.mjs` |
| Stock screener formulas, insider reports, major holders | `invezgo-screener` | `node skills/invezgo-screener/scripts/run.mjs` |
| Watchlist, portfolio, journal, trade history, personal analytics | `invezgo-personal-trading` | `node skills/invezgo-personal-trading/scripts/run.mjs` |

## Best prompts for OpenClaw and other AI agents

Use prompts like these when wiring the repo into OpenClaw, Codex, or another AI coding agent.

### Prompt for public IDX market data

```text
Use the local Invezgo stock data skill to answer questions about IDX / BEI stocks.
If the request is about public market data, run commands through:
node skills/invezgo-data/scripts/run.mjs
Summarize the useful JSON instead of dumping the full payload.
```

### Prompt for screener workflows

```text
Use the local Invezgo screener skill for natural-language stock screening.
Translate the request into the smallest valid formula first, then run:
node skills/invezgo-screener/scripts/run.mjs
If needed, consult the references folder for variables and examples.
```

### Prompt for personal trading analysis

```text
Use the local Invezgo personal trading skill only for the user's own account data.
Run commands through:
node skills/invezgo-personal-trading/scripts/run.mjs
Prefer explicit date ranges and return concise portfolio or trade insights.
```

## High-value examples

### Example: top foreign flow

```powershell
node skills/invezgo-data/scripts/run.mjs top-foreign date=2026-03-13
```

### Example: index chart

```powershell
node skills/invezgo-data/scripts/run.mjs index-chart code=COMPOSITE from=2026-01-01 to=2026-03-13
```

### Example: oversold screener with broker support

```powershell
node skills/invezgo-screener/scripts/run.mjs screener 'formula=rsi(14) < 30 && broker_sum_value("net","BK","f","RG",30) > 0'
```

### Example: journal summary

```powershell
node skills/invezgo-personal-trading/scripts/run.mjs journal-summary from=2026-03-01 to=2026-03-13
```

## SEO keywords this repo targets naturally

- AI stock data API
- Indonesian stock API
- IDX API
- BEI stock data
- AI agent stock screener
- OpenClaw stock data integration
- Invezgo API for LLM agents
- broker flow API Indonesia
- portfolio analytics for AI agents

## References

- [Invezgo Data Skill](skills/invezgo-data/SKILL.md)
- [Invezgo Data Tool Reference](skills/invezgo-data/references/tool-reference.md)
- [Invezgo Screener Skill](skills/invezgo-screener/SKILL.md)
- [Invezgo Screener Cheatsheet](skills/invezgo-screener/references/formula-cheatsheet.md)
- [Invezgo Screener Variables](skills/invezgo-screener/references/formula-variables.md)
- [Invezgo Personal Trading Skill](skills/invezgo-personal-trading/SKILL.md)
- [Invezgo Personal Trading Reference](skills/invezgo-personal-trading/references/tool-reference.md)

## Notes

- Public and personal endpoints are separated on purpose.
- Keep `INVEZGO_API_KEY` in the environment instead of hardcoding it in commands.
- For personal trading data, only use an API key that belongs to the actual user.
- If your AI agent supports tool routing, point it to the correct skill first instead of using one generic command for everything.
