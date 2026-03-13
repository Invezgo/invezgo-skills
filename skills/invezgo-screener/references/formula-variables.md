# Formula Variables Reference

Dokumen ini merangkum variables dan functions yang tersedia untuk formula screener Invezgo.
Referensi ini disimpan lokal di skill agar tidak bergantung pada repo lain.

## Daftar Isi

- Data realtime dari vendor API
- Data historis dari database cache harian
- Perubahan multi-hari dengan fungsi dinamis
- Data pemegang saham
- Pivot points
- Fibonacci levels
- Data KSEI
- Data fundamental
- Fungsi technical analysis
- Operator yang didukung
- Contoh formula
- Catatan penting

---

## 📊 Data Realtime (dari Vendor API)

Data yang diambil secara realtime setiap 1 menit selama jam trading.

### Harga Dasar

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `close` | Decimal | Harga terakhir/penutupan saat ini |
| `open` | Decimal | Harga pembukaan hari ini |
| `high` | Decimal | Harga tertinggi hari ini |
| `low` | Decimal | Harga terendah hari ini |
| `avg` | Decimal | Harga rata-rata hari ini |
| `prev` | Decimal | Harga penutupan hari sebelumnya |

### Volume dan Transaksi

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `volume` | Integer | Volume transaksi dalam lot |
| `value` | Integer | Nilai transaksi dalam Rupiah |
| `freq` | Integer | Frekuensi/jumlah transaksi |

### Perubahan Harga (Calculated)

| Variable | Tipe | Deskripsi | Formula |
|----------|------|-----------|---------|
| `change` | Decimal | Perubahan harga nominal | `close - prev` |
| `change_pct` | Decimal | Perubahan harga dalam persen | `(close - prev) / prev * 100` |

### Bid/Offer (Antrian Beli/Jual)

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `best_bid_price` | Decimal | Harga bid terbaik (antrian beli tertinggi) |
| `best_bid_volume` | Integer | Volume pada harga bid terbaik |
| `best_offer_price` | Decimal | Harga offer terbaik (antrian jual terendah) |
| `best_offer_volume` | Integer | Volume pada harga offer terbaik |
| `iep` | Decimal | Indicative Equilibrium Price (harga keseimbangan pre-opening) |
| `iev` | Integer | Indicative Equilibrium Volume |

### Order Book Depth (Kedalaman Antrian)

Data order book diambil dari API obx2 dan menyediakan informasi kedalaman antrian beli/jual hingga 30 level.

#### Fungsi Level Tertentu

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `bid_volume(n)` | Volume pada bid di harga terbaik ke-n (dalam lot) | `bid_volume(1)`, `bid_volume(5)` |
| `bid_freq(n)` | Frekuensi order pada bid di harga terbaik ke-n | `bid_freq(1)`, `bid_freq(3)` |
| `offer_volume(n)` | Volume pada offer di harga terbaik ke-n (dalam lot) | `offer_volume(1)`, `offer_volume(5)` |
| `offer_freq(n)` | Frekuensi order pada offer di harga terbaik ke-n | `offer_freq(1)`, `offer_freq(3)` |

**Note:** n adalah 1-indexed, dimana n=1 adalah harga terbaik (best bid/offer).

#### Fungsi Penjumlahan (Sum)

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `sum_bid_volume(n)` | Total volume pada bid di n harga terbaik | `sum_bid_volume(5)` |
| `sum_bid_freq(n)` | Total frekuensi order pada bid di n harga terbaik | `sum_bid_freq(5)` |
| `sum_offer_volume(n)` | Total volume pada offer di n harga terbaik | `sum_offer_volume(5)` |
| `sum_offer_freq(n)` | Total frekuensi order pada offer di n harga terbaik | `sum_offer_freq(5)` |

#### Variable Total (Semua Level)

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `all_bid_volume` | Decimal | Total volume pada bid di semua harga (dalam lot) |
| `all_bid_freq` | Integer | Frekuensi order pada bid di semua harga |
| `all_offer_volume` | Decimal | Total volume pada offer di semua harga (dalam lot) |
| `all_offer_freq` | Integer | Frekuensi order pada offer di semua harga |

#### Contoh Penggunaan Order Book

```
# Cari saham dengan bid volume di harga terbaik lebih besar dari offer
bid_volume(1) > offer_volume(1)

# Cari saham dengan total antrian beli (5 level) lebih besar dari jual
sum_bid_volume(5) > sum_offer_volume(5)

# Cari saham dengan banyak order di antrian beli
all_bid_freq > 100

# Kombinasi dengan kriteria lain
bid_volume(1) > 1000 && change_pct > 0 && volume > 100000

# Rasio bid/offer volume
sum_bid_volume(5) / sum_offer_volume(5) > 1.5
```

### Broker Summary Data (broker_* functions)

Data ringkasan aktivitas broker diambil dari tabel `stock_broksums` yang berisi data akumulasi transaksi broker per saham per hari.

#### Fungsi broker_sum_value

Menghitung total nilai transaksi (dalam Rupiah) dari broker tertentu dalam n hari terakhir.

**Syntax:** `broker_sum_value("action", "broker_code", "investor_type", "market_type", n)`

| Parameter | Deskripsi | Nilai yang Didukung |
|-----------|-----------|---------------------|
| `action` | Tipe aksi | `"buy"`, `"sell"`, `"net"` |
| `broker_code` | Kode broker 2 karakter | `"BK"`, `"YP"`, `"KK"`, `"RG"`, dll. |
| `investor_type` | Tipe investor | `"f"` (foreign), `"d"` (domestic), `"all"` (semua) |
| `market_type` | Tipe market | `"RG"` (Regular), `"NG"` (Nego), `"TN"` (Tunai), `"ALL"` (Semua market digabung) |
| `n` | Periode dalam hari | 1-365 |

**Contoh:**
```
# Total net value oleh broker BK (foreign) di market regular dalam 50 hari
broker_sum_value("net", "BK", "f", "RG", 50)

# Total buy value oleh broker YP (domestic) di semua market dalam 30 hari
broker_sum_value("buy", "YP", "d", "ALL", 30)

# Total sell value oleh broker KK (foreign) dalam 20 hari
broker_sum_value("sell", "KK", "f", "RG", 20)
```

#### Fungsi broker_avg_value

Menghitung rata-rata nilai transaksi harian (dalam Rupiah) dari broker tertentu dalam n hari terakhir.

**Syntax:** `broker_avg_value("action", "broker_code", "investor_type", "market_type", n)`

**Parameter:** Sama dengan `broker_sum_value`

**Contoh:**
```
# Rata-rata net value harian oleh broker RG (foreign) dalam 30 hari
broker_avg_value("net", "RG", "f", "RG", 30)
```

#### Fungsi broker_sum_volume

Menghitung total volume transaksi (dalam lot) dari broker tertentu dalam n hari terakhir.

**Syntax:** `broker_sum_volume("action", "broker_code", "investor_type", "market_type", n)`

**Parameter:** Sama dengan `broker_sum_value`

**Contoh:**
```
# Total net volume oleh broker BK (foreign) dalam 50 hari
broker_sum_volume("net", "BK", "f", "RG", 50)
```

#### Fungsi broker_avg_volume

Menghitung rata-rata volume transaksi harian (dalam lot) dari broker tertentu dalam n hari terakhir.

**Syntax:** `broker_avg_volume("action", "broker_code", "investor_type", "market_type", n)`

**Parameter:** Sama dengan `broker_sum_value`

**Contoh:**
```
# Rata-rata net volume harian oleh broker YP (domestic) dalam 20 hari
broker_avg_volume("net", "YP", "d", "RG", 20)
```

#### Top 30 Brokers (Pre-loaded)

Broker berikut di-cache saat startup untuk performa optimal:
- BK, YP, KK, RG, NI, PD, AI, CC, KZ, MS
- CG, KS, TP, JK, XA, MI, DB, GR, ZP, DH
- CS, AF, OD, YU, XX, WH, FZ, LG, PS, IF

Broker lain akan di-load on-demand saat digunakan dalam formula.

#### Contoh Penggunaan Broker Functions

