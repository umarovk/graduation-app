# 📖 Manual Admin — Aplikasi Kelulusan SMK

Panduan lengkap untuk admin menggunakan semua fitur aplikasi.

---

## 🔐 Login

### Langkah-Langkah:

1. Buka aplikasi: `https://yourapp.com`
2. Klik **Login** atau ke halaman `/admin`
3. Masukkan email dan password
4. Klik **Sign In**
5. Akan redirect ke dashboard admin

### Lupa Password?

1. Di halaman login, klik **Lupa Password?**
2. Masukkan email Anda
3. Cek email untuk link reset
4. Buat password baru
5. Login dengan password baru

---

## 📊 Dashboard Admin

### Halaman Utama

Setelah login, Anda akan melihat:

- **Statistik ringkas:**
  - Total siswa
  - Total lulus
  - Total tidak lulus
  - Persentase kelulusan

- **Grafik kelulusan per jurusan**
- **Activity log terbaru**
- **Shortcuts** ke menu penting

### Menu Sidebar

1. **Dashboard** — Statistik & overview
2. **Siswa** — Kelola data siswa
3. **Guru & Kelas** — Kelola guru dan kelas
4. **Nilai** — Kelola nilai siswa
5. **Kelulusan** — Tentukan status kelulusan
6. **Dokumen** — Generate SKL & transkrip
7. **Visibilitas** — Kontrol apa yang dilihat siswa
8. **Laporan** — Statistik & ekspor
9. **Pengaturan** — Profil sekolah & tema

---

## 👥 Kelola Siswa

### Import Siswa (Bulk Upload)

**Best untuk:** Menambah banyak siswa sekaligus di awal tahun

**Langkah:**

1. Buka menu **Siswa** → **Import**
2. Siapkan file CSV atau Excel dengan format:
   ```
   NISN,NIS,Nama,Email,JenisKelamin,TanggalLahir,Alamat,KelasNama
   1234567890,001,John Doe,john@email.com,M,2006-01-15,Jl. Merdeka,XII TKJ 1
   1234567891,002,Jane Doe,jane@email.com,P,2006-02-20,Jl. Sudirman,XII TKJ 1
   ```
3. Klik **Pilih File** dan select file CSV
4. Pilih kelas untuk siswa-siswa ini
5. Klik **Import**
6. Tunggu proses selesai (dapat memakan waktu untuk ribuan data)
7. Review hasil import (berapa berhasil, berapa error)

### Tambah Siswa Manual

**Best untuk:** Menambah siswa satu per satu

**Langkah:**

1. Buka menu **Siswa** → **Daftar Siswa**
2. Klik tombol **+ Tambah Siswa**
3. Isi form:
   - **NISN:** Nomor Induk Siswa Nasional (10 digit)
   - **NIS:** Nomor Induk Sekolah (internal, optional)
   - **Nama:** Nama lengkap
   - **Email:** Email siswa (optional)
   - **Jenis Kelamin:** L atau P
   - **Tanggal Lahir:** Untuk login siswa dengan NISN + DOB
   - **Alamat:** Alamat tempat tinggal
   - **Kelas:** Pilih dari dropdown
   - **Foto:** Upload foto (optional, JPG/PNG)
4. Klik **Simpan**

### Edit Siswa

1. Di daftar siswa, cari siswa yang ingin diedit
2. Klik nama siswa atau tombol **Edit**
3. Ubah data yang perlu
4. Klik **Simpan**

### Hapus Siswa

⚠️ **Hati-hati:** Penghapusan bersifat permanent dan akan menghapus semua data terkait (nilai, dokumen, dll).

1. Di daftar siswa, pilih siswa yang ingin dihapus
2. Klik tombol **Hapus**
3. Confirm dialog akan muncul
4. Klik **Hapus** lagi untuk confirm

---

## 📚 Kelola Guru & Kelas

### Tambah Guru

