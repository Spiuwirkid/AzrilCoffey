import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    },
  }
);

// Fungsi untuk login dengan timeout
export const loginWithTimeout = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Set session timeout 1 jam
    setTimeout(() => {
      supabase.auth.signOut();
    }, 3600000);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}; 