import { Partner } from '@/types/partners';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Settings, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface PartnerDetailsDialogProps {
  partner: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
  isConnecting?: boolean;
}

export function PartnerDetailsDialog({
  partner,
  open,
  onOpenChange,
  onConnect,
  isConnecting = false,
}: PartnerDetailsDialogProps) {
  if (!partner) return null;

  const IconComponent = (Icons[partner.icon as keyof typeof Icons] as LucideIcon) || Icons.Box;

  const getStatusBadge = () => {
    switch (partner.connectionStatus) {
      case 'connected':
        return (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case 'connecting':
        return (
          <Badge variant="secondary" className="bg-yellow-600 hover:bg-yellow-700">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Connecting
          </Badge>
        );
      case 'not_connected':
      default:
        return (
          <Badge variant="secondary">
            <XCircle className="w-3 h-3 mr-1" />
            Not Connected
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-lg bg-primary/10">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{partner.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{partner.category}</p>
            </div>
            {getStatusBadge()}
          </div>
          <DialogDescription className="text-base leading-relaxed pt-2">
            {partner.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Integration Capabilities */}
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4" />
              Integration Capabilities
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
              <li>Real-time data synchronization</li>
              <li>Automated workflow triggers</li>
              <li>Compliance and audit logging</li>
              <li>Secure API authentication</li>
            </ul>
          </div>

          {/* Configuration Instructions */}
          {partner.connectionStatus === 'not_connected' && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Configuration Steps</h4>
              <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
                <li>Click "Connect" to initiate the integration</li>
                <li>Authenticate with your {partner.name} account</li>
                <li>Grant necessary permissions for data access</li>
                <li>Configure sync preferences and schedules</li>
              </ol>
            </div>
          )}

          {/* API Documentation */}
          {partner.apiDocUrl && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Developer Resources</h4>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full justify-start"
              >
                <a
                  href={partner.apiDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View API Documentation
                </a>
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={onConnect}
            disabled={isConnecting}
          >
            {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {partner.connectionStatus === 'connected' ? 'Manage Connection' : 'Connect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
