#!/bin/bash

# Milestone 1 - Fondasi
gh issue create --title "Milestone 1: Setup Next.js, Tailwind, Supabase & Autentikasi" --body "
## Fondasi Aplikasi (Minggu 1–2)

### Checklist:
- [ ] Setup Next.js + Tailwind CSS + shadcn/ui, deploy ke Vercel
- [ ] Setup Supabase project: database, auth, storage, RLS policies
- [ ] Desain ERD & SQL migrations (tabel: siswa, kelas, jurusan, nilai, visibility_settings, dll)
- [ ] Autentikasi multi-role via Supabase Auth + custom claims (admin, guru, kepsek, siswa)
- [ ] CRUD data master (siswa, guru, kelas, jurusan, mata pelajaran)
- [ ] Import data siswa dari Excel/CSV (bulk upload)

**Kontak:** Fokus pada fondasi & infrastruktur yang solid." --label "milestone,setup" 

# Milestone 2 - Inti Kelulusan
gh issue create --title "Milestone 2: Input Nilai, Kriteria Kelulusan & Panel Visibilitas" --body "
## Inti Sistem Kelulusan (Minggu 3–4)

### Checklist:
- [ ] Modul input & kelola nilai (API Routes + Supabase)
- [ ] Konfigurasi kriteria kelulusan & perhitungan otomatis
- [ ] Dashboard admin dasar (statistik siswa, lulus/tidak lulus, per jurusan)
- [ ] **Panel Visibilitas** – CRUD \`visibility_settings\`, kontrol hide/unhide:
  - [ ] Sembunyikan/tampilkan SKL
  - [ ] Sembunyikan/tampilkan Nilai Rapor
  - [ ] Sembunyikan/tampilkan Nilai US (Ujian Sekolah)
  - [ ] Sembunyikan/tampilkan Nilai UKK
  - [ ] Sembunyikan/tampilkan Status Kelulusan
- [ ] Middleware/guard di API untuk pengecekan visibility_settings
- [ ] Halaman preview \"Lihat sebagai Siswa\"

**Kontak:** Fitur inti sistem & kontrol admin." --label "milestone,core"

# Milestone 3 - Pengumuman & Dokumen
gh issue create --title "Milestone 3: Pengumuman Publik, SKL PDF & Notifikasi" --body "
## Pengumuman Kelulusan & Dokumen (Minggu 5–6)

### Checklist:
- [ ] Halaman pengumuman publik dengan countdown & mode terjadwal
- [ ] Generate SKL PDF + QR verifikasi (Puppeteer / @react-pdf/renderer)
- [ ] Upload & simpan SKL ke Supabase Storage
- [ ] Halaman verifikasi publik: /verify/{kode}
- [ ] Transkrip nilai PDF
- [ ] Notifikasi email (Nodemailer) + WhatsApp (Fonnte)
- [ ] Animasi visual saat pengumuman (confetti, dll)
- [ ] Halaman \"Lihat sebagai Siswa\" untuk preview visibilitas

**Kontak:** Fitur pengumuman & dokumen resmi." --label "milestone,announcement"

# Milestone 4 - Pelengkap & Polish
gh issue create --title "Milestone 4: Laporan, Tema Gelap & Dokumentasi" --body "
## Pelengkap & Polish (Minggu 7–8)

### Checklist:
- [ ] Laporan & ekspor Excel/PDF
- [ ] Tema gelap & responsif mobile
- [ ] Realtime update pengumuman via Supabase Realtime (opsional)
- [ ] Dokumentasi & manual book
- [ ] UAT (User Acceptance Test) bersama sekolah
- [ ] Security audit & penetration testing

**Kontak:** Fitur pendukung & quality assurance." --label "milestone,polish"

# Feature: Autentikasi
gh issue create --title "Feature: Autentikasi & Manajemen Pengguna (Multi-role)" --body "
## Implementasi autentikasi & RBAC

### Sub-tasks:
- [ ] Login NISN + tanggal lahir (untuk siswa)
- [ ] Login username/email + password (admin, guru, kepsek)
- [ ] Role-based access control (RBAC) via custom claims
- [ ] Lupa password / reset password via email
- [ ] Proteksi brute-force (rate limiting + captcha)
- [ ] Activity log (audit trail)

**Terkait:** Milestone 1" --label "feature,auth"

# Feature: Manajemen Nilai
gh issue create --title "Feature: Manajemen Nilai & Perhitungan Otomatis" --body "
## Input & kelola nilai siswa

### Sub-tasks:
- [ ] Input nilai rapor semester 1–6
- [ ] Input nilai Ujian Sekolah (US)
- [ ] Input nilai UKK (Ujian Kompetensi Keahlian)
- [ ] Input nilai sikap/kepribadian & PKL
- [ ] Perhitungan nilai akhir otomatis (berbasis bobot)
- [ ] Validasi & penguncian nilai

**Terkait:** Milestone 2" --label "feature,grades"

# Feature: Pengumuman Kelulusan
gh issue create --title "Feature: Halaman Pengumuman Publik (dengan Countdown)" --body "
## Halaman pengumuman kelulusan terjadwal

### Sub-tasks:
- [ ] Halaman publik pengumuman (tanpa login / NISN+tgl lahir)
- [ ] Countdown timer menuju pengumuman
- [ ] Mode terjadwal (hanya bisa diakses jam tertentu)
- [ ] Tampilkan status LULUS/TIDAK LULUS + ucapan
- [ ] Animasi & efek visual (confetti, dll)
- [ ] Notifikasi push/email saat pengumuman

**Terkait:** Milestone 3" --label "feature,announcement"

# Feature: Dokumen SKL
gh issue create --title "Feature: Generate SKL PDF & QR Verifikasi" --body "
## Pembuatan dokumen kelulusan digital

### Sub-tasks:
- [ ] Generate SKL otomatis (PDF)
- [ ] Template SKL (kop, logo, TTD digital kepsek)
- [ ] QR Code untuk verifikasi keaslian
- [ ] Halaman verifikasi publik (/verify/{kode})
- [ ] Simpan SKL ke Supabase Storage
- [ ] Transkrip nilai PDF

**Terkait:** Milestone 3" --label "feature,document"

# Feature: Dashboard & Laporan
gh issue create --title "Feature: Dashboard Admin & Laporan Statistik" --body "
## Dashboard & laporan untuk admin & sekolah

### Sub-tasks:
- [ ] Dashboard admin: statistik siswa, lulus/tidak lulus, per jurusan/kelas
- [ ] Grafik persentase kelulusan
- [ ] Statistik nilai (tertinggi, rata-rata, terendah)
- [ ] Dashboard siswa: nilai, status, tombol unduh SKL
- [ ] Ekspor laporan Excel/PDF
- [ ] Laporan siap cetak untuk Dinas Pendidikan

**Terkait:** Milestone 2, 4" --label "feature,dashboard"

# Feature: Kontrol Visibilitas
gh issue create --title "Feature: Panel Kontrol Visibilitas Data (Hide/Unhide)" --body "
## Admin dapat mengontrol apa yang dilihat siswa

### Sub-tasks:
- [ ] CRUD \`visibility_settings\` di database
- [ ] Panel admin: toggle hide/unhide per item (SKL, nilai, status, dll)
- [ ] Pengaturan per tahun ajaran (tidak ubah tahun sebelumnya)
- [ ] Audit log: siapa mengubah, kapan, nilai sebelum/sesudah
- [ ] Middleware API: pengecekan visibility_settings
- [ ] Halaman preview \"Lihat sebagai Siswa\" (realtime)

**Terkait:** Milestone 2" --label "feature,visibility,admin"

# Feature: Pengaturan Sistem
gh issue create --title "Feature: Pengaturan Sistem & Profil Sekolah" --body "
## Konfigurasi profil sekolah & pengaturan umum

### Sub-tasks:
- [ ] Profil sekolah (nama, NPSN, alamat, logo, kop surat)
- [ ] Upload logo/kop ke Supabase Storage
- [ ] Pengaturan tanggal & jam pengumuman
- [ ] Manajemen template email/WA
- [ ] Pengaturan tema / mode gelap
- [ ] KKM & bobot komponen kelulusan (dapat dikonfigurasi)

**Terkait:** Milestone 1, 2" --label "feature,settings"

# Feature: Keamanan & Privasi
gh issue create --title "Feature: Keamanan, Enkripsi & GDPR Compliance" --body "
## Implementasi keamanan & privasi data

### Sub-tasks:
- [ ] Enkripsi password (bcrypt/argon2)
- [ ] HTTPS wajib di production
- [ ] Proteksi XSS, CSRF, SQL Injection
- [ ] Rate limiting untuk endpoint publik
- [ ] RLS policies di Supabase
- [ ] Data handling: penghapusan/anonimasi setelah X tahun
- [ ] Security audit & penetration testing

**Terkait:** Semua milestone" --label "feature,security"

# Documentation
gh issue create --title "Documentation: Manual Book & README" --body "
## Dokumentasi lengkap aplikasi

### Sub-tasks:
- [ ] README.md (fitur, instalasi, deployment)
- [ ] Manual book admin (bagaimana menggunakan fitur)
- [ ] Manual book guru (input nilai, verifikasi)
- [ ] Manual book siswa (login, lihat hasil, unduh SKL)
- [ ] API documentation
- [ ] Database schema documentation

**Terkait:** Milestone 4" --label "documentation"

echo "✅ Semua issues berhasil dibuat!"
