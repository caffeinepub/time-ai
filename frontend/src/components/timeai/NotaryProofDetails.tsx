import { useState } from 'react';
import { FileCheck, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useNotarizationRecord, formatTimestamp } from '../../hooks/useWorkflowEvidence';
import { NotaryCertificateView } from '../notary/NotaryCertificateView';
import { useCertificateDownload } from '../notary/useCertificateDownload';

interface NotaryProofDetailsProps {
  notarizationRecordId: bigint | null;
}

export function NotaryProofDetails({ notarizationRecordId }: NotaryProofDetailsProps) {
  const [showCertificate, setShowCertificate] = useState(false);
  const { data: record, isLoading, isError } = useNotarizationRecord(notarizationRecordId);
  const { downloadCertificate } = useCertificateDownload();

  const handleDownloadCertificate = () => {
    if (record) {
      downloadCertificate(record);
    }
  };

  if (!notarizationRecordId) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No notarization proof attached
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">
        Loading proof details...
      </div>
    );
  }

  if (isError || !record) {
    return (
      <Alert variant="destructive" className="mt-2">
        <AlertCircle className="w-4 h-4" />
        <AlertDescription>
          Referenced notarization record (ID: {notarizationRecordId.toString()}) could not be found or is inaccessible.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Card className="mt-2 border-accent/30 bg-accent/5">
        <CardContent className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Notarization Proof</span>
            <Badge variant="outline" className="ml-auto">
              ID: {record.id.toString()}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatTimestamp(record.timestamp)}</span>
          </div>

          {record.contentText && (
            <div className="text-xs text-muted-foreground line-clamp-2 pt-1 border-t border-border/50">
              {record.contentText}
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCertificate(true)}
            className="w-full mt-2 gap-2"
          >
            <ExternalLink className="w-3 h-3" />
            View Certificate
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Notarization Certificate</DialogTitle>
          </DialogHeader>
          <NotaryCertificateView record={record} onDownload={handleDownloadCertificate} />
        </DialogContent>
      </Dialog>
    </>
  );
}
