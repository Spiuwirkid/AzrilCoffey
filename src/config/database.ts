import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
export const supabaseConfig = {
  url: 'https://wlimkumxbwdpbpsfmyzf.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsaW1rdW14YndkcGJwc2ZteXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNTk2NTAsImV4cCI6MjA1NDkzNTY1MH0.B6l39ogGbXXDgp3pIp8GsAWOiLep2CDNCc6OMRmejkA',
  
  // Database Tables
  tables: {
    menu_items: 'menu_items',
    blog_posts: 'blog_posts',
    gallery: 'gallery',
    stories: 'stories',
    audit_logs: 'audit_logs',
    user_settings: 'user_settings'
  },

  // Storage Buckets
  storage: {
    menuImages: 'menu-images',
    blogImages: 'blog-images',
    galleryImages: 'gallery-images'
  },

  // Database Schema
  schema: {
    menu_items: {
      id: 'uuid',
      name: 'text',
      price: 'numeric',
      description: 'text',
      category: 'text',
      image_url: 'text',
      created_at: 'timestamp with time zone',
      updated_at: 'timestamp with time zone'
    },
    blog_posts: {
      id: 'uuid',
      title: 'text',
      content: 'text',
      excerpt: 'text',
      image_url: 'text',
      author: 'text',
      published_at: 'timestamp with time zone',
      created_at: 'timestamp with time zone',
      updated_at: 'timestamp with time zone'
    },
    gallery: {
      id: 'uuid',
      title: 'text',
      description: 'text',
      image_url: 'text',
      category: 'text',
      created_at: 'timestamp with time zone',
      updated_at: 'timestamp with time zone'
    },
    stories: {
      id: 'uuid',
      title: 'text',
      content: 'text',
      image_url: 'text',
      author: 'text',
      created_at: 'timestamp with time zone'
    },
    audit_logs: {
      id: 'uuid',
      user_id: 'uuid',
      action: 'text',
      details: 'jsonb',
      ip_address: 'text',
      user_agent: 'text',
      timestamp: 'timestamp with time zone'
    },
    user_settings: {
      id: 'uuid',
      user_id: 'uuid',
      is_admin: 'boolean',
      permissions: 'jsonb',
      created_at: 'timestamp with time zone',
      updated_at: 'timestamp with time zone'
    }
  },

  // SQL untuk membuat tabel-tabel
  createTableQueries: {
    menu_items: `
      CREATE TABLE IF NOT EXISTS public.menu_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    blog_posts: `
      CREATE TABLE IF NOT EXISTS public.blog_posts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        image_url TEXT,
        author TEXT NOT NULL,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    gallery: `
      CREATE TABLE IF NOT EXISTS public.gallery (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    stories: `
      CREATE TABLE IF NOT EXISTS public.stories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        author TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    audit_logs: `
      CREATE TABLE IF NOT EXISTS public.audit_logs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id),
        action TEXT NOT NULL,
        details JSONB,
        ip_address TEXT,
        user_agent TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
    user_settings: `
      CREATE TABLE IF NOT EXISTS public.user_settings (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id),
        is_admin BOOLEAN DEFAULT false,
        permissions JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  },

  // RLS Policies
  policies: {
    menu_items: `
      ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Allow public read menu_items" ON public.menu_items
        FOR SELECT USING (true);
      
      CREATE POLICY "Allow admin all access" ON public.menu_items
        FOR ALL USING (auth.uid() IN (
          SELECT id FROM auth.users 
          WHERE raw_user_meta_data->>'role' = 'admin'
        ));
    `,
    blog_posts: `
      ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Allow public read blog_posts" ON public.blog_posts
        FOR SELECT USING (true);
      
      CREATE POLICY "Allow admin all access" ON public.blog_posts
        FOR ALL USING (auth.uid() IN (
          SELECT id FROM auth.users 
          WHERE raw_user_meta_data->>'role' = 'admin'
        ));
    `
    // ... policies untuk tabel lainnya
  }
};

// Create Supabase client
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Helper function untuk inisialisasi database
export const initializeDatabase = async () => {
  try {
    // Create tables
    for (const [table, query] of Object.entries(supabaseConfig.createTableQueries)) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        console.log(`Creating table ${table}...`);
        await supabase.rpc('exec', { query });
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}; 