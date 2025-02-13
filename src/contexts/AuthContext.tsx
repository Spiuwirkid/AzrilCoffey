import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { authenticator } from 'otplib';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  login2FA: (email: string, password: string, token: string) => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek sesi user saat pertama kali load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe ke perubahan auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  };

  const login2FA = async (email: string, password: string, token: string) => {
    try {
      // Generate secret jika belum ada
      const secret = user?.user_metadata?.otpSecret || authenticator.generateSecret();

      // Verifikasi OTP token
      const isValid = authenticator.verify({
        token,
        secret
      });

      if (!isValid) {
        throw new Error('Invalid 2FA token');
      }

      // Login jika token valid
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Simpan secret ke user metadata jika belum ada
      if (!user?.user_metadata?.otpSecret) {
        await supabase.auth.updateUser({
          data: {
            otpSecret: secret
          }
        });
      }

      return data;
    } catch (error) {
      console.error('2FA error:', error);
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    login,
    login2FA,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 