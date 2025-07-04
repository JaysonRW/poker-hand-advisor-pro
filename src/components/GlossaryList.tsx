import React from 'react';
import GlossaryTerm from './GlossaryTerm';
import { glossary } from './GlossaryData';
import { Link } from 'react-router-dom';

const GlossaryList: React.FC = () => {
  const sortedGlossary = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <section className="w-full max-w-2xl mx-auto mt-12 px-2">
      <div className="flex justify-start mb-6">
        <Link to="/" className="inline-block bg-green-700 hover:bg-green-600 text-yellow-200 font-bold py-2 px-6 rounded-lg shadow-lg transition-colors text-base">← Voltar para Tabela</Link>
      </div>
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">Glossário de Poker</h2>
      <div className="bg-green-900/80 border border-green-700 rounded-lg shadow-lg p-6">
        <ul className="space-y-4">
          {sortedGlossary.map(({ term, description }) => (
            <li key={term} className="flex flex-col sm:flex-row sm:items-center gap-1">
              <GlossaryTerm term={term} description={description} />
              <span className="text-green-100 text-sm sm:ml-2">{description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GlossaryList; 