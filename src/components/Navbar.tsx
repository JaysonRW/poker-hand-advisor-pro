import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageToggle } from './LanguageToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { to: '/', label: t('navbar.menuItems.table') },
    { to: '/glossario', label: t('navbar.menuItems.glossary') },
    { to: '/simulador', label: t('navbar.menuItems.simulator') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glassmorphism-strong border-b border-secondary/30 shadow-neumorphism">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="/poker-logo.png" alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 shadow-glow pulse-glow" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-secondary rounded-full animate-pulse"></div>
          </div>
          <span className="hidden sm:inline text-secondary font-title tracking-wide whitespace-nowrap text-lg">
            {t('navbar.title')} <span className="text-accent">{t('navbar.titleSuffix')}</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-1 sm:gap-4 items-center">
          <LanguageToggle />
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 rounded-lg bg-card/50 border border-border hover:bg-accent/20 transition-all duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/poker-logo.png" alt="Logo" className="h-12 w-12 shadow-glow" />
                <span className="text-secondary font-title text-xl">
                  {t('navbar.title')} <span className="text-accent">{t('navbar.titleSuffix')}</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-6 w-full max-w-xs">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-4 rounded-xl font-heading transition-all duration-200 text-lg text-center ${
                    location.pathname === item.to 
                      ? 'bg-gradient-secondary text-primary shadow-glow scale-105' 
                      : 'bg-gradient-card text-foreground border border-border hover:bg-accent/20 hover:text-accent hover:scale-105 shadow-neumorphism'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="suit-spades"></span>
                    {item.label}
                    <span className="suit-hearts"></span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <LanguageToggle />
            </div>

            <button
              onClick={toggleMobileMenu}
              className="mt-8 px-6 py-3 rounded-xl bg-gradient-accent text-accent-foreground font-heading shadow-glow-accent hover:scale-105 transition-all duration-200"
            >
              {t('navbar.closeMenu')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 