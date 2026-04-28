# 📖 Manual Siswa — Aplikasi Kelulusan SMK

Panduan lengkap untuk siswa menggunakan aplikasi untuk melihat hasil kelulusan.

---

## 🔐 Login Siswa

### Langkah-Langkah:

1. Buka aplikasi: `https://yourapp.com`
2. Klik **Login Siswa**
3. Masukkan:
   - **NISN:** Nomor Induk Siswa Nasional (10 digit)
   - **Tanggal Lahir:** Tanggal lahir Anda (format: YYYY-MM-DD atau sesuai form)
4. Klik **Sign In**
5. Akan masuk ke dashboard siswa

### Lupa NISN?

NISN adalah nomor nasional siswa, bisa dilihat di:
- Rapor sekolah
- Ijazah
- Tanya ke guru/admin sekolah

### Password?

Untuk siswa, **tidak ada password**. Hanya menggunakan **NISN + Tanggal Lahir**.

---

## 📊 Dashboard Siswa

Setelah login, Anda akan melihat dashboard dengan informasi:

### Informasi Pribadi

- Nama
- NISN
- Kelas
- Jurusan/Kompetensi Keahlian
- Foto profil

### Kartu Tanda Pengenal (KTP)

Info lengkap untuk cetak atau screenshot:
- Nama lengkap
- NISN
- Tanggal lahir
- Alamat
- Foto

---

## 📝 Lihat Nilai & Status Kelulusan

### Nilai yang Bisa Dilihat (Tergantung Pengaturan Admin)

Admin dapat mengatur elemen mana yang ditampilkan atau disembunyikan:

✅ **Elemen yang mungkin ditampilkan:**
- Nilai rapor semester 1-6
- Nilai Ujian Sekolah (US)
- Nilai UKK (Ujian Kompetensi Keahlian)
- Nilai praktik
- Nilai sikap
- Nilai PKL (Praktik Kerja Lapangan)
- Status kelulusan (LULUS / TIDAK LULUS)
- Transkrip nilai lengkap

❌ **Elemen yang mungkin disembunyikan** (oleh admin):
- Tidak semua elemen di atas akan ditampilkan
- Tergantung pengaturan admin dan kapan pengumuman dilakukan

### Lihat Nilai Rapor

1. Di dashboard, buka menu **Nilai** atau **Nilai Rapor**
2. Akan melihat tabel nilai untuk semua mata pelajaran
3. Per baris = 1 mata pelajaran
4. Per kolom = nilai untuk setiap semester
5. **Contoh:**
   ```
   Mata Pelajaran | Sem 1 | Sem 2 | Sem 3 | Sem 4 | Sem 5 | Sem 6
   Matematika     | 85    | 87    | 86    | 88    | 89    | 90
   Bahasa Inggris | 80    | 82    | 83    | 84    | 85    | 86
   ```

### Lihat Nilai Ujian Sekolah (US)

1. Buka menu **Ujian Sekolah** atau **Nilai US**
2. Akan melihat nilai US Anda per mata pelajaran ujian

### Lihat Status Kelulusan

1. Buka menu **Status Kelulusan** (jika admin sudah menampilkannya)
2. Akan melihat:
   - ✅ **LULUS** — Selamat! Anda lulus dan berhak mendapatkan Surat Keterangan Lulus
   - ❌ **TIDAK LULUS** — Mohon hubungi admin untuk informasi lebih lanjut

### Lihat Nilai Akhir/Final

1. Buka menu **Nilai Akhir**
2. Akan melihat:
   - Rata-rata rapor (semester 1-6)
   - Nilai US
   - Nilai UKK
   - **Nilai Final** (weighted average yang menentukan kelulusan)

---

## 📄 Download Dokumen

### Download Surat Keterangan Lulus (SKL)

✅ **Hanya bisa di-download jika:**
- Status kelulusan Anda = **LULUS**
- Admin sudah menampilkan SKL (tidak disembunyikan)

**Langkah-Langkah:**

1. Buka menu **Dokumen** → **SKL/Surat Keterangan Lulus**
2. Jika tersedia, akan ada tombol **Download PDF**
3. Klik **Download PDF**
4. File akan didownload (berformat PDF)
5. Buka dengan PDF reader atau browser
6. Bisa dicetak atau digital (tergati kebutuhan)

### SKL Berisi:

- Data lengkap siswa (nama, NISN, alamat)
- Keterangan LULUS
- Tanggal kelulusan
- Tanda tangan digital kepala sekolah
- QR Code untuk verifikasi keaslian

### Download Transkrip Nilai

✅ **Jika admin menampilkannya:**

1. Buka menu **Dokumen** → **Transkrip Nilai**
2. Klik **Download PDF**
3. File akan didownload
4. Berisi daftar lengkap semua nilai Anda per semester, per mata pelajaran

### Verifikasi SKL via QR Code

Untuk memverifikasi keaslian SKL Anda (atau punya orang lain):

