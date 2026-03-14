# Formula Variables for AI

Dokumen ini adalah versi non-teknikal dari daftar variabel formula.
Fokus dokumen ini hanya pada:

- nama variabel
- arti variabel
- contoh penggunaan

Dokumen ini tidak membahas sumber data, rumus perhitungan, atau detail implementasi.
Dokumen ini juga tidak membahas fungsi seperti `sma(...)`, `broker_sum_value(...)`, atau `change("field", n)`.

---

## Realtime Price

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `close` | Harga terakhir saat ini | `close > 1000` |
| `open` | Harga pembukaan hari ini | `close > open` |
| `high` | Harga tertinggi hari ini | `close >= high * 0.98` |
| `low` | Harga terendah hari ini | `close > low * 1.03` |
| `avg` | Harga rata-rata hari ini | `close > avg` |
| `prev` | Harga penutupan sebelumnya | `close > prev` |

## Realtime Activity

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `volume` | Volume transaksi | `volume > 100000` |
| `value` | Nilai transaksi | `value > 1000000000` |
| `freq` | Jumlah transaksi | `freq > 5000` |
| `change` | Kenaikan atau penurunan harga secara nominal | `change > 0` |
| `change_pct` | Kenaikan atau penurunan harga dalam persen | `change_pct > 2` |
| `freq_analyzer` | Indikator kepadatan transaksi | `freq_analyzer < 0.01` |

## Bid, Offer, and Order Book Totals

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `best_bid_price` | Harga bid terbaik | `best_bid_price >= 995` |
| `best_bid_volume` | Volume di bid terbaik | `best_bid_volume > 5000` |
| `best_offer_price` | Harga offer terbaik | `best_offer_price <= 1010` |
| `best_offer_volume` | Volume di offer terbaik | `best_offer_volume < 3000` |
| `iep` | Harga indikatif | `iep > 1000` |
| `iev` | Volume indikatif | `iev > 10000` |
| `all_bid_volume` | Total seluruh volume bid | `all_bid_volume > all_offer_volume` |
| `all_bid_freq` | Total seluruh frekuensi bid | `all_bid_freq > 100` |
| `all_offer_volume` | Total seluruh volume offer | `all_offer_volume < all_bid_volume` |
| `all_offer_freq` | Total seluruh frekuensi offer | `all_offer_freq < all_bid_freq` |

## Flow and Position

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `foreign_flow` | Arus dana foreign saat ini | `foreign_flow > 0` |
| `bdm_flow` | Arus dana bandar saat ini | `bdm_flow > 0` |
| `ritel_flow` | Arus dana ritel saat ini | `ritel_flow < 0` |
| `foreign` | Posisi foreign | `foreign > 1000000` |
| `bdm` | Posisi bandar | `bdm > 0` |
| `ritel` | Posisi ritel | `ritel < 0` |
| `ratio` | Rasio posisi | `ratio > 1` |

## Previous Session Snapshot

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `prev_open` | Harga pembukaan sebelumnya | `open > prev_open` |
| `prev_high` | Harga tertinggi sebelumnya | `close > prev_high` |
| `prev_low` | Harga terendah sebelumnya | `low >= prev_low` |
| `prev_close` | Harga penutupan sebelumnya | `close > prev_close` |
| `prev_volume` | Volume sebelumnya | `volume > prev_volume` |
| `prev_value` | Nilai transaksi sebelumnya | `value > prev_value` |
| `prev_avg` | Harga rata-rata sebelumnya | `close > prev_avg` |
| `prev_freq` | Frekuensi transaksi sebelumnya | `freq > prev_freq` |
| `prev_foreign` | Posisi foreign sebelumnya | `foreign > prev_foreign` |
| `prev_bdm` | Posisi bandar sebelumnya | `bdm > prev_bdm` |
| `prev_ritel` | Posisi ritel sebelumnya | `ritel < prev_ritel` |
| `prev_ratio` | Rasio posisi sebelumnya | `ratio > prev_ratio` |

