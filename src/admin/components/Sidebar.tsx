import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Coffee, Image, Settings, FileText } from 'lucide-react';

const AdminNavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 transition-colors duration-200 ${
        isActive 
          ? 'bg-coffee text-white' 
          : 'text-gray-600 hover:bg-cream hover:text-coffee-dark'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-coffee" />
          <h1 className="text-xl font-serif text-coffee-dark">Admin Panel</h1>
        </div>
      </div>
      <nav className="flex-1 py-4">
        <AdminNavLink to="/admin/menu" icon={Menu}>Menu Management</AdminNavLink>
        <AdminNavLink to="/admin/blog" icon={FileText}>Blog Posts</AdminNavLink>
        <AdminNavLink to="/admin/gallery" icon={Image}>Gallery</AdminNavLink>
        <AdminNavLink to="/admin/settings" icon={Settings}>Settings</AdminNavLink>
      </nav>
    </div>
  );
};

export default Sidebar; 