```
# Cari saham yang diakumulasi besar oleh broker BK (foreign) dalam 50 hari
broker_sum_value("net", "BK", "f", "RG", 50) > 10000000000

# Cari saham dengan buying dominasi oleh YP (domestic)
broker_sum_volume("buy", "YP", "d", "RG", 30) > broker_sum_volume("sell", "YP", "d", "RG", 30)

# Kombinasi broker dengan TA: RSI oversold + akumulasi broker asing
rsi(14) < 30 && broker_sum_value("net", "BK", "f", "RG", 30) > 0

# Kombinasi broker dengan fundamental: PER murah + akumulasi institusi
per < 15 && broker_sum_value("net", "KK", "f", "RG", 50) > 5000000000

# Multiple broker analysis: net combined dari 2 broker besar
(broker_sum_value("net", "BK", "f", "RG", 30) + broker_sum_value("net", "YP", "f", "RG", 30)) > 15000000000
```

#### Performance Notes

1. **TOP Brokers**: 30 broker teratas di-cache saat startup (~300MB memory) untuk akses sangat cepat
2. **On-demand Loading**: Broker lain di-load saat pertama kali digunakan
3. **Sync Access**: Menggunakan DashMap lock-free untuk akses paralel yang sangat cepat
4. **Pre-loading**: Broker yang dibutuhkan dalam formula di-load sebelum evaluasi paralel

### Broker Summary Aggregated Data (from stock_screener_broksums)

Data agregasi broker summary yang sudah diproses dan tersedia sebagai variable langsung. Data ini diambil dari tabel `stock_screener_broksums`.

#### Broker Total

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `broker_buyer_total` | Integer | Total jumlah broker yang melakukan pembelian |
| `broker_seller_total` | Integer | Total jumlah broker yang melakukan penjualan |
| `net_broker_buyer_total` | Integer | Jumlah broker dengan net buy (beli > jual) |
| `net_broker_seller_total` | Integer | Jumlah broker dengan net sell (jual > beli) |

#### Top Net Broker Buyer

Data agregasi dari top broker pembeli bersih (net buyer).

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `top1_net_broker_buyer_volume` | Integer | Volume net beli dari top 1 broker buyer (lembar) |
| `top1_net_broker_buyer_value` | Integer | Nilai net beli dari top 1 broker buyer (Rupiah) |
| `top1_net_broker_buyer_avg_price` | Decimal | Harga rata-rata beli dari top 1 broker buyer |
| `top3_net_broker_buyer_volume` | Integer | Total volume net beli dari top 3 broker buyer (lembar) |
| `top3_net_broker_buyer_value` | Integer | Total nilai net beli dari top 3 broker buyer (Rupiah) |
| `top3_net_broker_buyer_avg_price` | Decimal | Harga rata-rata beli dari top 3 broker buyer |
| `top5_net_broker_buyer_volume` | Integer | Total volume net beli dari top 5 broker buyer (lembar) |
| `top5_net_broker_buyer_value` | Integer | Total nilai net beli dari top 5 broker buyer (Rupiah) |
| `top5_net_broker_buyer_avg_price` | Decimal | Harga rata-rata beli dari top 5 broker buyer |
| `top10_net_broker_buyer_volume` | Integer | Total volume net beli dari top 10 broker buyer (lembar) |
| `top10_net_broker_buyer_value` | Integer | Total nilai net beli dari top 10 broker buyer (Rupiah) |
| `top10_net_broker_buyer_avg_price` | Decimal | Harga rata-rata beli dari top 10 broker buyer |

#### Top Net Broker Seller

Data agregasi dari top broker penjual bersih (net seller).

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `top1_net_broker_seller_volume` | Integer | Volume net jual dari top 1 broker seller (lembar) |
| `top1_net_broker_seller_value` | Integer | Nilai net jual dari top 1 broker seller (Rupiah) |
| `top1_net_broker_seller_avg_price` | Decimal | Harga rata-rata jual dari top 1 broker seller |
| `top3_net_broker_seller_volume` | Integer | Total volume net jual dari top 3 broker seller (lembar) |
| `top3_net_broker_seller_value` | Integer | Total nilai net jual dari top 3 broker seller (Rupiah) |
| `top3_net_broker_seller_avg_price` | Decimal | Harga rata-rata jual dari top 3 broker seller |
| `top5_net_broker_seller_volume` | Integer | Total volume net jual dari top 5 broker seller (lembar) |
| `top5_net_broker_seller_value` | Integer | Total nilai net jual dari top 5 broker seller (Rupiah) |
| `top5_net_broker_seller_avg_price` | Decimal | Harga rata-rata jual dari top 5 broker seller |
| `top10_net_broker_seller_volume` | Integer | Total volume net jual dari top 10 broker seller (lembar) |
| `top10_net_broker_seller_value` | Integer | Total nilai net jual dari top 10 broker seller (Rupiah) |
| `top10_net_broker_seller_avg_price` | Decimal | Harga rata-rata jual dari top 10 broker seller |

#### Histograms

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `top_broker_hist` | Integer | Histogram akumulasi top broker |
| `foreign_hist` | Integer | Histogram akumulasi foreign |

#### Contoh Penggunaan Broker Summary Aggregated

```
# Saham dengan dominasi buyer (lebih banyak broker beli dari jual)
net_broker_buyer_total > net_broker_seller_total

# Top 1 broker buyer dengan akumulasi besar (> 10 miliar)
top1_net_broker_buyer_value > 10000000000

# Top 5 broker buyer akumulasi lebih besar dari top 5 seller
top5_net_broker_buyer_value > top5_net_broker_seller_value

# Volume top 10 buyer signifikan (> 100 juta lembar)
top10_net_broker_buyer_volume > 100000000

# Kombinasi dengan TA: RSI oversold + akumulasi top broker
rsi(14) < 30 && top3_net_broker_buyer_value > 5000000000

# Saham dengan banyak broker pembeli
broker_buyer_total > 50 && net_broker_buyer_total > 30

# Top broker buyer dengan harga rata-rata di bawah harga saat ini (averaging down)
top5_net_broker_buyer_avg_price < close

# Foreign histogram positif dengan akumulasi top broker
foreign_hist > 0 && top_broker_hist > 0

# Kombinasi fundamental + broker summary
per < 15 && top10_net_broker_buyer_value > top10_net_broker_seller_value
```

### Data Hari Sebelumnya (Previous Day)

Data OHLCV dari hari trading sebelumnya (H-1). **Saat jam trading realtime**, nilai `prev_*` diambil dari kolom **hari ini** di `stock_screener_prices` (`open`, `high`, `low`, `close`, `volume`, `value`) karena data screener adalah H-1 relatif terhadap data vendor realtime (H-0).

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `prev_open` | Decimal | Harga pembukaan hari sebelumnya |
| `prev_high` | Decimal | Harga tertinggi hari sebelumnya |
| `prev_low` | Decimal | Harga terendah hari sebelumnya |
| `prev_close` | Decimal | Harga penutupan hari sebelumnya |
| `prev_volume` | Integer | Volume transaksi hari sebelumnya |
| `prev_value` | Integer | Nilai transaksi hari sebelumnya |

---

## 📈 Data Historis (dari Database - Cache Harian)

Data yang di-cache sekali sehari dari database PostgreSQL.

### Flow Data (Arus Dana)

| Variable | Tipe | Deskripsi |
|----------|------|-----------|
| `foreign_flow` | Decimal | Net foreign flow hari ini (Foreign Buy - Foreign Sell) |
| `bdm_flow` | Decimal | Net bandar flow hari ini |
| `ritel_flow` | Decimal | Net ritel flow hari ini |
| `bdm` | Decimal | Posisi akumulasi bandar |
| `ritel` | Decimal | Posisi akumulasi ritel |
| `foreign` | Decimal | Posisi akumulasi foreign |
| `ratio` | Decimal | Rasio bandar/ritel |
| `prev_freq` | Integer | Frekuensi dari screener (hari sebelumnya) |
| `prev_bdm` | Decimal | Posisi akumulasi bandar hari sebelumnya |
| `prev_ritel` | Decimal | Posisi akumulasi ritel hari sebelumnya |
| `prev_foreign` | Decimal | Posisi akumulasi foreign hari sebelumnya |
| `prev_ratio` | Decimal | Rasio bandar/ritel hari sebelumnya |
| `freq_analyzer` | Decimal | Frequency Analyzer (volume / freq³) - Dihitung Realtime |

---


## 📉 Perubahan Multi-Hari (Fungsi Dinamis)

Gunakan fungsi `change()` dan `change_pct()` untuk menghitung perubahan nilai dari data historis dengan periode yang fleksibel.

**Note:** Fungsi ini menggabungkan data realtime dengan data historis `stock_prices` (max 200 hari). Data realtime ditambahkan sebagai data terbaru jika tersedia.

