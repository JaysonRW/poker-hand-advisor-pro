
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PokerHand } from '@/types/poker';
import { TrendingUp, Users, Target, Lightbulb, GraduationCap } from 'lucide-react';

interface HandDetailsModalProps {
  hand: PokerHand | null;
  onClose: () => void;
}

export const HandDetailsModal: React.FC<HandDetailsModalProps> = ({ hand, onClose }) => {
  if (!hand) return null;

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Raise': return 'bg-green-600 hover:bg-green-700';
      case 'Call': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'Fold': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'premium': return 'Premium';
      case 'strong': return 'Forte';
      case 'situational': return 'Situacional';
      case 'weak': return 'Fraca';
      case 'fold': return 'Fold';
      default: return 'Desconhecida';
    }
  };

  return (
    <Dialog open={!!hand} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-card border border-secondary/30 shadow-neumorphism text-foreground">
        <DialogHeader className="text-center">
          <DialogTitle className="text-title font-title text-foreground flex items-center justify-center gap-3">
            <span className="suit-spades text-2xl"></span>
            {hand.hand}
            <span className="suit-hearts text-2xl"></span>
          </DialogTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="pro-tip-badge">Pro Analysis</span>
            <span className="text-2xl">🎯</span>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border border-border shadow-neumorphism interactive-card">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="text-accent mr-2" size={24} />
                  <span className="suit-diamonds"></span>
                </div>
                <div className="text-3xl font-title text-accent mb-2">
                  {hand.winRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground font-body">Win Rate</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border border-border shadow-neumorphism interactive-card">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Target className="text-secondary mr-2" size={24} />
                  <span className="suit-clubs"></span>
                </div>
                <Badge className={`${
                  hand.recommendation === 'Raise' ? 'bg-gradient-primary text-primary-foreground' :
                  hand.recommendation === 'Call' ? 'bg-gradient-secondary text-primary' :
                  'bg-gradient-accent text-accent-foreground'
                } text-sm font-heading px-3 py-1`}>
                  {hand.recommendation}
                </Badge>
                <div className="text-sm text-muted-foreground font-body mt-2">Recomendação</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border border-border shadow-neumorphism interactive-card">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="text-primary mr-2" size={24} />
                  <span className="suit-hearts"></span>
                </div>
                <div className="text-xl font-heading text-primary mb-2">
                  {getCategoryText(hand.category)}
                </div>
                <div className="text-sm text-muted-foreground font-body">Categoria</div>
              </CardContent>
            </Card>
          </div>

          {/* Positions */}
          <Card className="bg-gradient-card border border-border shadow-neumorphism">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2 font-heading">
                <Users size={20} className="text-primary" />
                <span className="suit-spades"></span>
                Posições Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hand.positions.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {hand.positions.map((position) => (
                    <Badge key={position} className="bg-gradient-primary text-primary-foreground border-0 px-4 py-2 font-heading">
                      {position}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-destructive font-body">Não recomendada em nenhuma posição</p>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border border-border shadow-neumorphism interactive-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2 font-heading">
                  <Lightbulb size={20} className="text-secondary" />
                  <span className="suit-diamonds"></span>
                  Dica - Iniciante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <span className="pro-tip-badge text-xs">Beginner</span>
                  <p className="text-foreground font-body leading-relaxed">{hand.tips.beginner}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border border-border shadow-neumorphism interactive-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2 font-heading">
                  <GraduationCap size={20} className="text-accent" />
                  <span className="suit-clubs"></span>
                  Dica - Intermediário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <span className="pro-tip-badge text-xs">Advanced</span>
                  <p className="text-foreground font-body leading-relaxed">{hand.tips.intermediate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="bg-gradient-card border border-border shadow-neumorphism">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2 font-heading">
                <span className="suit-hearts"></span>
                Informações Estratégicas
                <span className="suit-spades"></span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="pro-tip-badge text-xs">Strength</span>
                <div className="text-sm text-foreground font-body">
                  <strong>Força da Mão:</strong> {getCategoryText(hand.category)} 
                  ({hand.winRate >= 85 ? 'Extremely Strong' : 
                    hand.winRate >= 70 ? 'Very Strong' : 
                    hand.winRate >= 55 ? 'Moderate' : 
                    hand.winRate >= 40 ? 'Weak' : 'Very Weak'})
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="pro-tip-badge text-xs">Frequency</span>
                <div className="text-sm text-foreground font-body">
                  <strong>Frequência de Jogo:</strong> {
                    hand.recommendation === 'Raise' ? 'Sempre jogue agressivamente' :
                    hand.recommendation === 'Call' ? 'Jogue com cautela, principalmente em posição' :
                    'Evite jogar na maioria das situações'
                  }
                </div>
              </div>
              
              {hand.positions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="pro-tip-badge text-xs">Stack</span>
                  <div className="text-sm text-foreground font-body">
                    <strong>Stack Size Ideal:</strong> {
                      hand.category === 'premium' ? 'Qualquer stack size' :
                      hand.category === 'strong' ? 'Medium a deep stacks' :
                      'Deep stacks para implied odds'
                    }
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
