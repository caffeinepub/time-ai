/**
 * Component for displaying proof verification results
 */

import React, { useState } from 'react';
import { VerificationResult } from '@/types/proof';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VerificationStatusBadge } from './VerificationStatusBadge';
import { User, Layers, Shield, Clock, FileText, ChevronDown, ChevronUp, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProofVerificationResultProps {
  result: VerificationResult;
}

export function ProofVerificationResult({ result }: ProofVerificationResultProps) {
  const [showSignatureComparison, setShowSignatureComparison] = useState(false);
  
  const formatTimestamp = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
    } catch {
      return isoString;
    }
  };
  
  const cardBorderClass = result.isValid
    ? 'border-green-200 dark:border-green-800'
    : 'border-red-200 dark:border-red-800';
  
  return (
    <div className="space-y-6">
      {/* Status Badge */}
      <div className="flex justify-center">
        <VerificationStatusBadge isValid={result.isValid} />
      </div>
      
      {/* Verification Message */}
      <Alert variant={result.isValid ? 'default' : 'destructive'}>
        <AlertDescription className="text-base">
          {result.message}
        </AlertDescription>
      </Alert>
      
      {/* Proof Metadata */}
      <Card className={cardBorderClass}>
        <CardHeader>
          <CardTitle className="text-xl">Proof Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Agent Name */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Agent Name</p>
              <p className="text-base font-semibold">{result.proofData.agentName}</p>
            </div>
          </div>
          
          {/* Agent Type */}
          <div className="flex items-start gap-3">
            <Layers className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Agent Type</p>
              <p className="text-base font-semibold">{result.proofData.agentType}</p>
            </div>
          </div>
          
          {/* Verification Status */}
          {result.proofData.verificationStatus && (
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Verification Status</p>
                <p className="text-base font-semibold">{result.proofData.verificationStatus}</p>
              </div>
            </div>
          )}
          
          {/* Capabilities */}
          <div className="flex items-start gap-3">
            <List className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">Capabilities</p>
              {result.proofData.capabilities.length > 0 ? (
                <ul className="space-y-1">
                  {result.proofData.capabilities.map((capability, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {capability}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No capabilities listed</p>
              )}
            </div>
          </div>
          
          {/* Generation Timestamp */}
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Generated On</p>
              <p className="text-base">{formatTimestamp(result.proofData.timestamp)}</p>
            </div>
          </div>
          
          {/* Proof Format */}
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Proof Format</p>
              <Badge variant="outline" className="mt-1">
                {result.proofData.proofFormat.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Signature Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Signature Comparison</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSignatureComparison(!showSignatureComparison)}
            >
              {showSignatureComparison ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Show
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {showSignatureComparison && (
          <CardContent className="space-y-4">
            {/* Original Signature */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Original Signature</p>
              <div className="bg-muted rounded-lg p-3 font-mono text-xs break-all">
                {result.originalSignature}
              </div>
            </div>
            
            {/* Recomputed Signature */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Recomputed Signature</p>
              <div className="bg-muted rounded-lg p-3 font-mono text-xs break-all">
                {result.recomputedSignature}
              </div>
            </div>
            
            {/* Match Status */}
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-2">Signature Match</p>
              {result.isValid ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  ✓ Signatures Match
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                  ✗ Signatures Do Not Match
                </Badge>
              )}
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Verified At Timestamp */}
      <div className="text-center text-sm text-muted-foreground">
        Verified at: {formatTimestamp(result.verifiedAt)}
      </div>
    </div>
  );
}
