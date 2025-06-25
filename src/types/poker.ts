
export interface PokerHand {
  hand: string;
  winRate: number;
  category: 'premium' | 'strong' | 'situational' | 'weak' | 'fold';
  recommendation: 'Raise' | 'Call' | 'Fold';
  positions: string[];
  tips: {
    beginner: string;
    intermediate: string;
  };
}

export interface HandPosition {
  row: number;
  col: number;
  hand: string;
  suited: boolean;
}
