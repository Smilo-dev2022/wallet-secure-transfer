import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://ezlffftgfnhagzrnhtjn.supabase.co';
const supabaseKey = 'sb_publishable_f77n7Ph2BhO6tdB6dkpXdg_U8HMF1uU';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };