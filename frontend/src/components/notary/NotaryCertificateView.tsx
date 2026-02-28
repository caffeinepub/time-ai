import { FileCheck, Clock, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { NotarizationRecord } from '../../backend';
import { hashToHex } from './HashUtils';

interface NotaryCertificateViewProps {
  record: NotarizationRecord;
  onDownload: () => void;
}

export function NotaryCertificateView({ record, onDownload }: NotaryCertificateViewProps) {
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          Notarization Certificate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Certificate Header */}
        <div className="text-center pb-4 border-b border-border">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            AI Notary Certificate
          </h3>
          <p className="text-sm text-muted-foreground">
            World's First AI-Powered Notarization System
          </p>
        </div>

        {/* Record Details */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Verification ID
            </label>
            <p className="text-sm font-mono text-foreground mt-1">
              {record.id.toString()}
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Timestamp
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-accent" />
              <p className="text-sm text-foreground">
                {formatTimestamp(record.timestamp)}
              </p>
            </div>
          </div>

          {record.contentHash && (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Content Hash (SHA-256)
              </label>
              <p className="text-xs font-mono text-foreground mt-1 break-all bg-muted p-2 rounded">
                {hashToHex(new Uint8Array(record.contentHash))}
              </p>
            </div>
          )}

          {record.contentText && (
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Content Preview
              </label>
              <p className="text-sm text-foreground mt-1 bg-muted p-3 rounded max-h-32 overflow-y-auto">
                {record.contentText.substring(0, 200)}
                {record.contentText.length > 200 && '...'}
              </p>
            </div>
          )}
        </div>

        {/* Agent Attestations */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Dual AI Agent Attestations
          </h4>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">TIME AI:</span>
              <Badge variant="outline" className="text-xs">
                Structure Verified
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">TRAV AI:</span>
              <Badge variant="outline" className="text-xs">
                Content Verified
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Manager:</span>
              <Badge variant="outline" className="text-xs">
                Consensus Achieved
              </Badge>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <Button onClick={onDownload} className="w-full" size="lg">
          Download Certificate (JSON)
        </Button>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            This certificate is cryptographically secured and immutably stored on the Internet Computer blockchain.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
