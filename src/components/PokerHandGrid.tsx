import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { pokerHandsData } from '@/data/pokerHands';
import { PokerHand } from '@/types/poker';
import { HandDetailsModal } from './HandDetailsModal';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export const PokerHandGrid = () => {
  const [selectedHand, setSelectedHand] = useState<PokerHand | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  const getHandString = (row: number, col: number): string => {
    const rank1 = ranks[row];
    const rank2 = ranks[col];
    
    if (row === col) {
      return `${rank1}${rank2}`; // Pocket pairs
    } else if (row < col) {
      return `${rank1}${rank2}s`; // Suited
    } else {
      return `${rank2}${rank1}o`; // Offsuit
    }
  };
  
  const getHandData = (handString: string): PokerHand => {
    return pokerHandsData[handString] || {
      hand: handString,
      winRate: 35,
      category: 'fold',
      recommendation: 'Fold',
      positions: [],
      tips: {
        beginner: 'Mão muito fraca. Sempre fold.',
        intermediate: 'Não tem valor jogável em nenhuma situação.'
      }
    };
  };
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'premium': return 'hand-premium';
      case 'strong': return 'hand-strong';
      case 'situational': return 'hand-situational';
      case 'weak': return 'hand-weak';
      default: return 'hand-fold';
    }
  };
  
  const handleCellClick = (row: number, col: number) => {
    const handString = getHandString(row, col);
    const handData = getHandData(handString);
    setSelectedHand(handData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Texas Hold'em Starting Hands Chart</h1>
        <p className="text-green-200">Clique em qualquer mão para ver detalhes e recomendações</p>
      </div>
      {/* Filtro de Categoria */}
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-2xl flex flex-wrap sm:flex-nowrap gap-2 sm:gap-0 overflow-x-auto overflow-y-hidden px-1 scrollbar-hide">
          <ToggleGroup type="single" value={categoryFilter} onValueChange={setCategoryFilter} className="w-full flex flex-wrap sm:flex-nowrap justify-center">
            <ToggleGroupItem value="" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white bg-green-700/80 data-[state=on]:bg-green-500 data-[state=on]:shadow-lg data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Todas</ToggleGroupItem>
            <ToggleGroupItem value="premium" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white bg-yellow-600/80 data-[state=on]:bg-yellow-400 data-[state=on]:shadow-lg data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Premium</ToggleGroupItem>
            <ToggleGroupItem value="strong" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white bg-blue-500/80 data-[state=on]:bg-blue-400 data-[state=on]:shadow-lg data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Forte</ToggleGroupItem>
            <ToggleGroupItem value="situational" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white bg-orange-500/80 data-[state=on]:bg-orange-400 data-[state=on]:shadow-lg data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Situacional</ToggleGroupItem>
            <ToggleGroupItem value="weak" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white bg-gray-400/80 data-[state=on]:bg-gray-200 data-[state=on]:shadow-lg data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Fraca</ToggleGroupItem>
            <ToggleGroupItem value="fold" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white bg-gray-700/80 data-[state=on]:bg-gray-500 data-[state=on]:shadow-lg data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Fold</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-premium rounded"></div>
          <span className="text-white">Premium (85%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-strong rounded"></div>
          <span className="text-white">Forte (70-85%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-situational rounded"></div>
          <span className="text-white">Situacional (55-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-weak rounded"></div>
          <span className="text-white">Fraca (40-55%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-fold rounded"></div>
          <span className="text-white">Fold (&lt;40%)</span>
        </div>
      </div>
      {/* Grid */}
      <Card className="p-4 bg-green-800/50 border-green-600">
        <div className="grid grid-cols-13 gap-1 max-w-4xl mx-auto">
          {ranks.map((_, rowIndex) => 
            ranks.map((_, colIndex) => {
              const handString = getHandString(rowIndex, colIndex);
              const handData = getHandData(handString);
              const colorClass = getCategoryColor(handData.category);
              if (categoryFilter && handData.category !== categoryFilter) return null;
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    aspect-square flex flex-col items-center justify-center
                    text-xs sm:text-sm font-bold rounded transition-all
                    hover:scale-105 hover:shadow-lg cursor-pointer
                    ${colorClass}
                  `}
                >
                  <div className="text-center">
                    <div className="font-bold">{handString}</div>
                    <div className="text-xs opacity-90 hidden sm:block">
                      {handData.winRate.toFixed(1)}%
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </Card>
      
      {/* Position Guide */}
      <div className="mt-6 text-center text-green-200 text-sm">
        <div className="mb-2 font-semibold">Legenda de Posições:</div>
        <div className="flex flex-wrap justify-center gap-4">
          <span><strong>EP:</strong> Early Position (UTG, UTG+1)</span>
          <span><strong>MP:</strong> Middle Position (MP1, MP2)</span>
          <span><strong>LP:</strong> Late Position (CO, BTN)</span>
          <span><strong>Blinds:</strong> SB, BB</span>
        </div>
      </div>
      
      <HandDetailsModal 
        hand={selectedHand} 
        onClose={() => setSelectedHand(null)} 
      />
    </div>
  );
};
