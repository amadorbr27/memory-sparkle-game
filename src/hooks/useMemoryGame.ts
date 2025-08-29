import { useState, useCallback, useEffect } from 'react';

export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS_4X4 = ['🎮', '🚀', '⭐', '🎯', '🔥', '⚡', '🌈', '💎'];
const EMOJIS_6X6 = ['🎮', '🚀', '⭐', '🎯', '🔥', '⚡', '🌈', '💎', '🎭', '🎨', '🎪', '🎵', '🎸', '🎹', '🎺', '🎷', '🏆', '🎊'];

export const useMemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [gridSize, setGridSize] = useState<'4x4' | '6x6'>('4x4');

  const initializeGame = useCallback((newGridSize?: '4x4' | '6x6') => {
    const targetSize = newGridSize || gridSize;
    const emojis = targetSize === '4x4' ? EMOJIS_4X4 : EMOJIS_6X6;
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameComplete(false);
    setIsChecking(false);
    if (newGridSize) setGridSize(newGridSize);
  }, [gridSize]);

  const flipCard = useCallback((id: number) => {
    if (isChecking || flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    ));

    setFlippedCards(prev => [...prev, id]);
  }, [cards, flippedCards, isChecking]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);

      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setScore(prev => prev + 10);
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            flippedCards.includes(c.id) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            flippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    const matchedCards = cards.filter(c => c.isMatched);
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setGameComplete(true);
      const bonusPoints = Math.max(100 - moves * 2, 10);
      setScore(prev => prev + bonusPoints);
    }
  }, [cards, moves]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    cards,
    score,
    moves,
    gameComplete,
    isChecking,
    gridSize,
    flipCard,
    initializeGame,
  };
};