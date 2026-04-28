'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AuthUser } from '@/lib/auth/types';

export default function AdminDashboard() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-12">Silakan login terlebih dahulu</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Selamat datang, {user.nama}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/admin/siswa" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Siswa</h2>
          <p className="text-slate-600 text-sm">Lihat dan kelola data siswa</p>
        </Link>

        <Link href="/admin/guru" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">👨‍🏫</div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Guru</h2>
          <p className="text-slate-600 text-sm">Kelola data guru dan mapel</p>
        </Link>

        <Link href="/admin/kelas" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">🏛️</div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Kelas</h2>
          <p className="text-slate-600 text-sm">Kelola data kelas</p>
        </Link>

        <Link href="/admin/nilai" className="card hover:shadow-md transition-shadow cursor-pointer">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Nilai</h2>
          <p className="text-slate-600 text-sm">Kelola nilai siswa</p>
        </Link>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Status Authentication</h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">User ID:</span> {user.id}
          </p>
          <p>
            <span className="font-medium">Nama:</span> {user.nama}
          </p>
          <p>
            <span className="font-medium">Role:</span>{' '}
            <span className="badge badge-success">{user.role}</span>
          </p>
          {user.email && (
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
