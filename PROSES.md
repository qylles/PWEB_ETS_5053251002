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

- [x] **W5 — Ringkasan**
  - Total pemasukan, pengeluaran, dan saldo diperbarui otomatis.

- [x] **W6 — Validasi form**
  - Nominal lebih dari 0, field wajib terisi, dan pesan error tampil di halaman.

## Keputusan Design

Saya menggunakan localStorage untuk menyimpan data transaksi dan tagihan agar data tetap tersimpan saat halaman direfresh atau ditutup.

tagihan yang berstatus paid otomatis dicatat sebagai pemasukan agar pengguna tidak perlu memasukkan transaksi yang sama secara manual. Setiap transaksi pemasukan dari tagihan dihubungkan menggunakan invoiceId untuk mencegah pencatatan pemasukan ganda.

1. Ringkasan pemasukan dan saldo menampilkan nilai NaN
Hal ini terjadi karena data nominal yang digunakan dalam perhitungan tidak terbaca sebagai angka yang valid atau terdapat ketidaksesuaian struktur data. Saya mengatasinya dengan memeriksa struktur data transaksi dan menyesuaikan proses perhitungan ringkasan dengan data yang tersimpan di localStorage.

2. Ringkasan tidak menampilkan hasil perhitungan (undefined)
Kendala ini terjadi karena fungsi atau properti yang digunakan untuk mengambil hasil ringkasan tidak menghasilkan nilai yang sesuai. Saya mengatasinya dengan memeriksa nama fungsi, nilai yang dikembalikan oleh fungsi (return), dan cara hasilnya dipanggil pada bagian aplikasi yang menampilkan ringkasan.