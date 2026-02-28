import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { identity, login, isInitializing, isLoggingIn } = useInternetIdentity();

  const isAuthenticated = !!identity;

  // While initializing, show a minimal loading screen (prevents flash)
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Logged out — show locked panel only
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md shadow-xl border-border">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-display tracking-tight text-foreground">
              TIME AI / TRAV AI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center pb-8 px-8">
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              You are logged out. Please authenticate to access the platform.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              size="lg"
              className="w-full"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Logged in — render the full app
  return <>{children}</>;
}