### Fungsi change("field", n)

Menghitung perubahan absolut nilai `field` dalam n hari terakhir.

**Formula:** `current_value - value_n_days_ago`

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `change("close", n)` | Perubahan harga close n hari | `change("close", 7)` |
| `change("open", n)` | Perubahan harga open n hari | `change("open", 5)` |
| `change("high", n)` | Perubahan harga high n hari | `change("high", 20)` |
| `change("low", n)` | Perubahan harga low n hari | `change("low", 20)` |
| `change("volume", n)` | Perubahan volume n hari | `change("volume", 7)` |
| `change("value", n)` | Perubahan value n hari | `change("value", 7)` |
| `change("foreign", n)` | Perubahan foreign n hari | `change("foreign", 30)` |
| `change("freq", n)` | Perubahan frekuensi n hari | `change("freq", 7)` |
| `change("bdm", n)` | Perubahan posisi bandar n hari | `change("bdm", 30)` |
| `change("ritel", n)` | Perubahan posisi ritel n hari | `change("ritel", 30)` |
| `change("ratio", n)` | Perubahan rasio n hari | `change("ratio", 15)` |
| `change("freq_analyzer", n)` | Perubahan freq_analyzer n hari | `change("freq_analyzer", 7)` |

### Fungsi change_pct("field", n)

Menghitung perubahan persentase nilai `field` dalam n hari terakhir.

**Formula:** `((current_value - value_n_days_ago) / value_n_days_ago) * 100`

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `change_pct("close", n)` | Perubahan harga close n hari (%) | `change_pct("close", 7)` |
| `change_pct("open", n)` | Perubahan harga open n hari (%) | `change_pct("open", 5)` |
| `change_pct("high", n)` | Perubahan harga high n hari (%) | `change_pct("high", 20)` |
| `change_pct("low", n)` | Perubahan harga low n hari (%) | `change_pct("low", 20)` |
| `change_pct("volume", n)` | Perubahan volume n hari (%) | `change_pct("volume", 7)` |
| `change_pct("value", n)` | Perubahan value n hari (%) | `change_pct("value", 7)` |
| `change_pct("foreign", n)` | Perubahan foreign n hari (%) | `change_pct("foreign", 30)` |
| `change_pct("freq", n)` | Perubahan frekuensi n hari (%) | `change_pct("freq", 7)` |
| `change_pct("bdm", n)` | Perubahan posisi bandar n hari (%) | `change_pct("bdm", 30)` |
| `change_pct("ritel", n)` | Perubahan posisi ritel n hari (%) | `change_pct("ritel", 30)` |
| `change_pct("ratio", n)` | Perubahan rasio n hari (%) | `change_pct("ratio", 15)` |
| `change_pct("freq_analyzer", n)` | Perubahan freq_analyzer n hari (%) | `change_pct("freq_analyzer", 7)` |

### Contoh Penggunaan

```
# Saham yang naik lebih dari 5% dalam 7 hari
change_pct("close", 7) > 5

# Volume hari ini lebih besar 100% dari 5 hari lalu
change_pct("volume", 5) > 100

# Foreign naik 10M dalam 30 hari
change("foreign", 30) > 10000000

# Kombinasi: Harga naik 10% dalam 30 hari dengan foreign masuk
change_pct("close", 30) > 10 && change("foreign", 30) > 0
```

---

## 👥 Data Pemegang Saham (Shareholders)

| Variable | Deskripsi |
|----------|-----------|
| `shareholder` | Jumlah total pemegang saham |
| `change_1m_shareholder` | Perubahan jumlah pemegang saham 1 bulan (%) |
| `change_3m_shareholder` | Perubahan jumlah pemegang saham 3 bulan (%) |
| `change_6m_shareholder` | Perubahan jumlah pemegang saham 6 bulan (%) |
| `change_12m_shareholder` | Perubahan jumlah pemegang saham 12 bulan (%) |

---

## 📍 Pivot Points

| Variable | Deskripsi |
|----------|-----------|
| `pivot_point` | Titik pivot utama |
| `resistance_1` | Level resistance pertama (R1) |
| `resistance_2` | Level resistance kedua (R2) |
| `resistance_3` | Level resistance ketiga (R3) |
| `support_1` | Level support pertama (S1) |
| `support_2` | Level support kedua (S2) |
| `support_3` | Level support ketiga (S3) |

---

## 📐 Fibonacci Levels

### Fibonacci Retracement 20 Hari

| Variable | Deskripsi |
|----------|-----------|
| `fib_23_6_20d` | Level Fibonacci 23.6% (20 hari) |
| `fib_38_2_20d` | Level Fibonacci 38.2% (20 hari) |
| `fib_50_0_20d` | Level Fibonacci 50.0% (20 hari) |
| `fib_61_8_20d` | Level Fibonacci 61.8% (20 hari) |
| `fib_78_6_20d` | Level Fibonacci 78.6% (20 hari) |

### Fibonacci Retracement 50 Hari

| Variable | Deskripsi |
|----------|-----------|
| `fib_23_6_50d` | Level Fibonacci 23.6% (50 hari) |
| `fib_38_2_50d` | Level Fibonacci 38.2% (50 hari) |
| `fib_50_0_50d` | Level Fibonacci 50.0% (50 hari) |
| `fib_61_8_50d` | Level Fibonacci 61.8% (50 hari) |
| `fib_78_6_50d` | Level Fibonacci 78.6% (50 hari) |

---

## 🏦 Data KSEI (Tipe Investor)

### Free Float

| Variable | Deskripsi |
|----------|-----------|
| `free_float` | Jumlah saham yang bebas diperdagangkan |
| `prev_free_float` | Free float periode sebelumnya |
| `free_float_pct` | Persentase free float terhadap total saham beredar (free_float / shares × 100) |
| `prev_free_float_pct` | Persentase free float periode sebelumnya (prev_free_float / prev_shares × 100) |

### Kepemilikan Lokal

| Variable | Kode | Deskripsi |
|----------|------|-----------|
| `local_is` | IS | Insurance (Asuransi) |
| `local_cp` | CP | Corporation (Perusahaan) |
| `local_pf` | PF | Pension Fund (Dana Pensiun) |
| `local_ib` | IB | Investment Bank (Bank Investasi) |
| `local_id` | ID | Individual (Perorangan) |
| `local_mf` | MF | Mutual Fund (Reksa Dana) |
| `local_sc` | SC | Securities Company (Sekuritas) |
| `local_fd` | FD | Foundation (Yayasan) |
| `local_ot` | OT | Others (Lainnya) |

### Kepemilikan Asing

| Variable | Kode | Deskripsi |
|----------|------|-----------|
| `foreign_is` | IS | Insurance (Asuransi Asing) |
| `foreign_cp` | CP | Corporation (Perusahaan Asing) |
| `foreign_pf` | PF | Pension Fund (Dana Pensiun Asing) |
| `foreign_ib` | IB | Investment Bank (Bank Investasi Asing) |
| `foreign_id` | ID | Individual (Perorangan Asing) |
| `foreign_mf` | MF | Mutual Fund (Reksa Dana Asing) |
| `foreign_sc` | SC | Securities Company (Sekuritas Asing) |
| `foreign_fd` | FD | Foundation (Yayasan Asing) |
| `foreign_ot` | OT | Others (Lainnya Asing) |

### Perubahan Kepemilikan Lokal ID (Individual)

| Variable | Deskripsi |
|----------|-----------|
| `change_1m_local_id` | Perubahan kepemilikan lokal individual 1 bulan |
| `change_3m_local_id` | Perubahan kepemilikan lokal individual 3 bulan |
| `change_6m_local_id` | Perubahan kepemilikan lokal individual 6 bulan |
| `change_12m_local_id` | Perubahan kepemilikan lokal individual 12 bulan |

### Perubahan Kepemilikan Asing ID (Individual)

| Variable | Deskripsi |
|----------|-----------|
| `change_1m_foreign_id` | Perubahan kepemilikan asing individual 1 bulan |
| `change_3m_foreign_id` | Perubahan kepemilikan asing individual 3 bulan |
| `change_6m_foreign_id` | Perubahan kepemilikan asing individual 6 bulan |
| `change_12m_foreign_id` | Perubahan kepemilikan asing individual 12 bulan |

### Perubahan Kepemilikan Lokal MF (Mutual Fund)

