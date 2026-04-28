-- Create visibility_settings table
CREATE TABLE IF NOT EXISTS visibility_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tahun_ajaran_id UUID NOT NULL REFERENCES tahun_ajaran(id) ON DELETE CASCADE,

  tampilkan_skl BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_rapor BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_us BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_ukk BOOLEAN DEFAULT TRUE,
  tampilkan_nilai_praktik BOOLEAN DEFAULT TRUE,
  tampilkan_transkrip BOOLEAN DEFAULT TRUE,
  tampilkan_status_kelulusan BOOLEAN DEFAULT FALSE,
  tampilkan_ranking BOOLEAN DEFAULT FALSE,
  tampilkan_pengumuman BOOLEAN DEFAULT FALSE,

  updated_by UUID NOT NULL REFERENCES auth.users(id),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tahun_ajaran_id)
);

-- Create audit_log table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action VARCHAR(255) NOT NULL,
  table_name VARCHAR(100),
  record_id VARCHAR(100),
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for visibility_settings
CREATE INDEX idx_visibility_tahun ON visibility_settings(tahun_ajaran_id);
CREATE INDEX idx_audit_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_created_at ON audit_log(created_at DESC);
