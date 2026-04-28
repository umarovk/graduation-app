'use client';

import { useCallback, useEffect, useState } from 'react';
import { DataTable, DataColumn } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { FormInput, FormSelect } from '@/components/FormInput';

interface Siswa {
  id: string;
  nisn: string;
  nis: string;
  nama: string;
  email: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  alamat: string;
  kelas_id: string;
}

export default function SiswaPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Siswa>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchSiswa = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (search) params.append('search', search);

      const response = await fetch(`/api/siswa?${params}`);
      const data = await response.json();

      setSiswa(data.data || []);
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
    } catch (error) {
      console.error('Error fetching siswa:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchSiswa();
  }, [fetchSiswa]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nisn) newErrors.nisn = 'NISN harus diisi';
    if (!formData.nama) newErrors.nama = 'Nama harus diisi';
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/siswa/${editingId}`
        : '/api/siswa';

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

      alert(editingId ? 'Data siswa berhasil diperbarui' : 'Siswa baru berhasil ditambahkan');
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      setPage(1);
      await fetchSiswa();
    } catch (error) {
      console.error('Error saving siswa:', error);
      alert('Terjadi kesalahan');
    }
  };

  // Handle edit
  const handleEdit = (row: Siswa) => {
    setEditingId(row.id);
    setFormData(row);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (row: Siswa) => {
    try {
      const response = await fetch(`/api/siswa/${row.id}`, { method: 'DELETE' });

      if (!response.ok) {
        alert('Gagal menghapus data');
        return;
      }

      alert('Siswa berhasil dihapus');
      await fetchSiswa();
    } catch (error) {
      console.error('Error deleting siswa:', error);
      alert('Terjadi kesalahan');
    }
  };

  const columns: DataColumn<Siswa>[] = [
    { key: 'nisn', label: 'NISN', sortable: true, width: '120px' },
    { key: 'nama', label: 'Nama', sortable: true },
    { key: 'email', label: 'Email', width: '200px' },
    { key: 'jenis_kelamin', label: 'Jenis Kelamin', width: '120px' },
    { key: 'tanggal_lahir', label: 'Tanggal Lahir', width: '130px' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Siswa</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
            setErrors({});
            setIsModalOpen(true);
          }}
          className="button-primary"
        >
          + Tambah Siswa
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari NISN atau Nama..."
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
        <DataTable<Siswa>
          columns={columns}
          data={siswa}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actions={true}
        />

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {siswa.length} dari {total} siswa
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
        title={editingId ? 'Edit Siswa' : 'Tambah Siswa'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="NISN"
            value={formData.nisn || ''}
            onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
            error={errors.nisn}
            maxLength={10}
            placeholder="10 digit angka"
          />

          <FormInput
            label="NIS"
            value={formData.nis || ''}
            onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
            placeholder="Nomor Induk Sekolah"
          />

          <FormInput
            label="Nama Lengkap"
            value={formData.nama || ''}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            error={errors.nama}
            placeholder="Nama lengkap siswa"
          />

          <FormInput
            label="Email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="email@sekolah.id"
          />

          <FormSelect
            label="Jenis Kelamin"
            value={formData.jenis_kelamin || ''}
            onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}
            options={[
              { value: 'L', label: 'Laki-laki' },
              { value: 'P', label: 'Perempuan' },
            ]}
          />

          <FormInput
            label="Tanggal Lahir"
            type="date"
            value={formData.tanggal_lahir || ''}
            onChange={(e) => setFormData({ ...formData, tanggal_lahir: e.target.value })}
          />

          <FormInput
            label="Alamat"
            value={formData.alamat || ''}
            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
            placeholder="Alamat tempat tinggal"
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
