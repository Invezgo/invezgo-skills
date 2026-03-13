# Screener Tools

Run these commands from this skill directory.

Skill script:
`node scripts/run.mjs`

Append the tool name and arguments shown below after that command.

List the available tools:
`node scripts/run.mjs --list-tools`

## Formula Screening

- `screener 'formula=close > 1000 && volume > 100000'`
- `screener 'formula=rsi(14) < 30 && broker_sum_value("net","BK","f","RG",30) > 0'`
- `screener 'formula=sum_bid_volume(5) > sum_offer_volume(5) && change_pct > 0'`

## Ownership Reports

- `insider from=2026-03-01 page=1 limit=20 code=BBCA`
- `above-five-percent from=2026-03-01 page=1 limit=20 code=BBCA`
- `above-one-percent from=2026-03-01 page=1 limit=20 broker=ZP`

## Parameter Notes

- `from` is required for the ownership report tools.
- `page` defaults to `1`.
- `limit` defaults to `10`.
- `code`, `name`, and `broker` are optional filters.
