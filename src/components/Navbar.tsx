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
    <nav className="fixed top-0 left-0 w-full z-50 glassmorphism-strong border-b border-secondary/30 shadow-neumorphism">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/poker-logo.png" alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 shadow-glow pulse-glow" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-secondary rounded-full animate-pulse"></div>
          </div>
          <span className="hidden sm:inline text-secondary font-title tracking-wide whitespace-nowrap text-lg">
            Poker Hand Advisor <span className="text-accent">Pro</span>
          </span>
        </div>
        <div className="flex gap-1 sm:gap-4">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 sm:py-2 rounded-lg font-heading transition-all duration-200 text-sm sm:text-base ${
                location.pathname === item.to 
                  ? 'bg-gradient-secondary text-primary shadow-glow scale-105' 
                  : 'text-foreground hover:bg-accent/20 hover:text-accent hover:scale-105'
              }`}
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