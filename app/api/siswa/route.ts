import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/siswa - List siswa dengan pagination & filter
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get pagination params
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const kelasId = searchParams.get('kelas_id');

    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('siswa')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`nisn.ilike.%${search}%,nama.ilike.%${search}%`);
    }

    if (kelasId) {
      query = query.eq('kelas_id', kelasId);
    }

    const { data, count, error } = await query
      .order('nama', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching siswa:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// POST /api/siswa - Create siswa baru
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nisn, nis, nama, email, jenis_kelamin, tanggal_lahir, alamat, kelas_id } = body;

    // Validate required fields
    if (!nisn || !nama) {
      return NextResponse.json(
        { error: 'NISN dan Nama harus diisi' },
        { status: 400 }
      );
    }

    // Check NISN unique
    const { data: existing } = await supabase
      .from('siswa')
      .select('id')
      .eq('nisn', nisn)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'NISN sudah terdaftar' },
        { status: 400 }
      );
    }

    // Insert siswa
    const { data, error } = await supabase
      .from('siswa')
      .insert([
        {
          nisn,
          nis,
          nama,
          email,
          jenis_kelamin,
          tanggal_lahir,
          alamat,
          kelas_id,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating siswa:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
