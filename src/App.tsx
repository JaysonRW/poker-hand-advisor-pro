import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AccessGate } from "./components/AccessGate";
import GlossaryList from './components/GlossaryList';
import Navbar from './components/Navbar';
import SituationSimulator from './components/SituationSimulator';
import { LanguageProvider } from './contexts/LanguageContext';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autenticado
    const access = localStorage.getItem('pokerAccess');
    if (access === 'granted') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAccessGranted = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      {!isAuthenticated ? (
        <AccessGate onAccessGranted={handleAccessGranted} />
      ) : (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/glossario" element={<GlossaryList />} />
                <Route path="/simulador" element={<SituationSimulator />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      )}
    </LanguageProvider>
  );
};

export default App;
