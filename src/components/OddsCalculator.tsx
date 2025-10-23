// src/components/OddsCalculator.tsx

import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calculator, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CalculationResult {
  outs: number;
  potOdds: string;
  equityRequired: string;
  hitOddsFlop: string;
  hitOddsTurn: string;
  recommendation: string;
}

const OddsCalculator: React.FC = () => {
  const { t } = useTranslation();
  // Inicialização com string vazia para controle do input
  const [outs, setOuts] = useState<number | string>('');
  const [potSize, setPotSize] = useState<number | string>('');
  const [betSize, setBetSize] = useState<number | string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateOdds = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Converte e valida os valores
    const nOuts = parseInt(String(outs), 10);
    const nPotSize = parseFloat(String(potSize));
    const nBetSize = parseFloat(String(betSize));

    // Validação de inputs
    if (
      isNaN(nOuts) || nOuts < 1 || nOuts > 20 || // Outs válidos (1 a 20)
      isNaN(nPotSize) || nPotSize <= 0 ||
      isNaN(nBetSize) || nBetSize <= 0
    ) {
      setError(t('calculator.results.warning'));
      return;
    }

    // 1. Cálculo do Pot Odds e Equity Necessária
    // Pote Total = Pote Atual + Aposta a Pagar
    const totalPotAfterCall = nPotSize + nBetSize;
    
    // Pot Odds Ratio: Aposta a Pagar / Pote Total
    const potOddsRatio = nBetSize / totalPotAfterCall;
    const equityRequired = potOddsRatio * 100; // Equity em %

    // 2. Probabilidade de Acerto (Regra do 4 e do 2)
    const hitOddsFlop = nOuts * 4; // Flop to River (2 cartas)
    const hitOddsTurn = nOuts * 2; // Turn to River (1 carta)

    // 3. Recomendação
    // A recomendação mais conservadora é baseada na chance de acerto no Turn (regra do 2), que é a mais imediata para decisões de CALL.
    const hitOddsVsPot = hitOddsTurn; // Usamos regra do 2 para 1 carta, que é mais segura para call/fold.
    
    // Critério: Se a chance de acerto (Hit Odds) for maior ou igual à Equity Mínima.
    const isProfitable = hitOddsVsPot >= equityRequired; 

    setResult({
      outs: nOuts,
      // Pot Odds formatado como Bet:Pote para facilitar a leitura.
      potOdds: `${nBetSize.toFixed(0)}:${(totalPotAfterCall - nBetSize).toFixed(0)}`, 
      equityRequired: `${equityRequired.toFixed(2)}%`,
      hitOddsFlop: `${hitOddsFlop.toFixed(2)}%`,
      hitOddsTurn: `${hitOddsTurn.toFixed(2)}%`,
      recommendation: isProfitable ? t('calculator.results.call') : t('calculator.results.fold'),
    });
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-title font-title text-foreground mb-2 flex items-center justify-center gap-2">
          <span className="suit-diamonds"></span>
          {t('calculator.title')}
          <span className="suit-hearts"></span>
        </h2>
        <p className="text-muted-foreground font-body">{t('calculator.subtitle')}</p>
      </div>

      <Card className="bg-gradient-card border border-secondary/30 shadow-neumorphism p-8">
        <form onSubmit={calculateOdds} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Input: Número de Outs */}
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading">{t('calculator.outs')}</label>
              <Input
                type="number"
                min={1}
                max={20}
                placeholder="Ex: 8 (para Straight ou Flush)"
                value={outs}
                onChange={(e) => setOuts(e.target.value)}
                className="bg-card text-foreground focus:ring-accent focus:border-accent"
              />
            </div>

            {/* Input: Tamanho do Pote */}
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading">{t('calculator.potSize')}</label>
              <Input
                type="number"
                min={1}
                placeholder="Ex: 100"
                value={potSize}
                onChange={(e) => setPotSize(e.target.value)}
                className="bg-card text-foreground focus:ring-accent focus:border-accent"
              />
            </div>

            {/* Input: Aposta a Pagar */}
            <div className="flex flex-col">
              <label className="block text-foreground mb-2 font-heading">{t('calculator.betSize')}</label>
              <Input
                type="number"
                min={1}
                placeholder="Ex: 25"
                value={betSize}
                onChange={(e) => setBetSize(e.target.value)}
                className="bg-card text-foreground focus:ring-accent focus:border-accent"
              />
            </div>
          </div>
          
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-400 font-body">
              <XCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-orange-gold hover:bg-gradient-orange-gold/90 text-white font-heading py-5 px-6 rounded-lg shadow-glow hover:shadow-glow transition-all duration-200 text-lg hover:scale-105 min-h-[56px] flex items-center justify-center gap-2"
          >
            <Calculator className="h-5 w-5" />
            {t('calculator.calculateButton')}
          </Button>
        </form>

        {result && (
          <div className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl font-heading text-secondary text-center">{t('calculator.results.title')}</CardTitle>
              <Separator className="bg-secondary/50 my-2" />
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              
              {/* Recomendação */}
              <div className="p-4 rounded-lg text-center font-title text-2xl" style={{ 
                backgroundColor: result.recommendation.startsWith('CALL') ? 'rgba(26, 71, 42, 0.7)' : 'rgba(150, 20, 20, 0.7)',
                color: result.recommendation.startsWith('CALL') ? '#e8f5e8' : '#f8d7da',
                border: result.recommendation.startsWith('CALL') ? '1px solid #1a472a' : '1px solid #842029',
              }}>
                {t('calculator.results.recommendation')} 
                <span className="text-accent ml-2">{result.recommendation.split('/')[0].trim()}</span>
              </div>
              
              {/* Resultados em Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                
                {/* Outs */}
                <div className="p-3 bg-card/70 rounded-md border border-border">
                  <div className="text-xl font-title text-accent">{result.outs}</div>
                  <div className="text-sm text-muted-foreground font-body mt-1">{t('calculator.outs')}</div>
                </div>

                {/* Pot Odds */}
                <div className="p-3 bg-card/70 rounded-md border border-border">
                  <div className="text-xl font-title text-secondary">{result.potOdds}</div>
                  <div className="text-sm text-muted-foreground font-body mt-1">{t('calculator.results.potOdds')}</div>
                </div>
                
                {/* Equity Mínima */}
                <div className="p-3 bg-card/70 rounded-md border border-border">
                  <div className="text-xl font-title text-primary-foreground">{result.equityRequired}</div>
                  <div className="text-sm text-muted-foreground font-body mt-1">{t('calculator.results.potOddsBreakdown')}</div>
                </div>
                
                {/* Hit Odds (Flop -> River) */}
                <div className="p-3 bg-card/70 rounded-md border border-border">
                  <div className="text-xl font-title text-accent">{result.hitOddsFlop}</div>
                  <div className="text-sm text-muted-foreground font-body mt-1">{t('calculator.results.hitOddsFlop')}</div>
                </div>
              </div>
              
              <div className="text-center text-xs text-muted-foreground pt-2">
                 *Os cálculos de probabilidade (Hit Odds) utilizam a Regra do 4 e do 2 (Outs x 4 do Flop para o River, Outs x 2 do Turn para o River) para uma estimativa rápida.
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </section>
  );
};

export default OddsCalculator;