| Variable | Deskripsi |
|----------|-----------|
| `change_1m_local_mf` | Perubahan kepemilikan reksa dana lokal 1 bulan |
| `change_3m_local_mf` | Perubahan kepemilikan reksa dana lokal 3 bulan |
| `change_6m_local_mf` | Perubahan kepemilikan reksa dana lokal 6 bulan |
| `change_12m_local_mf` | Perubahan kepemilikan reksa dana lokal 12 bulan |

---

## 💰 Data Fundamental (Keystats)

### Rasio Keuangan Saat Ini (Quarterly)

| Variable | Deskripsi |
|----------|-----------|
| `debt_equity` | Debt to Equity Ratio (Rasio Hutang terhadap Ekuitas) |
| `ebitda` | EBITDA (Laba sebelum bunga, pajak, depresiasi, amortisasi) |
| `eps` | Earnings Per Share (Laba per saham) |
| `ev_ebitda` | Enterprise Value / EBITDA |
| `netprofit` | Net Profit (Laba Bersih) |
| `pbv` | Price to Book Value (Harga terhadap Nilai Buku) |
| `per` | Price to Earnings Ratio (PER) |
| `revenue` | Revenue (Pendapatan) |
| `roa` | Return on Assets (%) |
| `roe` | Return on Equity (%) |
| `shares` | Jumlah Saham Beredar |
| `market_cap` | Market Cap (shares × close realtime) |

### Rasio Keuangan Annualized (Tahunan)

Data kuartalan yang diannualisasi untuk perbandingan setahun penuh.

| Variable | Deskripsi |
|----------|-----------|
| `ebitda_anl` | EBITDA Annualized |
| `eps_anl` | Earnings Per Share Annualized |
| `netprofit_anl` | Net Profit Annualized |
| `revenue_anl` | Revenue Annualized |
| `roa_anl` | Return on Assets Annualized (%) |
| `roe_anl` | Return on Equity Annualized (%) |
| `pbv_anl` | Price to Book Value Annualized |
| `per_anl` | Price to Earnings Ratio Annualized |
| `ev_ebitda_anl` | Enterprise Value / EBITDA Annualized |

### Rasio Keuangan Periode Sebelumnya

| Variable | Deskripsi |
|----------|-----------|
| `prev_debt_equity` | DER periode sebelumnya |
| `prev_ebitda` | EBITDA periode sebelumnya |
| `prev_eps` | EPS periode sebelumnya |
| `prev_netprofit` | Net Profit periode sebelumnya |
| `prev_pbv` | PBV periode sebelumnya |
| `prev_per` | PER periode sebelumnya |
| `prev_revenue` | Revenue periode sebelumnya |
| `prev_roa` | ROA periode sebelumnya |
| `prev_roe` | ROE periode sebelumnya |
| `prev_shares` | Jumlah Saham Beredar periode sebelumnya |

---

## 📊 Fungsi Technical Analysis (Dinamis)

Fungsi-fungsi berikut dihitung dari data historis `stock_prices` (max 200 hari).
Anda bisa menggunakan period apa saja dari 1-200.

### Moving Averages

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `sma("field", n)` | Simple Moving Average field n periode | `sma("close", 20)`, `sma("volume", 50)` |
| `ema("field", n)` | Exponential Moving Average field n periode | `ema("close", 12)`, `ema("volume", 20)` |
| `wma("field", n)` | Weighted Moving Average field n periode | `wma("close", 20)`, `wma("volume", 10)` |
| `avg("field", n)` | Average field n periode (alias untuk SMA) | `avg("close", 20)`, `avg("volume", 50)` |

**Field yang didukung untuk sma/ema/wma/avg:** `open`, `high`, `low`, `close`, `volume`, `value`, `foreign`, `freq`, `bdm`, `ritel`, `ratio`, `freq_analyzer`

### Mathematical Functions

Fungsi matematika yang dapat digunakan dalam formula:

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `abs(x)` | Nilai absolut | `abs(close - prev)`, `abs(change_pct)` |
| `sqrt(x)` | Akar kuadrat | `sqrt(volume)`, `sqrt(value / freq)` |
| `log(x, base)` | Logaritma dengan basis tertentu | `log(volume, 10)`, `log(value, 2)` |
| `ln(x)` | Natural logarithm (log basis e) | `ln(volume)`, `ln(close / prev)` |
| `pow(x, n)` | Pangkat x^n | `pow(close, 2)`, `pow(volume, 0.5)` |
| `min(a, b)` | Nilai minimum dari dua nilai | `min(open, close)`, `min(high, prev_high)` |
| `max(a, b)` | Nilai maksimum dari dua nilai | `max(open, close)`, `max(low, prev_low)` |
| `floor(x)` | Pembulatan ke bawah | `floor(close / 100)` |
| `ceil(x)` | Pembulatan ke atas | `ceil(volume / 1000)` |
| `round(x)` | Pembulatan ke nilai terdekat | `round(change_pct)` |

### Highest/Lowest

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `hhv("field", n)` | Nilai tertinggi field n periode | `hhv("high", 20)`, `hhv("close", 52)` |
| `llv("field", n)` | Nilai terendah field n periode | `llv("low", 20)`, `llv("close", 52)` |
| `highest("field", n)` | Alias untuk hhv("field", n) | `highest("close", 20)` |
| `lowest("field", n)` | Alias untuk llv("field", n) | `lowest("close", 20)` |

**Field yang didukung untuk hhv/llv/highest/lowest:** `open`, `high`, `low`, `close`, `volume`, `value`, `foreign`, `freq`, `bdm`, `ritel`, `ratio`, `freq_analyzer`

### Rate of Change

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `roc(n)` | Rate of Change n periode (%) | `roc(10)`, `roc(20)` |

### MACD

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `macd(fast, slow)` | MACD Line | `macd(12, 26)` |
| `macd_signal(fast, slow, signal)` | MACD Signal Line | `macd_signal(12, 26, 9)` |
| `macd_histogram(fast, slow, signal)` | MACD Histogram | `macd_histogram(12, 26, 9)` |

### Sum

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `sum("field", n)` | Jumlah field n periode terakhir | `sum("volume", 20)` |

**Field yang didukung untuk sum:** `open`, `high`, `low`, `close`, `volume`, `value`, `foreign`, `freq`, `bdm`, `ritel`, `ratio`, `freq_analyzer`

### VWAP

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `vwap(n)` | Volume Weighted Average Price n periode | `vwap(20)` |

### Volatility

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `atr(n)` | Average True Range n periode | `atr(14)`, `atr(20)` |
| `cci(n)` | Commodity Channel Index n periode | `cci(14)`, `cci(20)` |

### Directional Movement

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `adx(n)` | Average Directional Index n periode | `adx(14)` |
| `pdx(n)` | Plus Directional Indicator (+DI) | `pdx(14)` |
| `ndx(n)` | Minus Directional Indicator (-DI) | `ndx(14)` |

### Stochastic

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `stoch_k(lookback, k_period)` | Stochastic %K | `stoch_k(14, 3)` |
| `stoch_d(lookback, k_period, d_period)` | Stochastic %D | `stoch_d(14, 3, 3)` |

### Bollinger Bands

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `bollinger_top(period, multiplier)` | Bollinger Upper Band | `bollinger_top(20, 2)` |
| `bollinger_bottom(period, multiplier)` | Bollinger Lower Band | `bollinger_bottom(20, 2)` |
| `bollinger_mean(period, multiplier)` | Bollinger Middle Band | `bollinger_mean(20, 2)` |
| `bollinger_bandwidth(period, multiplier)` | Bollinger Bandwidth | `bollinger_bandwidth(20, 2)` |
| `bollinger_percent_b(period, multiplier)` | Bollinger %B | `bollinger_percent_b(20, 2)` |

### Ichimoku Cloud

Indikator Ichimoku Cloud terdiri dari 5 komponen utama:

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `ichimoku_tenkan(n)` | Tenkan-sen (Conversion Line) - (n-period high + n-period low) / 2 | `ichimoku_tenkan(9)` |
| `ichimoku_kijun(n)` | Kijun-sen (Base Line) - (n-period high + n-period low) / 2 | `ichimoku_kijun(26)` |
| `ichimoku_senkou_a(tenkan, kijun)` | Senkou Span A (Leading Span A) - (Tenkan + Kijun) / 2 | `ichimoku_senkou_a(9, 26)` |
| `ichimoku_senkou_b(n)` | Senkou Span B (Leading Span B) - (n-period high + n-period low) / 2 | `ichimoku_senkou_b(52)` |
| `ichimoku_chikou()` | Chikou Span (Lagging Span) - Current close price | `ichimoku_chikou()` |

