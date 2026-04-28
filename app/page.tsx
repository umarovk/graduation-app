import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            🎓 Aplikasi Kelulusan SMK
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Sistem informasi untuk pengumuman hasil kelulusan siswa SMK
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/auth/login"
            className="card hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Login Admin/Guru
            </h2>
            <p className="text-slate-600">
              Masuk sebagai admin, guru, atau kepala sekolah
            </p>
          </Link>

          <Link
            href="/auth/siswa"
            className="card hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Login Siswa
            </h2>
            <p className="text-slate-600">
              Login dengan NISN dan tanggal lahir
            </p>
          </Link>
        </div>

        {/* Info Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            ℹ️ Tentang Aplikasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">📊 Fitur</h3>
              <ul className="text-slate-600 space-y-1 text-sm">
                <li>• Kelola data siswa</li>
                <li>• Input & kelola nilai</li>
                <li>• Generate SKL otomatis</li>
                <li>• Dashboard statistik</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">👥 Pengguna</h3>
              <ul className="text-slate-600 space-y-1 text-sm">
                <li>• Admin - Manajemen semua</li>
                <li>• Guru - Input nilai</li>
                <li>• Kepala Sekolah - Verifikasi</li>
                <li>• Siswa - Lihat hasil</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">🛠️ Tech Stack</h3>
              <ul className="text-slate-600 space-y-1 text-sm">
                <li>• Next.js 14</li>
                <li>• Supabase (PostgreSQL)</li>
                <li>• Tailwind CSS</li>
                <li>• TypeScript</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 border-t border-slate-200 pt-8">
          <p>
            Dokumentasi:{' '}
            <Link href="/docs" className="text-blue-600 hover:underline">
              Lihat docs
            </Link>
          </p>
          <p className="text-sm mt-4">
            © 2026 Aplikasi Kelulusan SMK. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
