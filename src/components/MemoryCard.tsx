import { Card } from '@/hooks/useMemoryGame';

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
}

export const MemoryCard = ({ card, onClick }: MemoryCardProps) => {
  const handleClick = () => {
    onClick(card.id);
  };

  return (
    <div 
      className={`memory-card w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${card.isFlipped || card.isMatched ? 'card-flipped' : ''} ${card.isMatched ? 'card-matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-back">
          <span className="text-lg sm:text-xl md:text-2xl">?</span>
        </div>
        <div className="card-front">
          <span className="text-lg sm:text-xl md:text-2xl animate-bounce-scale">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
};