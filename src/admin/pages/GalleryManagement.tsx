import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Image, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  created_at: string;
}

const GalleryManagement = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'interior', // default category
    image: null as File | null
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.image) {
        throw new Error('Please select an image');
      }

      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

      // Upload image
      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, formData.image);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      // Insert gallery item
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            image_url: publicUrl
          }
        ]);

      if (insertError) throw insertError;

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'interior',
        image: null
      });

      await fetchGalleryItems();
    } catch (error) {
      console.error('Error adding gallery item:', error);
      alert('Failed to add gallery item. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const { error } = await supabase
          .from('gallery')
          .delete()
          .match({ id });

        if (error) throw error;
        await fetchGalleryItems();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Failed to delete gallery item');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-coffee-dark">Gallery Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-coffee text-white rounded-md hover:bg-coffee-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Add/Edit Form in Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-coffee-dark">Add New Gallery Item</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title & Category in same row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter image title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="interior">Interior</option>
                      <option value="coffee">Coffee</option>
                      <option value="events">Events</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter image description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1">
                      <div className="px-4 py-2 border border-gray-300 rounded-md text-sm text-center cursor-pointer hover:bg-gray-50">
                        Choose file
                        <input
                          type="file"
                          required
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </label>
                    {formData.image && (
                      <span className="text-sm text-gray-500">
                        {formData.image.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div>
                    <div className="relative pt-[60%] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-coffee text-white rounded-md hover:bg-coffee-dark disabled:opacity-50"
                  >
                    {loading ? 'Uploading...' : 'Add to Gallery'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Gallery Items</h2>
        </div>
        
        <div className="p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="relative pt-[100%] rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement; 