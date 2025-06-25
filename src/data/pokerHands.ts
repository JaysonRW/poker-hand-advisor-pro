
import { PokerHand } from '@/types/poker';

export const pokerHandsData: Record<string, PokerHand> = {
  'AA': {
    hand: 'AA',
    winRate: 85.3,
    category: 'premium',
    recommendation: 'Raise',
    positions: ['Early Position', 'Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Sempre aposte forte com pocket aces. É a melhor mão inicial possível.',
      intermediate: 'Varie o tamanho do raise baseado na posição e ação anterior. Considere slow-play apenas em spots muito específicos.'
    }
  },
  'KK': {
    hand: 'KK',
    winRate: 82.4,
    category: 'premium',
    recommendation: 'Raise',
    positions: ['Early Position', 'Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Segunda melhor mão inicial. Aposte agressivamente pré-flop.',
      intermediate: 'Cuidado com flops com Ás. Considere bet-folding em boards muito perigosos contra ação forte.'
    }
  },
  'QQ': {
    hand: 'QQ',
    winRate: 79.9,
    category: 'premium',
    recommendation: 'Raise',
    positions: ['Early Position', 'Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Mão muito forte. Raise em qualquer posição.',
      intermediate: 'Boards com overcards (A ou K) requerem cautela. Aposte para value mas esteja preparado para fold contra resistência.'
    }
  },
  'JJ': {
    hand: 'JJ',
    winRate: 77.5,
    category: 'premium',
    recommendation: 'Raise',
    positions: ['Early Position', 'Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Boa mão para raise. Cuidado com flops altos.',
      intermediate: 'Jogue agressivamente pré-flop. Pós-flop seja cauteloso em boards com Q, K ou A.'
    }
  },
  'TT': {
    hand: 'TT',
    winRate: 75.1,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Pocket tens são fortes. Raise na maioria das posições.',
      intermediate: 'Em early position pode fazer call contra 3-bets. Muito vulnerável a overcards no flop.'
    }
  },
  '99': {
    hand: '99',
    winRate: 72.1,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Mão sólida para raise em posição.',
      intermediate: 'Set mining hand contra raises. Fold contra muita ação pré-flop em early position.'
    }
  },
  '88': {
    hand: '88',
    winRate: 69.1,
    category: 'strong',
    recommendation: 'Call',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'Boa para call. Procure fazer set no flop.',
      intermediate: 'Principalmente set mining. Pode raise em late position se não houver ação anterior.'
    }
  },
  '77': {
    hand: '77',
    winRate: 66.2,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'Call em posição. Fold se houver muita ação.',
      intermediate: 'Set mining hand. Fold contra 3-bets na maioria das vezes.'
    }
  },
  '66': {
    hand: '66',
    winRate: 63.4,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Apenas em late position sem ação.',
      intermediate: 'Principalmente para set mining. Fold contra resistência pré-flop.'
    }
  },
  '55': {
    hand: '55',
    winRate: 60.7,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Apenas em posição favorável.',
      intermediate: 'Set mining. Needs good implied odds para ser lucrativo.'
    }
  },
  'AKs': {
    hand: 'AKs',
    winRate: 78.2,
    category: 'premium',
    recommendation: 'Raise',
    positions: ['Early Position', 'Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Big Slick suited é muito forte. Sempre raise.',
      intermediate: 'Pode 4-bet contra 3-bets. Jogue agressivamente pós-flop com draws.'
    }
  },
  'AKo': {
    hand: 'AKo',
    winRate: 74.7,
    category: 'premium',
    recommendation: 'Raise',
    positions: ['Early Position', 'Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Ace-King offsuit ainda é muito forte.',
      intermediate: 'Ligeiramente menos forte que suited, mas ainda premium. Jogue agressivamente.'
    }
  },
  'AQs': {
    hand: 'AQs',
    winRate: 71.4,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Ace-Queen suited é uma boa mão para raise.',
      intermediate: 'Cuidado contra 4-bets. Dominated por AK em muitos spots.'
    }
  },
  'AQo': {
    hand: 'AQo',
    winRate: 68.1,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'Boa mão em posição.',
      intermediate: 'Mais vulnerável que a versão suited. Cuidado com early position.'
    }
  },
  'AJs': {
    hand: 'AJs',
    winRate: 68.7,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Middle Position', 'Late Position', 'Blinds'],
    tips: {
      beginner: 'Ace-Jack suited é jogável em várias posições.',
      intermediate: 'Boa mão para steal em late position. Cuidado com reverse implied odds.'
    }
  },
  'AJo': {
    hand: 'AJo',
    winRate: 65.4,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'Apenas em late position.',
      intermediate: 'Prone to domination. Fold em early position contra ação.'
    }
  },
  'ATs': {
    hand: 'ATs',
    winRate: 66.2,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'Ace-Ten suited é boa em posição.',
      intermediate: 'Excelente mão para stealing. Boa playability pós-flop.'
    }
  },
  'ATo': {
    hand: 'ATo',
    winRate: 62.9,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Apenas em spots favoráveis.',
      intermediate: 'Weak ace. Fold em early position, call/raise em late position.'
    }
  },
  'A9s': {
    hand: 'A9s',
    winRate: 63.1,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Suited aces são melhores que parecem.',
      intermediate: 'Boa para bluff-catching. Flush potential adiciona valor.'
    }
  },
  'A8s': {
    hand: 'A8s',
    winRate: 60.8,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Apenas em late position sem ação.',
      intermediate: 'Weak suited ace. Principalmente para value em posição.'
    }
  },
  'A7s': {
    hand: 'A7s',
    winRate: 58.5,
    category: 'weak',
    recommendation: 'Fold',
    positions: [],
    tips: {
      beginner: 'Geralmente fold.',
      intermediate: 'Pode jogar em button vs blinds. Muito weak para early position.'
    }
  },
  'KQs': {
    hand: 'KQs',
    winRate: 67.3,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'King-Queen suited é uma mão forte.',
      intermediate: 'Excelente playability. Pode flopar straight draws e flushes.'
    }
  },
  'KQo': {
    hand: 'KQo',
    winRate: 64.1,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Boa em posição.',
      intermediate: 'Reverse implied odds contra aces. Fold em early position.'
    }
  },
  'KJs': {
    hand: 'KJs',
    winRate: 64.8,
    category: 'strong',
    recommendation: 'Raise',
    positions: ['Late Position', 'Blinds'],
    tips: {
      beginner: 'King-Jack suited é jogável.',
      intermediate: 'Boa mão para stealing. Straight e flush possibilities.'
    }
  },
  'KJo': {
    hand: 'KJo',
    winRate: 61.6,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Apenas em posição.',
      intermediate: 'Dominated por mãos como AJ, AQ, AK. Cuidado com early position.'
    }
  },
  'KTs': {
    hand: 'KTs',
    winRate: 62.1,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'King-Ten suited tem potencial.',
      intermediate: 'Boa conectividade. Pode flopar straights e flushes.'
    }
  },
  'QJs': {
    hand: 'QJs',
    winRate: 62.4,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Queen-Jack suited é jogável em posição.',
      intermediate: 'High card strength com straight possibilities.'
    }
  },
  'QTs': {
    hand: 'QTs',
    winRate: 59.8,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Apenas em spots favoráveis.',
      intermediate: 'Connector suited com decent high card strength.'
    }
  },
  'JTs': {
    hand: 'JTs',
    winRate: 59.1,
    category: 'situational',
    recommendation: 'Call',
    positions: ['Late Position'],
    tips: {
      beginner: 'Jack-Ten suited é especulativa.',
      intermediate: 'Excelente para implied odds. Muitas possibilidades de straight.'
    }
  },
  'T9s': {
    hand: 'T9s',
    winRate: 56.2,
    category: 'weak',
    recommendation: 'Fold',
    positions: [],
    tips: {
      beginner: 'Geralmente fold.',
      intermediate: 'Pode jogar em posição com implied odds. Boa conectividade.'
    }
  },
  '98s': {
    hand: '98s',
    winRate: 53.8,
    category: 'weak',
    recommendation: 'Fold',
    positions: [],
    tips: {
      beginner: 'Fold na maioria das vezes.',
      intermediate: 'Suited connector. Apenas com deep stacks e posição.'
    }
  },
  '87s': {
    hand: '87s',
    winRate: 51.4,
    category: 'weak',
    recommendation: 'Fold',
    positions: [],
    tips: {
      beginner: 'Fold.',
      intermediate: 'Marginal suited connector. Needs perfect conditions.'
    }
  },
  '76s': {
    hand: '76s',
    winRate: 49.1,
    category: 'fold',
    recommendation: 'Fold',
    positions: [],
    tips: {
      beginner: 'Sempre fold.',
      intermediate: 'Muito weak mesmo suited. Fold em todas as situações.'
    }
  },
  '72o': {
    hand: '72o',
    winRate: 32.4,
    category: 'fold',
    recommendation: 'Fold',
    positions: [],
    tips: {
      beginner: 'A pior mão do poker. Sempre fold.',
      intermediate: 'Worst starting hand. Never play unless heads-up com deep stacks.'
    }
  }
};