## Shareholders

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `shareholder` | Jumlah pemegang saham | `shareholder > 100000` |
| `change_1m_shareholder` | Perubahan jumlah pemegang saham 1 bulan | `change_1m_shareholder > 1` |
| `change_3m_shareholder` | Perubahan jumlah pemegang saham 3 bulan | `change_3m_shareholder > 3` |
| `change_6m_shareholder` | Perubahan jumlah pemegang saham 6 bulan | `change_6m_shareholder > 5` |
| `change_12m_shareholder` | Perubahan jumlah pemegang saham 12 bulan | `change_12m_shareholder > 10` |

## Pivot and Fibonacci

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `pivot_point` | Titik pivot utama | `close > pivot_point` |
| `resistance_1` | Resistance pertama | `close < resistance_1` |
| `resistance_2` | Resistance kedua | `close < resistance_2` |
| `resistance_3` | Resistance ketiga | `close < resistance_3` |
| `support_1` | Support pertama | `close > support_1` |
| `support_2` | Support kedua | `close > support_2` |
| `support_3` | Support ketiga | `close > support_3` |
| `fib_23_6_20d` | Level Fibonacci 23.6% untuk 20 hari | `close > fib_23_6_20d` |
| `fib_38_2_20d` | Level Fibonacci 38.2% untuk 20 hari | `close > fib_38_2_20d` |
| `fib_50_0_20d` | Level Fibonacci 50.0% untuk 20 hari | `close > fib_50_0_20d` |
| `fib_61_8_20d` | Level Fibonacci 61.8% untuk 20 hari | `close > fib_61_8_20d` |
| `fib_78_6_20d` | Level Fibonacci 78.6% untuk 20 hari | `close > fib_78_6_20d` |
| `fib_23_6_50d` | Level Fibonacci 23.6% untuk 50 hari | `close > fib_23_6_50d` |
| `fib_38_2_50d` | Level Fibonacci 38.2% untuk 50 hari | `close > fib_38_2_50d` |
| `fib_50_0_50d` | Level Fibonacci 50.0% untuk 50 hari | `close > fib_50_0_50d` |
| `fib_61_8_50d` | Level Fibonacci 61.8% untuk 50 hari | `close > fib_61_8_50d` |
| `fib_78_6_50d` | Level Fibonacci 78.6% untuk 50 hari | `close > fib_78_6_50d` |

## KSEI Ownership

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `free_float` | Jumlah saham free float | `free_float > 100000000` |
| `prev_free_float` | Free float sebelumnya | `free_float > prev_free_float` |
| `free_float_pct` | Persentase free float | `free_float_pct < 40` |
| `prev_free_float_pct` | Persentase free float sebelumnya | `free_float_pct > prev_free_float_pct` |
| `local_is` | Kepemilikan lokal oleh asuransi | `local_is > 0` |
| `local_cp` | Kepemilikan lokal oleh perusahaan | `local_cp > 0` |
| `local_pf` | Kepemilikan lokal oleh dana pensiun | `local_pf > 0` |
| `local_ib` | Kepemilikan lokal oleh investment bank | `local_ib > 0` |
| `local_id` | Kepemilikan lokal oleh investor individu | `local_id > 0` |
| `local_mf` | Kepemilikan lokal oleh reksa dana | `local_mf > 0` |
| `local_sc` | Kepemilikan lokal oleh sekuritas | `local_sc > 0` |
| `local_fd` | Kepemilikan lokal oleh yayasan | `local_fd > 0` |
| `local_ot` | Kepemilikan lokal kategori lainnya | `local_ot > 0` |
| `foreign_is` | Kepemilikan asing oleh asuransi | `foreign_is > 0` |
| `foreign_cp` | Kepemilikan asing oleh perusahaan | `foreign_cp > 0` |
| `foreign_pf` | Kepemilikan asing oleh dana pensiun | `foreign_pf > 0` |
| `foreign_ib` | Kepemilikan asing oleh investment bank | `foreign_ib > 0` |
| `foreign_id` | Kepemilikan asing oleh investor individu | `foreign_id > 0` |
| `foreign_mf` | Kepemilikan asing oleh reksa dana | `foreign_mf > 0` |
| `foreign_sc` | Kepemilikan asing oleh sekuritas | `foreign_sc > 0` |
| `foreign_fd` | Kepemilikan asing oleh yayasan | `foreign_fd > 0` |
| `foreign_ot` | Kepemilikan asing kategori lainnya | `foreign_ot > 0` |
| `change_1m_local_id` | Perubahan kepemilikan lokal individu 1 bulan | `change_1m_local_id > 0` |
| `change_3m_local_id` | Perubahan kepemilikan lokal individu 3 bulan | `change_3m_local_id > 0` |
| `change_6m_local_id` | Perubahan kepemilikan lokal individu 6 bulan | `change_6m_local_id > 0` |
| `change_12m_local_id` | Perubahan kepemilikan lokal individu 12 bulan | `change_12m_local_id > 0` |
| `change_1m_foreign_id` | Perubahan kepemilikan asing individu 1 bulan | `change_1m_foreign_id > 0` |
| `change_3m_foreign_id` | Perubahan kepemilikan asing individu 3 bulan | `change_3m_foreign_id > 0` |
| `change_6m_foreign_id` | Perubahan kepemilikan asing individu 6 bulan | `change_6m_foreign_id > 0` |
| `change_12m_foreign_id` | Perubahan kepemilikan asing individu 12 bulan | `change_12m_foreign_id > 0` |
| `change_1m_local_mf` | Perubahan kepemilikan reksa dana lokal 1 bulan | `change_1m_local_mf > 0` |
| `change_3m_local_mf` | Perubahan kepemilikan reksa dana lokal 3 bulan | `change_3m_local_mf > 0` |
| `change_6m_local_mf` | Perubahan kepemilikan reksa dana lokal 6 bulan | `change_6m_local_mf > 0` |
| `change_12m_local_mf` | Perubahan kepemilikan reksa dana lokal 12 bulan | `change_12m_local_mf > 0` |

