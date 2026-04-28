export type UserRole = 'admin' | 'guru' | 'kepsek' | 'siswa';

export interface AuthUser {
  id: string;
  email?: string;
  role: UserRole;
  nama: string;
  schoolId?: string;
  classId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SiswaLoginRequest {
  nisn: string;
  tanggalLahir: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

export interface JWTPayload {
  sub: string;
  email?: string;
  role: UserRole;
  iat: number;
  exp: number;
}
