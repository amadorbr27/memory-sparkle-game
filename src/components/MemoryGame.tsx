import { useMemoryGame } from '@/hooks/useMemoryGame';
import { MemoryCard } from './MemoryCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, RotateCcw, Target, Zap, Grid3x3 } from 'lucide-react';

export const MemoryGame = () => {
  const { cards, score, moves, gameComplete, gridSize, flipCard, initializeGame } = useMemoryGame();

  return (
    <div className="game-background p-4 flex flex-col items-center justify-center min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Jogo da Memória
        </h1>
        <p className="text-muted-foreground text-lg">
          Encontre todos os pares!
        </p>
      </div>

      {/* Difficulty Selector */}
      <div className="flex gap-2 mb-4">
        <Button 
          onClick={() => initializeGame('4x4')}
          variant={gridSize === '4x4' ? 'default' : 'outline'}
          className="flex items-center gap-2"
        >
          <Grid3x3 className="w-4 h-4" />
          Fácil (4x4)
        </Button>
        <Button 
          onClick={() => initializeGame('6x6')}
          variant={gridSize === '6x6' ? 'default' : 'outline'}
          className="flex items-center gap-2"
        >
          <Grid3x3 className="w-4 h-4" />
          Difícil (6x6)
        </Button>
      </div>

      {/* Game Stats */}
      <div className="flex gap-4 mb-6">
        <Card className="px-4 py-2 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-semibold">{score}</span>
          </div>
        </Card>
        <Card className="px-4 py-2 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            <span className="font-semibold">{moves}</span>
          </div>
        </Card>
      </div>

      {/* Game Board */}
      <div className={`grid ${gridSize === '4x4' ? 'grid-cols-4' : 'grid-cols-6'} gap-3 sm:gap-4 mb-6 p-4 bg-card/20 backdrop-blur-sm rounded-2xl border border-primary/10 max-w-fit`}>
        {cards.map((card) => (
          <MemoryCard key={card.id} card={card} onClick={flipCard} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button 
          onClick={() => initializeGame()}
          variant="secondary"
          className="flex items-center gap-2 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Novo Jogo
        </Button>
        
        {gameComplete && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-6 py-3 rounded-xl text-white font-semibold animate-glow-pulse">
            <Zap className="w-5 h-5" />
            <span>Parabéns! Você venceu!</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center max-w-md">
        <p className="text-muted-foreground text-sm">
          Toque nas cartas para virá-las. Encontre os pares para marcar pontos. 
          Menos movimentos = mais pontos de bônus!
        </p>
      </div>
    </div>
  );
};