import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface GameScore {
  id: string;
  grid_size: '4x4' | '6x6';
  score: number;
  moves: number;
  completed_at: string;
  completion_time_seconds?: number;
}

export const useGameScores = () => {
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const saveScore = async (
    gridSize: '4x4' | '6x6',
    score: number,
    moves: number,
    completionTimeSeconds?: number
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('game_scores')
        .insert({
          user_id: user.id,
          grid_size: gridSize,
          score,
          moves,
          completion_time_seconds: completionTimeSeconds
        });

      if (error) throw error;
      
      // Refresh scores after saving
      fetchScores();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const fetchScores = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('game_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setScores((data || []) as GameScore[]);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBestScore = (gridSize: '4x4' | '6x6') => {
    const gridScores = scores.filter(s => s.grid_size === gridSize);
    return gridScores.length > 0 
      ? Math.max(...gridScores.map(s => s.score))
      : 0;
  };

  useEffect(() => {
    if (user) {
      fetchScores();
    } else {
      setScores([]);
    }
  }, [user]);

  return {
    scores,
    loading,
    saveScore,
    fetchScores,
    getBestScore
  };
};