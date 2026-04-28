# 🎓 Aplikasi Kelulusan SMK

Sistem informasi berbasis web untuk mengelola dan mengumumkan hasil kelulusan siswa SMK secara digital dan transparan.

![Status](https://img.shields.io/badge/status-development-blue)
![Node](https://img.shields.io/badge/node-18%2B-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## ✨ Fitur Utama

### 🔐 Autentikasi Multi-Role
- Login siswa dengan NISN + tanggal lahir
- Login admin/guru/kepala sekolah dengan email + password
- Role-based access control (RBAC)
- Proteksi brute-force & rate limiting

### 📊 Manajemen Data Master
- CRUD data siswa (NISN, foto, alamat, dll)
- Manage guru, kelas, jurusan, mata pelajaran
- Import siswa massal dari CSV/Excel
- Tahun ajaran & periode kelulusan

### 📝 Manajemen Nilai
- Input nilai rapor semester 1–6
- Input nilai Ujian Sekolah (US), UKK, praktik
- Perhitungan nilai akhir otomatis (berbasis bobot)
- Penguncian nilai untuk finalisasi

### ⚙️ Kriteria Kelulusan
- KKM per mata pelajaran
- Bobot komponen (rapor, US, UKK, sikap, kehadiran)
- Penentuan status LULUS/TIDAK LULUS otomatis
- Override manual dengan audit log

### 📢 Pengumuman Kelulusan
- Halaman pengumuman publik dengan countdown timer
- Mode terjadwal (hanya bisa diakses pada waktu tertentu)
- Tampilan status kelulusan + ucapan
- Notifikasi via email & WhatsApp (opsional)
- Animasi visual (confetti, efek)

### 📄 Dokumen Digital
- Generate Surat Keterangan Lulus (SKL) otomatis dalam PDF
- Template SKL dapat dikustomisasi (logo, kop, tanda tangan)
- QR Code untuk verifikasi keaslian
- Halaman verifikasi publik via QR code
- Transkrip nilai PDF

### 📈 Dashboard & Laporan
- Dashboard admin dengan statistik real-time
- Grafik persentase kelulusan per jurusan
- Dashboard siswa (nilai, status, SKL)
- Ekspor laporan ke Excel/PDF
- Laporan siap cetak untuk Dinas Pendidikan

### 👁️ Kontrol Visibilitas (Admin)
- Admin bisa mengontrol elemen yang ditampilkan ke siswa
- Toggle: SKL, Nilai Rapor, Nilai US, Status Kelulusan, dll
- Preview "Lihat sebagai Siswa" untuk testing
- Audit log untuk setiap perubahan

### 🔒 Keamanan & Privasi
- Enkripsi password (bcrypt/argon2)
- HTTPS wajib di production
- Proteksi XSS, CSRF, SQL Injection
- RLS (Row Level Security) di database
- Compliance dengan GDPR-like data handling

---

## 🚀 Quick Start

### Requirement
- Node.js 18+
- npm atau yarn
- Supabase account
- Vercel account (untuk deployment)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/umarovk/graduation-app.git
cd graduation-app

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan Supabase credentials

# 4. Setup database
# - Create Supabase project
# - Run migrations: npx supabase migration up
# - Seed dummy data (optional)

# 5. Start development server
npm run dev
```

Buka http://localhost:3000

### Demo Account

**Admin:**
- Email: admin@sekolah.id
- Password: admin123

**Guru:**
- Email: guru@sekolah.id
- Password: guru123

**Siswa:**
- NISN: 1234567890
- Tanggal Lahir: 2006-01-15

---

## 📁 Project Structure

Lihat [CLAUDE.md](./CLAUDE.md) untuk detail folder structure lengkap.

**Quick overview:**
```
app/              # Next.js App Router (pages & API routes)
├── (auth)/       # Login pages
├── (public)/     # Public pages (pengumuman, verifikasi)
├── admin/        # Admin dashboard & features
├── guru/         # Guru dashboard
├── siswa/        # Siswa dashboard
└── api/          # Backend API endpoints

components/       # Reusable UI components
lib/              # Utilities & helpers
supabase/         # Database migrations
docs/             # Documentation (user manuals)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | **Next.js 14** (App Router) + TypeScript |
| UI Kit | **Tailwind CSS** + **shadcn/ui** |
| Backend | **Node.js** (Next.js API Routes) |
| Database | **Supabase** (PostgreSQL managed) |
| Authentication | **Supabase Auth** |
| PDF Generation | **Puppeteer** / `@react-pdf/renderer` |
| File Storage | **Supabase Storage** |
| Deployment | **Vercel** |
| Email | **Nodemailer** + SMTP |
| WhatsApp (optional) | **Fonnte API** |

Lihat [CLAUDE.md](./CLAUDE.md) untuk tech stack decision rationale.

---

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** — Developer guide (tech stack, architecture, database schema)
- **[docs/SETUP.md](./docs/SETUP.md)** — Local setup & development guide
- **[docs/API.md](./docs/API.md)** — API endpoints documentation
- **[docs/DATABASE.md](./docs/DATABASE.md)** — Database schema & relationships
- **[docs/MANUAL-ADMIN.md](./docs/MANUAL-ADMIN.md)** — Admin user manual
- **[docs/MANUAL-GURU.md](./docs/MANUAL-GURU.md)** — Guru/teacher user manual
- **[docs/MANUAL-SISWA.md](./docs/MANUAL-SISWA.md)** — Siswa/student user manual
- **[issue.md](./issue.md)** — Feature planning & requirements

---

## 🚢 Deployment

### Deploy ke Vercel

```bash
# Push ke GitHub (auto-deploy ke Vercel)
git push origin main

# Atau deploy manual di https://vercel.com
```

### Environment Variables di Production

Set di Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build untuk production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code
npm run format
```

---

## 📊 Roadmap

### Milestone 1 — Fondasi (Minggu 1–2)
- [ ] Setup Next.js + Tailwind + shadcn/ui
- [ ] Setup Supabase (auth, storage, RLS)
- [ ] Database migrations
- [ ] Multi-role authentication
- [ ] CRUD data master

### Milestone 2 — Inti Kelulusan (Minggu 3–4)
- [ ] Input & kelola nilai
- [ ] Kriteria kelulusan & perhitungan otomatis
- [ ] Dashboard admin dasar
- [ ] Panel visibilitas (kontrol hide/unhide)

### Milestone 3 — Pengumuman & Dokumen (Minggu 5–6)
- [ ] Halaman pengumuman publik
- [ ] Generate SKL PDF + QR
- [ ] Notifikasi email/WhatsApp
- [ ] Transkrip nilai

### Milestone 4 — Pelengkap & Polish (Minggu 7–8)
- [ ] Laporan & ekspor
- [ ] Tema gelap & responsive
- [ ] Dokumentasi & UAT
- [ ] Security audit

---

## 🤝 Contributing

1. Buat issue dari [issue.md](./issue.md) atau [GitHub Issues](https://github.com/umarovk/graduation-app/issues)
2. Checkout branch baru: `git checkout -b feature/issue-name`
3. Commit changes dengan message yang deskriptif
4. Push ke GitHub: `git push origin feature/issue-name`
5. Buat Pull Request dengan deskripsi lengkap

**Code Style:**
- Use TypeScript (no `any`)
- Follow ESLint & Prettier config
- Write tests untuk logika kritis
- Update documentation

---

## 📝 License

MIT License — lihat [LICENSE](./LICENSE) untuk detail.

---

## 📧 Support & Feedback

- **Issues:** [GitHub Issues](https://github.com/umarovk/graduation-app/issues)
- **Email:** umarov.studio@gmail.com
- **Documentation:** Lihat folder `docs/`

---

## 🎯 Project Status

- **Current Phase:** 📝 Planning & Documentation
- **Next Phase:** 🚀 Development (Milestone 1)
- **Last Updated:** 2026-04-28

---

**Dibuat untuk:** Proyek Aplikasi Kelulusan SMK  
**Repository:** https://github.com/umarovk/graduation-app  
**Maintainer:** umarovk
