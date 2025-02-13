import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

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
    } catch (err) {
      console.error('Error fetching gallery items:', err);
      setError('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="py-20 px-4 text-center">
        <p>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-4 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Our Gallery</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Take a visual journey through our coffee shop's atmosphere, delicious offerings, and memorable moments.
        </p>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'all'
                ? 'bg-coffee text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('interior')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'interior'
                ? 'bg-coffee text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors`}
          >
            Interior
          </button>
          <button
            onClick={() => setActiveCategory('coffee')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'coffee'
                ? 'bg-coffee text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors`}
          >
            Coffee
          </button>
          <button
            onClick={() => setActiveCategory('events')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'events'
                ? 'bg-coffee text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors`}
          >
            Events
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative pt-[100%]">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No images found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;