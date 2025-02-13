import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Force logout jika detect multiple tabs
  useEffect(() => {
    const channel = new BroadcastChannel('auth');
    
    channel.onmessage = (event) => {
      if (event.data === 'signOut') {
        supabase.auth.signOut();
      }
    };

    return () => channel.close();
  }, []);

  return { session, loading };
}; 