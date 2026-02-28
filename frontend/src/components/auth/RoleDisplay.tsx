import React, { useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ShieldCheck } from 'lucide-react';

// Admin principal constant
const ADMIN_PRINCIPAL_TEXT = "q5ida-vdwpr-bqbk4-ksxkw-77nif-xmn2v-wevql-eh4j2-urrl2-cd27f-6qe";

export default function RoleDisplay() {
  const { identity } = useInternetIdentity();
  const [principalText, setPrincipalText] = useState<string>('');
  const [role, setRole] = useState<string>('');

  // Compute principal and role whenever identity changes
  useEffect(() => {
    if (identity) {
      const principal = identity.getPrincipal().toText();
      setPrincipalText(principal);
      
      // Compute role based on exact match
      const computedRole = principal === ADMIN_PRINCIPAL_TEXT ? 'Admin' : 'User';
      setRole(computedRole);
    } else {
      setPrincipalText('');
      setRole('');
    }
  }, [identity]);

  if (!identity) {
    return (
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="w-5 h-5" />
            Role Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Not authenticated</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-success/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="w-5 h-5 text-success" />
          Role Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Principal ID:</p>
            <p className="text-sm font-mono break-all">{principalText}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Role:</p>
            <p className="text-sm font-semibold">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
