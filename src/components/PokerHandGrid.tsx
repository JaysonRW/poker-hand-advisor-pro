import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { pokerHandsData } from '@/data/pokerHands';
import { PokerHand } from '@/types/poker';
import { HandDetailsModal } from './HandDetailsModal';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export const PokerHandGrid = () => {
  const [selectedHand, setSelectedHand] = useState<PokerHand | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  
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

  // Mobile carousel logic
  const handsPerPage = 6; // 2x3 grid for mobile
  const totalPages = Math.ceil(ranks.length / 2); // Split into pages of 2 rows each

  const getVisibleRanks = () => {
    const startRow = currentPage * 2;
    return ranks.slice(startRow, startRow + 2);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-title font-title text-foreground mb-2">Texas Hold'em Starting Hands Chart</h1>
        <p className="text-muted-foreground font-body">Clique em qualquer mão para ver detalhes e recomendações</p>
      </div>
      {/* Filtro de Categoria */}
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-2xl flex flex-wrap sm:flex-nowrap gap-2 sm:gap-0 overflow-x-auto overflow-y-hidden px-1 scrollbar-hide">
          <ToggleGroup type="single" value={categoryFilter} onValueChange={setCategoryFilter} className="w-full flex flex-wrap sm:flex-nowrap justify-center">
            <ToggleGroupItem value="" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-card/80 data-[state=on]:bg-gradient-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-glow data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Todas</ToggleGroupItem>
            <ToggleGroupItem value="premium" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-gradient-secondary/80 data-[state=on]:bg-gradient-secondary data-[state=on]:text-primary data-[state=on]:shadow-glow data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Premium</ToggleGroupItem>
            <ToggleGroupItem value="strong" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-primary/80 data-[state=on]:bg-gradient-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-glow data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Forte</ToggleGroupItem>
            <ToggleGroupItem value="situational" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-gradient-accent/80 data-[state=on]:bg-gradient-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-glow-accent data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Situacional</ToggleGroupItem>
            <ToggleGroupItem value="weak" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-muted/80 data-[state=on]:bg-muted data-[state=on]:text-muted-foreground data-[state=on]:shadow-neumorphism data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Fraca</ToggleGroupItem>
            <ToggleGroupItem value="fold" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-destructive/80 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground data-[state=on]:shadow-neumorphism data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">Fold</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-premium rounded shadow-glow"></div>
          <span className="text-foreground font-body">Premium (85%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-strong rounded shadow-neumorphism"></div>
          <span className="text-foreground font-body">Forte (70-85%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-situational rounded shadow-glow-accent"></div>
          <span className="text-foreground font-body">Situacional (55-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-weak rounded shadow-neumorphism"></div>
          <span className="text-foreground font-body">Fraca (40-55%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-fold rounded shadow-neumorphism"></div>
          <span className="text-foreground font-body">Fold (&lt;40%)</span>
        </div>
      </div>
      {/* Grid */}
      <Card className="p-4 bg-gradient-card border border-border shadow-neumorphism">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-13 gap-1 max-w-4xl mx-auto">
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
                    text-xs sm:text-sm font-heading rounded transition-all duration-200
                    hover:scale-105 hover:shadow-neumorphism cursor-pointer
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

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevPage}
              className="p-3 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:scale-110 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-foreground font-heading">Página {currentPage + 1} de {totalPages}</span>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentPage ? 'bg-gradient-secondary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={nextPage}
              className="p-3 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:scale-110 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto">
            {getVisibleRanks().map((_, rowIndex) => 
              ranks.map((_, colIndex) => {
                const actualRowIndex = currentPage * 2 + rowIndex;
                if (actualRowIndex >= ranks.length) return null;
                
                const handString = getHandString(actualRowIndex, colIndex);
                const handData = getHandData(handString);
                const colorClass = getCategoryColor(handData.category);
                if (categoryFilter && handData.category !== categoryFilter) return null;
                
                return (
                  <button
                    key={`${actualRowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(actualRowIndex, colIndex)}
                    className={`
                      aspect-square flex flex-col items-center justify-center
                      text-xs font-heading rounded transition-all duration-200
                      hover:scale-105 hover:shadow-neumorphism cursor-pointer
                      ${colorClass}
                    `}
                  >
                    <div className="text-center">
                      <div className="font-bold text-sm">{handString}</div>
                      <div className="text-xs opacity-90">
                        {handData.winRate.toFixed(1)}%
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </Card>
      
      {/* Position Guide */}
      <div className="mt-6 text-center text-muted-foreground text-sm">
        <div className="mb-2 font-heading">Legenda de Posições:</div>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="font-body"><strong>EP:</strong> Early Position (UTG, UTG+1)</span>
          <span className="font-body"><strong>MP:</strong> Middle Position (MP1, MP2)</span>
          <span className="font-body"><strong>LP:</strong> Late Position (CO, BTN)</span>
          <span className="font-body"><strong>Blinds:</strong> SB, BB</span>
        </div>
      </div>
      
      <HandDetailsModal 
        hand={selectedHand} 
        onClose={() => setSelectedHand(null)} 
      />
    </div>
  );
};
