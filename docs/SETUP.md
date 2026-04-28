# 🔧 Setup & Development Guide

Panduan lengkap untuk setup project secara lokal dan mulai development.

---

## 📋 Prerequisites

Pastikan sudah install:
- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm atau yarn** — Included dengan Node.js
- **Git** — [Download](https://git-scm.com/)
- **VS Code** (optional) — [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
node --version      # v18.0.0 atau lebih baru
npm --version       # 8.0.0 atau lebih baru
git --version       # 2.0.0 atau lebih baru
```

---

## 🚀 Local Setup (Step by Step)

### 1. Clone Repository

```bash
git clone https://github.com/umarovk/graduation-app.git
cd graduation-app
```

### 2. Install Dependencies

```bash
npm install
# atau jika pakai yarn:
yarn install
```

Ini akan install semua package yang dibutuhkan:
- Next.js, React, TypeScript
- Tailwind CSS, shadcn/ui
- Supabase client
- Dan lainnya

### 3. Setup Environment Variables

```bash
# Buat file .env.local
cp .env.example .env.local

# Edit .env.local dengan editor favorit Anda
# Isi dengan Supabase credentials (lihat langkah berikutnya)
```

**Contoh .env.local:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Setup Supabase Project

**Online (Recommended):**
1. Buka https://supabase.com/ dan login/signup
2. Buat project baru
3. Di project settings, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `Service Role Key` → `SUPABASE_SERVICE_ROLE_KEY`
4. Paste ke `.env.local`

**Local (Docker - advanced):**
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# View credentials
supabase status
```

### 5. Run Database Migrations

```bash
# If using online Supabase:
# - Go to Supabase dashboard → SQL Editor
# - Run migrations dari folder `supabase/migrations/`
# - Copy-paste SQL dari file 001_init_schema.sql, 002_add_visibility.sql, dll

# Or manual:
# - Upload files ke Supabase SQL editor dan execute
```

### 6. Start Development Server

```bash
npm run dev
```

Output akan seperti:
```
> next dev

▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

Buka http://localhost:3000 di browser.

---

## 🧪 Login & Testing

### Default Credentials (setelah seed data)

**Admin:**
```
Email: admin@sekolah.id
Password: admin123
```

**Guru:**
```
Email: guru@sekolah.id
Password: guru123
```

**Siswa:**
```
NISN: 1234567890
Tanggal Lahir: 2006-01-15
```

### Expected Pages

- `/` — Home (public)
- `/admin` — Admin dashboard (requires login)
- `/guru` — Guru dashboard (requires login)
- `/siswa` — Siswa dashboard (requires login)

---

## 📁 Project Structure (Quick Reference)

```
kelulusan-smk/
├── app/                   # Pages & API routes
│   ├── (auth)/            # Login pages
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   ├── guru/              # Guru dashboard
│   ├── siswa/             # Siswa dashboard
│   └── api/               # Backend endpoints
├── components/            # UI components
├── lib/                   # Utilities
├── supabase/              # Database & migrations
├── docs/                  # Documentation
├── .env.example           # Template environment
├── .env.local             # Your environment (gitignored)
├── next.config.js         # Next.js config
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

Lihat [../CLAUDE.md](../CLAUDE.md) untuk detail structure lengkap.

---

## 🔐 Authentication Flow

### For Developers

1. **Client** submits login form (email + password atau NISN + DOB)
2. **Next.js API Route** (`/api/auth/login`) validates credentials
3. **Supabase Auth** creates session
4. **Custom claims** (role) disimpan di JWT token
5. **Middleware** checks token di setiap protected route
6. **RLS policies** di database enforce row-level access

### Testing Authentication

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sekolah.id","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "user": {
    "id": "user-uuid",
    "email": "admin@sekolah.id",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 🐛 Debugging

### Enable Debug Mode

```bash
# Add to .env.local
DEBUG=*

# Or for specific module:
DEBUG=supabase:*
```

### Common Issues

**Issue: Port 3000 already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port:
npm run dev -- -p 3001
```

**Issue: Environment variables not loading**
```bash
# Make sure .env.local exists and is in root directory
ls -la .env.local

# Restart dev server after changing .env
# (Stop with Ctrl+C and run npm run dev again)
```

**Issue: Supabase connection fails**
```bash
# Check Supabase credentials
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Test connection manually
curl https://your-project.supabase.co/rest/v1/ \
  -H "apikey: your-anon-key"
```

**Issue: Database migration fails**
- Check migration SQL syntax
- Verify Supabase project is created
- Check database permissions (service_role key)

---

## 📦 Package Management

### Add New Package

```bash
npm install package-name
# or
yarn add package-name
```

### Update Packages

```bash
npm update
# or check for outdated packages:
npm outdated
```

### Remove Package

```bash
npm uninstall package-name
```

---

## 🧪 Testing

### Manual Testing

```bash
# 1. Start dev server
npm run dev

# 2. Open browser: http://localhost:3000

# 3. Test flows:
#    - Login as admin
#    - Create data
#    - Edit/delete
#    - Verify changes in Supabase dashboard
```

### Running Tests (when implemented)

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

---

## 🚀 Building for Production

```bash
# Build Next.js
npm run build

# This will:
# - Compile TypeScript
# - Bundle & optimize code
# - Check for errors

# Start production server locally
npm run start
```

---

## 📝 Development Checklist

Before starting development:

- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with Supabase credentials
- [ ] Database migrations applied
- [ ] Dev server running (`npm run dev`)
- [ ] Can login to http://localhost:3000
- [ ] Browser console is clean (no errors)

---

## 🔗 Useful Commands

```bash
# View folder structure
tree -L 2 -I 'node_modules'

# Check for lint errors
npm run lint

# Format code
npm run format

# Check TypeScript
npx tsc --noEmit

# View environment
cat .env.local
```

---

## 📚 Next Steps

1. Read [../CLAUDE.md](../CLAUDE.md) for architecture & design decisions
2. Check [API.md](./API.md) for backend endpoints
3. Check [DATABASE.md](./DATABASE.md) for database schema
4. Look at [MANUAL-ADMIN.md](./MANUAL-ADMIN.md) to understand feature flows

---

## 🆘 Need Help?

- **Documentation:** Check `docs/` folder
- **Issues:** Report at https://github.com/umarovk/graduation-app/issues
- **Email:** umarov.studio@gmail.com

---

**Last updated:** 2026-04-28
