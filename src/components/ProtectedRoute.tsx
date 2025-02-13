import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdmin } from '../utils/isAdmin';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-coffee border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Cek apakah user login dan adalah admin
  if (!user || !isAdmin(user)) {
    // Redirect ke login dengan menyimpan intended URL
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 