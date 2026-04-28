import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/guru - List guru dengan pagination & filter
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
      .from('guru')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`nip.ilike.%${search}%,nama.ilike.%${search}%,email.ilike.%${search}%`);
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
    console.error('Error fetching guru:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

// POST /api/guru - Create guru baru
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
    const { nip, nama, email } = body;

    // Validate required fields
    if (!nip || !nama || !email) {
      return NextResponse.json(
        { error: 'NIP, Nama, dan Email harus diisi' },
        { status: 400 }
      );
    }

    // Check NIP unique
    const { data: existingNip } = await supabase
      .from('guru')
      .select('id')
      .eq('nip', nip)
      .single();

    if (existingNip) {
      return NextResponse.json(
        { error: 'NIP sudah terdaftar' },
        { status: 400 }
      );
    }

    // Check email unique
    const { data: existingEmail } = await supabase
      .from('guru')
      .select('id')
      .eq('email', email)
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Insert guru
    const { data, error } = await supabase
      .from('guru')
      .insert([{ nip, nama, email }])
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
    console.error('Error creating guru:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
