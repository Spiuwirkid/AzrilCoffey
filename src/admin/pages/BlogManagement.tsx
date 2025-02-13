import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Edit, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  author: string;
  published_at: string;
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    image: null as File | null
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const now = new Date().toISOString();

      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            author: formData.author,
            image_url: imageUrl,
            published_at: now,
            created_at: now,
            updated_at: now
          }
        ]);

      if (insertError) throw insertError;

      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        image: null
      });
      setShowAddForm(false);
      await fetchPosts();
    } catch (error) {
      console.error('Error adding blog post:', error);
      alert('Failed to add blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .match({ id });

        if (error) throw error;
        await fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-coffee-dark">Blog Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-coffee text-white rounded-md hover:bg-coffee-dark transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-coffee-dark">Add New Blog Post</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title & Author */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter blog title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter author name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    required
                    placeholder="Enter a short excerpt..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <div className="border rounded-md">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      className="h-48"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1">
                      <div className="px-4 py-2 border border-gray-300 rounded-md text-sm text-center cursor-pointer hover:bg-gray-50">
                        Choose file
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFormData({ ...formData, image: e.target.files[0] });
                            }
                          }}
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
                    {loading ? 'Publishing...' : 'Publish Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Published Posts</h2>
        </div>
        
        <div className="p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div key={post.id} className="group relative bg-white rounded-lg border overflow-hidden">
                  <div className="relative pt-[60%]">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement; 