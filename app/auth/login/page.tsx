'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement Supabase login
      console.log('Login attempt:', { email, password });
      // Redirect to admin dashboard
    } catch (err) {
      setError('Login gagal. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          🎓 Kelulusan SMK
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Login Admin / Guru / Kepala Sekolah
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@sekolah.id"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-center text-slate-600 text-sm">
            Siswa? {' '}
            <Link href="/auth/siswa" className="text-blue-600 hover:underline">
              Login dengan NISN
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-600">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Email: admin@sekolah.id</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
