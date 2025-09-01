import { supabase } from './client';

export const signUp = (email: string, password: string) =>
  supabase.auth.signUp({ email, password });

export const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

export const signInMagic = (email: string) =>
  supabase.auth.signInWithOtp({ email });

export const signOut = () => supabase.auth.signOut();

export const getUser = async () => (await supabase.auth.getUser()).data.user;