## Insider

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `insider_ksei_1m_total` | Total data insider KSEI 1 bulan | `insider_ksei_1m_total > 0` |
| `insider_ksei_1m_change_vol` | Perubahan volume insider KSEI 1 bulan | `insider_ksei_1m_change_vol > 0` |
| `insider_ksei_1m_change_pct` | Perubahan persentase insider KSEI 1 bulan | `insider_ksei_1m_change_pct > 0` |
| `insider_ksei_3m_total` | Total data insider KSEI 3 bulan | `insider_ksei_3m_total > 0` |
| `insider_ksei_3m_change_vol` | Perubahan volume insider KSEI 3 bulan | `insider_ksei_3m_change_vol > 0` |
| `insider_ksei_3m_change_pct` | Perubahan persentase insider KSEI 3 bulan | `insider_ksei_3m_change_pct > 0` |
| `insider_ksei_6m_total` | Total data insider KSEI 6 bulan | `insider_ksei_6m_total > 0` |
| `insider_ksei_6m_change_vol` | Perubahan volume insider KSEI 6 bulan | `insider_ksei_6m_change_vol > 0` |
| `insider_ksei_6m_change_pct` | Perubahan persentase insider KSEI 6 bulan | `insider_ksei_6m_change_pct > 0` |
| `insider_ksei_12m_total` | Total data insider KSEI 12 bulan | `insider_ksei_12m_total > 0` |
| `insider_ksei_12m_change_vol` | Perubahan volume insider KSEI 12 bulan | `insider_ksei_12m_change_vol > 0` |
| `insider_ksei_12m_change_pct` | Perubahan persentase insider KSEI 12 bulan | `insider_ksei_12m_change_pct > 0` |
| `insider_idx_1m_total` | Total transaksi insider IDX 1 bulan | `insider_idx_1m_total > 0` |
| `insider_idx_1m_change_vol` | Perubahan volume insider IDX 1 bulan | `insider_idx_1m_change_vol > 0` |
| `insider_idx_1m_change_pct` | Perubahan persentase insider IDX 1 bulan | `insider_idx_1m_change_pct > 0` |
| `insider_idx_1m_avg_price` | Harga rata-rata insider IDX 1 bulan | `close > insider_idx_1m_avg_price` |
| `insider_idx_3m_total` | Total transaksi insider IDX 3 bulan | `insider_idx_3m_total > 0` |
| `insider_idx_3m_change_vol` | Perubahan volume insider IDX 3 bulan | `insider_idx_3m_change_vol > 0` |
| `insider_idx_3m_change_pct` | Perubahan persentase insider IDX 3 bulan | `insider_idx_3m_change_pct > 0` |
| `insider_idx_3m_avg_price` | Harga rata-rata insider IDX 3 bulan | `close > insider_idx_3m_avg_price` |
| `insider_idx_6m_total` | Total transaksi insider IDX 6 bulan | `insider_idx_6m_total > 0` |
| `insider_idx_6m_change_vol` | Perubahan volume insider IDX 6 bulan | `insider_idx_6m_change_vol > 0` |
| `insider_idx_6m_change_pct` | Perubahan persentase insider IDX 6 bulan | `insider_idx_6m_change_pct > 0` |
| `insider_idx_6m_avg_price` | Harga rata-rata insider IDX 6 bulan | `close > insider_idx_6m_avg_price` |
| `insider_idx_12m_total` | Total transaksi insider IDX 12 bulan | `insider_idx_12m_total > 0` |
| `insider_idx_12m_change_vol` | Perubahan volume insider IDX 12 bulan | `insider_idx_12m_change_vol > 0` |
| `insider_idx_12m_change_pct` | Perubahan persentase insider IDX 12 bulan | `insider_idx_12m_change_pct > 0` |
| `insider_idx_12m_avg_price` | Harga rata-rata insider IDX 12 bulan | `close > insider_idx_12m_avg_price` |
| `insider_one_1m_total` | Total data insider ONE 1 bulan | `insider_one_1m_total > 0` |
| `insider_one_1m_change_scrip` | Perubahan saham warkat insider ONE 1 bulan | `insider_one_1m_change_scrip > 0` |
| `insider_one_1m_change_scripless` | Perubahan saham scripless insider ONE 1 bulan | `insider_one_1m_change_scripless > 0` |
| `insider_one_1m_change_total` | Perubahan total insider ONE 1 bulan | `insider_one_1m_change_total > 0` |
| `insider_one_1m_change_pct` | Perubahan persentase insider ONE 1 bulan | `insider_one_1m_change_pct > 0` |
| `insider_one_3m_total` | Total data insider ONE 3 bulan | `insider_one_3m_total > 0` |
| `insider_one_3m_change_scrip` | Perubahan saham warkat insider ONE 3 bulan | `insider_one_3m_change_scrip > 0` |
| `insider_one_3m_change_scripless` | Perubahan saham scripless insider ONE 3 bulan | `insider_one_3m_change_scripless > 0` |
| `insider_one_3m_change_total` | Perubahan total insider ONE 3 bulan | `insider_one_3m_change_total > 0` |
| `insider_one_3m_change_pct` | Perubahan persentase insider ONE 3 bulan | `insider_one_3m_change_pct > 0` |
| `insider_one_6m_total` | Total data insider ONE 6 bulan | `insider_one_6m_total > 0` |
| `insider_one_6m_change_scrip` | Perubahan saham warkat insider ONE 6 bulan | `insider_one_6m_change_scrip > 0` |
| `insider_one_6m_change_scripless` | Perubahan saham scripless insider ONE 6 bulan | `insider_one_6m_change_scripless > 0` |
| `insider_one_6m_change_total` | Perubahan total insider ONE 6 bulan | `insider_one_6m_change_total > 0` |
| `insider_one_6m_change_pct` | Perubahan persentase insider ONE 6 bulan | `insider_one_6m_change_pct > 0` |
| `insider_one_12m_total` | Total data insider ONE 12 bulan | `insider_one_12m_total > 0` |
| `insider_one_12m_change_scrip` | Perubahan saham warkat insider ONE 12 bulan | `insider_one_12m_change_scrip > 0` |
| `insider_one_12m_change_scripless` | Perubahan saham scripless insider ONE 12 bulan | `insider_one_12m_change_scripless > 0` |
| `insider_one_12m_change_total` | Perubahan total insider ONE 12 bulan | `insider_one_12m_change_total > 0` |
| `insider_one_12m_change_pct` | Perubahan persentase insider ONE 12 bulan | `insider_one_12m_change_pct > 0` |

