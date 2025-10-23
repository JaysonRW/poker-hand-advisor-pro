import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { pokerHandsData } from '@/data/pokerHands';
import { PokerHand } from '@/types/poker';
import { HandDetailsModal } from './HandDetailsModal';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

// Chaves de posição para o filtro da UI
const positionKeys = ['ALL', 'UTG', 'MP', 'CO', 'BTN', 'SB', 'BB']; 

export const PokerHandGrid = () => {
  const { t } = useTranslation();
  const [selectedHand, setSelectedHand] = useState<PokerHand | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  // NOVO ESTADO: Filtro por Posição (inicialmente 'ALL')
  const [positionFilter, setPositionFilter] = useState<string>('ALL'); 
  const [currentPage, setCurrentPage] = useState(0);

  // Mapeia a posição individual da UI (UTG, BTN) para o GRUPO de posição usado nos dados (Early Position, Late Position)
  const mapPositionToGroup = (pos: string): string | null => {
    switch(pos) {
      case 'UTG':
      case 'MP':
        return 'Early Position'; // Simplificado: UTG e MP no Early Position Group para o range de abertura
      case 'CO':
      case 'BTN':
        return 'Late Position';
      case 'SB':
      case 'BB':
        return 'Blinds';
      default:
        return null;
    }
  };
  
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
  
  // NOVA LÓGICA DE COLORAÇÃO POR POSIÇÃO/AÇÃO
  const getPositionActionColor = (handData: PokerHand, filter: string): string => {
    if (filter === 'ALL' || !filter) {
        return getCategoryColor(handData.category);
    }
    
    // 1. Encontra o grupo que a posição do filtro pertence ('Early Position', 'Late Position', etc.)
    const requiredPositionGroup = mapPositionToGroup(filter);

    if (!requiredPositionGroup) {
        return 'hand-fold'; // Posição inválida
    }
    
    // 2. Verifica se a mão é jogável nesse grupo (se o grupo estiver listado no array positions da mão)
    const isPlayable = handData.positions.includes(requiredPositionGroup);

    if (isPlayable) {
        // Se for jogável, retorna a cor da força da mão
        return getCategoryColor(handData.category);
    } 
    
    // 3. Se não for jogável, retorna a cor de FOLD, transformando a grade em um mapa de ação/fold.
    return 'hand-fold';
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
        <h1 className="text-title font-title text-foreground mb-2">{t('pokerGrid.title')}</h1>
        <p className="text-muted-foreground font-body">{t('pokerGrid.subtitle')}</p>
      </div>
      
      {/* NOVO FILTRO DE POSIÇÃO */}
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-2xl flex flex-wrap sm:flex-nowrap gap-2 sm:gap-0 overflow-x-auto overflow-y-hidden px-1 scrollbar-hide">
          <ToggleGroup 
            type="single" 
            value={positionFilter} 
            onValueChange={(value) => setPositionFilter(value || 'ALL')} 
            className="w-full flex flex-wrap sm:flex-nowrap justify-center"
          >
            {positionKeys.map(key => (
              <ToggleGroupItem 
                key={`pos-${key}`} 
                value={key} 
                className={`mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-card/80 transition-all duration-200 text-sm sm:text-base min-w-[60px] 
                            data-[state=on]:bg-gradient-secondary data-[state=on]:text-primary data-[state=on]:shadow-glow data-[state=on]:scale-105`}
              >
                {key === 'ALL' ? t('pokerGrid.filters.all') : key}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      
      {/* Filtro de Categoria - MANTIDO, mas só é aplicado quando PositionFilter é 'ALL' */}
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-2xl flex flex-wrap sm:flex-nowrap gap-2 sm:gap-0 overflow-x-auto overflow-y-hidden px-1 scrollbar-hide">
          <ToggleGroup type="single" value={categoryFilter} onValueChange={setCategoryFilter} className="w-full flex flex-wrap sm:flex-nowrap justify-center">
            <ToggleGroupItem value="" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-card/80 data-[state=on]:bg-gradient-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-glow data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">{t('pokerGrid.filters.all')}</ToggleGroupItem>
            <ToggleGroupItem value="premium" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-gradient-secondary/80 data-[state=on]:bg-gradient-secondary data-[state=on]:text-primary data-[state=on]:shadow-glow data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">{t('pokerGrid.filters.premium')}</ToggleGroupItem>
            <ToggleGroupItem value="strong" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-primary/80 data-[state=on]:bg-gradient-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-glow data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">{t('pokerGrid.filters.strong')}</ToggleGroupItem>
            <ToggleGroupItem value="situational" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-gradient-accent/80 data-[state=on]:bg-gradient-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-glow-accent data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">{t('pokerGrid.filters.situational')}</ToggleGroupItem>
            <ToggleGroupItem value="weak" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-muted/80 data-[state=on]:bg-muted data-[state=on]:text-muted-foreground data-[state=on]:shadow-neumorphism data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">{t('pokerGrid.filters.weak')}</ToggleGroupItem>
            <ToggleGroupItem value="fold" className="mx-0 sm:mx-1 mb-2 sm:mb-0 px-3 sm:px-4 py-2 rounded-lg font-heading text-foreground bg-destructive/80 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground data-[state=on]:shadow-neumorphism data-[state=on]:scale-105 transition-all duration-200 text-sm sm:text-base min-w-[90px]">{t('pokerGrid.filters.fold')}</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {/* Legenda */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-premium rounded shadow-glow"></div>
          <span className="text-foreground font-body">{t('pokerGrid.legend.premium')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-strong rounded shadow-neumorphism"></div>
          <span className="text-foreground font-body">{t('pokerGrid.legend.strong')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-situational rounded shadow-glow-accent"></div>
          <span className="text-foreground font-body">{t('pokerGrid.legend.situational')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-weak rounded shadow-neumorphism"></div>
          <span className="text-foreground font-body">{t('pokerGrid.legend.weak')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 hand-fold rounded shadow-neumorphism"></div>
          <span className="text-foreground font-body">{t('pokerGrid.legend.fold')}</span>
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

              // Prioriza a coloração por Posição se o filtro de posição estiver ativo
              const colorClass = getPositionActionColor(handData, positionFilter);
              
              // Se o filtro de Categoria estiver ativo (e o filtro de Posição for 'ALL'), aplica o filtro
              if (positionFilter === 'ALL' && categoryFilter && handData.category !== categoryFilter) {
                return null;
              }
              // Se a mão for marcada como FOLD pelo filtro de Posição, a cor é 'hand-fold'

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
              <span className="text-foreground font-heading">{t('pokerGrid.pagination.page')} {currentPage + 1} {t('pokerGrid.pagination.of')} {totalPages}</span>
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

                // Prioriza a coloração por Posição se o filtro de posição estiver ativo
                const colorClass = getPositionActionColor(handData, positionFilter);

                // Aplica o filtro de Categoria apenas se o filtro de Posição for 'ALL'
                if (positionFilter === 'ALL' && categoryFilter && handData.category !== categoryFilter) {
                    return null;
                }
                
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
        <div className="mb-2 font-heading">{t('pokerGrid.positions.title')}</div>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="font-body"><strong>{t('pokerGrid.positions.ep')}:</strong> {t('pokerGrid.positions.epFull')}</span>
          <span className="font-body"><strong>{t('pokerGrid.positions.mp')}:</strong> {t('pokerGrid.positions.mpFull')}</span>
          <span className="font-body"><strong>{t('pokerGrid.positions.lp')}:</strong> {t('pokerGrid.positions.lpFull')}</span>
          <span className="font-body"><strong>{t('pokerGrid.positions.blinds')}:</strong> {t('pokerGrid.positions.blindsFull')}</span>
        </div>
      </div>
      
      <HandDetailsModal 
        hand={selectedHand} 
        onClose={() => setSelectedHand(null)} 
      />
    </div>
  );
};