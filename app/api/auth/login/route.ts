import { createClient } from '@/lib/supabase/server';
import { isValidEmail, isValidPassword } from '@/lib/auth/utils';
import type { LoginRequest, AuthResponse } from '@/lib/auth/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = (await request.json()) as LoginRequest;
    const { email, password } = body;

    // Validate input
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Email tidak valid' },
        { status: 400 }
      );
    }

    if (!password || !isValidPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Password minimal 8 karakter' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Sign in dengan Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Get user role dari custom claims
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session tidak dapat dibuat' },
        { status: 500 }
      );
    }

    // Decode JWT untuk get custom claims
    const decoded = JSON.parse(
      Buffer.from(session.access_token.split('.')[1], 'base64').toString()
    );

    const role = decoded.role || 'guru';

    // Check if user has admin/guru/kepsek role
    if (!['admin', 'guru', 'kepsek'].includes(role)) {
      // Sign out jika bukan role yang tepat
      await supabase.auth.signOut();
      return NextResponse.json(
        { success: false, error: 'Akses hanya untuk admin, guru, atau kepala sekolah' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        role,
        nama: data.user.user_metadata?.nama || data.user.email,
      },
      token: session.access_token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
