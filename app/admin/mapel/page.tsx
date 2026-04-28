'use client';

import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataColumn } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { FormInput, FormSelect } from '@/components/FormInput';

interface Mapel {
  id: string;
  kode: string | null;
  nama: string;
  kategori: string;
  kkm: number;
  created_at: string;
}

export default function MapelPage() {
  const [mapel, setMapel] = useState<Mapel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Mapel>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchMapel = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.append('search', search);

      const response = await fetch(`/api/mapel?${params}`);
      const data = await response.json();

      setMapel(data.data || []);
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching mapel:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchMapel();
  }, [fetchMapel]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama) newErrors.nama = 'Nama mata pelajaran harus diisi';
    if (!formData.kategori) newErrors.kategori = 'Kategori harus dipilih';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/mapel/${editingId}`
        : '/api/mapel';

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

      alert(editingId ? 'Data mapel berhasil diperbarui' : 'Mapel baru berhasil ditambahkan');
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      setPage(1);
      await fetchMapel();
    } catch (error) {
      console.error('Error saving mapel:', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleEdit = (row: Mapel) => {
    setEditingId(row.id);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: Mapel) => {
    try {
      const response = await fetch(`/api/mapel/${row.id}`, { method: 'DELETE' });

      if (!response.ok) {
        alert('Gagal menghapus data');
        return;
      }

      alert('Mapel berhasil dihapus');
      await fetchMapel();
    } catch (error) {
      console.error('Error deleting mapel:', error);
      alert('Terjadi kesalahan');
    }
  };

  const columns: DataColumn<Mapel>[] = [
    { key: 'kode', label: 'Kode', sortable: true, width: '100px' },
    { key: 'nama', label: 'Nama', sortable: true },
    { key: 'kategori', label: 'Kategori', width: '120px' },
    { key: 'kkm', label: 'KKM', width: '80px' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Mata Pelajaran</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
            setErrors({});
            setIsModalOpen(true);
          }}
          className="button-primary"
        >
          + Tambah Mapel
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari kode atau nama mata pelajaran..."
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
        <DataTable<Mapel>
          columns={columns}
          data={mapel}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={true}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {mapel.length} dari {total} mata pelajaran
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
        title={editingId ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Kode (Opsional)"
            value={formData.kode || ''}
            onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
            placeholder="Kode mata pelajaran"
          />

          <FormInput
            label="Nama Mata Pelajaran"
            value={formData.nama || ''}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            error={errors.nama}
            placeholder="Nama lengkap mata pelajaran"
          />

          <FormSelect
            label="Kategori"
            value={formData.kategori || ''}
            onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
            error={errors.kategori}
            options={[
              { value: 'Normatif', label: 'Normatif' },
              { value: 'Adaptif', label: 'Adaptif' },
              { value: 'Produktif', label: 'Produktif' },
            ]}
          />

          <FormInput
            label="KKM (Kriteria Ketuntasan Minimal)"
            type="number"
            value={String(formData.kkm || 70)}
            onChange={(e) => setFormData({ ...formData, kkm: parseInt(e.target.value) })}
            min={0}
            max={100}
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
