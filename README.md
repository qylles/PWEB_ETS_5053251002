# PWEB_ETS_5053251002

| NAMA | NRP |
|----|----------------|
| Selly Aisyah | 5053251002 |

## Kategori Persona
Saya mendapatkan persona "Pekerja lepas (freelancer)" yang memiliki permasalahan di mana klien sering terlambat membayar dan tidak ada pencatatan pemasukan per proyek sehingga untuk mengatasi hal tersebut dibuat Personal Money Management dengan fitur mencatat tagihan ke klien berstatus "belum dibayar" atau "lunas", tagihan lunas otomatis menjadi pemasukan, dan menampilkan total piutang yang ada.

## Struktur Data localStorage

### 1. 'transactions'
Menyimpan data transaksi pemasukan dan pengeluaran

| Field | Tipe Data | Keterangan |
|---|---|---|
| `id` | Number | ID unik transaksi |
| `type` | String | Jenis transaksi (`income` / `expense`) |
| `category` | String | Kategori transaksi |
| `description` | String | Deskripsi transaksi |
| `amount` | Number | Nominal transaksi |
| `date` | String | Tanggal transaksi |
| `invoiceId` | Number / Null | ID tagihan terkait, jika ada |

### 2. `invoices`

Menyimpan data tagihan klien freelancer.

| Field | Tipe Data | Keterangan |
|---|---|---|
| `id` | Number | ID unik tagihan |
| `clientName` | String | Nama klien |
| `description` | String | Deskripsi tagihan |
| `amount` | Number | Nominal tagihan |
| `date` | String | Tanggal tagihan dibuat |
| `dueDate` | String | Tanggal jatuh tempo |
| `status` | String | Status tagihan (`unpaid` / `paid`) |

### Aturan Pengelolaan Data

- Data transaksi dan tagihan disimpan menggunakan `localStorage` dalam format JSON.
- Tagihan berstatus `unpaid` dihitung sebagai piutang.
- Ketika tagihan berubah menjadi `paid`, sistem membuat transaksi pemasukan terkait secara otomatis.
- Setiap tagihan hanya boleh menghasilkan satu transaksi pemasukan untuk mencegah duplikasi.
- Ringkasan pemasukan, pengeluaran, saldo, dan total piutang dihitung berdasarkan data yang tersimpan.


## Checkpoint Pengerjaan

- [x] **W1 — Tambah transaksi**
  - Form tanggal, jenis, kategori (minimal 4 pilihan), nominal, dan catatan opsional.

- [x] **W2 — Daftar transaksi**
  - Dirender dinamis, transaksi terbaru di atas, nominal dalam format Rupiah.

- [x] **W3 — Hapus transaksi**
  - Ada konfirmasi sebelum transaksi dihapus.

- [x] **W4 — Data persisten**
  - Data tetap ada setelah halaman di-refresh atau browser ditutup.

- [ ] **W5 — Ringkasan**
  - Total pemasukan, pengeluaran, dan saldo diperbarui otomatis.

- [ ] **W6 — Validasi form**
  - Nominal lebih dari 0, field wajib terisi, dan pesan error tampil di halaman.

- [ ] **W7 — Tagihan klien**
  - Bisa mencatat tagihan klien dan nominalnya.

- [ ] **W8 — Status pembayaran**
  - Status unpaid/paid dan pelunasan otomatis menjadi pemasukan tanpa duplikasi.

- [ ] **W9 — Ringkasan piutang**
  - Total tagihan yang belum dibayar ditampilkan dan diperbarui otomatis.
