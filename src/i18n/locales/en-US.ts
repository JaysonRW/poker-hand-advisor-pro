export const enUS = {
  navbar: {
    title: 'Poker Hand Advisor',
    titleSuffix: 'Pro',
    menuItems: {
      table: 'Table',
      glossary: 'Glossary',
      simulator: 'Simulator',
    },
    closeMenu: 'Close Menu',
  },
  pokerGrid: {
    title: 'Texas Hold\'em Starting Hands Chart',
    subtitle: 'Click any hand to see details and recommendations',
    filters: {
      all: 'All',
      premium: 'Premium',
      strong: 'Strong',
      situational: 'Situational',
      weak: 'Weak',
      fold: 'Fold',
    },
    legend: {
      premium: 'Premium (85%+)',
      strong: 'Strong (70-85%)',
      situational: 'Situational (55-70%)',
      weak: 'Weak (40-55%)',
      fold: 'Fold (<40%)',
    },
    positions: {
      title: 'Position Legend:',
      ep: 'EP',
      epFull: 'Early Position (UTG, UTG+1)',
      mp: 'MP',
      mpFull: 'Middle Position (MP1, MP2)',
      lp: 'LP',
      lpFull: 'Late Position (CO, BTN)',
      blinds: 'Blinds',
      blindsFull: 'SB, BB',
    },
    pagination: {
      page: 'Page',
      of: 'of',
    },
  },
  handModal: {
    proAnalysis: 'Pro Analysis',
    winRate: 'Win Rate',
    recommendation: 'Recommendation',
    category: 'Category',
    categories: {
      premium: 'Premium',
      strong: 'Strong',
      situational: 'Situational',
      weak: 'Weak',
      fold: 'Fold',
      unknown: 'Unknown',
    },
    positions: {
      title: 'Recommended Positions',
      none: 'Not recommended in any position',
      earlyPosition: 'Early Position',
      middlePosition: 'Middle Position',
      latePosition: 'Late Position',
      blinds: 'Blinds',
    },
    tips: {
      beginner: 'Tip - Beginner',
      intermediate: 'Tip - Intermediate',
      beginnerBadge: 'Beginner',
      advancedBadge: 'Advanced',
    },
    strategicInfo: {
      title: 'Strategic Information',
      strength: 'Hand Strength',
      strengthLevels: {
        extremelyStrong: 'Extremely Strong',
        veryStrong: 'Very Strong',
        moderate: 'Moderate',
        weak: 'Weak',
        veryWeak: 'Very Weak',
      },
      frequency: 'Playing Frequency',
      frequencyAdvice: {
        raise: 'Always play aggressively',
        call: 'Play cautiously, especially in position',
        fold: 'Avoid playing in most situations',
      },
      stackSize: 'Ideal Stack Size',
      stackSizeAdvice: {
        premium: 'Any stack size',
        strong: 'Medium to deep stacks',
        situational: 'Deep stacks for implied odds',
      },
    },
    badges: {
      strength: 'Strength',
      frequency: 'Frequency',
      stack: 'Stack',
    },
  },
  glossary: {
    title: 'Poker Glossary',
    subtitle: 'Essential terms to master poker',
    backButton: '← Back to Table',
    termBadge: 'Term',
    terms: {
      check: {
        term: 'Check',
        description: 'Pass your turn without betting. Only possible if no one has bet before you in the round.',
      },
      bet: {
        term: 'Bet',
        description: 'Be the first to put chips into the pot in a betting round.',
      },
      call: {
        term: 'Call',
        description: 'Match the value of the most recent bet or raise to continue in the hand.',
      },
      raise: {
        term: 'Raise',
        description: 'Increase the current bet amount, forcing others to pay more or fold.',
      },
      fold: {
        term: 'Fold',
        description: 'Give up the hand, losing chips already bet.',
      },
      allin: {
        term: 'All-in',
        description: 'Bet all your chips at once.',
      },
      pot: {
        term: 'Pot',
        description: 'The total amount of chips bet in a hand, which the winner takes.',
      },
      chips: {
        term: 'Chips',
        description: 'Tokens representing money in the game.',
      },
      stack: {
        term: 'Stack',
        description: 'Total amount of chips a player has in front of them.',
      },
      kicker: {
        term: 'Kicker',
        description: 'Tiebreaker card used when players have equal hands.',
      },
      showdown: {
        term: 'Showdown',
        description: 'Moment when players show their cards to determine the winner.',
      },
      bankroll: {
        term: 'Bankroll',
        description: 'Total amount reserved for playing poker, separate from personal finances.',
      },
      blinds: {
        term: 'Blinds',
        description: 'Mandatory bets made by two players before cards are dealt.',
      },
      smallBlind: {
        term: 'Small Blind',
        description: 'First player to the left of the button, makes the smaller mandatory bet.',
      },
      bigBlind: {
        term: 'Big Blind',
        description: 'Player to the left of Small Blind, makes the full mandatory bet.',
      },
      button: {
        term: 'Button',
        description: 'Marker indicating the dealer for the round, most advantageous position.',
      },
      utg: {
        term: 'UTG',
        description: 'Under the Gun: first to act before the flop, difficult position.',
      },
      preFlop: {
        term: 'Pre-Flop',
        description: 'First betting round, before community cards.',
      },
      flop: {
        term: 'Flop',
        description: 'The first three community cards dealt on the table.',
      },
      turn: {
        term: 'Turn',
        description: 'The fourth community card dealt on the table.',
      },
      river: {
        term: 'River',
        description: 'The fifth and final community card dealt on the table.',
      },
    },
  },
  simulator: {
    title: 'Situation Simulator',
    subtitle: 'Configure your situation and receive professional recommendations',
    gameType: 'Game Type',
    gameTypes: {
      cash: 'Cash Game',
      tournament: 'Tournament',
      sitngo: 'Sit&Go',
    },
    position: 'Position',
    positions: {
      UTG: 'UTG (Under the Gun)',
      MP: 'MP (Middle Position)',
      CO: 'CO (Cutoff)',
      BTN: 'BTN (Button)',
      SB: 'SB (Small Blind)',
      BB: 'BB (Big Blind)',
    },
    stack: 'Stack (BB)',
    players: 'Players at Table',
    startingHand: 'Starting Hand (e.g.: AKs, 99, QJo)',
    simulateButton: 'Simulate Situation',
    result: {
      proTip: 'Pro Tip',
      action: 'Recommended Action:',
    },
  },
  index: {
    glossaryButton: 'Poker Glossary',
    footer: {
      title: 'Poker Hand Chart',
      subtitle: 'Decision support tool for Texas Hold\'em',
      disclaimer: 'Based on mathematical simulations and professional strategies. Use as reference and always consider table-specific factors.',
      developedBy: 'Developed by',
    },
  },
  common: {
    loading: 'Loading...',
  },
};