import { PokerHandGrid } from '@/components/PokerHandGrid';
import PokerHandsFooter from '@/components/PokerHandsFooter';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen poker-table">
      <div className="container mx-auto py-8">
        <PokerHandGrid />
      </div>
      <PokerHandsFooter />
      <div className="flex justify-center mt-8">
        <Link to="/glossario" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-2 px-6 rounded-lg shadow-lg transition-colors text-lg">Glossário de Poker</Link>
      </div>
      {/* Footer */}
      <footer className="mt-12 text-center text-green-300 text-sm pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">
            <strong>Poker Hand Chart</strong> - Ferramenta de apoio para decisões em Texas Hold'em
          </p>
          <p className="text-xs text-green-400">
            Baseado em simulações matemáticas e estratégias profissionais. 
            Use como referência e sempre considere fatores específicos da mesa.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
