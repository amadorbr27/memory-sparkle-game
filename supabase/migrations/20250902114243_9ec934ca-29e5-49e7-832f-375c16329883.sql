-- Fix critical security issue: Replace overly permissive profile visibility policy
-- Current policy allows everyone to view all profiles, which exposes user data

-- Drop the insecure policy that allows everyone to view all profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add missing DELETE policy for profiles (users should be able to delete their own profile)
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Ensure game_scores table has complete RLS coverage
-- Add UPDATE policy for game_scores if users need to update their scores
CREATE POLICY "Users can update their own scores" 
ON public.game_scores 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add DELETE policy for game_scores if users need to delete their scores  
CREATE POLICY "Users can delete their own scores" 
ON public.game_scores 
FOR DELETE 
USING (auth.uid() = user_id);