1. Buka menu **Guru & Kelas** → **Daftar Guru**
2. Klik **+ Tambah Guru**
3. Isi form:
   - **NIP:** Nomor Induk Pegawai
   - **Nama:** Nama lengkap guru
   - **Email:** Email untuk login
   - **Mata Pelajaran:** Pilih mata pelajaran yang diajar (bisa multiple select)
4. Klik **Simpan**
5. Guru akan menerima email untuk setup password

### Kelola Kelas

1. Buka menu **Guru & Kelas** → **Daftar Kelas**
2. **Tambah kelas baru:** Klik **+ Tambah Kelas**
   - Nama kelas (misal: XII TKJ 1)
   - Jurusan
   - Tingkat (10, 11, 12)
   - Wali kelas (guru)
   - Tahun ajaran
3. **Edit kelas:** Klik kelas untuk edit
4. **Lihat siswa di kelas:** Klik nama kelas

### Kelola Mata Pelajaran

1. Buka **Guru & Kelas** → **Mata Pelajaran**
2. **Tambah:** Klik **+ Tambah**
   - Kode (misal: MAT01)
   - Nama mata pelajaran
   - Kategori (Normatif/Adaptif/Produktif)
   - KKM (Kriteria Ketuntasan Minimal)
3. **Edit:** Klik untuk edit
4. **Hapus:** Klik tombol hapus

---

## 📝 Kelola Nilai

### Melihat Nilai Siswa

1. Buka menu **Nilai** → **Daftar Nilai**
2. Filter:
   - Pilih kelas
   - Pilih mata pelajaran
   - Pilih semester
3. Akan melihat tabel nilai semua siswa
4. Klik nama siswa untuk detail nilai per semester

### Locked/Unlock Nilai

**Lock:** Setelah nilai final, admin bisa lock agar guru tidak bisa edit lagi.

1. Di **Daftar Nilai**, pilih siswa yang nilai-nya sudah final
2. Klik **Lock Nilai**
3. Confirm dialog akan muncul
4. Klik **Lock** untuk confirm

**Unlock:** Jika ada kesalahan dan perlu diedit kembali.

1. Pilih siswa dengan nilai locked
2. Klik **Unlock Nilai**
3. Guru sekarang bisa edit lagi

### Verifikasi Perhitungan Nilai Akhir

Admin bisa check apakah perhitungan nilai akhir sudah benar.

1. Buka **Nilai** → **Hitung Nilai Akhir**
2. Pilih tahun ajaran
3. Klik **Hitung Otomatis**
4. Review hasilnya
5. Klik **Simpan** jika sudah benar

---

## 🎯 Tentukan Status Kelulusan

### Langkah-Langkah:

1. Buka menu **Kelulusan** → **Tentukan Status**
2. Pilih tahun ajaran
3. Pilih kelas (optional, untuk filter)
4. System akan menghitung status otomatis berdasarkan kriteria:
   - Rata-rata nilai ≥ KKM
   - Nilai US ≥ KKM
   - Nilai UKK ≥ KKM
   - Kehadiran ≥ 90%
5. Review hasil di tabel
6. Jika ada yang perlu di-override, klik siswa → **Override Status**

### Manual Override Status

**Kapan digunakan:** Siswa memenuhi syarat tapi harus tidak lulus (misal karena kedisiplinan), atau sebaliknya.

1. Di tabel status, klik siswa yang akan di-override
2. Klik **Override Status**
3. Pilih status baru (LULUS / TIDAK_LULUS)
4. Isi alasan (required, untuk audit log)
5. Klik **Simpan**

### Lihat Kriteria Kelulusan

Untuk melihat/mengubah kriteria:

1. Buka **Kelulusan** → **Kriteria**
2. Edit:
   - KKM per mata pelajaran
   - Bobot komponen (rapor, US, UKK, sikap, kehadiran)
   - Minimal kehadiran
3. Klik **Simpan**

---

## 📄 Generate & Kelola Dokumen (SKL)

### Generate SKL untuk Semua Siswa Lulus