**Parameter Default Ichimoku:**
- Tenkan-sen: 9 periode
- Kijun-sen: 26 periode
- Senkou Span B: 52 periode

### RSI & Stochastic RSI

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `rsi(n)` | Relative Strength Index n periode | `rsi(14)`, `rsi(7)`, `rsi(21)` |
| `stochrsi(n)` | Stochastic RSI n periode (simple) | `stochrsi(14)` |
| `stochrsi_k(rsi, stoch, k)` | Stochastic RSI %K dengan smoothing | `stochrsi_k(14, 14, 3)` |
| `stochrsi_d(rsi, stoch, k, d)` | Stochastic RSI %D dengan smoothing | `stochrsi_d(14, 14, 3, 3)` |

**Parameter Stochastic RSI:**
- `rsi`: Periode RSI (default 14)
- `stoch`: Periode Stochastic lookback (default 14)
- `k`: Periode smoothing %K (default 3)
- `d`: Periode smoothing %D (default 3)

### Money Flow

| Fungsi | Deskripsi | Contoh |
|--------|-----------|--------|
| `mfi(n)` | Money Flow Index n periode | `mfi(14)`, `mfi(20)` |
| `cmf(n)` | Chaikin Money Flow n periode | `cmf(20)` |
| `obv()` | On Balance Volume (tanpa parameter) | `obv()` |

### Candlestick Pattern Detection

Deteksi pola candlestick secara real-time menggunakan implementasi native (tanpa dependency eksternal). Pattern dideteksi on-the-fly tanpa penyimpanan database untuk performa optimal.

| Fungsi | Deskripsi | Return Value | Contoh |
|--------|-----------|--------------|--------|
| `candle_pattern("pattern_name")` | Deteksi pola candlestick tertentu | `1.0` jika terdeteksi, `0.0` jika tidak | `candle_pattern("hammer")` |

**Pattern yang Tersedia (50+ patterns):**

#### Single-Candle Patterns (20 patterns)
Pattern yang menggunakan 1 candle terakhir:

| Pattern Name | Deskripsi | Signal |
|--------------|-----------|--------|
| `"doji"` | Doji - Indecision pattern (open ≈ close) | Neutral/Reversal |
| `"long_legged_doji"` | Long Legged Doji - High & low shadow panjang | Neutral |
| `"dragonfly_doji"` | Dragonfly Doji - Lower shadow panjang, no upper | Bullish |
| `"gravestone_doji"` | Gravestone Doji - Upper shadow panjang, no lower | Bearish |
| `"four_price_doji"` | Four Price Doji - open = high = low = close | Neutral |
| `"hammer"` | Hammer - Small body di atas, long lower shadow | Bullish |
| `"inverted_hammer"` | Inverted Hammer - Small body di bawah, long upper shadow | Bullish |
| `"hanging_man"` | Hanging Man - Seperti hammer tapi di uptrend | Bearish |
| `"shooting_star"` | Shooting Star - Small body di bawah, long upper shadow | Bearish |
| `"marubozu"` | Marubozu - Strong trend, no shadow | Continuation |
| `"bullish_marubozu"` | Bullish Marubozu (alias: `"white_marubozu"`) | Strong Bullish |
| `"bearish_marubozu"` | Bearish Marubozu (alias: `"black_marubozu"`) | Strong Bearish |
| `"spinning_top"` | Spinning Top - Small body, medium shadows | Neutral |
| `"high_wave"` | High Wave - Very small body, very long shadows | Neutral |
| `"belt_hold_bullish"` | Belt Hold Bullish - Long bullish body opening at low | Bullish |
| `"belt_hold_bearish"` | Belt Hold Bearish - Long bearish body opening at high | Bearish |
| `"bullish"` | Bullish Candle - Close > Open | Bullish |
| `"bearish"` | Bearish Candle - Close < Open | Bearish |

#### Two-Candle Patterns (14 patterns)
Pattern yang menggunakan 2 candle terakhir:

| Pattern Name | Deskripsi | Signal |
|--------------|-----------|--------|
| `"bullish_engulfing"` | Bullish Engulfing - Candle bullish "menelan" bearish | Bullish |
| `"bearish_engulfing"` | Bearish Engulfing - Candle bearish "menelan" bullish | Bearish |
| `"bullish_harami"` | Bullish Harami - Small bullish di dalam bearish | Bullish |
| `"bearish_harami"` | Bearish Harami - Small bearish di dalam bullish | Bearish |
| `"harami_cross"` | Harami Cross - Doji di dalam candle sebelumnya | Neutral |
| `"piercing_line"` | Piercing Line - Bearish diikuti bullish penetrasi 50%+ | Bullish |
| `"dark_cloud_cover"` | Dark Cloud Cover - Bullish diikuti bearish penetrasi 50%+ | Bearish |
| `"tweezer_top"` | Tweezer Top - Dua candle dengan high sama | Bearish |
| `"tweezer_bottom"` | Tweezer Bottom - Dua candle dengan low sama | Bullish |
| `"kicking_bullish"` | Kicking Bullish - Bearish marubozu + gap up bullish marubozu | Strong Bullish |
| `"kicking_bearish"` | Kicking Bearish - Bullish marubozu + gap down bearish marubozu | Strong Bearish |
| `"on_neck"` | On Neck - Bearish continuation pattern | Bearish |
| `"in_neck"` | In Neck - Bearish continuation pattern | Bearish |

#### Three-Candle Patterns (14 patterns)
Pattern yang menggunakan 3 candle terakhir:

| Pattern Name | Deskripsi | Signal |
|--------------|-----------|--------|
| `"morning_star"` | Morning Star - Bearish → Small → Bullish | Bullish |
| `"evening_star"` | Evening Star - Bullish → Small → Bearish | Bearish |
| `"morning_doji_star"` | Morning Doji Star - Bearish → Doji → Bullish | Bullish |
| `"evening_doji_star"` | Evening Doji Star - Bullish → Doji → Bearish | Bearish |
| `"three_white_soldiers"` | Three White Soldiers - 3 bullish berturut-turut | Strong Bullish |
| `"three_black_crows"` | Three Black Crows - 3 bearish berturut-turut | Strong Bearish |
| `"three_inside_up"` | Three Inside Up - Bullish harami + confirmation | Bullish |
| `"three_inside_down"` | Three Inside Down - Bearish harami + confirmation | Bearish |
| `"three_outside_up"` | Three Outside Up - Bullish engulfing + confirmation | Bullish |
| `"three_outside_down"` | Three Outside Down - Bearish engulfing + confirmation | Bearish |
| `"abandoned_baby_bullish"` | Abandoned Baby Bullish - Gapped doji reversal | Strong Bullish |
| `"abandoned_baby_bearish"` | Abandoned Baby Bearish - Gapped doji reversal | Strong Bearish |
| `"three_line_strike_bullish"` | Three Line Strike Bullish - 3 crows + large bullish | Bullish |
| `"three_line_strike_bearish"` | Three Line Strike Bearish - 3 soldiers + large bearish | Bearish |

#### Five-Candle Patterns (2 patterns)
Pattern yang menggunakan 5 candle terakhir:

| Pattern Name | Deskripsi | Signal |
|--------------|-----------|--------|
| `"rising_three_methods"` | Rising Three Methods - Bullish continuation | Bullish |
| `"falling_three_methods"` | Falling Three Methods - Bearish continuation | Bearish |

**Contoh Penggunaan Candle Pattern:**

