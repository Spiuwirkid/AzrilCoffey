import React, { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Tambahkan utility function untuk format tanggal
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Invalid Date';
  
  try {
    const date = new Date(dateString);
    
    // Cek apakah tanggal valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // Format tanggal ke locale ID dengan opsi yang sesuai
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image_url: string;
  published_at: string;
  created_at: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      console.log('Attempting to connect to Supabase...'); // Debug log

      // Test Supabase connection
      const { data: testData, error: testError } = await supabase
        .from('blog_posts')
        .select('count');

      if (testError) {
        console.error('Connection test error:', testError);
        throw new Error(`Connection error: ${testError.message}`);
      }

      console.log('Connection successful, fetching posts...'); // Debug log

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error);
        throw new Error(`Fetch error: ${error.message}`);
      }

      console.log('Fetched data:', data); // Debug log
      setBlogPosts(data || []);
    } catch (err) {
      console.error('Full error details:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Coffee Blog</h1>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Coffee Blog</h1>
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
            <p className="font-medium">Error loading blog posts</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={fetchBlogPosts}
              className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Coffee Blog</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection of articles about coffee culture, brewing tips, and industry insights.
        </p>

        {blogPosts.length === 0 ? (
          <p className="text-center text-gray-600">No blog posts available yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-xl text-coffee-dark mb-3 hover:text-coffee transition-colors duration-200">
                    <a href="#">{post.title}</a>
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <time dateTime={post.published_at || post.created_at}>
                        {formatDate(post.published_at || post.created_at)}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {blogPosts.length >= 6 && (
          <div className="mt-12 text-center">
            <button 
              onClick={fetchBlogPosts}
              className="bg-coffee hover:bg-coffee-dark text-white px-8 py-3 rounded-full transition-colors duration-200"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;