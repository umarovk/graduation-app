import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/mapel - List mata pelajaran dengan pagination & filter
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
    const kategori = searchParams.get('kategori');

    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('mata_pelajaran')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`kode.ilike.%${search}%,nama.ilike.%${search}%`);
    }

    if (kategori) {
      query = query.eq('kategori', kategori);
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
    console.error('Error fetching mata pelajaran:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// POST /api/mapel - Create mata pelajaran baru
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
    const { kode, nama, kategori, kkm } = body;

    // Validate required fields
    if (!nama || !kategori) {
      return NextResponse.json(
        { error: 'Nama dan Kategori harus diisi' },
        { status: 400 }
      );
    }

    // Insert mata pelajaran
    const { data, error } = await supabase
      .from('mata_pelajaran')
      .insert([
        {
          kode: kode || null,
          nama,
          kategori,
          kkm: kkm || 70,
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
    console.error('Error creating mata pelajaran:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
