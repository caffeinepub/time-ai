import React from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from 'lucide-react';

export default function PrincipalDisplay() {
  const { identity } = useInternetIdentity();

  if (!identity) {
    return (
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Principal ID
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Not authenticated</p>
        </CardContent>
      </Card>
    );
  }

  const principalId = identity.getPrincipal().toString();

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5 text-primary" />
          Principal ID
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-mono break-all">{principalId}</p>
      </CardContent>
    </Card>
  );
}
