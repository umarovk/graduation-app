# 🎓 Perencanaan Aplikasi Kelulusan SMK

> Dokumen ini merangkum rencana pengembangan **Aplikasi Kelulusan SMK** berbasis web. Setiap bagian di bawah dapat dipecah menjadi issue terpisah di GitHub (gunakan checklist sebagai acuan sub-task).

---

## 📌 Ringkasan Proyek

Aplikasi Kelulusan SMK adalah sistem informasi berbasis web yang digunakan oleh sekolah untuk:

- Mengumumkan hasil kelulusan siswa secara online.
- Menampilkan nilai akhir (rapor/UAS/US/Ujian Kompetensi Keahlian).
- Mempermudah siswa, orang tua, dan guru mengakses informasi kelulusan.
- Mencetak Surat Keterangan Lulus (SKL) secara otomatis.

**Target Pengguna:**
- **Admin / Operator** – Mengelola data induk (siswa, guru, jurusan, kelas, nilai).
- **Guru / Wali Kelas** – Menginput nilai dan memverifikasi data siswa.
- **Kepala Sekolah** – Memverifikasi & menandatangani SKL secara digital.
- **Siswa / Orang Tua** – Melihat pengumuman kelulusan & mengunduh SKL.

---

## 🎯 Tujuan

- [ ] Mengurangi antrean fisik saat pengumuman kelulusan.
- [ ] Transparansi nilai dan hasil kelulusan.
- [ ] Mempercepat proses pencetakan dokumen kelulusan.
- [ ] Menyediakan arsip digital hasil kelulusan per tahun ajaran.

---

## 🧩 Fitur Utama

### 1. Autentikasi & Manajemen Pengguna
- [ ] Login menggunakan NISN + tanggal lahir (untuk siswa).
- [ ] Login username/email + password (untuk admin, guru, kepsek).
- [ ] Role-based access control (RBAC): Admin, Guru, Kepsek, Siswa.
- [ ] Lupa password / reset password via email.
- [ ] Proteksi brute-force (rate limiting + captcha).
- [ ] Activity log (audit trail) untuk setiap aksi penting.

### 2. Manajemen Data Master
- [ ] CRUD data siswa (NISN, NIS, nama, jenis kelamin, TTL, alamat, foto, dll).
- [ ] CRUD data guru & wali kelas.
- [ ] CRUD data jurusan / kompetensi keahlian (misal: TKJ, RPL, MM, AKL, OTKP).
- [ ] CRUD data kelas (XII TKJ 1, XII RPL 2, dll).
- [ ] CRUD data mata pelajaran (Normatif, Adaptif, Produktif/Kejuruan).
- [ ] CRUD tahun ajaran & periode kelulusan.
- [ ] Import data siswa dari Excel/CSV (bulk upload).

### 3. Manajemen Nilai
- [ ] Input nilai rapor semester 1–6.
- [ ] Input nilai Ujian Sekolah (US) / Ujian Akhir.
- [ ] Input nilai Ujian Kompetensi Keahlian (UKK).
- [ ] Input nilai sikap / kepribadian.
- [ ] Input nilai praktik kerja industri (PKL/Prakerin).
- [ ] Perhitungan nilai akhir otomatis berdasarkan bobot yang dapat dikonfigurasi.
- [ ] Validasi & penguncian nilai oleh wali kelas / kepsek.

### 4. Pengaturan Kriteria Kelulusan
- [ ] Konfigurasi KKM per mata pelajaran.
- [ ] Konfigurasi bobot komponen kelulusan (rapor, US, UKK, sikap, kehadiran).
- [ ] Konfigurasi syarat minimal kehadiran.
- [ ] Penentuan status kelulusan otomatis (LULUS / TIDAK LULUS) berdasarkan kriteria.
- [ ] Override manual oleh admin (dengan alasan & log).

### 5. Pengumuman Kelulusan
- [ ] Halaman publik pengumuman kelulusan (tanpa login / dengan NISN+tgl lahir).
- [ ] Countdown timer menuju tanggal pengumuman.
- [ ] Tampilkan status LULUS / TIDAK LULUS + ucapan.
- [ ] Mode terjadwal: pengumuman hanya bisa diakses pada tanggal & jam tertentu.
- [ ] Notifikasi via email / WhatsApp (opsional, integrasi Fonnte/Wablas/SMTP).
- [ ] Animasi / efek visual saat mengumumkan (confetti, dll).

