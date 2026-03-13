# Formula Cheatsheet

Use this file for the common cases. Fall back to [formula-variables.md](formula-variables.md) for the broader catalog.

## Core Price and Volume Variables

- `close`, `open`, `high`, `low`, `avg`, `prev`
- `volume`, `value`, `freq`
- `change`, `change_pct`

## Order Book Variables and Functions

- `best_bid_price`, `best_bid_volume`, `best_offer_price`, `best_offer_volume`
- `all_bid_volume`, `all_bid_freq`, `all_offer_volume`, `all_offer_freq`
- `bid_volume(n)`, `bid_freq(n)`, `offer_volume(n)`, `offer_freq(n)`
- `sum_bid_volume(n)`, `sum_bid_freq(n)`, `sum_offer_volume(n)`, `sum_offer_freq(n)`

Examples:

- `bid_volume(1) > offer_volume(1)`
- `sum_bid_volume(5) > sum_offer_volume(5)`
- `all_bid_freq > 100 && change_pct > 0`

## Broker Summary Functions

- `broker_sum_value("action","broker","investor","market",n)`
- `broker_avg_value("action","broker","investor","market",n)`
- `broker_sum_volume("action","broker","investor","market",n)`
- `broker_avg_volume("action","broker","investor","market",n)`

Allowed values:

- `action`: `"buy"`, `"sell"`, `"net"`
- `investor`: `"f"`, `"d"`, `"all"`
- `market`: `"RG"`, `"NG"`, `"TN"`, `"ALL"`

Examples:

- `broker_sum_value("net","BK","f","RG",50) > 10000000000`
- `broker_sum_volume("buy","YP","d","RG",30) > broker_sum_volume("sell","YP","d","RG",30)`

## Common Patterns

- Breakout volume:
  `close > prev && volume > 100000 && value > 1000000000`
- Positive order book pressure:
  `sum_bid_volume(5) / sum_offer_volume(5) > 1.5 && change_pct > 0`
- Foreign accumulation:
  `broker_sum_value("net","BK","f","RG",30) > 0`
- Oversold plus broker support:
  `rsi(14) < 30 && broker_sum_value("net","BK","f","RG",30) > 0`

## Workflow

1. Start with one or two conditions.
2. Run the screener.
3. Tighten the formula only after you see the first result set.
