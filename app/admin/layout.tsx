'use client';

import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/admin" className="text-xl font-bold text-blue-600">
            🎓 Kelulusan SMK
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link href="/admin/siswa" className="text-slate-600 hover:text-slate-900">
              Siswa
            </Link>
            <Link href="/admin/guru" className="text-slate-600 hover:text-slate-900">
              Guru
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">{children}</div>
    </div>
  );
}
