# 🔌 API Documentation

Dokumentasi lengkap API endpoints untuk Aplikasi Kelulusan SMK.

**Base URL:** `http://localhost:3000/api` (development) atau `https://yourdomain.com/api` (production)

---

## 📋 Endpoint Categories

- [Authentication](#authentication)
- [Siswa (Data Master)](#siswa-data-master)
- [Guru & Kelas](#guru--kelas)
- [Nilai (Grades)](#nilai-grades)
- [Kelulusan (Status)](#kelulusan-status)
- [Dokumen (SKL, Transkrip)](#dokumen-skl-transkrip)
- [Visibilitas (Kontrol Data)](#visibilitas-kontrol-data)
- [Laporan & Statistik](#laporan--statistik)

---

## Authentication

### POST /auth/login

Login untuk admin, guru, atau kepala sekolah.

**Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@sekolah.id",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-user-id",
    "email": "admin@sekolah.id",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

---

### POST /auth/logout

Logout & invalidate session.

**Request:**
```bash
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## Siswa (Data Master)

### GET /siswa

List semua siswa (admin only).

**Query Parameters:**
```
?page=1&limit=20&search=john&kelas_id=uuid&tahun_ajaran_id=uuid
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nisn": "1234567890",
      "nis": "001",
      "nama": "John Doe",
      "email": "john@email.com",
      "jenis_kelamin": "M",
      "ttl": "2006-01-15",
      "alamat": "Jl. Merdeka No. 1",
      "foto_url": "https://storage.url/foto.jpg",
      "kelas_id": "uuid",
      "status_kelulusan": "LULUS",
      "created_at": "2026-04-28T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

---

### POST /siswa

Create siswa baru (admin only).

**Request:**
```json
{
  "nisn": "1234567890",
  "nis": "001",
  "nama": "John Doe",
  "email": "john@email.com",
  "jenis_kelamin": "M",
  "ttl": "2006-01-15",
  "alamat": "Jl. Merdeka No. 1",
  "kelas_id": "uuid"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "nisn": "1234567890",
    ...
  }
}
```

---

### GET /siswa/[id]

Get detail siswa by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nisn": "1234567890",
    "nama": "John Doe",
    ...
  }
}
```

---

### PUT /siswa/[id]

Update siswa (admin only).

**Request:**
```json
{
  "nama": "John Updated",
  "email": "john.updated@email.com",
  ...
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### DELETE /siswa/[id]

Delete siswa (admin only).

**Response:**
```json
{
  "success": true,
  "message": "Siswa deleted"
}
```

---

### POST /siswa/import

Import siswa dari CSV/Excel (admin only).

**Request (multipart/form-data):**
```bash
POST /api/siswa/import
Authorization: Bearer {token}

Form Data:
- file: students.csv
- kelas_id: uuid
- tahun_ajaran_id: uuid
```

**CSV Format:**
```
NISN,NIS,Nama,Email,JenisKelamin,TTL,Alamat
1234567890,001,John Doe,john@email.com,M,2006-01-15,Jl. Merdeka
```

**Response:**
```json
{
  "success": true,
  "imported": 100,
  "errors": [
    "Row 5: Invalid NISN format"
  ]
}
```

---

### GET /siswa/search

Search siswa by nama atau NISN.

**Query:**
```
?q=john&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nisn": "1234567890",
      "nama": "John Doe",
      ...
    }
  ]
}
```

---

## Guru & Kelas

### GET /guru

List semua guru.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nip": "123456789",
      "nama": "Ibu Siti",
      "email": "siti@sekolah.id",
      "mapel": ["Matematika", "Fisika"]
    }
  ]
}
```

---

### POST /guru

Create guru baru.

**Request:**
```json
{
  "nip": "123456789",
  "nama": "Ibu Siti",
  "email": "siti@sekolah.id",
  "mapel_ids": ["uuid1", "uuid2"]
}
```

---

### GET /kelas

List semua kelas.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nama": "XII TKJ 1",
      "tingkat": 12,
      "jurusan": "Teknik Komputer & Jaringan",
      "wali_kelas": "Ibu Siti",
      "jumlah_siswa": 32
    }
  ]
}
```

---

## Nilai (Grades)

### POST /nilai

Input nilai siswa (guru only).

**Request:**
```json
{
  "siswa_id": "uuid",
  "mapel_id": "uuid",
  "semester": 1,
  "nilai_rapor": 85,
  "nilai_us": 87,
  "nilai_ukk": 90,
  "nilai_praktik": 88,
  "nilai_sikap": "A",
  "nilai_pkl": 85
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "siswa_id": "uuid",
    ...
  }
}
```

---

### GET /nilai/[siswa_id]

Get nilai siswa (guru can view own class, siswa can view own).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "semester": 1,
      "mapel": "Matematika",
      "nilai_rapor": 85,
      "nilai_us": 87,
      ...
    }
  ]
}
```

---

### PUT /nilai/[id]

Update nilai (guru only, own class).

**Request:**
```json
{
  "nilai_rapor": 88
}
```

---

### POST /nilai/calculate

Hitung nilai akhir otomatis untuk siswa.

**Request:**
```json
{
  "siswa_id": "uuid",
  "tahun_ajaran_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "siswa_id": "uuid",
    "rata_rata": 86.5,
    "nilai_us": 87,
    "nilai_ukk": 90,
    "nilai_final": 87.8
  }
}
```

---

### POST /nilai/lock

Lock nilai untuk finalisasi (guru & admin only).

**Request:**
```json
{
  "siswa_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Nilai locked pada 2026-04-28T10:00:00Z"
}
```

---

## Kelulusan (Status)

### GET /kelulusan/status

Get status kelulusan siswa (authorized users only).

**Query:**
```
?siswa_id=uuid&tahun_ajaran_id=uuid
```

**Response:**
```json
{
  "success": true,
  "data": {
    "siswa_id": "uuid",
    "nisn": "1234567890",
    "nama": "John Doe",
    "status_kelulusan": "LULUS",
    "nilai_final": 87.8,
    "alasan": null
  }
}
```

---

### POST /kelulusan/status

Tentukan status kelulusan (otomatis berdasarkan kriteria).

**Request:**
```json
{
  "siswa_id": "uuid",
  "tahun_ajaran_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status_kelulusan": "LULUS",
    "reason": "Memenuhi semua kriteria kelulusan"
  }
}
```

---

### POST /kelulusan/override

Override manual status kelulusan (admin & kepsek only).

**Request:**
```json
{
  "siswa_id": "uuid",
  "status_kelulusan": "TIDAK_LULUS",
  "alasan": "Tidak hadir 15 hari"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

## Dokumen (SKL, Transkrip)

### POST /dokumen/skl/generate

Generate SKL PDF untuk siswa.

**Request:**
```json
{
  "siswa_id": "uuid",
  "tahun_ajaran_id": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "siswa_id": "uuid",
    "file_url": "https://storage.url/skl_uuid.pdf",
    "qr_code": "https://storage.url/qr_uuid.png",
    "created_at": "2026-04-28T10:00:00Z"
  }
}
```

---

### GET /dokumen/skl/download

Download SKL PDF by ID (authorized users).

**Response:** Binary PDF file

---

### POST /dokumen/transkrip/generate

Generate transkrip nilai PDF.

**Request:**
```json
{
  "siswa_id": "uuid"
}
```

**Response:** (same as SKL)

---

### GET /dokumen/verify/[qr_code]

Verify SKL by QR code (public access).

**Response:**
```json
{
  "success": true,
  "data": {
    "nisn": "1234567890",
    "nama": "John Doe",
    "status_kelulusan": "LULUS",
    "tanggal_lulus": "2026-06-15",
    "signed_at": "2026-06-15T10:00:00Z"
  }
}
```

---

## Visibilitas (Kontrol Data)

### GET /visibilitas/settings

Get visibility settings (admin only).

**Query:**
```
?tahun_ajaran_id=uuid
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "tahun_ajaran_id": "uuid",
    "tampilkan_skl": true,
    "tampilkan_nilai_rapor": true,
    "tampilkan_nilai_us": false,
    "tampilkan_nilai_ukk": true,
    "tampilkan_status_kelulusan": false,
    "tampilkan_transkrip": true,
    "updated_at": "2026-04-28T10:00:00Z"
  }
}
```

---

### PUT /visibilitas/settings

Update visibility settings (admin only).

**Request:**
```json
{
  "tahun_ajaran_id": "uuid",
  "tampilkan_skl": true,
  "tampilkan_nilai_rapor": false,
  "tampilkan_status_kelulusan": true
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### GET /visibilitas/check

Check what data siswa can view (internal use).

**Query:**
```
?tahun_ajaran_id=uuid&user_role=siswa
```

**Response:**
```json
{
  "success": true,
  "data": {
    "skl": true,
    "nilai_rapor": false,
    "nilai_us": true,
    "status_kelulusan": false
  }
}
```

---

## Laporan & Statistik

### GET /laporan/statistik

Get statistik kelulusan (admin only).

**Query:**
```
?tahun_ajaran_id=uuid&jurusan_id=uuid
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_siswa": 400,
    "total_lulus": 380,
    "total_tidak_lulus": 20,
    "persentase_lulus": 95,
    "per_jurusan": [
      {
        "jurusan": "TKJ",
        "total": 100,
        "lulus": 98,
        "persentase": 98
      }
    ],
    "statistik_nilai": {
      "tertinggi": 99.5,
      "terendah": 60,
      "rata_rata": 85.2
    }
  }
}
```

---

### GET /laporan/export

Export laporan ke Excel/PDF.

**Query:**
```
?format=excel&tahun_ajaran_id=uuid
```

**Response:** Binary file (Excel atau PDF)

---

## Error Handling

Semua error responses mengikuti format:

```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK — Request berhasil |
| 201 | Created — Resource berhasil dibuat |
| 400 | Bad Request — Invalid input |
| 401 | Unauthorized — Token invalid/expired |
| 403 | Forbidden — Permission denied |
| 404 | Not Found — Resource tidak ditemukan |
| 500 | Server Error — Internal server error |

---

## Authentication Headers

Semua endpoint (kecuali `/auth/login` dan public routes) memerlukan:

```bash
Authorization: Bearer {jwt_token}
```

Token diperoleh dari `/auth/login` endpoint.

---

## Rate Limiting

Untuk proteksi brute-force:
- Login endpoint: **5 requests per 15 minutes per IP**
- Public endpoints: **100 requests per hour per IP**
- Authenticated endpoints: **1000 requests per hour per user**

---

## Testing dengan cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sekolah.id","password":"admin123"}'

# Get siswa (with token)
curl -H "Authorization: Bearer {token}" \
  http://localhost:3000/api/siswa

# Create siswa
curl -X POST http://localhost:3000/api/siswa \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"nisn":"1234567890",...}'
```

---

## Testing dengan Postman

1. Import API collection (buat dari endpoints di atas)
2. Set environment variable: `base_url = http://localhost:3000/api`
3. Set `token` dari response login
4. Test setiap endpoint

---

**Last updated:** 2026-04-28
