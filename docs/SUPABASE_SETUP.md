# 🔧 Supabase Setup Guide

Panduan lengkap untuk setup Supabase untuk Aplikasi Kelulusan SMK.

---

## Step 1: Create Supabase Project

### Online (Recommended)

1. Buka https://supabase.com
2. Sign up atau login dengan GitHub
3. Click "New Project"
4. Isi form:
   - **Project name:** `graduation-app` (atau nama lain)
   - **Database password:** Buat password yang kuat & simpan baik-baik
   - **Region:** Pilih region terdekat (contoh: Singapore)
5. Click "Create new project"
6. Tunggu project selesai setup (2-3 menit)

### Get Credentials

Setelah project selesai setup:

1. Go to **Settings** → **API** (atau di sidebar: **Integrations → API**)
2. Copy nilai berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

3. Paste ke `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

---

## Step 2: Run Database Migrations

### Via Supabase SQL Editor

1. Buka Supabase Dashboard
2. Go to **SQL Editor** (sidebar)
3. Click **New Query**
4. Copy-paste SQL dari file: `supabase/migrations/001_init_schema.sql`
5. Click **Run**
6. Ulangi untuk file 002, 003, 004

### Atau gunakan Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ke project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

---

## Step 3: Setup Authentication

### Create Auth Users

Untuk demo, buat 3 users di Supabase:

#### 1. Admin User

1. Go to **Authentication** → **Users** (sidebar)
2. Click **Create a new user**
3. Isi form:
   - **Email:** `admin@sekolah.id`
   - **Password:** `admin123`
   - **Confirm password:** `admin123`
4. Click **Create user**
5. Click user yang baru dibuat
6. Go to **User Metadata** tab
7. Tambahkan JSON:

```json
{
  "role": "admin",
  "nama": "Administrator"
}
```

8. Click **Update user**

#### 2. Guru User

Ulangi langkah di atas dengan:
- **Email:** `guru@sekolah.id`
- **Password:** `guru123`
- **User Metadata:**

```json
{
  "role": "guru",
  "nama": "Ibu Siti"
}
```

#### 3. Kepala Sekolah User

- **Email:** `kepsek@sekolah.id`
- **Password:** `kepsek123`
- **User Metadata:**

```json
{
  "role": "kepsek",
  "nama": "Kepala Sekolah"
}
```

### Demo Siswa Data

Siswa akan dibuat otomatis saat login pertama dengan NISN + DOB.

**Demo credentials:**
- **NISN:** `1234567890`
- **Tanggal Lahir:** `2006-01-15`
- **Password:** (akan di-generate otomatis: `12345678906015`)

Untuk test, Anda bisa insert siswa dummy terlebih dahulu.

---

## Step 4: Enable RLS (Row Level Security)

RLS sudah di-enable di migration 003. Verify:

1. Go to **SQL Editor**
2. Run query:

```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND rowlevelsecurity IS NOT NULL;
```

Semua tabel seharusnya ada RLS enabled.

---

## Step 5: Test Authentication Flow

### Test Admin Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sekolah.id",
    "password": "admin123"
  }'
```

Expected response:

```json
{
  "success": true,
  "user": {
    "id": "uuid-user-id",
    "email": "admin@sekolah.id",
    "role": "admin",
    "nama": "Administrator"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Test Browser Login

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Click "Login Admin/Guru"
4. Login dengan: `admin@sekolah.id` / `admin123`
5. Seharusnya redirect ke `/admin` dashboard

---

## Step 6: Insert Demo Data (Optional)

Untuk test CRUD, insert demo data:

```sql
-- Insert tahun_ajaran
INSERT INTO tahun_ajaran (tahun, semester, tanggal_mulai, tanggal_selesai, is_active)
VALUES ('2024/2025', 2, '2025-01-13', '2025-06-15', TRUE);

-- Insert jurusan
INSERT INTO jurusan (kode, nama)
VALUES ('TKJ', 'Teknik Komputer & Jaringan');

-- Insert siswa demo (untuk test siswa login)
INSERT INTO siswa (nisn, nama, tanggal_lahir, jenis_kelamin, alamat)
VALUES ('1234567890', 'John Doe', '2006-01-15', 'L', 'Jl. Merdeka No. 1');
```

---

## Troubleshooting

### "Cannot find module '@supabase/ssr'"

```bash
npm install @supabase/ssr
```

### Login gagal: "Invalid credentials"

- Check email & password benar
- Verify user created di Supabase Dashboard
- Check metadata role set correctly

### CORS error di browser

- Go to **Settings** → **CORS**
- Add localhost:3000 ke allowed origins:

```
http://localhost:3000
https://yourdomain.com
```

### Database query timeout

- Check internet connection stable
- Try dari SQL Editor dulu (bukan aplikasi)
- Restart dev server

---

## Next Steps

1. ✅ Supabase project created
2. ✅ Migrations applied
3. ✅ Auth users created
4. ✅ Login flow tested
5. Next: Start working on CRUD pages (issue #3b)

---

**Need help?**

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.io)
- GitHub Issues: https://github.com/umarovk/graduation-app/issues

