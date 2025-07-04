import React from 'react';

const pokerHands = [
  {
    name: 'Royal Flush',
    ranking: 1,
    cards: [
      { rank: '10', suit: 'hearts' },
      { rank: 'J', suit: 'hearts' },
      { rank: 'Q', suit: 'hearts' },
      { rank: 'K', suit: 'hearts' },
      { rank: 'A', suit: 'hearts' },
    ],
    odds: '30,939 to 1',
    count: 4,
    description: 'A sequência mais alta, todos do mesmo naipe.'
  },
  {
    name: 'Straight Flush',
    ranking: 2,
    cards: [
      { rank: '4', suit: 'spades' },
      { rank: '5', suit: 'spades' },
      { rank: '6', suit: 'spades' },
      { rank: '7', suit: 'spades' },
      { rank: '8', suit: 'spades' },
    ],
    odds: '3,437.8 to 1',
    count: 36,
    description: 'Cinco cartas em sequência, todas do mesmo naipe.'
  },
  {
    name: 'Four of a Kind',
    ranking: 3,
    cards: [
      { rank: '7', suit: 'hearts' },
      { rank: '7', suit: 'spades' },
      { rank: '7', suit: 'diamonds' },
      { rank: '7', suit: 'clubs' },
      { rank: '10', suit: 'hearts', faded: true },
    ],
    odds: '594 to 1',
    count: 624,
    description: 'Quatro cartas do mesmo valor.'
  },
  {
    name: 'Full House',
    ranking: 4,
    cards: [
      { rank: 'K', suit: 'hearts' },
      { rank: 'K', suit: 'spades' },
      { rank: 'K', suit: 'diamonds' },
      { rank: 'J', suit: 'hearts' },
      { rank: 'J', suit: 'spades' },
    ],
    odds: '37.5 to 1',
    count: 3_744,
    description: 'Três cartas de um valor e duas de outro.'
  },
  {
    name: 'Flush',
    ranking: 5,
    cards: [
      { rank: '6', suit: 'hearts' },
      { rank: '8', suit: 'hearts' },
      { rank: 'Q', suit: 'hearts' },
      { rank: '3', suit: 'hearts' },
      { rank: '10', suit: 'hearts' },
    ],
    odds: '32.1 to 1',
    count: 5_108,
    description: 'Cinco cartas do mesmo naipe, não em sequência.'
  },
  {
    name: 'Straight',
    ranking: 6,
    cards: [
      { rank: '6', suit: 'spades' },
      { rank: '7', suit: 'spades' },
      { rank: '8', suit: 'spades' },
      { rank: '9', suit: 'spades' },
      { rank: '10', suit: 'spades' },
    ],
    odds: '20.6 to 1',
    count: 10_200,
    description: 'Cinco cartas em sequência, de naipes diferentes.'
  },
  {
    name: 'Three of a Kind',
    ranking: 7,
    cards: [
      { rank: 'K', suit: 'hearts' },
      { rank: 'K', suit: 'spades' },
      { rank: 'K', suit: 'diamonds' },
      { rank: '3', suit: 'hearts', faded: true },
      { rank: '7', suit: 'spades', faded: true },
    ],
    odds: '19.7 to 1',
    count: 54_912,
    description: 'Três cartas do mesmo valor.'
  },
  {
    name: 'Two Pair',
    ranking: 8,
    cards: [
      { rank: 'A', suit: 'hearts' },
      { rank: 'A', suit: 'spades' },
      { rank: '4', suit: 'hearts' },
      { rank: '4', suit: 'spades' },
      { rank: 'Q', suit: 'diamonds', faded: true },
    ],
    odds: '3.26 to 1',
    count: 123_552,
    description: 'Dois pares de cartas de valores diferentes.'
  },
  {
    name: 'One Pair',
    ranking: 9,
    cards: [
      { rank: '5', suit: 'hearts' },
      { rank: '5', suit: 'spades' },
      { rank: '8', suit: 'diamonds', faded: true },
      { rank: 'Q', suit: 'clubs', faded: true },
      { rank: '6', suit: 'hearts', faded: true },
    ],
    odds: '1.28 to 1',
    count: 1_098_240,
    description: 'Duas cartas do mesmo valor.'
  },
  {
    name: 'High Card',
    ranking: 10,
    cards: [
      { rank: '2', suit: 'spades' },
      { rank: '4', suit: 'hearts' },
      { rank: '8', suit: 'diamonds' },
      { rank: '7', suit: 'clubs' },
      { rank: 'A', suit: 'hearts' },
    ],
    odds: '4.74 to 1',
    count: 1_302_540,
    description: 'Nenhuma combinação, vale a carta mais alta.'
  },
];

const suitSymbols: Record<string, string> = {
  hearts: '♥',
  spades: '♠',
  diamonds: '♦',
  clubs: '♣',
};

const suitColors: Record<string, string> = {
  hearts: 'text-black',
  diamonds: 'text-red-400',
  spades: 'text-blue-300',
  clubs: 'text-green-300',
};

const PokerHandsFooter: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto mt-12 px-2">
      <h2 className="text-xl font-bold text-yellow-400 text-center mb-4">Ranking das Mãos de Poker</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pokerHands.map((hand) => (
          <div
            key={hand.ranking}
            className="bg-green-900/80 border border-green-700 rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform group"
            tabIndex={0}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-600 text-white rounded-full px-2 py-0.5 text-xs font-bold">#{hand.ranking}</span>
              <span className="text-lg font-semibold text-white">{hand.name}</span>
            </div>
            <div className="flex gap-1 mb-2">
              {hand.cards.map((card, idx) => (
                <span
                  key={idx}
                  className={`inline-flex flex-col items-center justify-center w-7 h-10 rounded-md border border-gray-400 bg-white text-center text-lg font-bold align-middle shadow-sm ${card.faded ? 'opacity-40' : ''}`}
                  aria-label={`${card.rank} de ${card.suit}`}
                >
                  <span className={`flex flex-col items-center justify-center h-full ${suitColors[card.suit]}`}
                        style={{lineHeight: '1.1'}}>
                    <span className="text-base leading-none">{card.rank}</span>
                    <span className="text-lg leading-none">{suitSymbols[card.suit]}</span>
                  </span>
                </span>
              ))}
            </div>
            <div className="text-green-200 text-xs mb-1">Probabilidade: <span className="font-mono text-yellow-300">{hand.odds}</span></div>
            <div className="text-green-300 text-xs mb-2">Combinações: <span className="font-mono">{hand.count.toLocaleString()}</span></div>
            <div className="text-green-100 text-xs text-center group-hover:text-yellow-200 transition-colors" title={hand.description}>{hand.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PokerHandsFooter; 