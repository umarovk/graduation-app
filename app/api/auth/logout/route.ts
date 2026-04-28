import { createClient } from '@/lib/supabase/server';
import type { AuthResponse } from '@/lib/auth/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}
