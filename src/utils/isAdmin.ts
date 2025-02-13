import { User } from '@supabase/supabase-js';

export const isAdmin = (user: User | null): boolean => {
  if (!user) return false;
  return user.user_metadata?.role === 'admin';
}; 