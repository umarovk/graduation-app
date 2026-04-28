'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SiswaLogin() {
  const [nisn, setNisn] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement Supabase login with NISN + tanggal lahir
      console.log('Siswa login attempt:', { nisn, tanggalLahir });
      // Redirect to siswa dashboard
    } catch (err) {
      setError('Login gagal. Periksa NISN dan tanggal lahir Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          👤 Login Siswa
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Masukkan NISN dan tanggal lahir Anda
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              NISN (Nomor Induk Siswa Nasional)
            </label>
            <input
              type="text"
              value={nisn}
              onChange={(e) => setNisn(e.target.value.slice(0, 10))}
              maxLength={10}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="1234567890"
            />
            <p className="text-xs text-slate-500 mt-1">
              NISN terdiri dari 10 digit angka
            </p>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-slate-600 text-sm">
            Admin atau Guru? {' '}
            <Link href="/auth/login" className="text-green-600 hover:underline">
              Login dengan email
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm text-slate-600">
          <p className="font-medium mb-2">Demo Siswa:</p>
          <p>NISN: 1234567890</p>
          <p>Tanggal Lahir: 2006-01-15</p>
        </div>
      </div>
    </div>
  );
}
