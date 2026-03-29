import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
}

// Create the Supabase client — AUTH IS DISABLED since Clerk handles authentication.
// This client is used ONLY for database operations (select, insert, update).
let supabase;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
} else {
  // Stub client for dev without credentials
  const noOp = async () => ({ data: null, error: { message: 'Supabase not configured' } });
  const chainable = () => ({
    eq: () => chainable(),
    or: () => chainable(),
    single: noOp,
    order: () => chainable(),
    select: () => chainable(),
    insert: noOp,
    update: () => chainable(),
  });
  supabase = {
    from: () => ({
      select: () => chainable(),
      insert: () => chainable(),
      update: () => chainable(),
    }),
    rpc: noOp,
  };
}

export { supabase };
