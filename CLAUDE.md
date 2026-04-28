# 🎓 Aplikasi Kelulusan SMK — Developer Guide

Dokumentasi teknis untuk tim development (junior programmer, AI assistant, dll).

---

## 📋 Ringkasan Proyek

**Aplikasi Kelulusan SMK** adalah sistem informasi berbasis web yang memudahkan sekolah mengelola & mengumumkan hasil kelulusan siswa secara digital.

- **GitHub:** https://github.com/umarovk/graduation-app
- **Planning:** `issue.md` (feature list) + GitHub Issues (task breakdown)
- **Status:** 🚀 Development phase

---

## 🛠️ Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| **Frontend** | Next.js (App Router) + TypeScript | Modern, full-stack, easy deployment |
| **Styling** | Tailwind CSS + shadcn/ui | Fast development, consistent UI, customizable components |
| **Backend** | Node.js (Next.js API Routes) | Serverless, minimal setup, same language as frontend |
| **Database** | Supabase (PostgreSQL) | Managed DB, built-in auth, storage, realtime support |
| **Authentication** | Supabase Auth | Multi-method login, custom claims for RBAC |
| **Authorization** | Supabase RLS (Row Level Security) | Database-level access control |
| **PDF Generation** | Puppeteer atau `@react-pdf/renderer` | Generate SKL/transkrip otomatis |
| **QR Code** | `qrcode` npm package | Untuk verifikasi SKL |
| **File Storage** | Supabase Storage | Upload foto, logo, stempel, SKL |
| **Email** | Nodemailer + SMTP | Notifikasi kelulusan via email |
| **WhatsApp** | Fonnte API (optional) | Notifikasi via WhatsApp |
| **Deployment** | Vercel | Hosting Next.js, edge functions |
| **Database Migrations** | Supabase migrations (SQL) | Version control untuk schema |

---

## 📁 Folder Structure

