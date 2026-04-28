# 🗄️ Database Schema Documentation

Dokumentasi lengkap struktur database untuk Aplikasi Kelulusan SMK.

---

## 📊 Database Overview

- **Provider:** Supabase (PostgreSQL)
- **Tables:** 13 main tables
- **Authentication:** Supabase Auth (built-in)
- **Security:** RLS (Row Level Security) policies
- **Migrations:** Version controlled SQL files

---

## 📋 Tables & Relationships

### 1. users (via Supabase Auth)

Table built-in dari Supabase Auth. Tidak perlu dimodifikasi.

```sql
CREATE TABLE auth.users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  email_confirmed_at TIMESTAMP,
  encrypted_password VARCHAR(255),
  last_sign_in_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Custom Claims (stored as JSON in JWT):**
```json
{
  "role": "admin|guru|kepsek|siswa",
  "school_id": "uuid",
  "class_id": "uuid"
}
```

---

### 2. siswa (Students)

Tabel data siswa.

```sql
CREATE TABLE siswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nisn VARCHAR(10) UNIQUE NOT NULL,
  nis VARCHAR(10),
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  jenis_kelamin CHAR(1) CHECK (jenis_kelamin IN ('L', 'P')),
  tanggal_lahir DATE,
  alamat TEXT,
  foto_url VARCHAR(500),  -- Supabase Storage path
  
  -- Foreign keys
  kelas_id UUID REFERENCES kelas(id) ON DELETE SET NULL,
  
  -- Status
  status_kelulusan VARCHAR(20) CHECK (status_kelulusan IN ('LULUS', 'TIDAK_LULUS', 'PENDING')),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_siswa_kelas_id ON siswa(kelas_id);
```

**Kolom:**
- `id`: UUID, primary key
- `nisn`: Nomor Induk Siswa Nasional (10 digit, unique)
- `nis`: Nomor Induk Sekolah (internal)
- `nama`: Nama lengkap siswa
- `email`: Email siswa (optional)
- `jenis_kelamin`: L (Laki-laki) / P (Perempuan)
- `tanggal_lahir`: Untuk login siswa (NISN + DOB)
- `alamat`: Alamat tempat tinggal
- `foto_url`: Path ke foto di Supabase Storage
- `kelas_id`: Foreign key ke kelas
- `status_kelulusan`: LULUS / TIDAK_LULUS / PENDING

---

### 3. kelas (Classes)

Tabel data kelas.

```sql
CREATE TABLE kelas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(100) NOT NULL,  -- XII TKJ 1
  tingkat INT CHECK (tingkat IN (10, 11, 12)),
  
  -- Foreign keys
  jurusan_id UUID NOT NULL REFERENCES jurusan(id),
  wali_kelas_id UUID REFERENCES guru(id),
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_kelas_nama_tahun ON kelas(nama, tahun_ajaran_id);
```

**Kolom:**
- `nama`: Nama kelas (misal: XII TKJ 1)
- `tingkat`: Tingkat kelas (10, 11, 12)
- `jurusan_id`: Kompetensi keahlian
- `wali_kelas_id`: Guru yang menjadi wali kelas
- `tahun_ajaran_id`: Tahun ajaran kelas ini aktif

---

### 4. jurusan (Majors)

Tabel kompetensi keahlian.

```sql
CREATE TABLE jurusan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(10) UNIQUE NOT NULL,  -- TKJ, RPL, MM, AKL
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Kolom:**
- `kode`: Kode jurusan (misal: TKJ)
- `nama`: Nama lengkap jurusan
- `deskripsi`: Deskripsi program

---

### 5. guru (Teachers)

Tabel data guru.

```sql
CREATE TABLE guru (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nip VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  
  -- Mata pelajaran (many-to-many via guru_mapel)
  -- Foreign keys stored separately
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_guru_email ON guru(email);
```

---

### 6. guru_mapel (Teacher-Subject Mapping)

Tabel junction untuk many-to-many relationship guru-mapel.

```sql
CREATE TABLE guru_mapel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_id UUID NOT NULL REFERENCES guru(id) ON DELETE CASCADE,
  mapel_id UUID NOT NULL REFERENCES mata_pelajaran(id) ON DELETE CASCADE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(guru_id, mapel_id)
);
```

---

### 7. mata_pelajaran (Subjects)

Tabel mata pelajaran.

```sql
CREATE TABLE mata_pelajaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(20) UNIQUE,
  nama VARCHAR(100) NOT NULL,
  kategori VARCHAR(50) CHECK (kategori IN ('Normatif', 'Adaptif', 'Produktif')),
  kkm INT DEFAULT 70 CHECK (kkm >= 0 AND kkm <= 100),
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mapel_kategori ON mata_pelajaran(kategori);
```

**Kolom:**
- `kode`: Kode mata pelajaran
- `nama`: Nama mata pelajaran
- `kategori`: Normatif / Adaptif / Produktif
- `kkm`: Kriteria Ketuntasan Minimal (default 70)

---

