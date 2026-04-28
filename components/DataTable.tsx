'use client';

import { useState } from 'react';

export interface DataColumn<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T = unknown> {
  columns: DataColumn<T>[];
  data: T[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actions?: boolean;
}

export function DataTable<T = Record<string, unknown>>({
  columns,
  data,
  loading = false,
  onEdit,
  onDelete,
  actions = true,
}: DataTableProps<T>) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const getSortedData = () => {
    if (!sortBy) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortBy];
      const bVal = (b as Record<string, unknown>)[sortBy];

      if ((aVal as any) < (bVal as any)) return sortOrder === 'asc' ? -1 : 1;
      if ((aVal as any) > (bVal as any)) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const sortedData = getSortedData();

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-slate-500">Tidak ada data</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-medium text-slate-900"
                style={{ width: col.width }}
              >
                {col.sortable ? (
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    {col.label}
                    {sortBy === col.key && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-left font-medium text-slate-900">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-700">
                  {col.render
                    ? col.render(
                        (row as Record<string, unknown>)[col.key],
                        row
                      )
                    : String((row as Record<string, unknown>)[col.key] || '-')}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-xs"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              'Apakah Anda yakin ingin menghapus data ini?'
                            )
                          ) {
                            onDelete(row);
                          }
                        }}
                        className="text-red-600 hover:text-red-700 font-medium text-xs"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
