import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protected routes
  const adminRoutes = ['/admin', '/admin/siswa', '/admin/guru', '/admin/kelas'];
  const guruRoutes = ['/guru'];
  const siswaRoutes = ['/siswa'];

  // Check if route needs auth
  const needsAdminAuth = adminRoutes.some((route) => pathname.startsWith(route));
  const needsGuruAuth = guruRoutes.some((route) => pathname.startsWith(route));
  const needsSiswaAuth = siswaRoutes.some((route) => pathname.startsWith(route));

  if (!needsAdminAuth && !needsGuruAuth && !needsSiswaAuth) {
    return NextResponse.next();
  }

  // Get token from cookies atau localStorage (lewat header)
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redirect ke login page
    if (needsAdminAuth || needsGuruAuth) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    } else if (needsSiswaAuth) {
      return NextResponse.redirect(new URL('/auth/siswa', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/guru/:path*', '/siswa/:path*'],
};
