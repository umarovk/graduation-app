import { createClient } from '@/lib/supabase/server';
import type { AuthResponse } from '@/lib/auth/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User tidak ditemukan' },
        { status: 401 }
      );
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session tidak valid' },
        { status: 401 }
      );
    }

    // Decode JWT untuk get custom claims
    const decoded = JSON.parse(
      Buffer.from(session.access_token.split('.')[1], 'base64').toString()
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: decoded.role || 'siswa',
        nama: user.user_metadata?.nama || user.email,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