1. Buka halaman publik: `https://yourapp.com/verify`
2. Scan **QR Code** dari SKL menggunakan kamera smartphone
3. Atau masukkan **kode verifikasi** manual
4. Akan muncul informasi:
   - Nama siswa
   - NISN
   - Status kelulusan
   - Tanggal kelulusan
   - ✅ **Verified** (asli) atau ❌ **Invalid** (palsu)

---

## 📢 Pengumuman Kelulusan

### Halaman Pengumuman Publik

Sebelum hasil kelulusan diumumkan, ada halaman publik yang bisa diakses siapa saja:

1. Buka aplikasi (tanpa perlu login)
2. Klik **Pengumuman** atau lihat halaman depan
3. Akan ada **countdown timer** menunjukkan berapa lama sampai pengumuman
4. Pada tanggal & jam pengumuman, siswa bisa login untuk lihat hasil

### Akses Terjadwal

⏰ **Pengumuman hanya bisa diakses pada jam tertentu** (sesuai pengaturan admin).

Contoh: Pengumuman dibuka **Selasa, 15 Juni 2026 jam 10:00**.
- **Sebelum jam 10:00:** Halaman pengumuman tidak bisa diakses (countdown timer terlihat)
- **Pada jam 10:00:** Halaman bisa diakses, Anda bisa login & lihat hasil
- **Setelah jam 10:00:** Terus bisa diakses

---

## 🔒 Keamanan

### Change Tanggal Lahir / Update Profil

Untuk update profil Anda:

1. Klik **profil icon** di top-right
2. Klik **Edit Profil**
3. Ubah data yang diperlukan (foto, alamat, dll)
4. Klik **Simpan**

⚠️ **NISN & Tanggal Lahir tidak bisa diubah** (untuk keamanan login).

### Logout

1. Klik **profil icon** di top-right
2. Klik **Logout**
3. Akan kembali ke halaman publik

---

## ✅ Checklist Sebelum Pengumuman

Pastikan Anda sudah:

- [ ] Bisa login dengan NISN + tanggal lahir
- [ ] Bisa lihat nilai rapor Anda
- [ ] Tahu nama guru & sekolah Anda
- [ ] Screenshoot atau print dokumen penting sebelum pengumuman
- [ ] Siapkan perangkat (laptop, tablet, atau smartphone) untuk akses saat pengumuman
- [ ] Cek koneksi internet yang stabil

---

## ❓ FAQ

### Q: Lupa tanggal lahir saya format apa?

**A:** Format: **YYYY-MM-DD** (contoh: 2006-01-15 untuk 15 Januari 2006)
Atau lihat form login, biasanya ada format yang diminta.

### Q: Tidak bisa lihat nilai, padahal teman-teman bisa?

**A:** Kemungkinan admin masih menyembunyikan nilai (belum pengumuman resmi). Tunggu admin menampilkannya.

### Q: SKL saya tidak bisa didownload, kenapa?

**A:** Beberapa kemungkinan:
1. Status Anda belum LULUS
2. Admin belum menampilkan SKL (masih disembunyikan)
3. SKL belum di-generate (hubungi admin)
4. Browser cache (coba refresh atau clear cache)

### Q: Nilai saya kurang dari KKM, tapi teman saya lulus. Kenapa?

**A:** Kemungkinan:
1. KKM berbeda per mata pelajaran
2. Rata-rata keseluruhan sudah di atas KKM
3. Ada proses appeal/kompensasi dari guru

Tanyakan ke guru atau admin untuk penjelasan.

### Q: QR Code di SKL tidak bisa scan?

**A:** Coba:
1. Pastikan pencahayaan cukup
2. Scan dengan kamera smartphone
3. Atau coba QR Code app lain
4. Jika masih tidak bisa, bisa manual input kode verifikasi

### Q: Bisa print SKL berkali-kali?

**A:** Ya, SKL bisa di-download dan di-print berkali-kali.
SKL asli adalah dokumen digital bertanda tangan & QR Code dari sistem.

---

## 📞 Hubungi Admin/Guru

Jika ada pertanyaan atau masalah:

- **Admin Sekolah:** Hubungi admin aplikasi di sekolah Anda
- **Guru Wali Kelas:** Tanyakan tentang nilai atau status kelulusan
- **Kepala Sekolah:** Jika ada keluhan formal atau appeal

---

## 🎓 Setelah Lulus

Setelah dinyatakan lulus:

1. ✅ Download & simpan SKL
2. ✅ Download & simpan transkrip nilai
3. ✅ Verifikasi SKL via QR Code (simpan screenshot)
4. ✅ Screenshot dashboard siswa (bukti nilai)
5. ✅ Print SKL untuk keperluan:
   - Pendaftaran ke perguruan tinggi
   - Lamaran kerja
   - Dokumentasi pribadi
6. ✅ Scan/foto semua dokumen untuk backup digital

---

**Last updated:** 2026-04-28

---

**Selamat! Semoga aplikasi ini memudahkan Anda dalam proses kelulusan. Sukses selalu! 🎓**
