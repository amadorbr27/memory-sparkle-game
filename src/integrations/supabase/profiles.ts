import { supabase } from './client';

export const getProfile = (id: string) =>
  supabase.from('profiles').select('*').eq('id', id).single();

export const updateProfile = (id: string, patch: Partial<{ username: string; avatar_url: string }>) =>
  supabase.from('profiles').update(patch).eq('id', id).select('*').single();
