import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Tabela' },
  { to: '/glossario', label: 'Glossário' },
  { to: '/simulador', label: 'Simulador' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-950/90 border-b border-green-800 shadow-md backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2">
        <div className="flex items-center gap-2">
          <img src="/poker-logo.png" alt="Logo" className="h-9 w-9 sm:h-8 sm:w-8 mr-0 sm:mr-2" />
          <span className="hidden sm:inline text-yellow-400 font-bold text-lg tracking-wide whitespace-nowrap">Poker Hand Advisor Pro</span>
        </div>
        <div className="flex gap-1 sm:gap-4">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 sm:py-1.5 rounded-lg font-semibold transition-colors text-sm sm:text-base ${location.pathname === item.to ? 'bg-yellow-500 text-green-900 shadow' : 'text-yellow-200 hover:bg-yellow-400/20 hover:text-yellow-300'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 