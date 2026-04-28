-- Script untuk seed demo users di Supabase Auth
-- Jalankan ini di Supabase SQL Editor setelah migrations selesai

-- CATATAN: Anda perlu membuat users ini via Supabase Dashboard > Authentication > Users
-- atau gunakan Supabase CLI dengan command:
-- supabase auth admin create-user --email admin@sekolah.id --password admin123 --role admin

-- Contoh script untuk mengisi user_metadata dengan custom claims:

-- Admin User
-- Email: admin@sekolah.id
-- Password: admin123
-- Custom Claims (via Supabase Dashboard):
--   role: admin
--   nama: Administrator

-- Guru User
-- Email: guru@sekolah.id
-- Password: guru123
-- Custom Claims:
--   role: guru
--   nama: Ibu Siti

-- Kepala Sekolah User
-- Email: kepsek@sekolah.id
-- Password: kepsek123
-- Custom Claims:
--   role: kepsek
--   nama: Kepala Sekolah

-- Demo Siswa (akan dibuat otomatis saat login pertama)
-- NISN: 1234567890
-- Tanggal Lahir: 2006-01-15
-- Default Password: 12345678906015 (NISN + YYYYMMDD)

-- STEPS untuk setup manual:

-- 1. Buka Supabase Dashboard
-- 2. Go to Authentication > Users
-- 3. Click "Create a new user"
-- 4. Buat user dengan:
--    Email: admin@sekolah.id
--    Password: admin123
--    Confirm password: admin123
-- 5. Klik Create
-- 6. Klik user yang baru dibuat
-- 7. Go to "User Metadata" tab
-- 8. Tambahkan custom claims:
--    ```json
--    {
--      "role": "admin",
--      "nama": "Administrator"
--    }
--    ```
-- 9. Save
-- 10. Repeat untuk guru@sekolah.id dan kepsek@sekolah.id

-- Atau gunakan Supabase CLI:
-- supabase start
-- supabase auth admin create-user \
--   --email admin@sekolah.id \
--   --password admin123
--
-- supabase auth admin update-user \
--   --user-id <user-id> \
--   --user-metadata '{"role":"admin","nama":"Administrator"}'
