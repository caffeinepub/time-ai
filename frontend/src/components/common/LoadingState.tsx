import React from 'react';
import { Skeleton } from '../ui/skeleton';

interface LoadingStateProps {
  count?: number;
  className?: string;
}

export function LoadingState({ count = 3, className }: LoadingStateProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={className || 'h-24 w-full'} />
      ))}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
