import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validatePassword } from '../../utils/passwordValidator';
import { logAdminAction } from '../../utils/auditLogger';
import { logSecurityEvent } from '../../utils/securityLogger';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(Date.now());
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Cek jika terlalu banyak percobaan login
    if (loginAttempts >= 5) {
      const timeSinceLastAttempt = Date.now() - lastAttemptTime;
      if (timeSinceLastAttempt < 15 * 60 * 1000) { // 15 menit cooldown
        setError('Too many login attempts. Please try again later.');
        return;
      } else {
        // Reset counter setelah 15 menit
        setLoginAttempts(0);
      }
    }

    setLoading(true);

    try {
      // Validasi IP (hanya izinkan IP lokal)
      const isLocalNetwork = await checkLocalNetwork();
      if (!isLocalNetwork) {
        throw new Error('Access only allowed from local network');
      }

      // Validasi waktu (misalnya hanya izinkan login pada jam kerja)
      const currentHour = new Date().getHours();
      if (currentHour < 6 || currentHour > 22) { // 6 AM - 10 PM
        throw new Error('Login only allowed during business hours');
      }

      // Validasi password
      if (!validatePassword(password)) {
        throw new Error('Invalid password format');
      }

      // Login
      const { user } = await login(email, password);

      // Cek role admin
      if (!user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
        throw new Error('Unauthorized access');
      }

      // Log successful login
      await logAdminAction(user.id, 'login', {
        email: user.email,
        timestamp: new Date().toISOString()
      });

      // Reset counter setelah login berhasil
      setLoginAttempts(0);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
      
      // Increment counter untuk gagal login
      setLoginAttempts(prev => prev + 1);
      setLastAttemptTime(Date.now());
      
      // Delay untuk mencegah brute force
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img
              src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?w=200&h=200&fit=crop&auto=format"
              alt="AzrilCoffey"
              className="h-16 w-auto rounded-full"
              onError={(e) => {
                console.error('Error loading logo:', e);
                e.currentTarget.src = 'https://placehold.co/200x200?text=AC&font=playfair';
              }}
            />
          </div>
          
          <h2 className="text-3xl font-serif text-coffee-dark mb-2">
            Admin Login
          </h2>
          
          <p className="text-gray-600 text-sm">
            Sign in to access admin panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-coffee focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-coffee focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coffee hover:bg-coffee-dark text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Helper function untuk cek IP lokal
const checkLocalNetwork = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip;
    return (
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.16.') ||
      ip === '127.0.0.1'
    );
  } catch {
    // Jika tidak bisa cek IP (offline/error), anggap aman
    return true;
  }
};

export default AdminLogin; 