```
kelulusan-smk/
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Authentication pages
│   │   ├── login/page.tsx         # Login form (NISN/email)
│   │   └── reset-password/page.tsx
│   │
│   ├── (public)/                  # Public pages (no login required)
│   │   ├── page.tsx               # Homepage / pengumuman publik
│   │   ├── verify/[code]/page.tsx # Verifikasi SKL via QR code
│   │   └── announcement/page.tsx  # Halaman pengumuman (countdown + hasil)
│   │
│   ├── admin/                     # Admin dashboard & features
│   │   ├── layout.tsx             # Admin sidebar/navbar
│   │   ├── page.tsx               # Dashboard admin (statistik)
│   │   ├── siswa/                 # CRUD siswa
│   │   │   ├── page.tsx           # List siswa
│   │   │   ├── [id]/edit/page.tsx # Edit siswa
│   │   │   └── import/page.tsx    # Import CSV/Excel
│   │   │
│   │   ├── guru/                  # Manage guru/wali kelas
│   │   ├── kelas/                 # Manage kelas
│   │   ├── jurusan/               # Manage jurusan/kompetensi
│   │   ├── mapel/                 # Manage mata pelajaran
│   │   │
│   │   ├── nilai/                 # Input & kelola nilai
│   │   │   ├── page.tsx           # List nilai per siswa
│   │   │   ├── [siswaId]/edit/page.tsx
│   │   │   └── lock/page.tsx      # Lock nilai untuk finalisasi
│   │   │
│   │   ├── kelulusan/             # Kriteria & status kelulusan
│   │   │   ├── page.tsx           # Dashboard status
│   │   │   ├── criteria/page.tsx  # KKM, bobot, syarat kelulusan
│   │   │   └── override/page.tsx  # Manual override status
│   │   │
│   │   ├── visibilitas/           # ⭐ Panel kontrol hide/unhide data
│   │   │   ├── page.tsx           # Panel utama
│   │   │   └── preview/page.tsx   # Preview "Lihat sebagai Siswa"
│   │   │
│   │   ├── dokumen/               # Template SKL, arsip
│   │   │   ├── template/page.tsx  # Edit template SKL
│   │   │   ├── generate/page.tsx  # Generate SKL untuk siswa
│   │   │   └── archive/page.tsx   # Arsip SKL per tahun
│   │   │
│   │   ├── laporan/               # Statistik & ekspor
│   │   │   ├── page.tsx           # Dashboard laporan
│   │   │   ├── export/page.tsx    # Ekspor Excel/PDF
│   │   │   └── statistik/page.tsx # Grafik & analisis
│   │   │
│   │   └── pengaturan/            # Profil sekolah, tema, dll
│   │       ├── page.tsx           # Settings utama
│   │       ├── sekolah/page.tsx   # Profil sekolah (NPSN, alamat)
│   │       └── tema/page.tsx      # Dark mode, tema
│   │
│   ├── guru/                      # Guru dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Dashboard guru
│   │   ├── nilai/page.tsx         # Input nilai
│   │   └── verifikasi/page.tsx    # Verifikasi data siswa
│   │
│   ├── siswa/                     # Siswa dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Dashboard siswa
│   │   ├── nilai/page.tsx         # Lihat nilai (jika visible)
│   │   ├── status/page.tsx        # Lihat status kelulusan
│   │   └── skl/page.tsx           # Download SKL (jika visible)
│   │
│   ├── api/                       # API Routes (backend)
│   │   ├── auth/
│   │   │   ├── login/route.ts     # Login endpoint
│   │   │   └── logout/route.ts
│   │   │
│   │   ├── siswa/
│   │   │   ├── route.ts           # GET/POST siswa
│   │   │   ├── [id]/route.ts      # GET/PUT/DELETE siswa
│   │   │   ├── import/route.ts    # Import CSV
│   │   │   └── search/route.ts    # Search siswa
│   │   │
│   │   ├── nilai/
│   │   │   ├── route.ts           # Input nilai
│   │   │   ├── [siswaId]/route.ts
│   │   │   ├── calculate/route.ts # Hitung nilai akhir otomatis
│   │   │   └── lock/route.ts      # Lock/finalisasi nilai
│   │   │
│   │   ├── kelulusan/
│   │   │   ├── status/route.ts    # Tentukan status LULUS/TIDAK LULUS
│   │   │   ├── override/route.ts  # Manual override
│   │   │   └── list/route.ts      # List semua status
│   │   │
│   │   ├── visibilitas/           # ⭐ Visibility settings
│   │   │   ├── route.ts           # GET/PUT visibility_settings
│   │   │   └── check/route.ts     # Check apa yang bisa dilihat user
│   │   │
│   │   ├── dokumen/
│   │   │   ├── skl/route.ts       # Generate SKL PDF
│   │   │   ├── transkrip/route.ts # Generate transkrip PDF
│   │   │   └── verify/[code]/route.ts # Verify SKL by QR code
│   │   │
│   │   ├── notifikasi/
│   │   │   ├── email/route.ts     # Send email notification
│   │   │   └── whatsapp/route.ts  # Send WhatsApp (via Fonnte)
│   │   │
│   │   └── laporan/
│   │       ├── statistik/route.ts # Statistik untuk dashboard
│   │       └── export/route.ts    # Export Excel/PDF
│   │
│   └── layout.tsx                 # Root layout
│
├── components/                    # Reusable UI components
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── ResetPasswordForm.tsx
│   │
│   ├── dashboard/
│   │   ├── StatCard.tsx           # Kartu statistik
│   │   ├── Chart.tsx              # Grafik
│   │   └── Table.tsx              # Tabel data
│   │
│   ├── forms/
│   │   ├── SiswaForm.tsx
│   │   ├── NilaiForm.tsx
│   │   └── FileUploadForm.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   └── common/
│       ├── Loading.tsx
│       ├── Error.tsx
│       └── ConfirmDialog.tsx
│
├── lib/                           # Utilities & helpers
│   ├── supabase/
│   │   ├── client.ts              # Supabase client (browser)
│   │   ├── server.ts              # Supabase client (server)
│   │   └── admin.ts               # Admin client (for backend)
│   │
│   ├── auth/
│   │   ├── middleware.ts          # Auth middleware
│   │   ├── rbac.ts                # Role-based access control helper
│   │   └── jwt.ts                 # JWT parsing/validation
│   │
│   ├── pdf/
│   │   ├── skl-template.tsx       # SKL template component
│   │   ├── transkrip-template.tsx # Transkrip template
│   │   └── pdf-generator.ts       # PDF generation helper
│   │
│   ├── validators/
│   │   ├── siswa.ts               # Siswa form validation
│   │   ├── nilai.ts               # Nilai validation
│   │   └── common.ts              # Common validators
│   │
│   ├── helpers/
│   │   ├── calculation.ts         # Hitung rata-rata, bobot, dll
│   │   ├── visibility.ts          # Check visibility_settings
│   │   ├── date.ts                # Date formatting
│   │   └── file.ts                # File handling
│   │
│   └── constants/
│       ├── roles.ts               # Roles: admin, guru, kepsek, siswa
│       ├── status.ts              # Status kelulusan
│       └── messages.ts            # Error/success messages
│
├── supabase/                      # Database & migrations
│   ├── migrations/
│   │   ├── 001_init_schema.sql    # Tabel utama
│   │   ├── 002_add_visibility.sql # Tabel visibility_settings
│   │   ├── 003_add_rls.sql        # RLS policies
│   │   └── 004_seed_data.sql      # Data dummy
│   │
│   └── schema.ts                  # TypeScript types untuk DB
│
├── styles/
│   ├── globals.css                # Global styles
│   └── variables.css              # CSS variables (dark mode, dll)
│
├── public/
│   ├── logo.png                   # Logo sekolah (placeholder)
│   └── icons/
│
├── .env.example                   # Template environment variables
├── .env.local                     # Environment variables (gitignored)
├── next.config.js                 # Next.js config
├── tsconfig.json                  # TypeScript config
├── tailwind.config.js             # Tailwind config
├── issue.md                       # Feature planning document
├── CLAUDE.md                      # This file — developer guide
└── README.md                      # Project overview
```