## Fundamental

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `debt_equity` | Rasio hutang terhadap ekuitas | `debt_equity < 1` |
| `ebitda` | EBITDA | `ebitda > 0` |
| `eps` | Laba per saham | `eps > 0` |
| `ev_ebitda` | Rasio EV terhadap EBITDA | `ev_ebitda < 10` |
| `netprofit` | Laba bersih | `netprofit > 0` |
| `pbv` | Price to Book Value | `pbv < 3` |
| `per` | Price to Earnings Ratio | `per < 15` |
| `revenue` | Pendapatan | `revenue > 1000000000000` |
| `roa` | Return on Assets | `roa > 5` |
| `roe` | Return on Equity | `roe > 10` |
| `shares` | Jumlah saham beredar | `shares > 1000000000` |
| `market_cap` | Kapitalisasi pasar | `market_cap > 1000000000000` |
| `ebitda_anl` | EBITDA annualized | `ebitda_anl > 0` |
| `eps_anl` | EPS annualized | `eps_anl > 0` |
| `netprofit_anl` | Laba bersih annualized | `netprofit_anl > 0` |
| `revenue_anl` | Pendapatan annualized | `revenue_anl > revenue` |
| `roa_anl` | ROA annualized | `roa_anl > 5` |
| `roe_anl` | ROE annualized | `roe_anl > 10` |
| `pbv_anl` | PBV annualized | `pbv_anl < 3` |
| `per_anl` | PER annualized | `per_anl < 15` |
| `ev_ebitda_anl` | EV/EBITDA annualized | `ev_ebitda_anl < 10` |
| `prev_debt_equity` | Debt to equity periode sebelumnya | `debt_equity < prev_debt_equity` |
| `prev_ebitda` | EBITDA periode sebelumnya | `ebitda > prev_ebitda` |
| `prev_eps` | EPS periode sebelumnya | `eps > prev_eps` |
| `prev_netprofit` | Laba bersih periode sebelumnya | `netprofit > prev_netprofit` |
| `prev_pbv` | PBV periode sebelumnya | `pbv < prev_pbv` |
| `prev_per` | PER periode sebelumnya | `per < prev_per` |
| `prev_revenue` | Revenue periode sebelumnya | `revenue > prev_revenue` |
| `prev_roa` | ROA periode sebelumnya | `roa > prev_roa` |
| `prev_roe` | ROE periode sebelumnya | `roe > prev_roe` |
| `prev_shares` | Jumlah saham beredar periode sebelumnya | `shares == prev_shares` |