```
# Deteksi hammer (bullish reversal signal)
candle_pattern("hammer") == 1

# Kombinasi hammer dengan RSI oversold
candle_pattern("hammer") == 1 && rsi(14) < 30

# Bullish engulfing dengan volume tinggi
candle_pattern("bullish_engulfing") == 1 && volume > sma("volume", 20)

# Morning star di support fibonacci
candle_pattern("morning_star") == 1 && close > fib_61_8_20d

# Doji sebagai indikasi indecision
candle_pattern("doji") == 1 && adx(14) < 25

# Shooting star di resistance (bearish reversal)
candle_pattern("shooting_star") == 1 && close > resistance_1

# Kombinasi dengan moving average
close > sma("close", 20) && candle_pattern("bullish_marubozu") == 1

# Evening star dengan overbought RSI (strong bearish signal)
candle_pattern("evening_star") == 1 && rsi(14) > 70

# Hanging man di akhir uptrend
candle_pattern("hanging_man") == 1 && change_pct("close", 20) > 15

# Three white soldiers dengan foreign flow positif
candle_pattern("three_white_soldiers") == 1 && foreign_flow > 0

# === NEW PATTERNS ===

# Four price doji - extreme lack of activity
candle_pattern("four_price_doji") == 1

# High wave - extreme indecision
candle_pattern("high_wave") == 1 && volume > sma("volume", 20) * 2

# Belt hold bullish - strong open at low
candle_pattern("belt_hold_bullish") == 1 && foreign_flow > 0

# Tweezer bottom - double bottom confirmation
candle_pattern("tweezer_bottom") == 1 && close > support_1

# Kicking bullish - very strong reversal signal
candle_pattern("kicking_bullish") == 1

# Abandoned baby bullish - rare but powerful reversal
candle_pattern("abandoned_baby_bullish") == 1 && rsi(14) < 40

# Rising three methods - bullish continuation
candle_pattern("rising_three_methods") == 1 && close > sma("close", 50)
```

**Catatan Penting Candlestick Pattern Detection:**
- Pattern dideteksi dari 10 candle terakhir (data historis + realtime)
- Deteksi dilakukan setiap 60 detik untuk 900+ saham secara paralel
- Return value: `1.0` = pattern terdeteksi, `0.0` = tidak terdeteksi
- Gunakan operator `== 1` untuk check apakah pattern terdeteksi
- Implementasi native tanpa dependency eksternal untuk kompatibilitas maksimal

---

### Chart Pattern Detection

Deteksi chart patterns (formasi harga) menggunakan analisis 100-200 candle terakhir untuk mendeteksi pola seperti Head & Shoulders, Double Top/Bottom, Triangles, Flags, Cup & Handle, dll.

Berbeda dengan candlestick patterns yang fokus pada 1-5 candle, chart patterns menganalisis formasi harga dalam periode lebih panjang untuk mendeteksi support/resistance levels dan trend patterns.

| Fungsi | Deskripsi | Return Value | Contoh |
|--------|-----------|--------------|--------|
| `chart_pattern("pattern_name")` | Deteksi chart pattern tertentu | Quality score `0.0-1.0` | `chart_pattern("head_and_shoulders")` |

**Return Value Quality Score:**
- `0.0` = Pattern tidak terdeteksi
- `0.3-0.5` = Pattern lemah/tidak sempurna
- `0.6-0.8` = Pattern bagus, layak dipertimbangkan
- `0.9-1.0` = Pattern sempurna, high confidence

**Chart Patterns yang Tersedia (65+ patterns):**

#### Reversal Patterns (10 patterns)
Pattern yang mengindikasikan pembalikan trend:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"head_and_shoulders"` | Head & Shoulders - Peak tengah lebih tinggi | Bearish Reversal | `"head_shoulders"`, `"hs"`, `"h_and_s"` |
| `"inverse_head_and_shoulders"` | Inverse H&S - Trough tengah lebih rendah | Bullish Reversal | `"inverse_head_shoulders"`, `"inv_hs"`, `"ihs"` |
| `"double_top"` | Double Top - Dua peak di level sama | Bearish Reversal | - |
| `"double_bottom"` | Double Bottom - Dua trough di level sama | Bullish Reversal | - |
| `"triple_top"` | Triple Top - Tiga peak di level sama | Strong Bearish | - |
| `"triple_bottom"` | Triple Bottom - Tiga trough di level sama | Strong Bullish | - |
| `"v_top"` | V-Top - Sharp reversal di puncak | Bearish Reversal | `"v_reversal_top"` |
| `"v_bottom"` | V-Bottom - Sharp reversal di dasar | Bullish Reversal | `"v_reversal_bottom"` |
| `"diamond_top"` | Diamond Top - Diamond formation di puncak | Bearish Reversal | - |
| `"diamond_bottom"` | Diamond Bottom - Diamond formation di dasar | Bullish Reversal | - |

#### Continuation Patterns (10 patterns)
Pattern yang mengindikasikan kelanjutan trend:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"ascending_triangle"` | Ascending Triangle - Flat top, rising lows | Bullish Continuation | `"asc_triangle"` |
| `"descending_triangle"` | Descending Triangle - Flat bottom, falling highs | Bearish Continuation | `"desc_triangle"` |
| `"symmetrical_triangle"` | Symmetrical Triangle - Converging trend lines | Neutral (breakout direction) | `"sym_triangle"` |
| `"bull_flag"` | Bull Flag - Sharp rise + downward consolidation | Bullish Continuation | `"bullish_flag"` |
| `"bear_flag"` | Bear Flag - Sharp drop + upward consolidation | Bearish Continuation | `"bearish_flag"` |
| `"pennant"` | Pennant - Sharp move + symmetrical triangle | Continuation | - |
| `"bullish_rectangle"` | Bullish Rectangle - Horizontal consolidation in uptrend | Bullish Continuation | `"bull_rectangle"` |
| `"bearish_rectangle"` | Bearish Rectangle - Horizontal consolidation in downtrend | Bearish Continuation | `"bear_rectangle"` |
| `"ascending_channel"` | Ascending Channel - Parallel upward channel | Bullish | `"asc_channel"` |
| `"descending_channel"` | Descending Channel - Parallel downward channel | Bearish | `"desc_channel"` |

#### Accumulation/Distribution Patterns (7 patterns)
Pattern yang mengindikasikan akumulasi atau distribusi:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"cup_and_handle"` | Cup & Handle - U-shaped cup + handle | Bullish | `"cup_handle"` |
| `"inverse_cup_and_handle"` | Inverse Cup & Handle - Inverted cup formation | Bearish | `"inv_cup_handle"` |
| `"rounding_bottom"` | Rounding Bottom - Gradual U-shaped recovery | Bullish | `"saucer_bottom"` |
| `"rounding_top"` | Rounding Top - Gradual inverted U distribution | Bearish | `"saucer_top"` |
| `"rising_wedge"` | Rising Wedge - Both lines up, converging | Bearish | - |
| `"falling_wedge"` | Falling Wedge - Both lines down, converging | Bullish | - |
| `"horizontal_channel"` | Horizontal Channel - Sideways consolidation | Neutral | `"sideways_channel"`, `"range"` |

#### Broadening Patterns (2 patterns)
Pattern megaphone/expanding:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"broadening_top"` | Broadening Top - Expanding highs and lows at top | Bearish | `"megaphone_top"` |
| `"broadening_bottom"` | Broadening Bottom - Expanding pattern at bottom | Bullish | `"megaphone_bottom"` |

#### Gap Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"gap_up"` | Gap Up - Bullish gap opening | Bullish | `"bullish_gap"` |
| `"gap_down"` | Gap Down - Bearish gap opening | Bearish | `"bearish_gap"` |

#### Island Reversal Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"island_reversal_top"` | Island Reversal Top - Isolated high with gaps | Bearish Reversal | `"island_top"` |
| `"island_reversal_bottom"` | Island Reversal Bottom - Isolated low with gaps | Bullish Reversal | `"island_bottom"` |

#### Bump and Run Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"bump_and_run_top"` | Bump and Run Top - Sharp rise then gradual decline | Bearish Reversal | `"bar_top"` |
| `"bump_and_run_bottom"` | Bump and Run Bottom - Sharp drop then gradual recovery | Bullish Reversal | `"bar_bottom"` |

#### Pipe Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"pipe_top"` | Pipe Top - Two long shadow candles at top | Bearish Reversal | - |
| `"pipe_bottom"` | Pipe Bottom - Two long shadow candles at bottom | Bullish Reversal | - |

#### Measured Move / ABCD Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"measured_move_up"` | Measured Move Up - AB=CD bullish pattern | Bullish | `"abcd_up"` |
| `"measured_move_down"` | Measured Move Down - AB=CD bearish pattern | Bearish | `"abcd_down"` |

#### Scallop Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"scallop_bullish"` | Ascending Scallop - Curved bullish continuation | Bullish | `"scallop_up"` |
| `"scallop_bearish"` | Descending Scallop - Curved bearish continuation | Bearish | `"scallop_down"` |

#### Elliott Wave Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"elliott_wave_impulse"` | Elliott 5-Wave Impulse - Trending wave structure | Trend | `"elliott_impulse"`, `"5_wave"` |
| `"elliott_wave_correction"` | Elliott ABC Correction - Counter-trend correction | Counter-trend | `"elliott_correction"`, `"abc_correction"` |

