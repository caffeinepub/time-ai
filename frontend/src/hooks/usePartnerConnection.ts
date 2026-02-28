import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { ConnectionStatus } from '@/types/partners';

interface ConnectionState {
  [partnerId: string]: ConnectionStatus;
}

interface LoadingState {
  [partnerId: string]: boolean;
}

export function usePartnerConnection() {
  const [connectionStates, setConnectionStates] = useState<ConnectionState>(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('partner-connections');
    return stored ? JSON.parse(stored) : {};
  });

  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const connectPartner = useCallback(async (partnerId: string, partnerName: string) => {
    setLoadingStates((prev) => ({ ...prev, [partnerId]: true }));
    
    // Optimistic update
    setConnectionStates((prev) => {
      const newState = { ...prev, [partnerId]: 'connecting' as ConnectionStatus };
      localStorage.setItem('partner-connections', JSON.stringify(newState));
      return newState;
    });

    // Simulate API call with random failure
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const shouldFail = Math.random() < 0.1; // 10% failure rate

    if (shouldFail) {
      setConnectionStates((prev) => {
        const newState = { ...prev, [partnerId]: 'not_connected' as ConnectionStatus };
        localStorage.setItem('partner-connections', JSON.stringify(newState));
        return newState;
      });
      toast.error(`Failed to connect to ${partnerName}`, {
        description: 'Please check your credentials and try again.',
      });
    } else {
      setConnectionStates((prev) => {
        const newState = { ...prev, [partnerId]: 'connected' as ConnectionStatus };
        localStorage.setItem('partner-connections', JSON.stringify(newState));
        return newState;
      });
      toast.success(`Successfully connected to ${partnerName}`, {
        description: 'Your integration is now active.',
      });
    }

    setLoadingStates((prev) => ({ ...prev, [partnerId]: false }));
  }, []);

  const disconnectPartner = useCallback(async (partnerId: string, partnerName: string) => {
    setLoadingStates((prev) => ({ ...prev, [partnerId]: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setConnectionStates((prev) => {
      const newState = { ...prev, [partnerId]: 'not_connected' as ConnectionStatus };
      localStorage.setItem('partner-connections', JSON.stringify(newState));
      return newState;
    });

    toast.success(`Disconnected from ${partnerName}`);
    setLoadingStates((prev) => ({ ...prev, [partnerId]: false }));
  }, []);

  const getConnectionStatus = useCallback(
    (partnerId: string): ConnectionStatus => {
      return connectionStates[partnerId] || 'not_connected';
    },
    [connectionStates]
  );

  const isConnecting = useCallback(
    (partnerId: string): boolean => {
      return loadingStates[partnerId] || false;
    },
    [loadingStates]
  );

  return {
    connectionStates,
    loadingStates,
    connectPartner,
    disconnectPartner,
    getConnectionStatus,
    isConnecting,
  };
}