---

## 🗄️ Database Schema (Overview)

**Tabel utama:**

```sql
-- Users (via Supabase Auth)
-- Custom claims: role (admin|guru|kepsek|siswa), school_id, class_id

-- siswa
CREATE TABLE siswa (
  id UUID PRIMARY KEY,
  nisn VARCHAR(10) UNIQUE NOT NULL,
  nis VARCHAR(10),
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  jenis_kelamin CHAR(1), -- M/F
  ttl DATE, -- tanggal lahir
  alamat TEXT,
  foto_url VARCHAR(500), -- path to Supabase Storage
  kelas_id UUID FOREIGN KEY,
  status_kelulusan VARCHAR(20), -- LULUS, TIDAK_LULUS, PENDING
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- kelas
CREATE TABLE kelas (
  id UUID PRIMARY KEY,
  nama VARCHAR(100) NOT NULL, -- XII TKJ 1
  tingkat INT, -- 10, 11, 12
  jurusan_id UUID FOREIGN KEY,
  wali_kelas_id UUID FOREIGN KEY (guru),
  tahun_ajaran_id UUID FOREIGN KEY,
  created_at TIMESTAMP
);

-- jurusan (kompetensi keahlian)
CREATE TABLE jurusan (
  id UUID PRIMARY KEY,
  kode VARCHAR(10) UNIQUE, -- TKJ, RPL, MM, AKL
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP
);

-- guru
CREATE TABLE guru (
  id UUID PRIMARY KEY,
  nip VARCHAR(20) UNIQUE,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  mapel_id UUID[] FOREIGN KEY, -- subject taught
  created_at TIMESTAMP
);

-- mata_pelajaran
CREATE TABLE mata_pelajaran (
  id UUID PRIMARY KEY,
  kode VARCHAR(20),
  nama VARCHAR(100) NOT NULL,
  kategori VARCHAR(50), -- Normatif, Adaptif, Produktif
  kkm INT DEFAULT 70, -- kriteria ketuntasan minimal
  created_at TIMESTAMP
);

-- nilai (grades)
CREATE TABLE nilai (
  id UUID PRIMARY KEY,
  siswa_id UUID FOREIGN KEY,
  mapel_id UUID FOREIGN KEY,
  semester INT, -- 1-6
  nilai_rapor DECIMAL(5,2),
  nilai_us DECIMAL(5,2), -- Ujian Sekolah
  nilai_ukk DECIMAL(5,2), -- Ujian Kompetensi Keahlian
  nilai_praktik DECIMAL(5,2),
  nilai_sikap VARCHAR(50), -- A, B, C, D
  nilai_pkl DECIMAL(5,2), -- Praktik Kerja Lapangan
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  locked_at TIMESTAMP -- tanda nilai sudah final
);

-- nilai_akhir (calculated)
CREATE TABLE nilai_akhir (
  id UUID PRIMARY KEY,
  siswa_id UUID FOREIGN KEY,
  tahun_ajaran_id UUID FOREIGN KEY,
  rata_rata DECIMAL(5,2), -- average dari semua rapor
  nilai_us DECIMAL(5,2),
  nilai_ukk DECIMAL(5,2),
  nilai_final DECIMAL(5,2), -- weighted average (bobot setting)
  status_kelulusan VARCHAR(20), -- LULUS, TIDAK_LULUS
  alasan TEXT, -- override reason
  updated_at TIMESTAMP
);

-- visibility_settings ⭐ (kontrol apa yang dilihat siswa)
CREATE TABLE visibility_settings (
  id UUID PRIMARY KEY,
  tahun_ajaran_id UUID FOREIGN KEY,
  tampilkan_skl BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_rapor BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_us BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_ukk BOOLEAN DEFAULT TRUE,
  tampilkan_status_kelulusan BOOLEAN DEFAULT FALSE, -- jangan tampil sebelum hari H
  tampilkan_transkrip BOOLEAN DEFAULT TRUE,
  tampilkan_ranking BOOLEAN DEFAULT TRUE,
  tampilkan_pengumuman BOOLEAN DEFAULT FALSE,
  updated_by UUID FOREIGN KEY (admin),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- pengumuman (announcement)
CREATE TABLE pengumuman (
  id UUID PRIMARY KEY,
  judul VARCHAR(255),
  deskripsi TEXT,
  tanggal_mulai TIMESTAMP,
  tanggal_selesai TIMESTAMP,
  mode_terjadwal BOOLEAN, -- TRUE = hanya bisa diakses pada waktu tertentu
  created_at TIMESTAMP
);

-- dokumen_skl (archive generated SKL)
CREATE TABLE dokumen_skl (
  id UUID PRIMARY KEY,
  siswa_id UUID FOREIGN KEY,
  file_url VARCHAR(500), -- path to Supabase Storage
  qr_code_data VARCHAR(500), -- QR code content
  created_at TIMESTAMP,
  signed_at TIMESTAMP -- tanggal ditandatangani
);

-- audit_log (track all important actions)
CREATE TABLE audit_log (
  id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY,
  action VARCHAR(255), -- UPDATE_NILAI, CHANGE_STATUS, dll
  table_name VARCHAR(100),
  record_id VARCHAR(100),
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMP
);

-- school_settings (profil sekolah)
CREATE TABLE school_settings (
  id UUID PRIMARY KEY,
  nama VARCHAR(255),
  npsn VARCHAR(20),
  alamat TEXT,
  logo_url VARCHAR(500),
  kop_surat_url VARCHAR(500),
  telepon VARCHAR(20),
  email VARCHAR(255),
  tanggal_pengumuman TIMESTAMP,
  jam_pengumuman TIME,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- tahun_ajaran
CREATE TABLE tahun_ajaran (
  id UUID PRIMARY KEY,
  tahun VARCHAR(9), -- 2024/2025
  semester INT,
  tanggal_mulai DATE,
  tanggal_selesai DATE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);
```