## Broker Summary

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `broker_buyer_total` | Jumlah broker yang membeli | `broker_buyer_total > 20` |
| `broker_seller_total` | Jumlah broker yang menjual | `broker_seller_total < 20` |
| `net_broker_buyer_total` | Jumlah broker net buy | `net_broker_buyer_total > net_broker_seller_total` |
| `net_broker_seller_total` | Jumlah broker net sell | `net_broker_seller_total < net_broker_buyer_total` |
| `top1_net_broker_buyer_volume` | Volume net buy broker peringkat 1 | `top1_net_broker_buyer_volume > 10000000` |
| `top1_net_broker_buyer_value` | Nilai net buy broker peringkat 1 | `top1_net_broker_buyer_value > 10000000000` |
| `top1_net_broker_buyer_avg_price` | Harga rata-rata broker net buy peringkat 1 | `close > top1_net_broker_buyer_avg_price` |
| `top3_net_broker_buyer_volume` | Volume net buy top 3 broker | `top3_net_broker_buyer_volume > 20000000` |
| `top3_net_broker_buyer_value` | Nilai net buy top 3 broker | `top3_net_broker_buyer_value > 20000000000` |
| `top3_net_broker_buyer_avg_price` | Harga rata-rata top 3 broker net buy | `close > top3_net_broker_buyer_avg_price` |
| `top5_net_broker_buyer_volume` | Volume net buy top 5 broker | `top5_net_broker_buyer_volume > 30000000` |
| `top5_net_broker_buyer_value` | Nilai net buy top 5 broker | `top5_net_broker_buyer_value > 30000000000` |
| `top5_net_broker_buyer_avg_price` | Harga rata-rata top 5 broker net buy | `close > top5_net_broker_buyer_avg_price` |
| `top10_net_broker_buyer_volume` | Volume net buy top 10 broker | `top10_net_broker_buyer_volume > 50000000` |
| `top10_net_broker_buyer_value` | Nilai net buy top 10 broker | `top10_net_broker_buyer_value > 50000000000` |
| `top10_net_broker_buyer_avg_price` | Harga rata-rata top 10 broker net buy | `close > top10_net_broker_buyer_avg_price` |
| `top1_net_broker_seller_volume` | Volume net sell broker peringkat 1 | `top1_net_broker_seller_volume < 10000000` |
| `top1_net_broker_seller_value` | Nilai net sell broker peringkat 1 | `top1_net_broker_seller_value < 10000000000` |
| `top1_net_broker_seller_avg_price` | Harga rata-rata broker net sell peringkat 1 | `close < top1_net_broker_seller_avg_price` |
| `top3_net_broker_seller_volume` | Volume net sell top 3 broker | `top3_net_broker_seller_volume < top3_net_broker_buyer_volume` |
| `top3_net_broker_seller_value` | Nilai net sell top 3 broker | `top3_net_broker_seller_value < top3_net_broker_buyer_value` |
| `top3_net_broker_seller_avg_price` | Harga rata-rata top 3 broker net sell | `close < top3_net_broker_seller_avg_price` |
| `top5_net_broker_seller_volume` | Volume net sell top 5 broker | `top5_net_broker_seller_volume < top5_net_broker_buyer_volume` |
| `top5_net_broker_seller_value` | Nilai net sell top 5 broker | `top5_net_broker_seller_value < top5_net_broker_buyer_value` |
| `top5_net_broker_seller_avg_price` | Harga rata-rata top 5 broker net sell | `close < top5_net_broker_seller_avg_price` |
| `top10_net_broker_seller_volume` | Volume net sell top 10 broker | `top10_net_broker_seller_volume < top10_net_broker_buyer_volume` |
| `top10_net_broker_seller_value` | Nilai net sell top 10 broker | `top10_net_broker_seller_value < top10_net_broker_buyer_value` |
| `top10_net_broker_seller_avg_price` | Harga rata-rata top 10 broker net sell | `close < top10_net_broker_seller_avg_price` |
| `top_broker_hist` | Histogram top broker | `top_broker_hist > 0` |
| `foreign_hist` | Histogram foreign | `foreign_hist > 0` |

