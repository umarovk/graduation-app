import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/kelas - List kelas dengan pagination & filter
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
    const jurusanId = searchParams.get('jurusan_id');
    const tahunAjaranId = searchParams.get('tahun_ajaran_id');

    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('kelas')
      .select('*, jurusan(nama), tahun_ajaran(tahun)', { count: 'exact' });

    if (search) {
      query = query.ilike('nama', `%${search}%`);
    }

    if (jurusanId) {
      query = query.eq('jurusan_id', jurusanId);
    }

    if (tahunAjaranId) {
      query = query.eq('tahun_ajaran_id', tahunAjaranId);
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
    console.error('Error fetching kelas:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// POST /api/kelas - Create kelas baru
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
    const { nama, tingkat, jurusan_id, tahun_ajaran_id, wali_kelas_id } = body;

    // Validate required fields
    if (!nama || !tingkat || !jurusan_id || !tahun_ajaran_id) {
      return NextResponse.json(
        { error: 'Nama, Tingkat, Jurusan, dan Tahun Ajaran harus diisi' },
        { status: 400 }
      );
    }

    // Insert kelas
    const { data, error } = await supabase
      .from('kelas')
      .insert([
        {
          nama,
          tingkat,
          jurusan_id,
          tahun_ajaran_id,
          wali_kelas_id: wali_kelas_id || null,
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
    console.error('Error creating kelas:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
