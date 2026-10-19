## Struktur Data yang diperlukan di localStorage
- Prompt: "di personal money management  freelancer butuh apa aja selain income, piutang, balance"
- Dipakai: entitas transaksi, invoice, aturan pengelolaan
- Diubah: tidak ada

## Perubahan dari kode yang sebelumnya dibuat
- Prompt: "berdasarkan fitur dan struktur datanya maka dari kode ini apa saja yang perlu ditambahkan"
- Dipakai: perubahan kode html, css, dan js
- Diubah: sebelumnya dari AI hanya ada transaksi maka saya tambahkan untuk invoice

## Debugging karena sebelumnya ada bug NaN
- Prompt: "Kenapa berubah jadi NaN?"
- Dipakai: penyesuaian nama properti, menambah kode nominal: Number(transaction.nominal ?? transaction.amount ?? 0), mengubah render summary menjadi const nominal = Number(transaction.nominal) || 0;