import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Settings = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-serif text-coffee-dark mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings; 