-- Insert tahun_ajaran
INSERT INTO tahun_ajaran (tahun, semester, tanggal_mulai, tanggal_selesai, is_active)
VALUES
  ('2023/2024', 1, '2023-07-10', '2023-12-22', FALSE),
  ('2023/2024', 2, '2024-01-08', '2024-06-15', FALSE),
  ('2024/2025', 1, '2024-07-08', '2024-12-20', FALSE),
  ('2024/2025', 2, '2025-01-13', '2025-06-15', TRUE),
  ('2025/2026', 1, '2025-07-07', '2025-12-19', FALSE)
ON CONFLICT DO NOTHING;

-- Insert jurusan
INSERT INTO jurusan (kode, nama, deskripsi)
VALUES
  ('TKJ', 'Teknik Komputer & Jaringan', 'Program keahlian untuk jaringan komputer'),
  ('RPL', 'Rekayasa Perangkat Lunak', 'Program keahlian untuk pengembangan software'),
  ('MM', 'Multimedia', 'Program keahlian untuk desain dan multimedia'),
  ('AKL', 'Akuntansi & Keuangan Lembaga', 'Program keahlian untuk akuntansi'),
  ('OTKP', 'Otomatisasi & Tata Kelola Perkantoran', 'Program keahlian untuk administrasi perkantoran')
ON CONFLICT (kode) DO NOTHING;

-- Insert kelas
INSERT INTO kelas (nama, tingkat, jurusan_id, tahun_ajaran_id, wali_kelas_id)
SELECT 'XII TKJ 1', 12, j.id, ta.id, NULL
FROM jurusan j, tahun_ajaran ta
WHERE j.kode = 'TKJ' AND ta.tahun = '2024/2025' AND ta.semester = 2
ON CONFLICT (nama, tahun_ajaran_id) DO NOTHING;

INSERT INTO kelas (nama, tingkat, jurusan_id, tahun_ajaran_id, wali_kelas_id)
SELECT 'XII RPL 1', 12, j.id, ta.id, NULL
FROM jurusan j, tahun_ajaran ta
WHERE j.kode = 'RPL' AND ta.tahun = '2024/2025' AND ta.semester = 2
ON CONFLICT (nama, tahun_ajaran_id) DO NOTHING;

-- Insert mata_pelajaran
INSERT INTO mata_pelajaran (kode, nama, kategori, kkm)
VALUES
  ('MTK01', 'Matematika', 'Adaptif', 70),
  ('BING01', 'Bahasa Inggris', 'Adaptif', 70),
  ('BIND01', 'Bahasa Indonesia', 'Normatif', 70),
  ('PKWU01', 'Prakarya & Kewirausahaan', 'Normatif', 70),
  ('PJOK01', 'Pendidikan Jasmani', 'Normatif', 75),
  ('KJ01', 'Komputer & Jaringan Dasar', 'Produktif', 75),
  ('RPL01', 'Pemrograman Dasar', 'Produktif', 75),
  ('MM01', 'Desain Grafis', 'Produktif', 75)
ON CONFLICT (kode) DO NOTHING;

-- Insert guru
INSERT INTO guru (nip, nama, email)
VALUES
  ('123456789001', 'Budi Santoso', 'budi@sekolah.id'),
  ('123456789002', 'Siti Nurhaliza', 'siti@sekolah.id'),
  ('123456789003', 'Ahmad Wijaya', 'ahmad@sekolah.id'),
  ('123456789004', 'Retno Sari', 'retno@sekolah.id'),
  ('123456789005', 'Dewi Lestari', 'dewi@sekolah.id')
ON CONFLICT (nip) DO NOTHING;

-- Insert guru_mapel associations
INSERT INTO guru_mapel (guru_id, mapel_id)
SELECT g.id, mp.id FROM guru g, mata_pelajaran mp
WHERE g.nip = '123456789001' AND mp.kode = 'MTK01'
ON CONFLICT (guru_id, mapel_id) DO NOTHING;

INSERT INTO guru_mapel (guru_id, mapel_id)
SELECT g.id, mp.id FROM guru g, mata_pelajaran mp
WHERE g.nip = '123456789002' AND mp.kode = 'BING01'
ON CONFLICT (guru_id, mapel_id) DO NOTHING;

-- Insert school_settings
INSERT INTO school_settings (nama, npsn, alamat, telepon, email)
VALUES ('SMK Negeri 1 Surabaya', '40201', 'Jl. Raya Ketintang No. 1-3, Surabaya', '031-3012345', 'smkn1sby@sch.id')
ON CONFLICT DO NOTHING;

-- Note: Siswa data should be imported via CSV/bulk upload
-- This is sample data only. Use import feature in admin dashboard for bulk siswa data.

-- Insert visibility_settings for active tahun_ajaran
INSERT INTO visibility_settings (tahun_ajaran_id, updated_by)
SELECT ta.id, auth.uid()
FROM tahun_ajaran ta
WHERE ta.is_active = TRUE
ON CONFLICT (tahun_ajaran_id) DO NOTHING;
