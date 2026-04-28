'use client';

import { InputHTMLAttributes } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

export function FormInput({
  label,
  error,
  helpText,
  id,
  ...props
}: FormInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-slate-300 bg-white'
        }`}
        {...props}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      {helpText && !error && (
        <p className="text-slate-500 text-xs mt-1">{helpText}</p>
      )}
    </div>
  );
}

export interface FormSelectProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helpText?: string;
}

export function FormSelect({
  label,
  options,
  error,
  helpText,
  id,
  ...props
}: FormSelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mb-4">
      <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-slate-300 bg-white'
        }`}
        {...props}
      >
        <option value="">-- Pilih {label.toLowerCase()} --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      {helpText && !error && (
        <p className="text-slate-500 text-xs mt-1">{helpText}</p>
      )}
    </div>
  );
}

export interface FormTextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
  rows?: number;
}

export function FormTextarea({
  label,
  error,
  helpText,
  id,
  rows = 3,
  ...props
}: FormTextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mb-4">
      <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-slate-300 bg-white'
        }`}
        {...(props as any)}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      {helpText && !error && (
        <p className="text-slate-500 text-xs mt-1">{helpText}</p>
      )}
    </div>
  );
}
