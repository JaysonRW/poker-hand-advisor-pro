import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface AccessGateProps {
  onAccessGranted: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onAccessGranted }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const CORRECT_PASSWORD = 'poker@2025';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simular um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === CORRECT_PASSWORD) {
      // Salvar no localStorage para manter o acesso
      localStorage.setItem('pokerAccess', 'granted');
      onAccessGranted();
    } else {
      setError(t('accessGate.errorMessage'));
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-green-800/50 border-green-600 text-white shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/poker-logo.png" 
                alt="Poker Hand Advisor Pro" 
                className="h-20 w-auto"
                onError={(e) => {
                  // Fallback se a imagem não carregar
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <CardTitle className="text-2xl font-bold text-yellow-400 mb-2">
              {t('accessGate.title')}
            </CardTitle>
            <p className="text-green-200 text-sm">
              {t('accessGate.subtitle')}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-300" />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('accessGate.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 bg-green-700/50 border-green-500 text-white placeholder:text-green-300 focus:border-yellow-400 focus:ring-yellow-400"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-300 hover:text-yellow-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {error && (
                <div className="text-red-300 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-md p-2">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? t('accessGate.verifying') : t('accessGate.accessButton')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-green-300 text-xs">
                {t('accessGate.systemDescription')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 