### 8. nilai (Grades)

Tabel nilai siswa per mata pelajaran per semester.

```sql
CREATE TABLE nilai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  mapel_id UUID NOT NULL REFERENCES mata_pelajaran(id),
  semester INT CHECK (semester BETWEEN 1 AND 6),
  
  -- Nilai
  nilai_rapor DECIMAL(5,2) CHECK (nilai_rapor >= 0 AND nilai_rapor <= 100),
  nilai_us DECIMAL(5,2) CHECK (nilai_us >= 0 AND nilai_us <= 100),
  nilai_ukk DECIMAL(5,2) CHECK (nilai_ukk >= 0 AND nilai_ukk <= 100),
  nilai_praktik DECIMAL(5,2) CHECK (nilai_praktik >= 0 AND nilai_praktik <= 100),
  nilai_sikap VARCHAR(2) CHECK (nilai_sikap IN ('A', 'B', 'C', 'D')),
  nilai_pkl DECIMAL(5,2),
  
  -- Lock status
  locked_at TIMESTAMP,  -- NULL = belum dilock, value = sudah dilock
  locked_by UUID REFERENCES auth.users(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_nilai_siswa_mapel_semester ON nilai(siswa_id, mapel_id, semester);
CREATE INDEX idx_nilai_siswa_id ON nilai(siswa_id);
```

**Kolom:**
- `siswa_id`: Siswa yang bersangkutan
- `mapel_id`: Mata pelajaran
- `semester`: Semester ke (1-6)
- `nilai_rapor`: Nilai rapor (rata-rata per semester)
- `nilai_us`: Ujian Sekolah
- `nilai_ukk`: Ujian Kompetensi Keahlian
- `nilai_praktik`: Nilai praktik
- `nilai_sikap`: Nilai sikap (A/B/C/D)
- `nilai_pkl`: Praktik Kerja Lapangan
- `locked_at`: Waktu nilai di-lock (untuk finalisasi)

---

### 9. nilai_akhir (Final Grades)

Tabel nilai akhir (calculated) per siswa per tahun ajaran.

```sql
CREATE TABLE nilai_akhir (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id),
  
  -- Calculated values
  rata_rata DECIMAL(5,2),      -- Average rapor (semester 1-6)
  nilai_us DECIMAL(5,2),       -- Average US
  nilai_ukk DECIMAL(5,2),      -- Average UKK
  nilai_final DECIMAL(5,2),    -- Weighted average (based on bobot)
  
  -- Status
  status_kelulusan VARCHAR(20) CHECK (status_kelulusan IN ('LULUS', 'TIDAK_LULUS')),
  alasan_override TEXT,        -- Jika manual override
  
  -- Timestamps
  calculated_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_nilai_akhir_siswa_tahun ON nilai_akhir(siswa_id, tahun_ajaran_id);
```

---

### 10. visibility_settings (⭐ Important)

**Tabel kontrol apa yang dilihat siswa.**

```sql
CREATE TABLE visibility_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id),
  
  -- Toggle untuk setiap elemen
  tampilkan_skl BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_rapor BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_us BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_ukk BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_praktik BOOLEAN DEFAULT TRUE,
  tampilkan_transkrip BOOLEAN DEFAULT TRUE,
  tampilkan_status_kelulusan BOOLEAN DEFAULT FALSE,  -- Jangan tampil sebelum H-hari
  tampilkan_ranking BOOLEAN DEFAULT FALSE,
  tampilkan_pengumuman BOOLEAN DEFAULT FALSE,
  
  -- Audit
  updated_by UUID NOT NULL REFERENCES auth.users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(tahun_ajaran_id)
);

CREATE INDEX idx_visibility_tahun ON visibility_settings(tahun_ajaran_id);
```

**Kolom:**
- Setiap kolom adalah toggle untuk menampilkan/menyembunyikan elemen tertentu
- `updated_by`: Admin yang melakukan perubahan
- `updated_at`: Kapan perubahan dilakukan (untuk audit log)

---

### 11. pengumuman (Announcements)

Tabel pengumuman kelulusan.

```sql
CREATE TABLE pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255),
  deskripsi TEXT,
  
  -- Scheduling
  tanggal_mulai TIMESTAMP NOT NULL,
  tanggal_selesai TIMESTAMP,
  mode_terjadwal BOOLEAN DEFAULT FALSE,  -- TRUE = hanya bisa diakses jam tertentu
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

---

### 12. dokumen_skl (Generated Documents)

Tabel arsip dokumen SKL yang sudah di-generate.

```sql
CREATE TABLE dokumen_skl (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id),
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id),
  
  -- File info
  file_url VARCHAR(500) NOT NULL,  -- Supabase Storage path
  qr_code_data VARCHAR(500),       -- QR code content (verifiable link)
  
  -- Signature
  signed_at TIMESTAMP,
  signed_by UUID REFERENCES auth.users(id),  -- Kepala sekolah
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_dokumen_skl_siswa_tahun ON dokumen_skl(siswa_id, tahun_ajaran_id);
```

---

### 13. audit_log (Activity Tracking)

Tabel untuk track semua aktivitas penting.

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action VARCHAR(255) NOT NULL,      -- UPDATE_NILAI, CHANGE_STATUS, etc
  table_name VARCHAR(100),
  record_id VARCHAR(100),
  
  -- For comparison
  old_value JSONB,
  new_value JSONB,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_created_at ON audit_log(created_at DESC);
```

