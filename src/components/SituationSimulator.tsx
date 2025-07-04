import React, { useState } from 'react';

const positions = [
  { value: 'UTG', label: 'UTG (Under the Gun)' },
  { value: 'MP', label: 'MP (Middle Position)' },
  { value: 'CO', label: 'CO (Cutoff)' },
  { value: 'BTN', label: 'BTN (Button)' },
  { value: 'SB', label: 'SB (Small Blind)' },
  { value: 'BB', label: 'BB (Big Blind)' },
];

const stackOptions = [10, 20, 30, 50, 100];
const gameTypes = [
  { value: 'cash', label: 'Cash Game' },
  { value: 'tournament', label: 'Torneio' },
  { value: 'sitngo', label: 'Sit&Go' },
];

// Lista simplificada de mãos válidas para autocomplete
const validHands = [
  'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
  'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
  'KQs','KJs','KTs','QJs','QTs','JTs',
  'AKo','AQo','AJo','KQo','KJo','QJo',
];

const SituationSimulator: React.FC = () => {
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
    setHandSuggestions(validHands.filter(h => h.startsWith(val) && h !== val));
  };

  // Lógica simples de decisão (exemplo)
  const simulate = () => {
    let action = 'Fold';
    let explanation = 'Mão não recomendada nesta posição.';
    if (['AKs', 'QQ', 'KK', 'AA'].includes(hand) && stack >= 20) {
      action = 'Raise';
      explanation = 'Mão premium, raise recomendado.';
    } else if (['AQs', 'AJs', 'KQs', 'JTs'].includes(hand) && ['CO', 'BTN'].includes(position)) {
      action = 'Raise';
      explanation = 'Mão forte em posição avançada, raise recomendado.';
    } else if (['AQo', 'KQo', 'QJs'].includes(hand) && position === 'BTN') {
      action = 'Raise';
      explanation = 'Mão jogável no botão, raise recomendado.';
    } else if (['22', '33', '44', '55', '66'].includes(hand) && stack >= 30) {
      action = 'Call';
      explanation = 'Pares baixos, bom para set mining com stack profundo.';
    } else if (['SB', 'BB'].includes(position) && ['A2s', 'K9s', 'Q9s'].includes(hand)) {
      action = 'Call';
      explanation = 'Mão marginal, pode defender nas blinds.';
    }
    setResult({ action, explanation });
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
    <section className="w-full max-w-xl mx-auto mt-12 px-2">
      <h2 className="text-xl font-bold text-yellow-400 text-center mb-4">Simulador de Situação</h2>
      <div className="bg-green-900/80 border border-green-700 rounded-lg shadow-lg p-6">
        <form onSubmit={e => { e.preventDefault(); simulate(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="flex flex-col">
              <label className="block text-green-200 mb-1 font-semibold">Tipo de Jogo</label>
              <select value={gameType} onChange={e => setGameType(e.target.value)} className="w-full rounded px-3 py-2 bg-green-800 text-yellow-200 border-green-600 focus:ring-yellow-400">
                {gameTypes.map(gt => <option key={gt.value} value={gt.value}>{gt.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-green-200 mb-1 font-semibold">Posição</label>
              <select value={position} onChange={e => setPosition(e.target.value)} className="w-full rounded px-3 py-2 bg-green-800 text-yellow-200 border-green-600 focus:ring-yellow-400">
                {positions.map(pos => <option key={pos.value} value={pos.value}>{pos.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-green-200 mb-1 font-semibold">Stack (BB)</label>
              <div className="flex gap-2 mb-1 flex-wrap">
                {stackOptions.map(opt => (
                  <button key={opt} type="button" onClick={() => handleStackSelect(opt)} className={`px-2 py-1 rounded bg-green-700 text-yellow-200 font-bold text-xs border border-green-600 hover:bg-yellow-600 hover:text-green-900 transition-colors ${stack === opt ? 'bg-yellow-500 text-green-900' : ''}`}>{opt}bb</button>
                ))}
              </div>
              <input type="number" min={1} max={300} value={stackInput} onChange={e => handleStackInput(e.target.value)} className="w-full rounded px-3 py-2 bg-green-800 text-yellow-200 border-green-600 focus:ring-yellow-400" />
            </div>
            <div className="flex flex-col">
              <label className="block text-green-200 mb-1 font-semibold">Jogadores na Mesa</label>
              <input type="number" min={2} max={10} value={players} onChange={e => setPlayers(Number(e.target.value))} className="w-full rounded px-3 py-2 bg-green-800 text-yellow-200 border-green-600 focus:ring-yellow-400" />
            </div>
            <div className="sm:col-span-2 flex flex-col">
              <label className="block text-green-200 mb-1 font-semibold">Cartas Iniciais (ex: AKs, 99, QJo)</label>
              <div className="relative">
                <input
                  type="text"
                  value={hand}
                  onChange={e => handleHandChange(e.target.value)}
                  className="w-full rounded px-3 py-2 bg-green-800 text-yellow-200 border-green-600 focus:ring-yellow-400"
                  maxLength={3}
                  autoComplete="off"
                  spellCheck={false}
                />
                {handSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 bg-green-900 border border-green-700 rounded shadow-lg z-10 mt-1 max-h-32 overflow-y-auto">
                    {handSuggestions.map(s => (
                      <li
                        key={s}
                        className="px-3 py-1 text-yellow-200 hover:bg-yellow-600 hover:text-green-900 cursor-pointer"
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
          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded-lg transition-colors text-lg">Simular</button>
        </form>
        {result && (
          <div className="mt-6 p-4 rounded-lg bg-green-800/70 border border-green-600 text-center">
            <div className="text-lg font-bold text-yellow-400 mb-2">Ação Recomendada: <span className="text-white">{result.action}</span></div>
            <div className="text-green-200 text-sm">{result.explanation}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SituationSimulator; 