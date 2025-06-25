
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-green-900 border-green-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-yellow-400">
            {hand.hand}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-800/50 border-green-600">
              <CardContent className="p-4 text-center">
                <TrendingUp className="mx-auto mb-2 text-yellow-400" size={24} />
                <div className="text-2xl font-bold text-yellow-400">
                  {hand.winRate.toFixed(1)}%
                </div>
                <div className="text-sm text-green-200">Win Rate</div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-600">
              <CardContent className="p-4 text-center">
                <Target className="mx-auto mb-2 text-yellow-400" size={24} />
                <Badge className={`${getRecommendationColor(hand.recommendation)} text-white`}>
                  {hand.recommendation}
                </Badge>
                <div className="text-sm text-green-200 mt-1">Recomendação</div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-800/50 border-green-600">
              <CardContent className="p-4 text-center">
                <Users className="mx-auto mb-2 text-yellow-400" size={24} />
                <div className="text-lg font-semibold text-yellow-400">
                  {getCategoryText(hand.category)}
                </div>
                <div className="text-sm text-green-200">Categoria</div>
              </CardContent>
            </Card>
          </div>

          {/* Positions */}
          <Card className="bg-green-800/50 border-green-600">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                <Users size={20} />
                Posições Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hand.positions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {hand.positions.map((position) => (
                    <Badge key={position} variant="outline" className="border-yellow-400 text-yellow-400">
                      {position}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-red-300">Não recomendada em nenhuma posição</p>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-green-800/50 border-green-600">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                  <Lightbulb size={20} />
                  Dica - Iniciante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100">{hand.tips.beginner}</p>
              </CardContent>
            </Card>

            <Card className="bg-green-800/50 border-green-600">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                  <GraduationCap size={20} />
                  Dica - Intermediário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100">{hand.tips.intermediate}</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="bg-green-800/50 border-green-600">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400">Informações Estratégicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-green-200">
                <strong>Força da Mão:</strong> {getCategoryText(hand.category)} 
                ({hand.winRate >= 85 ? 'Extremely Strong' : 
                  hand.winRate >= 70 ? 'Very Strong' : 
                  hand.winRate >= 55 ? 'Moderate' : 
                  hand.winRate >= 40 ? 'Weak' : 'Very Weak'})
              </div>
              
              <div className="text-sm text-green-200">
                <strong>Frequência de Jogo:</strong> {
                  hand.recommendation === 'Raise' ? 'Sempre jogue agressivamente' :
                  hand.recommendation === 'Call' ? 'Jogue com cautela, principalmente em posição' :
                  'Evite jogar na maioria das situações'
                }
              </div>
              
              {hand.positions.length > 0 && (
                <div className="text-sm text-green-200">
                  <strong>Stack Size Ideal:</strong> {
                    hand.category === 'premium' ? 'Qualquer stack size' :
                    hand.category === 'strong' ? 'Medium a deep stacks' :
                    'Deep stacks para implied odds'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
