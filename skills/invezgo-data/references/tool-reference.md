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
- `search query=bbca`
- `search-user query=investor cursor=1`
- `search-stock query=bank cursor=1`

## Daily Market Breadth

- `top-change date=2026-03-13`
- `top-foreign date=2026-03-13`
- `top-accumulation date=2026-03-13`
- `top-ritel date=2026-03-13 filter_column=value filter_operator=> filter_value=0`

## Price and Technicals

- `chart code=BBCA from=2026-01-01 to=2026-03-13`
- `chart-multi-time code=BBCA from=2026-03-01 to=2026-03-13 timeframe=60`
- `chart-indicator code=TLKM indicator=foreign from=2026-02-01 to=2026-03-13`
- `intraday code=BBRI market=RG`
- `intraday-data code=BBRI market=RG`
- `order-book code=ASII market=RG`
- `queue code=BBCA price=935 side=BUY`
- `price-diary code=BBNI`
- `price-seasonal code=BBCA range=36`
- `price-table code=GOTO date=2026-03-13`
- `time-table code=GOTO date=2026-03-13 range=60`

## Ownership

- `shareholder code=BBCA`
- `shareholder-high`
- `shareholder-detail code=BBCA`
- `shareholder-detail name='ADARO STRATEGIC INVESTMENTS'`
- `shareholder-one-detail code=BBCA`
- `shareholder-one-detail name='ADARO STRATEGIC INVESTMENTS'`
- `shareholder-number code=BBCA`
- `shareholder-ksei code=BBCA range=12`
- `shareholder-relation code=BBCA depth=3 max_nodes=120 neighbors=25 min_percentage=1`
- `shareholder-classification code=BBCA range=6`
- `shareholder-classify-table code=BBCA`

## Fundamentals and News

- `financial code=BBCA statement=IS type=FY limit=8`
- `keystat code=BBCA type=FY limit=8`
- `news code=BBCA`
- `disclosure code=BBCA`
- `calendar code=BBCA type=RUPS_SCHEDULE limit=10 page=1`

## Community and Profile

- `profile-detail username=invezgo`
- `profile-posts username=invezgo page=1 limit=10`
- `profile-posts-category username=invezgo category=NEWS page=1 limit=10`
- `profile-watchlist username=invezgo`
- `profile-follow username=invezgo`
- `profile-following username=invezgo`
- `profile-membership username=invezgo`
- `posts-list`
- `posts-category category=NEWS`
- `posts-space code=BBCA`
- `posts-space-category code=BBCA category=REPORT`
- `posts-detail id=POST_ID`
- `posts-comment id=POST_ID`
- `posts-like`
- `posts-favorite`
- `posts-vote id=VOTE_ID`

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

- `momentum code=BBCA date=2026-03-13 range=5 scope=volume`
- `intraday-inventory code=BBRI date=2026-03-13 range=5 type=value total=6 buyer=ALL seller=ALL market=RG`
- `sankey code=ASII date=2026-03-13 type=value buyer=ALL seller=ALL market=RG`
- `broker-stalker broker=YP stock=BBCA from=2026-03-01 to=2026-03-13 investor=all market=RG`
- `broker-stalker-list code=YP from=2026-03-01 to=2026-03-13 investor=all market=RG`

## Parameter Notes

- Dates use `YYYY-MM-DD`.
- `indicator`: `bdm`, `ritel`, `ratio`, `value`, `volume`, `foreign`, `accumulation`, `freq`.
- `timeframe`: `1`, `5`, `15`, `30`, `60`, `D`, `W`, `M`.
- `statement`: `BS`, `IS`, `CF`.
- `type` for financials and keystats: `Q`, `FY`, `Q1`, `Q2`, `Q3`, `Q4`.
- `market`: `RG`, `NG`, `TN`.
- `investor`: `all`, `f`, `d`.
- `buyer` and `seller`: `ALL`, `F`, `D`.
- `scope` for `momentum`: `value`, `volume`.
- `flow type`: `value`, `volume`.
- `filter_column` for `top-ritel`: `change`, `value`, `volume`, `ratio`.
- `filter_operator` for `top-ritel`: `<`, `>`, `=`, `>=`, `<=`, `!=`.
- `calendar type`: `IPO`, `PUBLIC_EXPOSE`, `REVERSE`, `RIGHT`, `RUPS_RESULT`, `RUPS_SCHEDULE`, `SPLIT`, `WARRANT`, `BONUS`, `CONVERTION`, `DIVIDEND`.
