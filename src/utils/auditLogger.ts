import { supabase } from '../lib/supabaseClient';

export const logAdminAction = async (
  userId: string,
  action: string,
  details: any
) => {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert([
        {
          user_id: userId,
          action,
          details,
          ip_address: window.clientInformation?.ip,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Audit log error:', error);
  }
}; 