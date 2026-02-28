import React from 'react';
import { useWhoami } from '../../hooks/useWhoami';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Shield, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export default function WhoamiDisplay() {
  const { identity } = useInternetIdentity();
  const { data: whoamiResult, isLoading, error } = useWhoami();

  if (!identity) {
    return (
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5" />
            Backend Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Not authenticated</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5" />
            Backend Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-destructive" />
            Backend Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              Error: {error instanceof Error ? error.message : 'Failed to fetch whoami'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-accent" />
          Backend Verification (whoami)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-mono break-all">{whoamiResult}</p>
      </CardContent>
    </Card>
  );
}
