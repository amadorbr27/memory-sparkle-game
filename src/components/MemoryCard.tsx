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
      className={`memory-card w-16 h-16 sm:w-20 sm:h-20 ${card.isFlipped || card.isMatched ? 'card-flipped' : ''} ${card.isMatched ? 'card-matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-back">
          <span className="text-2xl">?</span>
        </div>
        <div className="card-front">
          <span className="text-2xl animate-bounce-scale">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
};