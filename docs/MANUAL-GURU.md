# 📖 Manual Guru — Aplikasi Kelulusan SMK

Panduan lengkap untuk guru menggunakan aplikasi kelulusan.

---

## 🔐 Login

### Langkah-Langkah:

1. Buka aplikasi: `https://yourapp.com`
2. Klik **Login**
3. Masukkan **email** dan **password**
4. Klik **Sign In**
5. Akan masuk ke dashboard guru

### Lupa Password?

1. Di halaman login, klik **Lupa Password?**
2. Masukkan email Anda
3. Buka email dan klik link reset password
4. Buat password baru
5. Login dengan password baru

---

## 📊 Dashboard Guru

Setelah login, Anda akan melihat:

- **Info kelas yang diampu:** Nama kelas, jumlah siswa, wali kelas
- **Statistik nilai:** Jumlah nilai yang sudah diinput, yang belum
- **Mata pelajaran yang diajar:** List semua mapel Anda
- **Shortcuts** ke menu penting

---

## 📝 Input Nilai Siswa

### Langkah-Langkah Input Nilai:

1. Buka menu **Nilai** → **Input Nilai**
2. **Filter:**
   - Pilih **kelas** yang Anda ampu
   - Pilih **mata pelajaran** yang akan diinput
   - Pilih **semester** (1-6)
3. Akan melihat tabel dengan semua siswa di kelas
4. **Input nilai per siswa:**
   - Klik baris siswa atau tombol **Edit**
   - Form akan terbuka
   - Isi nilai-nilai:
     - **Nilai Rapor:** Rata-rata nilai per semester (0-100)
     - **Nilai US:** Ujian Sekolah (0-100)
     - **Nilai UKK:** Ujian Kompetensi Keahlian (0-100)
     - **Nilai Praktik:** Nilai praktik (0-100)
     - **Nilai Sikap:** A / B / C / D
     - **Nilai PKL:** Praktik Kerja Lapangan (0-100)
   - Klik **Simpan**

### Contoh Input:

```
Nama: John Doe
Nilai Rapor: 85
Nilai US: 87
Nilai UKK: 90
Nilai Praktik: 88
Nilai Sikap: A
Nilai PKL: 85
```

### Bulk Input (Copy-Paste)

Jika ingin input nilai banyak siswa sekaligus:

1. Di tabel nilai, klik **Bulk Input**
2. Akan terbuka form table untuk edit multiple siswa
3. Edit langsung di table (seperti Excel)
4. Klik **Simpan Semua** setelah selesai

---

## ✏️ Edit Nilai Siswa

### Langkah-Langkah:

1. Di menu **Nilai** → **Input Nilai**
2. Filter kelas, mata pelajaran, semester
3. Cari siswa yang nilainya ingin diedit
4. Klik baris siswa → **Edit**
5. Ubah nilai yang perlu
6. Klik **Simpan**

### Jika Nilai Sudah Locked:

Jika Anda melihat notifikasi "Nilai sudah di-lock oleh admin":
- Hubungi admin untuk unlock
- Setelah unlock, Anda bisa edit lagi

---

## ✅ Verifikasi Data Siswa

### Gunakan Fitur Ini Untuk:

- Memverifikasi apakah data siswa sudah benar
- Memastikan semua siswa ada di sistem
- Check jika ada data yang perlu diperbaiki

### Langkah-Langkah:

1. Buka menu **Verifikasi** → **Verifikasi Data Siswa**
2. Pilih **kelas** yang Anda ampu
3. Akan melihat daftar semua siswa di kelas
4. **Cek setiap siswa:**
   - Nama, NISN, tanggal lahir, alamat sudah benar?
   - Jika ada yang salah, klik **Edit** dan laporkan ke admin
5. Jika semua sudah benar, klik **Verifikasi**
6. Akan ada notifikasi "Verifikasi selesai" dengan tanggal & jam

---

## 🔒 Keamanan

### Change Password

1. Klik **profil icon** di top-right
2. Klik **Ubah Password**
3. Masukkan password lama
4. Masukkan password baru (min 8 karakter)
5. Klik **Simpan**

### Logout

1. Klik **profil icon** di top-right
2. Klik **Logout**
3. Akan kembali ke halaman login

---

## 📊 Laporan & Statistik

### Lihat Rekapan Nilai

1. Buka **Laporan** → **Rekapan Nilai**
2. Pilih **kelas** dan **mata pelajaran**
3. Akan melihat:
   - Tabel dengan nilai seluruh siswa
   - Nilai tertinggi, terendah, rata-rata

### Ekspor Nilai ke Excel

1. Buka **Laporan** → **Ekspor Nilai**
2. Pilih **kelas** dan **semester**
3. Klik **Ekspor Excel**
4. File Excel akan didownload (siap dicetak/dikirim ke admin)

---

## ⚠️ Hal Penting yang Harus Diketahui

### Kapan Harus Input Nilai?

- **Semester 1-5:** Sebelum akhir semester (sesuai kalender akademik)
- **Semester 6 (Akhir):** Sebelum pelaksanaan US & UKK

### Validasi Nilai

Aplikasi akan validasi input Anda:
- ✅ Nilai harus antara 0-100
- ✅ Nilai harus number (bukan huruf)
- ❌ Jika ada error, perbaiki dan simpan lagi

### Komunikasi dengan Admin

- Jika ada pertanyaan tentang **KKM, bobot, kriteria kelulusan:** Tanyakan ke admin
- Jika **data siswa salah:** Laporkan ke admin untuk dikoreksi
- Jika **nilai terhapus:** Hubungi admin (bisa recover dari backup)

---

## 🆘 Troubleshooting

### Tidak Bisa Login

1. Pastikan email dan password benar (case-sensitive)
2. Pastikan tidak ada typo
3. Klik **Lupa Password?** untuk reset
4. Hubungi admin jika masih ada masalah

### Kelas Tidak Muncul

1. Pastikan Anda sudah ditambahkan sebagai wali kelas/guru di kelas tersebut
2. Hubungi admin untuk verify

### Tidak Bisa Edit Nilai

**Kemungkinan:**
1. Nilai sudah di-lock oleh admin (hubungi admin untuk unlock)
2. Anda bukan guru pengajar mata pelajaran tersebut (hubungi admin)
3. Browser Anda tidak support (coba browser lain)

### File Download Lambat

1. Pastikan koneksi internet stabil
2. Jika masih lambat, coba lagi nanti

---

## 📞 Kontak Support

Jika ada pertanyaan atau masalah:

- **Email:** umarov.studio@gmail.com
- **Admin Sekolah:** Hubungi admin aplikasi di sekolah Anda
- **Documentation:** Lihat folder `docs/`

---

**Last updated:** 2026-04-28
