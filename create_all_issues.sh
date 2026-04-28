#!/bin/bash
GH="/c/Program Files/GitHub CLI/gh.exe"

echo "🚀 Membuat GitHub issues..."

# Milestone 1
$GH issue create --title "Milestone 1: Setup Next.js, Tailwind, Supabase & Autentikasi" --body "## Fondasi Aplikasi (Minggu 1–2)

### Checklist:
- [ ] Setup Next.js + Tailwind CSS + shadcn/ui, deploy ke Vercel
- [ ] Setup Supabase project: database, auth, storage, RLS policies
- [ ] Desain ERD & SQL migrations (tabel: siswa, kelas, jurusan, nilai, visibility_settings, dll)
- [ ] Autentikasi multi-role via Supabase Auth + custom claims
- [ ] CRUD data master (siswa, guru, kelas, jurusan, mata pelajaran)
- [ ] Import data siswa dari Excel/CSV

**Periode:** Minggu 1–2" --label "milestone,setup"

# Milestone 2
$GH issue create --title "Milestone 2: Input Nilai, Kriteria Kelulusan & Panel Visibilitas" --body "## Inti Sistem Kelulusan (Minggu 3–4)

### Checklist:
- [ ] Modul input & kelola nilai (API Routes + Supabase)
- [ ] Konfigurasi kriteria kelulusan & perhitungan otomatis
- [ ] Dashboard admin dasar (statistik siswa, lulus/tidak lulus, per jurusan)
- [ ] Panel Visibilitas – CRUD visibility_settings & kontrol hide/unhide:
  - [ ] Sembunyikan/tampilkan SKL
  - [ ] Sembunyikan/tampilkan Nilai Rapor
  - [ ] Sembunyikan/tampilkan Nilai US
  - [ ] Sembunyikan/tampilkan Nilai UKK
  - [ ] Sembunyikan/tampilkan Status Kelulusan
- [ ] Middleware API untuk pengecekan visibility_settings
- [ ] Halaman preview 'Lihat sebagai Siswa'

**Periode:** Minggu 3–4" --label "milestone,core"

# Milestone 3
$GH issue create --title "Milestone 3: Pengumuman Publik, SKL PDF & Notifikasi" --body "## Pengumuman Kelulusan & Dokumen (Minggu 5–6)

### Checklist:
- [ ] Halaman pengumuman publik dengan countdown & mode terjadwal
- [ ] Generate SKL PDF + QR verifikasi (Puppeteer / @react-pdf/renderer)
- [ ] Upload & simpan SKL ke Supabase Storage
- [ ] Halaman verifikasi publik: /verify/{kode}
- [ ] Transkrip nilai PDF
- [ ] Notifikasi email (Nodemailer) + WhatsApp (Fonnte)
- [ ] Animasi visual saat pengumuman

**Periode:** Minggu 5–6" --label "milestone,announcement"

# Milestone 4
$GH issue create --title "Milestone 4: Laporan, Tema Gelap & Dokumentasi" --body "## Pelengkap & Polish (Minggu 7–8)

### Checklist:
- [ ] Laporan & ekspor Excel/PDF
- [ ] Tema gelap & responsif mobile
- [ ] Realtime update pengumuman via Supabase Realtime (opsional)
- [ ] Dokumentasi & manual book
- [ ] UAT (User Acceptance Test) bersama sekolah
- [ ] Security audit & penetration testing

**Periode:** Minggu 7–8" --label "milestone,polish"

echo "✅ Semua 4 milestone issues berhasil dibuat!"
