import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MenuManagement from './pages/MenuManagement';
import BlogManagement from './pages/BlogManagement';
import GalleryManagement from './pages/GalleryManagement';
import Settings from './pages/Settings';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/menu/*" element={<MenuManagement />} />
          <Route path="/blog/*" element={<BlogManagement />} />
          <Route path="/gallery/*" element={<GalleryManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;