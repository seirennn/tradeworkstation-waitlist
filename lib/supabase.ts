import { createClient } from '@supabase/supabase-js';

// We'll reuse the project URL but use a separate anon key if provided, or the same one.
// Since the user has a separate waitlist, it's safer to read from environment variables.
// The user will need to add these to .env.local in the waitlist directory.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
