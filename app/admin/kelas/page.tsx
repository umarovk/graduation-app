'use client';

import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataColumn } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { FormInput, FormSelect } from '@/components/FormInput';

interface Kelas {
  id: string;
  nama: string;
  tingkat: number;
  jurusan_id: string;
  tahun_ajaran_id: string;
  wali_kelas_id: string | null;
  created_at: string;
  updated_at: string;
  jurusan?: { nama: string };
  tahun_ajaran?: { tahun: string };
}

interface DropdownItem {
  id: string;
  nama: string;
  [key: string]: string | number;
}

export default function KelasPage() {
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Kelas>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [jurusanList, setJurusanList] = useState<DropdownItem[]>([]);
  const [tahunAjaranList, setTahunAjaranList] = useState<DropdownItem[]>([]);

  const fetchKelas = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.append('search', search);

      const response = await fetch(`/api/kelas?${params}`);
      const data = await response.json();

      setKelas(data.data || []);
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching kelas:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchKelas();
  }, [fetchKelas]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [jurusanRes, tahunRes] = await Promise.all([
          fetch('/api/dropdown?type=jurusan'),
          fetch('/api/dropdown?type=tahun_ajaran'),
        ]);

        const jurusanData = await jurusanRes.json();
        const tahunData = await tahunRes.json();

        setJurusanList(jurusanData.data || []);
        setTahunAjaranList(tahunData.data || []);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama) newErrors.nama = 'Nama kelas harus diisi';
    if (!formData.tingkat) newErrors.tingkat = 'Tingkat harus diisi';
    if (!formData.jurusan_id) newErrors.jurusan_id = 'Jurusan harus dipilih';
    if (!formData.tahun_ajaran_id) newErrors.tahun_ajaran_id = 'Tahun Ajaran harus dipilih';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/kelas/${editingId}` : '/api/kelas';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Gagal menyimpan data');
        return;
      }

      alert(editingId ? 'Data kelas berhasil diperbarui' : 'Kelas baru berhasil ditambahkan');
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      setPage(1);
      await fetchKelas();
    } catch (error) {
      console.error('Error saving kelas:', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleEdit = (row: Kelas) => {
    setEditingId(row.id);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: Kelas) => {
    try {
      const response = await fetch(`/api/kelas/${row.id}`, { method: 'DELETE' });

      if (!response.ok) {
        alert('Gagal menghapus data');
        return;
      }

      alert('Kelas berhasil dihapus');
      await fetchKelas();
    } catch (error) {
      console.error('Error deleting kelas:', error);
      alert('Terjadi kesalahan');
    }
  };

  const columns: DataColumn<Kelas>[] = [
    { key: 'nama', label: 'Nama Kelas', sortable: true },
    {
      key: 'tingkat',
      label: 'Tingkat',
      sortable: true,
      width: '100px',
      render: (value) => `Kelas ${value}`,
    },
    {
      key: 'jurusan_id',
      label: 'Jurusan',
      render: (_, row: Kelas) => row.jurusan?.nama || '-',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Kelas</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
            setErrors({});
            setIsModalOpen(true);
          }}
          className="button-primary"
        >
          + Tambah Kelas
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari nama kelas..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="card">
        <DataTable<Kelas>
          columns={columns}
          data={kelas}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={true}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {kelas.length} dari {total} kelas
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50"
            >
              ← Sebelumnya
            </button>
            <span className="px-3 py-2">
              Halaman {page} dari {pages}
            </span>
            <button
              onClick={() => setPage(Math.min(pages, page + 1))}
              disabled={page === pages}
              className="px-3 py-2 border border-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-50"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      </div>

      {/* Modal Create/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
          setFormData({});
          setErrors({});
        }}
        title={editingId ? 'Edit Kelas' : 'Tambah Kelas'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Nama Kelas"
            value={formData.nama || ''}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            error={errors.nama}
            placeholder="Contoh: 10 RPL A"
          />

          <FormSelect
            label="Tingkat"
            value={String(formData.tingkat || '')}
            onChange={(e) => setFormData({ ...formData, tingkat: parseInt(e.target.value) })}
            error={errors.tingkat}
            options={[
              { value: '10', label: 'Kelas 10' },
              { value: '11', label: 'Kelas 11' },
              { value: '12', label: 'Kelas 12' },
            ]}
          />

          <FormSelect
            label="Jurusan"
            value={formData.jurusan_id || ''}
            onChange={(e) => setFormData({ ...formData, jurusan_id: e.target.value })}
            error={errors.jurusan_id}
            options={jurusanList.map((j) => ({
              value: j.id,
              label: j.nama,
            }))}
          />

          <FormSelect
            label="Tahun Ajaran"
            value={formData.tahun_ajaran_id || ''}
            onChange={(e) => setFormData({ ...formData, tahun_ajaran_id: e.target.value })}
            error={errors.tahun_ajaran_id}
            options={tahunAjaranList.map((ta) => ({
              value: ta.id,
              label: `${ta.tahun} - Semester ${(ta as any).semester || ''}`,
            }))}
          />

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({});
                setErrors({});
              }}
              className="button-secondary"
            >
              Batal
            </button>
            <button type="submit" className="button-primary">
              {editingId ? 'Perbarui' : 'Tambahkan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
