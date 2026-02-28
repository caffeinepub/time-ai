import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router/Router';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import AuthGate from './components/auth/AuthGate';
import AuthDebugStrip from './components/auth/AuthDebugStrip';
import { useAutoInitializeAdmin } from './hooks/useAutoInitializeAdmin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function AppInner() {
  useAutoInitializeAdmin();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthGate>
        <RouterProvider router={router} />
      </AuthGate>
      <Toaster />
      <AuthDebugStrip />
    </ThemeProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <AppInner />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}

export default App;
