import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/dropdown - Get dropdown data (jurusan, tahun_ajaran, guru, mapel)
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

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (type === 'jurusan') {
      const { data, error } = await supabase
        .from('jurusan')
        .select('id, nama')
        .order('nama', { ascending: true });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ data });
    }

    if (type === 'tahun_ajaran') {
      const { data, error } = await supabase
        .from('tahun_ajaran')
        .select('id, tahun, semester')
        .order('tahun', { ascending: false });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ data });
    }

    if (type === 'guru') {
      const { data, error } = await supabase
        .from('guru')
        .select('id, nama')
        .order('nama', { ascending: true });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ data });
    }

    if (type === 'mapel') {
      const { data, error } = await supabase
        .from('mata_pelajaran')
        .select('id, nama, kategori')
        .order('nama', { ascending: true });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ data });
    }

    return NextResponse.json(
      { error: 'Type parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching dropdown data:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
