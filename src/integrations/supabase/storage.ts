import { supabase } from './client';

export const uploadAvatar = async (userId: string, file: File) => {
  await supabase.storage.from('avatars').upload(`${userId}/avatar.png`, file, { upsert: true });
  const pub = supabase.storage.from('avatars').getPublicUrl(`${userId}/avatar.png`);
  await supabase.from('profiles').update({ avatar_url: pub.data.publicUrl }).eq('id', userId);
  return pub.data.publicUrl;
};
