import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { AuthActionCTA } from './AuthActionCTA';

interface InlineAuthGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  message?: string;
}

export function InlineAuthGate({ children, fallback, message }: InlineAuthGateProps) {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return null;
  }

  if (!identity) {
    return fallback || <AuthActionCTA message={message} />;
  }

  return <>{children}</>;
}
