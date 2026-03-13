# Invezgo Data Tools

Run these commands from this skill directory.

Skill script:
`node scripts/run.mjs`

Append the tool name and arguments shown below after that command.

List the available tools:
`node scripts/run.mjs --list-tools`

## Discovery

- `information code=BBCA`
- `list-stock`
- `list-broker`
- `search-stock code=bank`

## Daily Market Breadth

- `top-change date=2026-03-13`
- `top-foreign date=2026-03-13`
- `top-accumulation date=2026-03-13`

## Price and Technicals

- `chart code=BBCA from=2026-01-01 to=2026-03-13`
- `chart-indicator code=TLKM indicator=foreign from=2026-02-01 to=2026-03-13`
- `intraday code=BBRI market=RG`
- `order-book code=ASII market=RG`
- `price-diary code=BBNI`
- `price-seasonal code=BBCA range=36`
- `price-table code=GOTO`
- `time-table code=GOTO`

## Ownership

- `shareholder code=BBCA`
- `shareholder-detail code=BBCA`
- `shareholder-one-detail code=BBCA`
- `shareholder-number code=BBCA`
- `shareholder-ksei code=BBCA range=12`

## Fundamentals and News

- `financial code=BBCA statement=IS type=FY limit=8`
- `keystat code=BBCA type=FY limit=8`
- `news code=BBCA`
- `disclosure code=BBCA`
- `calendar code=BBCA type=RUPS_SCHEDULE limit=10 page=1`

## Index and Sector

- `list-index`
- `index-chart code=COMPOSITE from=2026-01-01 to=2026-03-13`
- `intraday-index code=LQ45 market=RG`
- `sector-stalker from=2026-02-01 to=2026-03-13 base=IDX30 limit=15`
- `sector-rotation from=2026-01-01 to=2026-03-13`

## Broker Summary and Inventory

- `summary-stock code=BBCA from=2026-03-01 to=2026-03-13 investor=all market=RG`
- `summary-broker code=YP from=2026-03-01 to=2026-03-13 investor=all market=RG`
- `inventory-stock code=TLKM from=2026-02-15 to=2026-03-13 investor=f market=RG scope=val limit=8`
- `inventory-broker code=XL from=2026-02-15 to=2026-03-13 investor=all market=RG scope=vol limit=10`

## Intraday Broker Flow

- `momentum code=BBCA date=2026-03-13 range=5 scope=vol`
- `intraday-inventory code=BBRI date=2026-03-13 range=5 type=value total=6 buyer=ALL seller=ALL market=RG`
- `sankey code=ASII date=2026-03-13 type=value buyer=ALL seller=ALL market=RG`
- `broker-stalker broker=YP stock=BBCA`
- `broker-stalker-list code=BBCA`

## Parameter Notes

- Dates use `YYYY-MM-DD`.
- `indicator`: `bdm`, `ritel`, `ratio`, `value`, `volume`, `foreign`, `accumulation`, `freq`.
- `statement`: `BS`, `IS`, `CF`, `EQ`.
- `type` for financials and keystats: `Q`, `FY`, `Q1`, `Q2`, `Q3`, `Q4`.
- `market`: `RG`, `NG`, `TN`.
- `investor`: `all`, `f`, `d`.
- `buyer` and `seller`: `ALL`, `F`, `D`.
- `scope`: `vol`, `val`, `freq`.
- `flow type`: `value`, `volume`.
- `calendar type`: `IPO`, `PUBLIC_EXPOSE`, `REVERSE`, `RIGHT`, `RUPS_RESULT`, `RUPS_SCHEDULE`, `SPLIT`, `WARRANT`, `BONUS`, `CONVERTION`.