---

## 🔐 Authentication & Authorization

### Login Methods:
1. **Siswa:** NISN + Tanggal Lahir (read-only dari tabel siswa)
2. **Admin/Guru/Kepsek:** Email + Password

### Roles & Permissions:

```typescript
// types/auth.ts
type UserRole = 'admin' | 'guru' | 'kepsek' | 'siswa';

// Access levels (simplified)
const rolePermissions = {
  admin: ['manage_all'],      // Full access
  kepsek: ['sign_skl', 'verify_status'], // Verify & sign
  guru: ['input_nilai', 'verify_siswa'], // Input grades
  siswa: ['view_own_data'],   // Read-only own data
};
```

### Implementation:
- Roles stored di Supabase Auth custom claims
- Middleware checks `user.role` untuk setiap endpoint
- RLS policies di Supabase untuk database-level security

---

## 🚀 Development Workflow

### Setup Local Environment

```bash
# 1. Clone repository
git clone https://github.com/umarovk/graduation-app.git
cd graduation-app

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY (for server)

# 4. Setup Supabase database
# - Create Supabase project
# - Run migrations: npx supabase migration up
# - Seed data: npx supabase db seed

# 5. Start dev server
npm run dev
# Open http://localhost:3000
```

### Development Guidelines

**Code Style:**
- Use TypeScript strictly (no `any`)
- Follow prettier/eslint config
- Naming: camelCase for functions/variables, PascalCase for components/types
- Max 100 chars per line

