-- Create tahun_ajaran table
CREATE TABLE IF NOT EXISTS tahun_ajaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tahun VARCHAR(9) NOT NULL,
  semester INT CHECK (semester IN (1, 2)),
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(tahun, semester)
);

-- Create jurusan table
CREATE TABLE IF NOT EXISTS jurusan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create kelas table
CREATE TABLE IF NOT EXISTS kelas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(100) NOT NULL,
  tingkat INT CHECK (tingkat IN (10, 11, 12)),
  jurusan_id UUID NOT NULL REFERENCES jurusan(id) ON DELETE RESTRICT,
  wali_kelas_id UUID REFERENCES auth.users(id),
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(nama, tahun_ajaran_id)
);

-- Create siswa table
CREATE TABLE IF NOT EXISTS siswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nisn VARCHAR(10) UNIQUE NOT NULL,
  nis VARCHAR(10),
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  jenis_kelamin CHAR(1) CHECK (jenis_kelamin IN ('L', 'P')),
  tanggal_lahir DATE,
  alamat TEXT,
  foto_url VARCHAR(500),
  kelas_id UUID REFERENCES kelas(id) ON DELETE SET NULL,
  status_kelulusan VARCHAR(20) CHECK (status_kelulusan IN ('LULUS', 'TIDAK_LULUS', 'PENDING')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create guru table
CREATE TABLE IF NOT EXISTS guru (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nip VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create mata_pelajaran table
CREATE TABLE IF NOT EXISTS mata_pelajaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(20) UNIQUE,
  nama VARCHAR(100) NOT NULL,
  kategori VARCHAR(50) CHECK (kategori IN ('Normatif', 'Adaptif', 'Produktif')),
  kkm INT DEFAULT 70 CHECK (kkm >= 0 AND kkm <= 100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create guru_mapel junction table
CREATE TABLE IF NOT EXISTS guru_mapel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_id UUID NOT NULL REFERENCES guru(id) ON DELETE CASCADE,
  mapel_id UUID NOT NULL REFERENCES mata_pelajaran(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(guru_id, mapel_id)
);

-- Create nilai table
CREATE TABLE IF NOT EXISTS nilai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  mapel_id UUID NOT NULL REFERENCES mata_pelajaran(id) ON DELETE RESTRICT,
  semester INT CHECK (semester BETWEEN 1 AND 6),
  nilai_rapor DECIMAL(5,2) CHECK (nilai_rapor >= 0 AND nilai_rapor <= 100),
  nilai_us DECIMAL(5,2) CHECK (nilai_us >= 0 AND nilai_us <= 100),
  nilai_ukk DECIMAL(5,2) CHECK (nilai_ukk >= 0 AND nilai_ukk <= 100),
  nilai_praktik DECIMAL(5,2),
  nilai_sikap VARCHAR(2) CHECK (nilai_sikap IN ('A', 'B', 'C', 'D')),
  nilai_pkl DECIMAL(5,2),
  locked_at TIMESTAMP,
  locked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(siswa_id, mapel_id, semester)
);

-- Create nilai_akhir table
CREATE TABLE IF NOT EXISTS nilai_akhir (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id) ON DELETE CASCADE,
  rata_rata DECIMAL(5,2),
  nilai_us DECIMAL(5,2),
  nilai_ukk DECIMAL(5,2),
  nilai_final DECIMAL(5,2),
  status_kelulusan VARCHAR(20) CHECK (status_kelulusan IN ('LULUS', 'TIDAK_LULUS')),
  alasan_override TEXT,
  calculated_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(siswa_id, tahun_ajaran_id)
);

-- Create pengumuman table
CREATE TABLE IF NOT EXISTS pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255),
  deskripsi TEXT,
  tanggal_mulai TIMESTAMP NOT NULL,
  tanggal_selesai TIMESTAMP,
  mode_terjadwal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create dokumen_skl table
CREATE TABLE IF NOT EXISTS dokumen_skl (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siswa_id UUID NOT NULL REFERENCES siswa(id) ON DELETE CASCADE,
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id) ON DELETE CASCADE,
  file_url VARCHAR(500) NOT NULL,
  qr_code_data VARCHAR(500),
  signed_at TIMESTAMP,
  signed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(siswa_id, tahun_ajaran_id)
);

-- Create school_settings table
CREATE TABLE IF NOT EXISTS school_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(255) NOT NULL,
  npsn VARCHAR(20),
  alamat TEXT,
  telepon VARCHAR(20),
  email VARCHAR(255),
  logo_url VARCHAR(500),
  kop_surat_url VARCHAR(500),
  tanggal_pengumuman TIMESTAMP,
  jam_pengumuman TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_siswa_nisn ON siswa(nisn);
CREATE INDEX idx_siswa_kelas_id ON siswa(kelas_id);
CREATE INDEX idx_nilai_siswa_id ON nilai(siswa_id);
CREATE INDEX idx_nilai_mapel_id ON nilai(mapel_id);
CREATE INDEX idx_guru_email ON guru(email);
CREATE INDEX idx_mapel_kategori ON mata_pelajaran(kategori);
CREATE INDEX idx_kelas_tahun ON kelas(tahun_ajaran_id);
