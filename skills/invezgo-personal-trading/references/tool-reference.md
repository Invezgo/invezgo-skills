# Personal Trading Tools

Run these commands from this skill directory.

Skill script:
`node scripts/run.mjs`

Append the tool name and arguments shown below after that command.

List the available tools:
`node scripts/run.mjs --list-tools`

## Watchlists

- `watchlist`
- `watchlist-detail id=WATCHLIST_ID`

## Portfolio

- `portfolio`
- `portfolio-summary`

## Journal

- `journal from=2026-03-01 to=2026-03-13`
- `journal-summary from=2026-03-01 to=2026-03-13`

## Trades

- `trade from=2026-03-01 to=2026-03-13`
- `trade-summary from=2026-03-01 to=2026-03-13`
- `trade-summary-chart from=2026-03-01 to=2026-03-13`

## Notes

- The date-based tools inherit the same default dates as the current MCP schemas, but explicit dates are safer and easier to audit.
- These calls are user-account scoped. Avoid running them against shared or unknown API keys.
