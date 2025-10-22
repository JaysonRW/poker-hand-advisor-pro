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
        <Link to="/glossario" className="inline-block bg-gradient-secondary hover:bg-gradient-secondary/90 text-primary font-heading py-3 px-8 rounded-lg shadow-glow hover:shadow-glow transition-all duration-200 text-lg hover:scale-105">Glossário de Poker</Link>
      </div>
      {/* Footer */}
      <footer className="mt-12 text-center text-muted-foreground text-sm pb-8">
  <div className="max-w-4xl mx-auto px-4">
    <p className="mb-2 font-body">
      <strong className="font-heading">Poker Hand Chart</strong> - Ferramenta de apoio para decisões em Texas Hold'em
    </p>
    <p className="text-xs text-muted-foreground/80 font-body">
      Baseado em simulações matemáticas e estratégias profissionais. 
      Use como referência e sempre considere fatores específicos da mesa.
    </p>

    <div className="mt-4 text-xs text-muted-foreground/70 font-body">
      Desenvolvido por{" "}
      <a
        href="https://propagounegocios.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-500 hover:text-amber-400 transition-colors font-semibold"
      >
        propagounegocios.com.br
      </a>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Index;
