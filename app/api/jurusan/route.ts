import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/jurusan - List jurusan dengan pagination & filter
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

    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('jurusan')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`kode.ilike.%${search}%,nama.ilike.%${search}%`);
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
    console.error('Error fetching jurusan:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// POST /api/jurusan - Create jurusan baru
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
    const { kode, nama, deskripsi } = body;

    // Validate required fields
    if (!kode || !nama) {
      return NextResponse.json(
        { error: 'Kode dan Nama harus diisi' },
        { status: 400 }
      );
    }

    // Check kode unique
    const { data: existing } = await supabase
      .from('jurusan')
      .select('id')
      .eq('kode', kode)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Kode jurusan sudah terdaftar' },
        { status: 400 }
      );
    }

    // Insert jurusan
    const { data, error } = await supabase
      .from('jurusan')
      .insert([{ kode, nama, deskripsi: deskripsi || null }])
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
    console.error('Error creating jurusan:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
