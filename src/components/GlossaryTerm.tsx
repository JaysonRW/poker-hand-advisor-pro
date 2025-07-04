import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface GlossaryTermProps {
  term: string;
  description: string;
  children?: React.ReactNode;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, description, children }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <span className="underline underline-offset-2 decoration-dotted cursor-help text-yellow-300 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition-colors">
            {children || term}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-green-900 text-yellow-100 border-green-600 shadow-lg text-sm p-3 rounded-lg">
          <span className="font-bold text-yellow-300">{term}</span>
          <div className="mt-1 text-yellow-100">{description}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GlossaryTerm; 