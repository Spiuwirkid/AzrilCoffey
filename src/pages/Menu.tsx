import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
}

const MenuItem = ({ name, price, description, image_url, category }: MenuItem) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image_url} alt={name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <span className="text-sm text-coffee mb-2 block">{category}</span>
      <h3 className="font-serif text-xl text-coffee-dark mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-coffee-dark font-medium">${parseFloat(price.toString()).toFixed(2)}</p>
    </div>
  </div>
);

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('category', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMenuItems(data || []);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-4 text-center">
        <p>Loading menu...</p>
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

  // Group menu items by category
  const coffeeItems = menuItems.filter(item => item.category.toLowerCase() === 'coffee');
  const snackItems = menuItems.filter(item => item.category.toLowerCase() === 'snacks');
  const nonCoffeeItems = menuItems.filter(item => item.category.toLowerCase() === 'non-coffee');

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center text-coffee-dark mb-4">Our Menu</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our carefully curated selection of coffee and treats
        </p>

        {coffeeItems.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-coffee-dark mb-8">Coffee Drinks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coffeeItems.map((item) => (
                <MenuItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

        {nonCoffeeItems.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-coffee-dark mb-8">Non-Coffee Drinks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nonCoffeeItems.map((item) => (
                <MenuItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

        {snackItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-coffee-dark mb-8">Snacks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {snackItems.map((item) => (
                <MenuItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

        {menuItems.length === 0 && (
          <p className="text-center text-gray-600">
            No menu items available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;