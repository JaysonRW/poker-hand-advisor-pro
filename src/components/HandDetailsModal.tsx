
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PokerHand } from '@/types/poker';
import { TrendingUp, Users, Target, Lightbulb, GraduationCap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface HandDetailsModalProps {
  hand: PokerHand | null;
  onClose: () => void;
}

export const HandDetailsModal: React.FC<HandDetailsModalProps> = ({ hand, onClose }) => {
  const { t } = useTranslation();
  
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
      case 'premium': return t('handModal.categories.premium');
      case 'strong': return t('handModal.categories.strong');
      case 'situational': return t('handModal.categories.situational');
      case 'weak': return t('handModal.categories.weak');
      case 'fold': return t('handModal.categories.fold');
      default: return t('handModal.categories.unknown');
    }
  };

  const getPositionTranslated = (position: string) => {
    switch (position) {
      case 'Early Position': return t('handModal.positions.earlyPosition');
      case 'Middle Position': return t('handModal.positions.middlePosition');
      case 'Late Position': return t('handModal.positions.latePosition');
      case 'Blinds': return t('handModal.positions.blinds');
      default: return position;
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
            <span className="pro-tip-badge">{t('handModal.proAnalysis')}</span>
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
                <div className="text-sm text-muted-foreground font-body">{t('handModal.winRate')}</div>
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
                <div className="text-sm text-muted-foreground font-body">{t('handModal.category')}</div>
              </CardContent>
            </Card>
          </div>

          {/* Positions */}
          <Card className="bg-gradient-card border border-border shadow-neumorphism">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2 font-heading">
                <Users size={20} className="text-primary" />
                <span className="suit-spades"></span>
                {t('handModal.positions.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hand.positions.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {hand.positions.map((position) => (
                    <Badge key={position} className="bg-gradient-primary text-primary-foreground border-0 px-4 py-2 font-heading">
                      {getPositionTranslated(position)}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-destructive font-body">{t('handModal.positions.none')}</p>
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
                  {t('handModal.tips.beginner')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <span className="pro-tip-badge text-xs">{t('handModal.tips.beginnerBadge')}</span>
                  <p className="text-foreground font-body leading-relaxed">{hand.tips.beginner}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border border-border shadow-neumorphism interactive-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2 font-heading">
                  <GraduationCap size={20} className="text-accent" />
                  <span className="suit-clubs"></span>
                  {t('handModal.tips.intermediate')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <span className="pro-tip-badge text-xs">{t('handModal.tips.advancedBadge')}</span>
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
                {t('handModal.strategicInfo.title')}
                <span className="suit-spades"></span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="pro-tip-badge text-xs">{t('handModal.badges.strength')}</span>
                <div className="text-sm text-foreground font-body">
                  <strong>{t('handModal.strategicInfo.strength')}:</strong> {getCategoryText(hand.category)} 
                  ({hand.winRate >= 85 ? t('handModal.strategicInfo.strengthLevels.extremelyStrong') : 
                    hand.winRate >= 70 ? t('handModal.strategicInfo.strengthLevels.veryStrong') : 
                    hand.winRate >= 55 ? t('handModal.strategicInfo.strengthLevels.moderate') : 
                    hand.winRate >= 40 ? t('handModal.strategicInfo.strengthLevels.weak') : t('handModal.strategicInfo.strengthLevels.veryWeak')})
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="pro-tip-badge text-xs">{t('handModal.badges.frequency')}</span>
                <div className="text-sm text-foreground font-body">
                  <strong>{t('handModal.strategicInfo.frequency')}:</strong> {
                    hand.recommendation === 'Raise' ? t('handModal.strategicInfo.frequencyAdvice.raise') :
                    hand.recommendation === 'Call' ? t('handModal.strategicInfo.frequencyAdvice.call') :
                    t('handModal.strategicInfo.frequencyAdvice.fold')
                  }
                </div>
              </div>
              
              {hand.positions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="pro-tip-badge text-xs">{t('handModal.badges.stack')}</span>
                  <div className="text-sm text-foreground font-body">
                    <strong>{t('handModal.strategicInfo.stackSize')}:</strong> {
                      hand.category === 'premium' ? t('handModal.strategicInfo.stackSizeAdvice.premium') :
                      hand.category === 'strong' ? t('handModal.strategicInfo.stackSizeAdvice.strong') :
                      t('handModal.strategicInfo.stackSizeAdvice.situational')
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
