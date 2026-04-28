import { createClient } from '@/lib/supabase/server';
import type { AuthUser, UserRole } from './types';

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // Get user role dari custom claims di JWT
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return null;

    const decoded = JSON.parse(
      Buffer.from(session.access_token.split('.')[1], 'base64').toString()
    );

    return {
      id: user.id,
      email: user.email,
      role: (decoded.role as UserRole) || 'siswa',
      nama: user.user_metadata?.nama || user.email || 'Unknown',
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidNISN(nisn: string): boolean {
  return /^\d{10}$/.test(nisn);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
