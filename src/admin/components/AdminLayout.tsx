import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Coffee, Image, Settings } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/admin/${path}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4">
          <h1 className="text-xl font-serif text-coffee-dark">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/menu"
            className={`flex items-center px-4 py-2 text-sm ${
              isActive('menu')
                ? 'bg-coffee text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Coffee className="h-4 w-4 mr-3" />
            Menu Management
          </Link>
          <Link
            to="/admin/blog"
            className={`flex items-center px-4 py-2 text-sm ${
              isActive('blog')
                ? 'bg-coffee text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Menu className="h-4 w-4 mr-3" />
            Blog Posts
          </Link>
          <Link
            to="/admin/gallery"
            className={`flex items-center px-4 py-2 text-sm ${
              isActive('gallery')
                ? 'bg-coffee text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Image className="h-4 w-4 mr-3" />
            Gallery
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center px-4 py-2 text-sm ${
              isActive('settings')
                ? 'bg-coffee text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