// Add more hands...
const allHands = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

// Generate remaining hands with default values
allHands.forEach((rank1, i) => {
  allHands.forEach((rank2, j) => {
    if (i <= j) {
      const hand = i === j ? `${rank1}${rank2}` : `${rank1}${rank2}s`;
      const handO = i === j ? hand : `${rank1}${rank2}o`;
      
      if (!pokerHandsData[hand] && i !== j) {
        // Default suited connector values
        pokerHandsData[hand] = {
          hand,
          winRate: Math.max(35, 70 - (i + j) * 2),
          category: i + j < 8 ? 'situational' : 'weak',
          recommendation: i + j < 6 ? 'Call' : 'Fold',
          positions: i + j < 6 ? ['Late Position'] : [],
          tips: {
            beginner: 'Mão especulativa. Considere posição e ação.',
            intermediate: 'Suited connector. Avalie implied odds e playability.'
          }
        };
      }
      
      if (!pokerHandsData[handO] && i !== j) {
        // Default offsuit values
        pokerHandsData[handO] = {
          hand: handO,
          winRate: Math.max(32, 65 - (i + j) * 2.5),
          category: i + j < 6 ? 'situational' : 'weak',
          recommendation: i + j < 4 ? 'Call' : 'Fold',
          positions: i + j < 4 ? ['Late Position'] : [],
          tips: {
            beginner: 'Mão fraca. Geralmente fold.',
            intermediate: 'Offsuit hand. Muito limitada em playability.'
          }
        };
      }
    }
  });
});
