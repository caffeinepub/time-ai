import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Lock } from 'lucide-react';

interface AuthActionCTAProps {
  message?: string;
  compact?: boolean;
}

export function AuthActionCTA({ message, compact = false }: AuthActionCTAProps) {
  const { login, loginStatus } = useInternetIdentity();

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-3 p-4 border border-dashed rounded-lg bg-muted/30">
        <Lock className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground text-center">
          {message || 'Log in to access this feature'}
        </p>
        <Button
          onClick={login}
          disabled={loginStatus === 'logging-in'}
          size="sm"
        >
          {loginStatus === 'logging-in' ? 'Logging in...' : 'Log In'}
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Login Required</CardTitle>
        <CardDescription>
          {message || 'Please log in to access this feature'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={login}
          disabled={loginStatus === 'logging-in'}
          className="w-full"
          size="lg"
        >
          {loginStatus === 'logging-in' ? 'Logging in...' : 'Log In'}
        </Button>
      </CardContent>
    </Card>
  );
}
