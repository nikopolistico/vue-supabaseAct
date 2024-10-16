import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://abgsixxwevueabvuzpmo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZ3NpeHh3ZXZ1ZWFidnV6cG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNDMzNjAsImV4cCI6MjA0NDYxOTM2MH0.hKEFmryKFRvoSx8PBrbprJ2NDsIWOpkJLUEtBjJ5R9k';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign up function
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
   }
   // Login function
   export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
   }
   // Logout function
   export async function logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
   }