### 6. Surat Keterangan Lulus (SKL) & Dokumen
- [ ] Generate SKL otomatis dalam format PDF.
- [ ] Template SKL dapat dikustom (kop sekolah, logo, TTD kepsek, stempel).
- [ ] QR Code pada SKL untuk verifikasi keaslian.
- [ ] Halaman verifikasi publik: `/verify/{kode}` menampilkan data SKL.
- [ ] Tanda tangan digital kepala sekolah (scan/PNG atau e-sign).
- [ ] Unduh transkrip nilai (PDF).
- [ ] Arsip dokumen per tahun ajaran.

### 7. Dashboard & Laporan
- [ ] Dashboard admin: total siswa, jumlah lulus, jumlah tidak lulus, per jurusan, per kelas.
- [ ] Grafik persentase kelulusan per jurusan & tahun.
- [ ] Statistik nilai tertinggi, rata-rata, terendah per mapel.
- [ ] Dashboard siswa: nilai akhir, status, tombol unduh SKL.
- [ ] Ekspor laporan ke Excel / PDF.
- [ ] Laporan rekap kelulusan siap cetak untuk Dinas Pendidikan.

### 8. Kontrol Visibilitas Data (Admin)
- [ ] Panel kontrol **hide/unhide** elemen yang ditampilkan ke siswa, tersimpan di tabel `visibility_settings` (Supabase).
- [ ] Toggle per-item:
  - [ ] Sembunyikan / tampilkan **Surat Keterangan Lulus (SKL)** – tombol unduh SKL tidak muncul di dashboard siswa jika di-hide.
  - [ ] Sembunyikan / tampilkan **Nilai Rapor** (detail per semester).
  - [ ] Sembunyikan / tampilkan **Nilai Ujian Sekolah (US)**.
  - [ ] Sembunyikan / tampilkan **Nilai UKK (Ujian Kompetensi Keahlian)**.
  - [ ] Sembunyikan / tampilkan **Transkrip Nilai** (unduh PDF).
  - [ ] Sembunyikan / tampilkan **Status Kelulusan** (LULUS / TIDAK LULUS).
  - [ ] Sembunyikan / tampilkan **Peringkat / Ranking** (jika ada fitur ranking).
  - [ ] Sembunyikan / tampilkan **Pengumuman / Banner** tertentu.
- [ ] Pengaturan visibilitas dapat dikunci per **tahun ajaran** (tidak mengubah tahun sebelumnya).
- [ ] Perubahan visibilitas tercatat di **audit log** (siapa yang mengubah, kapan, nilai sebelum/sesudah).
- [ ] Middleware/guard di API: setiap endpoint yang melayani data siswa wajib mengecek `visibility_settings` sebelum mengembalikan data.
- [ ] UI: halaman preview "Lihat sebagai Siswa" agar admin bisa melihat tampilan siswa secara real-time sebelum publish.

### 9. Pengaturan Sistem
- [ ] Profil sekolah (nama, NPSN, alamat, logo, kop surat) – disimpan di Supabase Storage & tabel `school_settings`.
- [ ] Pengaturan tanggal & jam pengumuman.
- [ ] Manajemen template email/WA.
- [ ] Pengaturan tema / mode gelap.

### 10. Keamanan & Privasi
- [ ] Enkripsi password (bcrypt/argon2).
- [ ] HTTPS wajib di production.
- [ ] Proteksi XSS, CSRF, SQL Injection.
- [ ] Rate limiting untuk endpoint publik.
- [ ] Data siswa hanya terlihat oleh yang bersangkutan & pihak berwenang.
- [ ] GDPR-like: data bisa dihapus / dianonimkan setelah X tahun.

---

## 🧱 Arsitektur & Teknologi

| Lapisan | Teknologi yang Digunakan |
|---|---|
| Frontend | **Next.js** (App Router) + **Tailwind CSS** + shadcn/ui |
| Backend / API | **Node.js** via Next.js API Routes + **Supabase Edge Functions** (opsional) |
| Database | **Supabase** (PostgreSQL managed) |
| Autentikasi | **Supabase Auth** (email/password, magic link, custom claims untuk RBAC) |
| ORM / Query | **Supabase JS Client** (`@supabase/supabase-js`) + Supabase RLS (Row Level Security) |
| PDF Generator | **Puppeteer** / `@react-pdf/renderer` (dijalankan via API Route) |
| QR Code | `qrcode` npm package |
| Storage (foto, stempel, logo) | **Supabase Storage** |
| Deployment | **Vercel** (frontend + API Routes serverless) |
| Notifikasi | Nodemailer + SMTP / Fonnte (WhatsApp) via API Route |
| Realtime (opsional) | **Supabase Realtime** (update pengumuman live) |

> **Stack ringkas:** Next.js → Vercel untuk deployment, Supabase untuk database + auth + storage + realtime. Seluruh backend cukup di API Routes Next.js tanpa server terpisah.

---

## 🗂️ Struktur Modul (High-level)

```
kelulusan-smk/                  (Next.js App Router)
├── app/
│   ├── (auth)/                 # Login, reset password
│   ├── (public)/               # Pengumuman publik, verifikasi QR
│   ├── admin/                  # Dashboard & semua fitur admin
│   │   ├── siswa/              # CRUD data master siswa
│   │   ├── nilai/              # Input & kelola nilai
│   │   ├── kelulusan/          # Kriteria & penentuan status
│   │   ├── visibilitas/        # ⭐ Panel hide/unhide data siswa
│   │   ├── dokumen/            # Template SKL, arsip
│   │   ├── laporan/            # Statistik & ekspor
│   │   └── pengaturan/         # Profil sekolah, tema
│   ├── guru/                   # Dashboard & input nilai
│   ├── siswa/                  # Dashboard siswa (nilai, SKL, status)
│   └── api/                    # API Routes (Node.js serverless)
│       ├── auth/
│       ├── nilai/
│       ├── kelulusan/
│       ├── dokumen/            # Generate PDF, QR
│       ├── visibilitas/        # ⭐ CRUD visibility_settings
│       └── notifikasi/
├── components/                 # Shared UI components
├── lib/
│   ├── supabase/               # Supabase client (server & browser)
│   └── pdf/                    # Template PDF SKL & transkrip
└── supabase/
    ├── migrations/             # SQL migrations
    └── seed.sql                # Data awal / dummy
```

---

## 🛣️ Roadmap Pengembangan

### Milestone 1 – Fondasi (Minggu 1–2)
- [ ] Setup Next.js + Tailwind + shadcn/ui, deploy ke Vercel.
- [ ] Setup Supabase project: database, auth, storage, RLS policies.
- [ ] Desain ERD & SQL migrations (tabel: siswa, kelas, jurusan, nilai, visibility_settings, dll).
- [ ] Autentikasi multi-role via Supabase Auth + custom claims (admin, guru, kepsek, siswa).
- [ ] CRUD data master (siswa, guru, kelas, jurusan, mapel).

### Milestone 2 – Inti Kelulusan (Minggu 3–4)
- [ ] Modul input & kelola nilai (API Routes + Supabase).
- [ ] Konfigurasi kriteria kelulusan & perhitungan otomatis.
- [ ] Dashboard admin dasar.
- [ ] **Panel Visibilitas** – CRUD `visibility_settings`, middleware pengecekan di API.

### Milestone 3 – Pengumuman & Dokumen (Minggu 5–6)
- [ ] Halaman pengumuman publik dengan countdown & mode terjadwal.
- [ ] Generate SKL PDF + QR verifikasi (API Route + Puppeteer / @react-pdf).
- [ ] Upload & simpan SKL ke Supabase Storage.
- [ ] Transkrip nilai PDF.
- [ ] Notifikasi email (Nodemailer) + WhatsApp (Fonnte).
- [ ] Halaman "Lihat sebagai Siswa" untuk preview visibilitas.

### Milestone 4 – Pelengkap & Polish (Minggu 7–8)
- [ ] Laporan & ekspor Excel/PDF.
- [ ] Tema gelap, responsif mobile.
- [ ] Realtime update pengumuman via Supabase Realtime (opsional).
- [ ] Dokumentasi & manual book.
- [ ] UAT (User Acceptance Test) bersama sekolah.

---

## ✅ Definition of Done (Per Fitur)

- [ ] Kode telah di-review minimal oleh 1 kontributor lain.
- [ ] Unit test / feature test ditulis untuk logika kritis.
- [ ] Tidak ada linter error.
- [ ] Dokumentasi penggunaan fitur diperbarui di `README.md` / Wiki.
- [ ] Sudah diuji di environment staging.

---

## 📎 Referensi

- Permendikbud tentang kelulusan terbaru.
- POS Ujian Sekolah SMK.
- Template SKL resmi Dinas Pendidikan setempat.

---

## 🤝 Kontribusi

Silakan buat issue/PR terpisah untuk setiap fitur agar review lebih mudah. Gunakan label:
`feature`, `bug`, `enhancement`, `documentation`, `good first issue`.

---

**Dibuat untuk:** Proyek Aplikasi Kelulusan SMK
**Status:** 📝 Planning