#### Staircase Patterns (2 patterns)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"bullish_staircase"` | Bullish Staircase - Step-up pattern | Bullish | `"staircase_up"`, `"step_up"` |
| `"bearish_staircase"` | Bearish Staircase - Step-down pattern | Bearish | `"staircase_down"`, `"step_down"` |

#### Other Patterns (1 pattern)

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"dead_cat_bounce"` | Dead Cat Bounce - Temporary recovery in downtrend | Bearish | `"dcb"` |

#### Harmonic Patterns (12 patterns)
Pattern berdasarkan Fibonacci ratios:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"gartley_bullish"` | Gartley Bullish - XABCD harmonic 222 pattern | Bullish Reversal | `"gartley_up"` |
| `"gartley_bearish"` | Gartley Bearish - Inverse Gartley pattern | Bearish Reversal | `"gartley_down"` |
| `"butterfly_bullish"` | Butterfly Bullish - Extended D beyond X | Bullish Reversal | `"butterfly_up"` |
| `"butterfly_bearish"` | Butterfly Bearish - Inverse butterfly | Bearish Reversal | `"butterfly_down"` |
| `"bat_bullish"` | Bat Bullish - Deep B retracement pattern | Bullish Reversal | `"bat_up"` |
| `"bat_bearish"` | Bat Bearish - Inverse bat pattern | Bearish Reversal | `"bat_down"` |
| `"crab_bullish"` | Crab Bullish - Extreme extension pattern | Bullish Reversal | `"crab_up"` |
| `"crab_bearish"` | Crab Bearish - Inverse crab pattern | Bearish Reversal | `"crab_down"` |
| `"shark_bullish"` | Shark Bullish - Aggressive 5-0 pattern | Bullish Reversal | `"shark_up"` |
| `"shark_bearish"` | Shark Bearish - Inverse shark pattern | Bearish Reversal | `"shark_down"` |
| `"three_drives_bullish"` | Three Drives Bullish - 3 push harmonic pattern | Bullish Reversal | `"3_drives_up"` |
| `"three_drives_bearish"` | Three Drives Bearish - Inverse 3 drives | Bearish Reversal | `"3_drives_down"` |

#### Wolfe Waves (2 patterns)
5-wave wedge pattern dengan price projection:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"wolfe_wave_bullish"` | Wolfe Wave Bullish - Descending wedge with 5 waves | Bullish Reversal | `"wolfe_bullish"`, `"wolfe_up"` |
| `"wolfe_wave_bearish"` | Wolfe Wave Bearish - Ascending wedge with 5 waves | Bearish Reversal | `"wolfe_bearish"`, `"wolfe_down"` |

#### Quasimodo (QM) Pattern (2 patterns)
Shoulder break / Over and Under pattern:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"quasimodo_bullish"` | QM Bullish - Failed lower low, shoulder break up | Bullish Reversal | `"qm_bullish"`, `"qml"` |
| `"quasimodo_bearish"` | QM Bearish - Failed higher high, shoulder break down | Bearish Reversal | `"qm_bearish"`, `"qmh"` |

#### Three Rising/Falling Methods (2 patterns)
Candlestick continuation pattern:

| Pattern Name | Deskripsi | Signal | Aliases |
|--------------|-----------|--------|---------|
| `"three_rising_methods"` | Three Rising Methods - Bullish continuation with 3+ small candles | Bullish Continuation | `"rising_three"`, `"3_rising"` |
| `"three_falling_methods"` | Three Falling Methods - Bearish continuation with 3+ small candles | Bearish Continuation | `"falling_three"`, `"3_falling"` |

**Contoh Penggunaan Chart Pattern:**

```
# Head and Shoulders dengan quality score bagus (bearish reversal)
chart_pattern("head_and_shoulders") > 0.6

# Double bottom dengan quality score tinggi (bullish reversal)
chart_pattern("double_bottom") >= 0.7 && rsi(14) < 40

# Ascending triangle dengan volume confirmation (bullish breakout)
chart_pattern("ascending_triangle") > 0.5 && volume > sma("volume", 20)

# Cup and handle pattern (strong bullish signal)
chart_pattern("cup_and_handle") > 0.8

# Bull flag di uptrend (continuation)
chart_pattern("bull_flag") > 0.6 && close > sma("close", 50)

# Kombinasi chart pattern dengan candlestick pattern
chart_pattern("double_bottom") > 0.6 && candle_pattern("hammer") == 1

# Rising wedge dengan overbought RSI (bearish)
chart_pattern("rising_wedge") > 0.5 && rsi(14) > 70

# Symmetrical triangle breakout dengan MACD confirmation
chart_pattern("symmetrical_triangle") > 0.5 && macd(12, 26) > macd_signal(12, 26, 9)

# Triple bottom dengan foreign flow support (very strong bullish)
chart_pattern("triple_bottom") >= 0.7 && foreign_flow > 0

# Falling wedge dengan oversold condition (bullish reversal setup)
chart_pattern("falling_wedge") > 0.6 && rsi(14) < 30 && close < boll_bottom(20, 2)

# Inverse head and shoulders dengan volume surge (bullish breakout)
chart_pattern("inverse_head_and_shoulders") > 0.7 && volume > sma("volume", 20) * 1.5

# Descending triangle breakdown (bearish continuation)
chart_pattern("descending_triangle") > 0.6 && close < support_1

# Rounding bottom dengan accumulation (long-term bullish)
chart_pattern("rounding_bottom") > 0.5 && obv() > sma("volume", 50)

# Pennant pattern dengan strong trend (continuation signal)
chart_pattern("pennant") > 0.6 && change_pct("close", 20) > 15

# Multiple pattern confirmation untuk high confidence
chart_pattern("double_bottom") > 0.7 && candle_pattern("bullish_engulfing") == 1 && rsi(14) < 35

# === HARMONIC PATTERNS ===

# Gartley bullish pattern dengan RSI confirmation
chart_pattern("gartley_bullish") > 0.6 && rsi(14) < 40

# Butterfly pattern di support zone
chart_pattern("butterfly_bullish") > 0.7 && close < fib_61_8_20d

# Bat pattern dengan volume surge
chart_pattern("bat_bullish") > 0.6 && volume > sma("volume", 20) * 1.5

# Crab pattern - extreme extension reversal
chart_pattern("crab_bullish") > 0.7

# Shark pattern aggressive reversal
chart_pattern("shark_bearish") > 0.6 && rsi(14) > 70

# === WOLFE WAVES ===

# Wolfe Wave bullish - descending wedge breakout
chart_pattern("wolfe_wave_bullish") > 0.6 && close > sma("close", 20)

# Wolfe Wave bearish - ascending wedge breakdown
chart_pattern("wolfe_wave_bearish") > 0.6 && rsi(14) > 65

# === QUASIMODO (QM) PATTERN ===

# QM Bullish - failed lower low reversal
chart_pattern("quasimodo_bullish") > 0.6 && foreign_flow > 0

# QM Bearish - failed higher high reversal
chart_pattern("qm_bearish") > 0.7 && volume > sma("volume", 20)

# QML dengan RSI oversold (strong bullish setup)
chart_pattern("qml") > 0.6 && rsi(14) < 35

# === THREE RISING/FALLING METHODS ===

# Three Rising Methods - bullish continuation in uptrend
chart_pattern("three_rising_methods") > 0.6 && close > sma("close", 50)

# Three Falling Methods - bearish continuation in downtrend
chart_pattern("three_falling_methods") > 0.6 && close < sma("close", 50)

# Rising methods dengan momentum confirmation
chart_pattern("rising_three") > 0.7 && macd(12, 26) > macd_signal(12, 26, 9)
```

**Catatan Penting Chart Pattern Detection:**
- Pattern dideteksi dari 400 candle terakhir untuk akurasi optimal
- Quality score `> 0.6` mengindikasikan pattern yang cukup jelas
- Quality score `> 0.8` mengindikasikan pattern yang sangat jelas (high confidence)
- Gunakan operator `> 0.5` atau `>= 0.6` untuk filter pattern quality
- Kombinasikan dengan indikator lain (RSI, volume, candlestick) untuk confirmation
- Pattern dengan neckline/support/resistance break mendapat quality bonus
- Implementasi native dengan algoritma peak/trough detection dan trend line analysis

---

### Contoh Formula dengan Fungsi TA

