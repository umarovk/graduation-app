import { createClient } from '@/lib/supabase/server';
import { isValidNISN, formatDate } from '@/lib/auth/utils';
import type { SiswaLoginRequest, AuthResponse } from '@/lib/auth/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body = (await request.json()) as SiswaLoginRequest;
    const { nisn, tanggalLahir } = body;

    // Validate input
    if (!nisn || !isValidNISN(nisn)) {
      return NextResponse.json(
        { success: false, error: 'NISN harus 10 digit angka' },
        { status: 400 }
      );
    }

    if (!tanggalLahir) {
      return NextResponse.json(
        { success: false, error: 'Tanggal lahir tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Validate tanggal format
    const dateObj = new Date(tanggalLahir);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Format tanggal tidak valid' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Find siswa dengan NISN dan tanggal lahir
    const { data: siswaData, error: siswaError } = await supabase
      .from('siswa')
      .select('id, nama, nisn, email, tanggal_lahir')
      .eq('nisn', nisn)
      .eq('tanggal_lahir', formatDate(dateObj))
      .single();

    if (siswaError || !siswaData) {
      return NextResponse.json(
        { success: false, error: 'NISN atau tanggal lahir tidak sesuai' },
        { status: 401 }
      );
    }

    // Create or update siswa user in auth
    const email = siswaData.email || `siswa_${nisn}@kelulusan.local`;

    // Try to sign up (akan gagal jika sudah ada, tapi itu OK)
    await supabase.auth.signUp({
      email,
      password: `${nisn}${formatDate(dateObj).replace(/-/g, '')}`, // Default password: NISN + YYYYMMDD
      options: {
        data: {
          nisn,
          nama: siswaData.nama,
          role: 'siswa',
        },
      },
    });

    // Sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: `${nisn}${formatDate(dateObj).replace(/-/g, '')}`,
    });

    if (signInError || !data.user) {
      return NextResponse.json(
        { success: false, error: 'Gagal login. Hubungi admin untuk bantuan.' },
        { status: 401 }
      );
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session tidak dapat dibuat' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        role: 'siswa',
        nama: siswaData.nama,
      },
      token: session.access_token,
    });
  } catch (error) {
    console.error('Siswa login error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