**Components:**
- Prefer functional components with hooks
- Use shadcn/ui components when available
- Props validation: TypeScript types
- Example:
  ```typescript
  interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    isLoading?: boolean;
  }
  
  export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
    // ...
  }
  ```

**API Routes:**
- Always validate request body: `zod` or custom validators
- Return consistent response format:
  ```typescript
  export async function POST(req: Request) {
    try {
      const data = await req.json();
      // process...
      return Response.json({ success: true, data });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
  }
  ```

**Database Access:**
- Use `lib/supabase/server.ts` for server-side (API routes)
- Use `lib/supabase/client.ts` for client-side (browser)
- Always use RLS for security
- Example:
  ```typescript
  const { data, error } = await supabase
    .from('siswa')
    .select('*')
    .eq('id', siswaId);
  ```

**Visibility Control (⭐ important):**
- Every API endpoint returning student data must check `visibility_settings`
- Use helper: `lib/helpers/visibility.ts`:
  ```typescript
  const canViewNilai = await checkVisibility('tampilkan_nilai_rapor', tahunAjaranId);
  if (!canViewNilai) {
    return Response.json({ error: 'Data tidak ditampilkan' }, { status: 403 });
  }
  ```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests (if implemented)
npm run test:e2e

# Build check
npm run build
```

---

## 📦 Deployment

**Deploy to Vercel:**

```bash
# Push ke GitHub
git push origin main

# Vercel auto-deploys on push
# Atau manual di https://vercel.com/dashboard
```

**Environment Variables di Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 📚 Key Files & Locations

| File | Tujuan |
|------|--------|
| `issue.md` | Feature planning & requirements |
| `CLAUDE.md` | Dokumentasi teknis (file ini) |
| `.env.local` | Environment variables (gitignored) |
| `supabase/migrations/` | Database schema versions |
| `lib/supabase/` | Supabase client setup |
| `lib/helpers/visibility.ts` | Logic untuk visibility control |
| `app/api/` | Backend endpoints |
| `app/admin/`, `app/guru/`, `app/siswa/` | UI untuk masing-masing role |

---

## 🎯 Common Tasks

**Menambah fitur baru:**
1. Buat GitHub issue dari `issue.md` (sudah ada)
2. Buat database table/migration jika perlu
3. Buat API route di `app/api/`
4. Buat UI component & page
5. Test & push ke GitHub
6. Create PR untuk review

**Mengubah database schema:**
1. Edit file di `supabase/migrations/`
2. Run: `npx supabase migration up`
3. Test di local
4. Commit migration file

**Debug authentication:**
- Check Supabase Auth console
- Verify custom claims in JWT token
- Check RLS policies

---

## ❓ FAQ

**Q: Mana yang prioritas — server-side atau client-side?**
A: Server-side (API routes). Data processing & security logic di backend, UI di frontend.

**Q: Boleh langsung query database dari frontend?**
A: Sebisa mungkin hindari. Gunakan API routes sebagai middleware untuk security.

**Q: Bagaimana handle visibility_settings?**
A: Check di setiap API endpoint sebelum return data. Use helper `checkVisibility()`.

**Q: Gimana format error response?**
A: Consistent JSON: `{ error: "message", status: 400 }`

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [GitHub Issues](https://github.com/umarovk/graduation-app/issues)

---

**Last updated:** 2026-04-28  
**Maintained by:** Team Development