---

### 14. tahun_ajaran (School Years)

Tabel tahun ajaran.

```sql
CREATE TABLE tahun_ajaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tahun VARCHAR(9) NOT NULL,  -- 2024/2025
  semester INT CHECK (semester IN (1, 2)),
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(tahun, semester)
);
```

---

### 15. school_settings (Configuration)

Tabel profil sekolah & pengaturan umum.

```sql
CREATE TABLE school_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Profil Sekolah
  nama VARCHAR(255) NOT NULL,
  npsn VARCHAR(20),
  alamat TEXT,
  telepon VARCHAR(20),
  email VARCHAR(255),
  
  -- Media (Supabase Storage paths)
  logo_url VARCHAR(500),
  kop_surat_url VARCHAR(500),
  
  -- Pengaturan pengumuman
  tanggal_pengumuman TIMESTAMP,
  jam_pengumuman TIME,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔗 ER Diagram (Relationships)

```
tahun_ajaran ─┬─ kelas ─ jurusan
              ├─ siswa ┘
              ├─ nilai_akhir
              ├─ visibility_settings
              └─ dokumen_skl

kelas ─ siswa ─┬─ nilai ─ mata_pelajaran ─ guru_mapel ─ guru
              ├─ nilai_akhir
              └─ dokumen_skl

guru ─ guru_mapel ─ mata_pelajaran

auth.users (via FK) ─┬─ guru (created users)
                    ├─ visibility_settings (updated_by)
                    ├─ dokumen_skl (signed_by)
                    └─ audit_log (user_id)
```

---

## 🔐 RLS Policies (Security)

### Siswa dapat melihat data mereka sendiri:

```sql
CREATE POLICY "siswa_read_own" ON siswa
FOR SELECT USING (
  auth.uid() = (
    SELECT user_id FROM user_siswa WHERE siswa_id = siswa.id
  )
);
```

### Admin dapat melihat semua:

```sql
CREATE POLICY "admin_read_all" ON siswa
FOR SELECT USING (
  (auth.jwt() ->> 'role') = 'admin'
);
```

### Guru hanya bisa melihat nilai siswa di kelas mereka:

```sql
CREATE POLICY "guru_read_nilai" ON nilai
FOR SELECT USING (
  siswa_id IN (
    SELECT id FROM siswa 
    WHERE kelas_id IN (
      SELECT id FROM kelas 
      WHERE wali_kelas_id = (
        SELECT id FROM guru WHERE email = auth.jwt() ->> 'email'
      )
    )
  )
);
```

---

## 📝 SQL Migrations

Lihat folder `supabase/migrations/` untuk file SQL:

1. `001_init_schema.sql` — Create semua tabel utama
2. `002_add_visibility.sql` — Add visibility_settings & audit_log
3. `003_add_rls.sql` — Enable RLS & create policies
4. `004_seed_data.sql` — Insert dummy data (development)

---

## 🧪 Data Types Reference

| Type | Contoh | Catatan |
|------|--------|---------|
| UUID | gen_random_uuid() | Primary keys, relationships |
| VARCHAR(n) | VARCHAR(255) | String dengan max length |
| TEXT | ... | String unlimited |
| INT | 85 | Integer |
| DECIMAL(5,2) | 85.50 | 5 digit total, 2 decimal |
| DATE | 2006-01-15 | Date only |
| TIMESTAMP | NOW() | Date + time |
| TIME | 14:30:00 | Time only |
| BOOLEAN | TRUE/FALSE | Binary |
| JSONB | {"key": "value"} | JSON object |
| CHAR(1) | 'M' | Single character |

---

## 📈 Indexing Strategy

Indexes dibuat untuk:
- Primary keys (automatically)
- Foreign keys (untuk JOIN operations)
- Frequently searched columns (email, nisn)
- Unique constraints

**Contoh:**
```sql
CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_nilai_siswa_id ON nilai(siswa_id);
CREATE UNIQUE INDEX idx_nilai_akhir_siswa_tahun ON nilai_akhir(siswa_id, tahun_ajaran_id);
```

---

## 🚀 Connection & Usage

### From Node.js/Next.js:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

// Query
const { data, error } = await supabase
  .from('siswa')
  .select('*')
  .eq('id', siswaId);

// Insert
await supabase.from('nilai').insert({
  siswa_id, mapel_id, semester, nilai_rapor
});
```

---

## 📚 References

- [Supabase Database Docs](https://supabase.com/docs/guides/database)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [RLS Best Practices](https://supabase.com/docs/guides/auth/row-level-security)

---

**Last updated:** 2026-04-28
