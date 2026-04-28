-- Enable RLS on all tables
ALTER TABLE siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE kelas ENABLE ROW LEVEL SECURITY;
ALTER TABLE mata_pelajaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE nilai ENABLE ROW LEVEL SECURITY;
ALTER TABLE nilai_akhir ENABLE ROW LEVEL SECURITY;
ALTER TABLE dokumen_skl ENABLE ROW LEVEL SECURITY;
ALTER TABLE visibility_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tahun_ajaran ENABLE ROW LEVEL SECURITY;
ALTER TABLE jurusan ENABLE ROW LEVEL SECURITY;
ALTER TABLE guru_mapel ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Policies for admin (full access to everything)
CREATE POLICY "admin_read_all" ON siswa FOR SELECT USING ((auth.jwt() ->> 'role')::text = 'admin'::text);
CREATE POLICY "admin_write_all" ON siswa FOR INSERT WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin'::text);
CREATE POLICY "admin_update_all" ON siswa FOR UPDATE USING ((auth.jwt() ->> 'role')::text = 'admin'::text);
CREATE POLICY "admin_delete_all" ON siswa FOR DELETE USING ((auth.jwt() ->> 'role')::text = 'admin'::text);

-- Policies for guru (read values of their class, insert new)
CREATE POLICY "guru_read_nilai" ON nilai
FOR SELECT USING (
  (auth.jwt() ->> 'role')::text = 'guru'::text OR
  (auth.jwt() ->> 'role')::text = 'admin'::text
);

CREATE POLICY "guru_write_nilai" ON nilai
FOR INSERT WITH CHECK (
  (auth.jwt() ->> 'role')::text = 'guru'::text OR
  (auth.jwt() ->> 'role')::text = 'admin'::text
);

CREATE POLICY "guru_update_nilai" ON nilai
FOR UPDATE USING (
  (auth.jwt() ->> 'role')::text = 'guru'::text OR
  (auth.jwt() ->> 'role')::text = 'admin'::text
);

-- Policies for siswa (read own data only)
CREATE POLICY "siswa_read_own_data" ON siswa
FOR SELECT USING (
  auth.uid() = id OR
  (auth.jwt() ->> 'role')::text = 'admin'::text
);

-- Policies for public/anonymous access (pengumuman, verify SKL)
CREATE POLICY "public_read_pengumuman" ON pengumuman
FOR SELECT USING (true);

CREATE POLICY "public_read_dokumen_skl" ON dokumen_skl
FOR SELECT USING (true);

-- Policies for visibility_settings (admin only)
CREATE POLICY "admin_read_visibility" ON visibility_settings
FOR SELECT USING ((auth.jwt() ->> 'role')::text = 'admin'::text);

CREATE POLICY "admin_write_visibility" ON visibility_settings
FOR INSERT WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin'::text);

CREATE POLICY "admin_update_visibility" ON visibility_settings
FOR UPDATE USING ((auth.jwt() ->> 'role')::text = 'admin'::text);

-- Policies for audit_log (admin & user can read their own activity)
CREATE POLICY "audit_read_own" ON audit_log
FOR SELECT USING (
  auth.uid() = user_id OR
  (auth.jwt() ->> 'role')::text = 'admin'::text
);

CREATE POLICY "audit_insert_own" ON audit_log
FOR INSERT WITH CHECK (auth.uid() = user_id);