```
# RSI Oversold (dibawah 30)
rsi(14) < 30

# RSI Overbought
rsi(14) > 70

# Golden Cross (SMA 50 crosses above SMA 200)
sma("close", 50) > sma("close", 200)

# Death Cross
sma("close", 50) < sma("close", 200)

# Harga di atas SMA 20
close > sma("close", 20)

# MACD bullish crossover
macd(12, 26) > macd_signal(12, 26, 9)

# Bollinger Band squeeze
bollinger_bandwidth(20, 2) < 5

# Price at lower Bollinger Band
close < bollinger_bottom(20, 2)

# ADX strong trend
adx(14) > 25

# Bullish divergence setup
rsi(14) < 40 && close > sma("close", 20)

# Kombinasi TA + Fundamental
rsi(14) < 30 && per < 15 && foreign_flow > 0

# Volume SMA crossover
volume > sma("volume", 20)

# New High dalam 52 hari
close >= hhv("close", 52)

# New Low dalam 20 hari
close <= llv("close", 20)

# === Candlestick Pattern Examples ===

# Hammer pattern dengan RSI oversold (strong bullish signal)
candle_pattern("hammer") == 1 && rsi(14) < 30

# Bullish engulfing di support dengan volume konfirmasi
candle_pattern("bullish_engulfing") == 1 && close > support_1 && volume > sma("volume", 20)

# Morning star reversal dengan akumulasi asing
candle_pattern("morning_star") == 1 && foreign_flow > 0

# Doji di pivot point (indecision zone)
candle_pattern("doji") == 1 && close >= pivot_point * 0.99 && close <= pivot_point * 1.01

# Shooting star di resistance (bearish reversal warning)
candle_pattern("shooting_star") == 1 && close > resistance_1 && rsi(14) > 65

# Three white soldiers dengan momentum kuat
candle_pattern("three_white_soldiers") == 1 && change_pct("close", 5) > 10
```

---

## 🧮 Operator yang Didukung

### Operator Perbandingan

| Operator | Deskripsi | Contoh |
|----------|-----------|--------|
| `>` | Lebih besar dari | `close > 1000` |
| `<` | Lebih kecil dari | `per < 15` |
| `>=` | Lebih besar atau sama dengan | `volume >= 500000` |
| `<=` | Lebih kecil atau sama dengan | `pbv <= 2` |
| `==` | Sama dengan | `change_pct == 0` |
| `!=` | Tidak sama dengan | `foreign_flow != 0` |

### Operator Logika

| Operator Simbolik | Alias Kata | Deskripsi | Contoh |
|-------------------|------------|-----------|--------|
| `&&` | `AND`, `DAN`, `and`, `dan` | DAN (AND) | `close > prev && volume > 100000` |
| `\|\|` | `OR`, `ATAU`, `or`, `atau` | ATAU (OR) | `per < 10 \|\| pbv < 1` |
| `!` | `NOT(...)`, `TIDAK(...)`, `BUKAN(...)` | TIDAK (NOT) | `!(close < prev)` |

#### Contoh Penggunaan Operator Logika

Anda bisa menggunakan berbagai format operator (semua akan dikonversi ke simbol):

```
# Menggunakan operator simbolik (standar)
close > prev && volume > 100000

# Menggunakan alias Indonesia
close > prev DAN volume > 100000

# Menggunakan alias Inggris
close > prev AND volume > 100000
close > prev and volume > 100000

# Kombinasi OR
per < 10 ATAU pbv < 1
per < 10 OR pbv < 1
per < 10 or pbv < 1

# Menggunakan NOT (harus dengan kurung)
TIDAK(close < prev)
BUKAN(close < prev)
NOT(close < prev)
not(close < prev)

# Formula kompleks
close > prev AND (per < 10 OR pbv < 1) AND NOT(change_pct < 0)
close > prev DAN (per < 10 ATAU pbv < 1) DAN TIDAK(change_pct < 0)
```

**Note:** 
- Semua alias bersifat case-insensitive (`AND`, `And`, `and` semuanya valid)
- Untuk `NOT/TIDAK/BUKAN`, harus diikuti dengan kurung: `NOT(kondisi)`

### Operator Aritmatika

| Operator | Deskripsi | Contoh |
|----------|-----------|--------|
| `+` | Tambah | `close + 50` |
| `-` | Kurang | `high - low` |
| `*` | Kali | `prev * 1.05` |
| `/` | Bagi | `value / volume` |

### Kurung

| Operator | Deskripsi | Contoh |
|----------|-----------|--------|
| `()` | Pengelompokan | `(close > prev) && (per < 15)` |

---

## 📝 Contoh Formula

### Formula Sederhana

```
# Saham naik lebih dari 5%
change_pct > 5

# Saham dengan volume tinggi
volume > 1000000

# Saham dengan PER rendah
per < 10
```

### Formula Menggabungkan Realtime + Historis

```
# Saham breakout dengan foreign masuk
close > hhv("high", 20) && foreign_flow > 0

# Saham murah dengan akumulasi asing
per < 15 && foreign_flow_30d > 0

# Saham naik dengan bandar masuk
change_pct > 3 && bdm_flow > 0
```

### Formula Kompleks

```
# Saham breakout resistance dengan konfirmasi volume dan fundamental bagus
close > resistance_1 && volume > 500000 && per < 20 && roe > 10

# Saham dengan akumulasi institusi dan harga mendekati fibonacci support
close > fib_61_8_20d && local_mf > 5 && foreign_mf > 3

# Saham uptrend dengan fundamental kuat
change_pct("close", 30) > 10 && foreign_flow_30d > 0 && per < 15 && pbv < 2 && roe > 15

# Saham dengan momentum volume tinggi
change_pct("volume", 5) > 100 && change_pct("close", 5) > 3
```

---

## ⚠️ Catatan Penting

1. **Nilai Null**: Jika data tidak tersedia, nilai default adalah `0`. Pastikan formula Anda memperhitungkan ini.

2. **Tipe Data**: Semua nilai dikonversi ke float untuk evaluasi. Integer otomatis dikonversi.

3. **Case Sensitive**: Nama variable harus ditulis persis seperti di dokumentasi (lowercase dengan underscore).

4. **Kombinasi**: Anda bisa menggabungkan variable realtime dengan variable historis dalam satu formula.

5. **Performance**: Formula yang lebih kompleks membutuhkan waktu evaluasi lebih lama. Gunakan kondisi yang paling selektif di awal.

6. **Fungsi Dinamis dengan Field**:
   - Fungsi `change()`, `change_pct()`, `sum()`, `highest()`, `lowest()`, `hhv()`, `llv()`, `sma()`, `ema()` mendukung parameter field
   - Contoh: `sum("volume", 20)`, `highest("close", 50)`, `sma("volume", 20)`, `ema("value", 10)`, `sma("freq_analyzer", 20)`
   - Field yang didukung: `open`, `high`, `low`, `close`, `volume`, `value`, `foreign`, `freq`, `bdm`, `ritel`, `ratio`, `freq_analyzer`
   - Data diambil dari tabel `stock_prices` (max 200 hari)
   - Data realtime ditambahkan sebagai data terbaru jika tersedia (kecuali `foreign`, `bdm`, `ritel`, `ratio` yang tidak tersedia di realtime)
   - `freq_analyzer` dihitung dari data historis sebagai `volume / freq³` untuk setiap hari
   - Jika data tidak cukup untuk periode yang diminta, akan menggunakan data yang tersedia

7. **Periode Maksimum**: Semua fungsi TA memiliki batas maksimum 200 periode. Nilai yang melebihi akan otomatis di-clamp ke 200.

8. **Calculated Realtime Variables**:
   - `freq_analyzer` = volume / freq³ (dihitung langsung dari data realtime)
   - `market_cap` = shares × close
   - `free_float_pct` = (free_float / shares) × 100

9. **Candlestick Pattern Detection**:
   - Pattern dideteksi secara real-time setiap 60 detik untuk 900+ saham
   - Menggunakan 10 candle terakhir (data historis + realtime)
   - Return value: `1.0` (terdeteksi) atau `0.0` (tidak terdeteksi)
   - Total 50+ pattern tersedia (20 single + 14 two-candle + 14 three-candle + 2 five-candle)
   - Implementasi native tanpa dependency eksternal untuk kompatibilitas maksimal
   - Gunakan operator `== 1` untuk check pattern: `candle_pattern("hammer") == 1`

