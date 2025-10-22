import React, { useState } from 'react';
import GlossaryTerm from './GlossaryTerm';
import { glossary } from './GlossaryData';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const GlossaryList: React.FC = () => {
  const sortedGlossary = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const toggleExpanded = (term: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(term)) {
      newExpanded.delete(term);
    } else {
      newExpanded.add(term);
    }
    setExpandedTerms(newExpanded);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-12 px-4">
      <div className="flex justify-start mb-8">
        <Link to="/" className="inline-block bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground font-heading py-3 px-6 rounded-lg shadow-glow transition-all duration-200 hover:scale-105">
          ← Voltar para Tabela
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-title font-title text-foreground mb-2 flex items-center justify-center gap-2">
          <span className="suit-spades"></span>
          Glossário de Poker
          <span className="suit-hearts"></span>
        </h2>
        <p className="text-muted-foreground font-body">Termos essenciais para dominar o poker</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedGlossary.map(({ term, description }) => {
          const isExpanded = expandedTerms.has(term);
          const getSuitIcon = (index: number) => {
            const suits = ['suit-spades', 'suit-hearts', 'suit-diamonds', 'suit-clubs'];
            return suits[index % 4];
          };
          
          return (
            <Card 
              key={term} 
              className="bg-gradient-card border border-border shadow-neumorphism interactive-card"
            >
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => toggleExpanded(term)}
              >
                <CardTitle className="text-lg text-foreground flex items-center justify-between font-heading">
                  <div className="flex items-center gap-2">
                    <span className={getSuitIcon(sortedGlossary.indexOf({ term, description }))}></span>
                    <GlossaryTerm term={term} description={description} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="pro-tip-badge text-xs">Term</span>
                    {isExpanded ? (
                      <ChevronUp className="text-accent" size={20} />
                    ) : (
                      <ChevronDown className="text-accent" size={20} />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="bg-card/50 rounded-lg p-4 border border-border">
                    <p className="text-foreground font-body leading-relaxed">{description}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default GlossaryList; 