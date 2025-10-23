// src/components/SituationSimulator.tsx

import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
// Importação da base de dados de mãos
import { pokerHandsData } from '@/data/pokerHands'; 

// Usamos as chaves de tradução em vez dos objetos completos
const positionKeys = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];
const gameTypeKeys = ['cash', 'tournament', 'sitngo'];

const stackOptions = [10, 20, 30, 50, 100];

// Lista simplificada de mãos válidas para autocomplete
const validHands = [
  'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
  'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
  'KQs','KJs','KTs','QJs','QTs','JTs',
  'AKo','AQo','AJo','KQo','KJo','QJo',
];

const SituationSimulator: React.FC = () => {
  const { t } = useTranslation();
  const [position, setPosition] = useState('UTG');
  const [stack, setStack] = useState(50); // em big blinds
  const [stackInput, setStackInput] = useState('50');
  const [players, setPlayers] = useState(6);
  const [hand, setHand] = useState('AKs');
  const [handSuggestions, setHandSuggestions] = useState<string[]>([]);
  const [gameType, setGameType] = useState('cash');
  const [result, setResult] = useState<{action: string, explanation: string} | null>(null);

  // Autocomplete de mãos
  const handleHandChange = (value: string) => {
    const val = value.toUpperCase();
    setHand(val);
    if (val.length === 0) {
      setHandSuggestions([]);
      return;
    }
    // Melhorar a lista de sugestões, filtrando apenas mãos válidas e únicas
    setHandSuggestions(validHands.filter(h => h.startsWith(val) && h !== val));
  };

  // Lógica de decisão refatorada para usar os dados do pokerHandsData e a regra de 60%
  const simulate = () => {
    // Busca os dados da mão, com fallback para uma mão de fold (72o) se não encontrar
    const handData = pokerHandsData[hand] || pokerHandsData['72o'];
    const { winRate, category, positions, recommendation } = handData;

    let action = 'Fold';
    let explanationKey = 'simulator.results.defaultFold';
    
    // 1. Mãos com alta Equity (Premium/Strong) - Acima de 70%
    if (winRate >= 70) {
      // Se for uma mão premium, a ação é Raise na maioria das vezes
      action = 'Raise';
      explanationKey = 'simulator.results.premiumRaise';
    } 
    
    // 2. Mãos Fortes / Mãos Situacionais (Acima de 60%)
    // Verifica a regra de 60% e se a mão é jogável na posição atual
    else if (winRate >= 60) {
        
        // Verifica se a posição atual está na lista de posições recomendadas
        const isPositionRecommended = positions.some(
            // Verifica se a posição é um match exato (BTN)
            p => p === position ||
            // Ou se a posição é um match de grupo (ex: 'Early Position' inclui 'UTG')
            (p === 'Early Position' && ['UTG', 'MP'].includes(position)) ||
            (p === 'Middle Position' && position === 'MP') ||
            (p === 'Late Position' && ['CO', 'BTN'].includes(position)) ||
            (p === 'Blinds' && ['SB', 'BB'].includes(position))
        );

        if (isPositionRecommended) {
            action = recommendation; // Usa a recomendação do banco de dados (Raise/Call)
            explanationKey = 'simulator.results.strongRaise';
        } else {
            // Se a mão é forte (>= 60%) mas a posição é muito ruim (Ex: 99 no UTG)
            action = 'Fold';
            explanationKey = 'simulator.results.defaultFold';
        }
    } 
    
    // 3. Mãos Especulativas (Set mining, etc.) com stack grande
    else if (category === 'situational' && stack >= 50 && positions.length > 0) {
        action = 'Call';
        explanationKey = 'simulator.results.pairCall';
    }
    
    // 4. Default: Fold
    else {
      action = 'Fold';
      explanationKey = 'simulator.results.defaultFold';
    }

    // Traduz a explicação e define o resultado
    setResult({ action, explanation: t(explanationKey) });
  };


  // Atualiza stack ao selecionar opção rápida
  const handleStackSelect = (val: number) => {
    setStack(val);
    setStackInput(val.toString());
  };

  // Atualiza stack ao digitar
  const handleStackInput = (val: string) => {
    setStackInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) setStack(num);
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-title font-title text-foreground mb-2 flex items-center justify-center gap-2">
          <span className="suit-spades"></span>
          {t('simulator.title')}
          <span className="suit-hearts"></span>
        </h2>
        <p className="text-muted-foreground font-body">{t('simulator.subtitle')}</p>
      </div>
      
      <div className="relative">
        {/* Borda dourada animada */}
        <div className="absolute inset-0 bg-gradient-gold-border rounded-xl p-1 animate-pulse"></div>
        <div className="relative bg-gradient-card border border-secondary/30 rounded-xl shadow-neumorphism p-8">
        <form onSubmit={e => { e.preventDefault(); simulate(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading flex items-center gap-2">
                <span className="suit-diamonds"></span>
                {t('simulator.gameType')}
              </label>
              <select 
                value={gameType} 
                onChange={e => setGameType(e.target.value)} 
                className="w-full rounded-lg px-4 py-4 bg-card text-foreground border border-border focus:ring-2 focus:ring-accent focus:border-accent transition-all font-input text-lg min-h-[48px]"
              >
                {/* Correção: Usando o array de chaves e o t() */}
                {gameTypeKeys.map(key => (
                  <option key={key} value={key}>
                    {t(`simulator.gameTypes.${key}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading flex items-center gap-2">
                <span className="suit-clubs"></span>
                {t('simulator.position')}
              </label>
              <select 
                value={position} 
                onChange={e => setPosition(e.target.value)} 
                className="w-full rounded-lg px-4 py-4 bg-card text-foreground border border-border focus:ring-2 focus:ring-accent focus:border-accent transition-all font-input text-lg min-h-[48px]"
              >
                {/* Correção: Usando o array de chaves e o t() */}
                {positionKeys.map(key => (
                  <option key={key} value={key}>
                    {t(`simulator.positions.${key}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading">{t('simulator.stack')}</label>
              <div className="flex gap-2 mb-3 flex-wrap">
                {stackOptions.map(opt => (
                  <button 
                    key={opt} 
                    type="button" 
                    onClick={() => handleStackSelect(opt)} 
                    className={`px-4 py-3 rounded-lg font-heading text-base transition-all duration-200 min-h-[48px] ${
                      stack === opt 
                        ? 'bg-gradient-secondary text-primary shadow-glow scale-105' 
                        : 'bg-card text-foreground border border-border hover:bg-accent/20 hover:scale-105'
                    }`}
                  >
                    {opt}bb
                  </button>
                ))}
              </div>
              <input 
                type="number" 
                min={1} 
                max={300} 
                value={stackInput} 
                onChange={e => handleStackInput(e.target.value)} 
                className="w-full rounded-lg px-4 py-4 bg-card text-foreground border border-border focus:ring-2 focus:ring-accent focus:border-accent transition-all font-input text-lg min-h-[48px]" 
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading">{t('simulator.players')}</label>
              <input 
                type="number" 
                min={2} 
                max={10} 
                value={players} 
                onChange={e => setPlayers(Number(e.target.value))} 
                className="w-full rounded-lg px-4 py-4 bg-card text-foreground border border-border focus:ring-2 focus:ring-accent focus:border-accent transition-all font-input text-lg min-h-[48px]" 
              />
            </div>
            <div className="sm:col-span-2 flex flex-col">
              <label className="block text-foreground mb-2 font-heading flex items-center gap-2">
                <span className="suit-spades"></span>
                {t('simulator.startingHand')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={hand}
                  onChange={e => handleHandChange(e.target.value)}
                  className="w-full rounded-lg px-4 py-4 bg-card text-foreground border border-border focus:ring-2 focus:ring-accent focus:border-accent transition-all font-input text-lg min-h-[48px]"
                  maxLength={3}
                  autoComplete="off"
                  spellCheck={false}
                />
                {handSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 bg-card border border-border rounded-lg shadow-neumorphism z-10 mt-2 max-h-32 overflow-y-auto">
                    {handSuggestions.map(s => (
                      <li
                        key={s}
                        className="px-4 py-2 text-foreground hover:bg-accent/20 cursor-pointer transition-colors font-body"
                        onClick={() => { setHand(s); setHandSuggestions([]); }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-orange-gold hover:bg-gradient-orange-gold/90 text-white font-heading py-5 px-6 rounded-lg shadow-glow hover:shadow-glow transition-all duration-200 text-lg hover:scale-105 min-h-[56px]"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="suit-hearts"></span>
              {t('simulator.simulateButton')}
              <span className="suit-diamonds"></span>
            </span>
          </button>
        </form>
        {result && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-card border border-secondary/30 shadow-neumorphism text-center card-flip">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="pro-tip-badge">{t('simulator.result.proTip')}</span>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-xl font-heading text-foreground mb-3">
              {t('simulator.result.action')} <span className="text-accent font-title">{result.action}</span>
            </div>
            <div className="text-muted-foreground font-body leading-relaxed">{result.explanation}</div>
            
            {/* Chips animadas */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-6 h-6 bg-gradient-secondary rounded-full chip-fall"></div>
              <div className="w-6 h-6 bg-gradient-secondary rounded-full chip-fall" style={{animationDelay: '0.2s'}}></div>
              <div className="w-6 h-6 bg-gradient-secondary rounded-full chip-fall" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default SituationSimulator;