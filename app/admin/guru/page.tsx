'use client';

import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataColumn } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { FormInput } from '@/components/FormInput';

interface Guru {
  id: string;
  nip: string;
  nama: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export default function GuruPage() {
  const [guru, setGuru] = useState<Guru[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Guru>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchGuru = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.append('search', search);

      const response = await fetch(`/api/guru?${params}`);
      const data = await response.json();

      setGuru(data.data || []);
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching guru:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchGuru();
  }, [fetchGuru]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nip) newErrors.nip = 'NIP harus diisi';
    if (!formData.nama) newErrors.nama = 'Nama harus diisi';
    if (!formData.email) newErrors.email = 'Email harus diisi';
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/guru/${editingId}`
        : '/api/guru';

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

      alert(editingId ? 'Data guru berhasil diperbarui' : 'Guru baru berhasil ditambahkan');
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      setPage(1);
      await fetchGuru();
    } catch (error) {
      console.error('Error saving guru:', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleEdit = (row: Guru) => {
    setEditingId(row.id);
    setFormData(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: Guru) => {
    try {
      const response = await fetch(`/api/guru/${row.id}`, { method: 'DELETE' });

      if (!response.ok) {
        alert('Gagal menghapus data');
        return;
      }

      alert('Guru berhasil dihapus');
      await fetchGuru();
    } catch (error) {
      console.error('Error deleting guru:', error);
      alert('Terjadi kesalahan');
    }
  };

  const columns: DataColumn<Guru>[] = [
    { key: 'nip', label: 'NIP', sortable: true, width: '140px' },
    { key: 'nama', label: 'Nama', sortable: true },
    { key: 'email', label: 'Email', width: '200px' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Guru</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
            setErrors({});
            setIsModalOpen(true);
          }}
          className="button-primary"
        >
          + Tambah Guru
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari NIP, Nama, atau Email..."
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
        <DataTable<Guru>
          columns={columns}
          data={guru}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={true}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {guru.length} dari {total} guru
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
        title={editingId ? 'Edit Guru' : 'Tambah Guru'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="NIP"
            value={formData.nip || ''}
            onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
            error={errors.nip}
            placeholder="Nomor Induk Pegawai"
          />

          <FormInput
            label="Nama Lengkap"
            value={formData.nama || ''}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            error={errors.nama}
            placeholder="Nama lengkap guru"
          />

          <FormInput
            label="Email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="email@sekolah.id"
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
