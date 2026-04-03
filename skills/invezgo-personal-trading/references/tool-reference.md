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
- `watchlist-group-list`
- `watchlist-group-create name=SwingIdeas`
- `watchlist-group-update id=GROUP_ID name=HighConviction`
- `watchlist-group-delete id=GROUP_ID`

## Portfolio

- `portfolio`
- `portfolio-summary`

## Journal

- `journal from=2026-03-01 to=2026-03-13`
- `journal-summary from=2026-03-01 to=2026-03-13`
- `journal-file-extract`
- `journal-update-note id=JOURNAL_ID note='Review setup quality'`

## Trades

- `trade from=2026-03-01 to=2026-03-13`
- `trade-summary from=2026-03-01 to=2026-03-13`
- `trade-summary-chart from=2026-03-01 to=2026-03-13`
- `trade-update-note id=TRADE_ID note='Scale-in on support retest'`

## Alerts

- `alert-list`
- `alert-create name=BreakoutAlert category=trend,volume every=FIVE_MINUTES send=IN formula='close > 1000' scope=IDX30,IDX80`
- `alert-test formula='close > 1000' category=trend,volume`
- `alert-update id=ALERT_ID name=BreakoutAlert category=trend,volume every=TEN_MINUTES send=IN_OUT formula='close > 1100' scope=IDX30`
- `alert-delete id=ALERT_ID`

## Notes

- The date-based tools inherit the same default dates as the current MCP schemas, but explicit dates are safer and easier to audit.
- These calls are user-account scoped. Avoid running them against shared or unknown API keys.
