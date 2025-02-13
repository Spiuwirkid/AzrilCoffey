import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Edit, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import EditModal from '../components/EditModal';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
}

const MenuManagement = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, name, price, description, category, image_url')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (editingItem?.image) {
        const fileExt = editingItem.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('menu-images')
          .upload(fileName, editingItem.image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('menu-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error: insertError } = await supabase
        .from('menu_items')
        .insert([
          {
            name: editingItem.name,
            price: parseFloat(editingItem.price.toString()),
            description: editingItem.description,
            category: editingItem.category,
            image_url: imageUrl
          }
        ]);

      if (insertError) throw insertError;

      setEditingItem(null);
      await fetchMenuItems();
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const { error } = await supabase
          .from('menu_items')
          .delete()
          .match({ id });

        if (error) throw error;
        await fetchMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
        alert('Failed to delete menu item');
      }
    }
  };

  // Fungsi untuk mengelompokkan menu berdasarkan kategori
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-coffee-dark">Menu Management</h1>
        <button
          onClick={() => setEditingItem({} as MenuItem)}
          className="px-4 py-2 bg-coffee text-white rounded-md hover:bg-coffee-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {editingItem && (
        <EditModal
          item={editingItem}
          isOpen={true}
          onClose={() => setEditingItem(null)}
          onUpdate={fetchMenuItems}
        />
      )}

      {/* Menu Items Grid - Diupdate */}
      <div className="space-y-6">
        {/* Coffee Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Coffee Menu</h2>
            <span className="text-sm text-gray-500">
              {groupedItems['coffee']?.length || 0} items
            </span>
          </div>
          
          <div className="p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedItems['coffee']?.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-lg border overflow-hidden">
                    <div className="relative pt-[100%]">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 bg-white rounded-full text-coffee hover:bg-coffee shadow-sm"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className="text-coffee-dark font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Non-Coffee Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Non-Coffee Menu</h2>
            <span className="text-sm text-gray-500">
              {groupedItems['non-coffee']?.length || 0} items
            </span>
          </div>
          
          <div className="p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedItems['non-coffee']?.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-lg border overflow-hidden">
                    <div className="relative pt-[100%]">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 bg-white rounded-full text-coffee hover:bg-coffee shadow-sm"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className="text-coffee-dark font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Snacks Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Snacks Menu</h2>
            <span className="text-sm text-gray-500">
              {groupedItems['snacks']?.length || 0} items
            </span>
          </div>
          
          <div className="p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedItems['snacks']?.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-lg border overflow-hidden">
                    <div className="relative pt-[100%]">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 bg-white rounded-full text-coffee hover:bg-coffee shadow-sm"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className="text-coffee-dark font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-500">No menu items available. Add some items to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement; 