1. Buka **Dokumen** → **Generate SKL**
2. Pilih tahun ajaran
3. Pilih kelas (optional, untuk generate hanya satu kelas)
4. Klik **Generate**
5. System akan generate PDF SKL untuk setiap siswa yang status-nya LULUS
6. Tunggu proses selesai
7. Semua file akan disimpan di Supabase Storage

### Generate SKL Individual

1. Buka **Dokumen** → **Daftar SKL**
2. Cari siswa yang SKL-nya belum ada
3. Klik **Generate**
4. SKL akan di-generate dan tersimpan

### Customize Template SKL

Sebelum generate SKL, Anda bisa customize template:

1. Buka **Dokumen** → **Template SKL**
2. Edit:
   - **Kop Surat:** Upload file gambar kop
   - **Tanda Tangan:** Upload scan tanda tangan kepala sekolah
   - **Teks:** Edit pesan/ucapan yang muncul di SKL
3. Preview akan update secara real-time
4. Klik **Simpan Template**
5. Template berlaku untuk semua SKL yang di-generate setelah ini

### Download SKL

1. Di **Daftar SKL**, klik siswa
2. Klik **Download PDF**
3. File akan didownload

### Lihat Arsip SKL

1. Buka **Dokumen** → **Arsip**
2. Filter berdasarkan tahun ajaran
3. Lihat list semua SKL yang sudah di-generate

---

## 👁️ Kontrol Visibilitas Data (⭐ Important)

**Fitur ini memungkinkan admin mengontrol apa yang dilihat siswa di dashboard mereka.**

### Buka Panel Visibilitas

1. Buka menu **Visibilitas** → **Pengaturan**
2. Pilih tahun ajaran
3. Akan melihat toggle untuk setiap elemen:

   - **Tampilkan SKL** — Apakah siswa bisa download SKL
   - **Tampilkan Nilai Rapor** — Apakah siswa bisa lihat nilai rapor
   - **Tampilkan Nilai US** — Apakah siswa bisa lihat nilai ujian sekolah
   - **Tampilkan Nilai UKK** — Apakah siswa bisa lihat nilai UKK
   - **Tampilkan Status Kelulusan** — Apakah siswa bisa lihat status LULUS/TIDAK_LULUS
   - **Tampilkan Transkrip** — Apakah siswa bisa download transkrip

### Ubah Visibility Settings

1. Pada panel visibilitas, toggle elemen yang ingin di-hide/show
   - **ON (biru)** = siswa bisa lihat
   - **OFF (abu)** = siswa tidak bisa lihat

2. Contoh use-case:
   - Sebelum hari pengumuman: Hide "Status Kelulusan"
   - Setelah pengumuman: Show "Status Kelulusan"
   - Jika ada masalah: Hide "SKL" sampai diperbaiki

3. Klik **Simpan**

### Preview Hasil (Lihat Sebagai Siswa)

Sebelum apply visibility settings, preview dulu:

1. Di panel visibilitas, klik **Preview Sebagai Siswa**
2. Akan membuka halaman dashboard siswa dengan setting saat ini
3. Lihat elemen mana yang visible dan mana yang hidden
4. Klik **Kembali** ke panel admin
5. Jika sudah sesuai, klik **Simpan**

### Audit Log Perubahan

Setiap kali Anda mengubah visibility settings, tercatat di audit log:

1. Siapa yang mengubah (email admin)
2. Kapan diubah (tanggal & jam)
3. Apa yang diubah (field mana dan dari value apa ke apa)

Lihat **Pengaturan** → **Audit Log** untuk melihat history perubahan.

---

## 📈 Laporan & Ekspor

### Lihat Statistik

1. Buka **Laporan** → **Statistik**
2. Pilih tahun ajaran dan (optional) jurusan
3. Akan melihat:
   - Total siswa
   - Total lulus / tidak lulus
   - Persentase kelulusan
   - Grafik per jurusan
   - Nilai tertinggi, terendah, rata-rata per mapel

### Ekspor ke Excel