## Advanced Broker Analysis

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `total_buy_vol` | Total volume beli broker | `total_buy_vol > total_sell_vol` |
| `total_sell_vol` | Total volume jual broker | `total_sell_vol < total_buy_vol` |
| `total_buy_val` | Total nilai beli broker | `total_buy_val > total_sell_val` |
| `total_sell_val` | Total nilai jual broker | `total_sell_val < total_buy_val` |
| `total_buy_freq` | Total frekuensi beli broker | `total_buy_freq > total_sell_freq` |
| `total_sell_freq` | Total frekuensi jual broker | `total_sell_freq < total_buy_freq` |
| `top1_buy_vol` | Volume buy broker peringkat 1 | `top1_buy_vol > 5000000` |
| `top3_buy_vol` | Akumulasi volume buy top 3 broker | `top3_buy_vol > 10000000` |
| `top5_buy_vol` | Akumulasi volume buy top 5 broker | `top5_buy_vol > top5_sell_vol` |
| `top10_buy_vol` | Akumulasi volume buy top 10 broker | `top10_buy_vol > top10_sell_vol` |
| `top1_buy_val` | Nilai buy broker peringkat 1 | `top1_buy_val > 5000000000` |
| `top3_buy_val` | Akumulasi nilai buy top 3 broker | `top3_buy_val > top3_sell_val` |
| `top5_buy_val` | Akumulasi nilai buy top 5 broker | `top5_buy_val > top5_sell_val` |
| `top10_buy_val` | Akumulasi nilai buy top 10 broker | `top10_buy_val > top10_sell_val` |
| `top1_buy_freq` | Frekuensi buy broker peringkat 1 | `top1_buy_freq > 100` |
| `top3_buy_freq` | Akumulasi frekuensi buy top 3 broker | `top3_buy_freq > top3_sell_freq` |
| `top5_buy_freq` | Akumulasi frekuensi buy top 5 broker | `top5_buy_freq > top5_sell_freq` |
| `top10_buy_freq` | Akumulasi frekuensi buy top 10 broker | `top10_buy_freq > top10_sell_freq` |
| `top1_sell_vol` | Volume sell broker peringkat 1 | `top1_sell_vol < top1_buy_vol` |
| `top3_sell_vol` | Akumulasi volume sell top 3 broker | `top3_sell_vol < top3_buy_vol` |
| `top5_sell_vol` | Akumulasi volume sell top 5 broker | `top5_sell_vol < top5_buy_vol` |
| `top10_sell_vol` | Akumulasi volume sell top 10 broker | `top10_sell_vol < top10_buy_vol` |
| `top1_sell_val` | Nilai sell broker peringkat 1 | `top1_sell_val < top1_buy_val` |
| `top3_sell_val` | Akumulasi nilai sell top 3 broker | `top3_sell_val < top3_buy_val` |
| `top5_sell_val` | Akumulasi nilai sell top 5 broker | `top5_sell_val < top5_buy_val` |
| `top10_sell_val` | Akumulasi nilai sell top 10 broker | `top10_sell_val < top10_buy_val` |
| `top1_sell_freq` | Frekuensi sell broker peringkat 1 | `top1_sell_freq < top1_buy_freq` |
| `top3_sell_freq` | Akumulasi frekuensi sell top 3 broker | `top3_sell_freq < top3_buy_freq` |
| `top5_sell_freq` | Akumulasi frekuensi sell top 5 broker | `top5_sell_freq < top5_buy_freq` |
| `top10_sell_freq` | Akumulasi frekuensi sell top 10 broker | `top10_sell_freq < top10_buy_freq` |
| `top1_buyer_dominance_ratio` | Dominasi buyer peringkat 1 | `top1_buyer_dominance_ratio > 0.2` |
| `top5_buyer_dominance_ratio` | Dominasi top 5 buyer | `top5_buyer_dominance_ratio > 0.3` |
| `top10_buyer_dominance_ratio` | Dominasi top 10 buyer | `top10_buyer_dominance_ratio > 0.5` |
| `top1_seller_dominance_ratio` | Dominasi seller peringkat 1 | `top1_seller_dominance_ratio < 0.2` |
| `top5_seller_dominance_ratio` | Dominasi top 5 seller | `top5_seller_dominance_ratio < 0.3` |
| `top10_seller_dominance_ratio` | Dominasi top 10 seller | `top10_seller_dominance_ratio < 0.5` |
| `buyer_concentration_index` | Konsentrasi akumulasi buyer | `buyer_concentration_index > 0.5` |
| `seller_concentration_index` | Konsentrasi distribusi seller | `seller_concentration_index < 0.5` |
| `accumulation_pressure` | Tekanan akumulasi | `accumulation_pressure > 0` |
| `net_broker_strength_ratio` | Kekuatan bersih broker | `net_broker_strength_ratio > 0.3` |
| `smart_money_intensity` | Intensitas smart money | `smart_money_intensity > 0.4` |
| `avg_order_size_top5_buy` | Rata-rata ukuran order top 5 buyer | `avg_order_size_top5_buy > avg_order_size_top5_sell` |
| `avg_order_size_top5_sell` | Rata-rata ukuran order top 5 seller | `avg_order_size_top5_sell < avg_order_size_top5_buy` |
| `institutional_bias_score` | Skor kecenderungan institusional | `institutional_bias_score > 0.5` |

---

## Quick Prompt Hints for AI

- Gunakan variabel harga untuk konteks arah pergerakan.
- Gunakan variabel flow, broker, dan insider untuk konteks akumulasi atau distribusi.
- Gunakan variabel fundamental untuk konteks valuasi dan kualitas bisnis.
- Gunakan variabel previous session untuk membandingkan kondisi saat ini dengan sesi sebelumnya.
