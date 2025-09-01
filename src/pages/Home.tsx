import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Zap, Trophy, Users, LogIn, UserPlus, Play } from 'lucide-react';

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Jogo da Memória</h1>
          </div>
          
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Olá, {user.email}
              </span>
              <Button onClick={() => navigate('/game')} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Jogar
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Desafie Sua Memória
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Teste suas habilidades de memória com nosso jogo interativo. 
            Encontre os pares, marque pontos e desafie seus recordes!
          </p>
          
          {!user ? (
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-8 py-4 text-lg"
              >
                <LogIn className="w-5 h-5" />
                Entrar
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-8 py-4 text-lg"
              >
                <UserPlus className="w-5 h-5" />
                Criar Conta
              </Button>
            </div>
          ) : (
            <Button 
              size="lg" 
              onClick={() => navigate('/game')}
              className="flex items-center gap-2 px-12 py-4 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Play className="w-6 h-6" />
              Começar a Jogar
            </Button>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/20">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Jogabilidade Rápida</h3>
            <p className="text-muted-foreground">
              Partidas dinâmicas que testam sua velocidade e precisão mental
            </p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-secondary/20">
            <Trophy className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sistema de Pontuação</h3>
            <p className="text-muted-foreground">
              Ganhe pontos por precisão e velocidade. Bata seus recordes pessoais!
            </p>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-accent/20">
            <Users className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Múltiplos Níveis</h3>
            <p className="text-muted-foreground">
              Escolha entre diferentes dificuldades: 4x4 para iniciantes, 6x6 para experts
            </p>
          </Card>
        </div>

        {/* How to Play */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-primary/10">
          <h3 className="text-2xl font-bold text-center mb-6">Como Jogar</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">🎯 Objetivo</h4>
              <p className="text-muted-foreground mb-4">
                Encontre todos os pares de cartas idênticas no menor número de movimentos possível.
              </p>
              
              <h4 className="text-lg font-semibold mb-3 text-secondary">⚡ Pontuação</h4>
              <p className="text-muted-foreground">
                Ganhe pontos por cada par encontrado, com bônus por eficiência e velocidade.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-accent">🎮 Controles</h4>
              <p className="text-muted-foreground mb-4">
                Toque ou clique nas cartas para virá-las. Encontre o par correspondente!
              </p>
              
              <h4 className="text-lg font-semibold mb-3 text-primary">🏆 Níveis</h4>
              <p className="text-muted-foreground">
                Fácil (4x4): 8 pares | Difícil (6x6): 18 pares
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;