1. Buka **Laporan** → **Ekspor**
2. Pilih format: **Excel**
3. Pilih data yang ingin di-ekspor:
   - Data siswa
   - Data nilai
   - Status kelulusan
   - Atau kombinasi
4. Pilih tahun ajaran & kelas (optional)
5. Klik **Ekspor**
6. File Excel akan didownload

### Ekspor ke PDF

Sama seperti Excel, tapi pilih format **PDF** di langkah 2.

**File PDF:** Sudah siap dicetak dan diserahkan ke Dinas Pendidikan.

---

## ⚙️ Pengaturan Sistem

### Profil Sekolah

1. Buka **Pengaturan** → **Profil Sekolah**
2. Edit:
   - **Nama sekolah**
   - **NPSN** (Nomor Pokok Sekolah Nasional)
   - **Alamat**
   - **Telepon & Email**
   - **Logo sekolah** — Upload gambar logo (JPG/PNG)
   - **Kop surat** — Upload gambar kop surat untuk SKL
3. Klik **Simpan**

### Pengaturan Pengumuman

1. Buka **Pengaturan** → **Pengumuman**
2. Edit:
   - **Tanggal pengumuman** — Kapan hasil kelulusan diumumkan
   - **Jam pengumuman** — Jam berapa pengumuman bisa diakses
   - **Mode terjadwal** — Jika ON, halaman pengumuman hanya bisa diakses pada jam yang ditentukan
3. Klik **Simpan**

### Tema & Tampilan

1. Buka **Pengaturan** → **Tema**
2. Pilih:
   - **Light Mode** — Warna cerah (default)
   - **Dark Mode** — Warna gelap
3. Tema akan berubah untuk semua pengguna

### Kelola User (Admin/Guru)

1. Buka **Pengaturan** → **Kelola User**
2. **Tambah user baru:** Klik **+ Tambah**
   - Email
   - Role (admin / guru / kepsek)
   - Data terkait (jurusan, kelas, dll)
3. User akan menerima email untuk setup password
4. **Edit user:** Klik user untuk edit
5. **Hapus user:** Klik tombol hapus

---

## 🔒 Keamanan

### Change Password

1. Klik profil icon di top-right
2. Klik **Ubah Password**
3. Masukkan password lama
4. Masukkan password baru (min 8 karakter)
5. Klik **Simpan**

### Logout

1. Klik profil icon di top-right
2. Klik **Logout**
3. Akan kembali ke halaman login

### Aktivitas (Audit Log)

Untuk track semua aktivitas di aplikasi:

1. Buka **Pengaturan** → **Audit Log**
2. Filter berdasarkan:
   - Tanggal
   - User
   - Aksi (create, update, delete, dll)
3. Lihat siapa melakukan apa dan kapan

---

## 🆘 Troubleshooting

### Lupa Password Admin

Hubungi owner/administrator teknis untuk reset password.

### Data Siswa Salah

1. Edit di menu **Siswa**
2. Ubah data yang salah
3. Klik **Simpan**

### Nilai Tidak Terhitung

1. Pastikan nilai untuk semua mata pelajaran sudah diinput guru
2. Pastikan ada nilai minimal untuk setiap komponen (rapor, US, UKK)
3. Buka **Nilai** → **Hitung Nilai Akhir**
4. Klik **Hitung Otomatis** lagi

### SKL Tidak Generate

1. Pastikan status kelulusan sudah ditentukan
2. Pastikan siswa status-nya LULUS
3. Pastikan template SKL sudah di-setup
4. Coba **Generate** lagi

### File Upload Gagal

1. Pastikan file size < 10MB
2. Pastikan format file: JPG, PNG, PDF, CSV, XLS, XLSX
3. Coba ulang atau hubungi admin teknis

---

## 📞 Kontak Support

Jika ada pertanyaan atau masalah:

- **Email:** umarov.studio@gmail.com
- **GitHub Issues:** https://github.com/umarovk/graduation-app/issues
- **Dokumentasi:** Lihat folder `docs/`

---

**Last updated:** 2026-04-28
