/**
 * Reusable badge component for displaying verification status
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface VerificationStatusBadgeProps {
  isValid: boolean;
}

export function VerificationStatusBadge({ isValid }: VerificationStatusBadgeProps) {
  if (isValid) {
    return (
      <Badge 
        className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-200 text-lg px-6 py-2"
        aria-label="Valid proof"
      >
        <CheckCircle className="h-5 w-5 mr-2" />
        Valid Proof
      </Badge>
    );
  }
  
  return (
    <Badge 
      className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-200 text-lg px-6 py-2"
      aria-label="Invalid proof"
    >
      <XCircle className="h-5 w-5 mr-2" />
      Invalid Proof
    </Badge>
  );
}
