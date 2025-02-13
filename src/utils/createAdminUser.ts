import { supabase } from '../lib/supabaseClient';

export const createAdminUser = async (email: string, password: string) => {
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin'  // Set role di raw_user_meta_data
        }
      }
    });

    if (error) throw error;

    // Set additional admin settings jika perlu
    if (user) {
      const { error: updateError } = await supabase
        .from('user_settings')
        .insert({
          user_id: user.id,
          is_admin: true,
          permissions: ['read', 'write', 'delete', 'manage_users']
        });

      if (updateError) throw updateError;
    }

    return user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}; 