import { supabase } from './client';

export const getOrCreateSettings = async (userId: string) => {
  const { data } = await supabase.from('settings').select('*').eq('user_id', userId).maybeSingle();
  if (!data) await supabase.from('settings').insert({ user_id: userId });
  return supabase.from('settings').select('*').eq('user_id', userId).single();
};

export const updateSettings = (userId: string, patch: any) =>
  supabase.from('settings').update(patch).eq('user_id', userId).select('*').single();
