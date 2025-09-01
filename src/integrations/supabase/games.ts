import { supabase } from './client';

export const startGame = (userId: string, mode = 'classic', gridSize = 16) =>
  supabase
    .from('games')
    .insert({ user_id: userId, mode, grid_size: gridSize })
    .select('*')
    .single();

export const finishGame = (
  id: string,
  { attempts, time_ms, won }: { attempts: number; time_ms: number; won: boolean }
) => {
  const score = Math.max(0, 1000 - attempts * 10 - Math.floor(time_ms / 100));
  return supabase
    .from('games')
    .update({ attempts, time_ms, won, score, finished_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
};

export const getLeaderboard = (limit = 50) =>
  supabase.from('leaderboard').select('*').order('best_score', { ascending: false }).limit(limit);
