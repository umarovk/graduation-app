'use client';

import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataColumn } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { FormInput, FormTextarea } from '@/components/FormInput';

interface Jurusan {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string | null;
  created_at: string;
}

export default function JurusanPage() {
  const [jurusan, setJurusan] = useState<Jurusan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Jurusan>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchJurusan = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.append('search', search);

      const response = await fetch(`/api/jurusan?${params}`);
      const data = await response.json();

      setJurusan(data.data || []);
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching jurusan:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchJurusan();
  }, [fetchJurusan]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.kode) newErrors.kode = 'Kode jurusan harus diisi';
    if (!formData.nama) newErrors.nama = 'Nama jurusan harus diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/jurusan/${editingId}`
        : '/api/jurusan';

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

      alert(editingId ? 'Data jurusan berhasil diperbarui' : 'Jurusan baru berhasil ditambahkan');
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      setPage(1);
      await fetchJurusan();
    } catch (error) {
      console.error('Error saving jurusan:', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleEdit = (row: Jurusan) => {
    setEditingId(row.id);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: Jurusan) => {
    try {
      const response = await fetch(`/api/jurusan/${row.id}`, { method: 'DELETE' });

      if (!response.ok) {
        alert('Gagal menghapus data');
        return;
      }

      alert('Jurusan berhasil dihapus');
      await fetchJurusan();
    } catch (error) {
      console.error('Error deleting jurusan:', error);
      alert('Terjadi kesalahan');
    }
  };

  const columns: DataColumn<Jurusan>[] = [
    { key: 'kode', label: 'Kode', sortable: true, width: '120px' },
    { key: 'nama', label: 'Nama Jurusan', sortable: true },
    { key: 'deskripsi', label: 'Deskripsi' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Jurusan</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
            setErrors({});
            setIsModalOpen(true);
          }}
          className="button-primary"
        >
          + Tambah Jurusan
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari kode atau nama jurusan..."
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
        <DataTable<Jurusan>
          columns={columns}
          data={jurusan}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={true}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {jurusan.length} dari {total} jurusan
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
        title={editingId ? 'Edit Jurusan' : 'Tambah Jurusan'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Kode Jurusan"
            value={formData.kode || ''}
            onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
            error={errors.kode}
            placeholder="Contoh: RPL, TKJ, AKL"
          />

          <FormInput
            label="Nama Jurusan"
            value={formData.nama || ''}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            error={errors.nama}
            placeholder="Nama lengkap jurusan"
          />

          <FormTextarea
            label="Deskripsi"
            value={formData.deskripsi || ''}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            placeholder="Deskripsi singkat tentang jurusan"
            rows={3}
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
