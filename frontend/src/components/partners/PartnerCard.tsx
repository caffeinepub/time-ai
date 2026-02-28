import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { ConnectionStatus, ApiCredentialField } from '@/types/partners';
import { APIKeyManager } from './APIKeyManager';

interface PartnerCardProps {
  name: string;
  description: string;
  icon: string;
  connectionStatus: ConnectionStatus;
  category: string;
  onConnect: () => void;
  onViewDetails: () => void;
  isConnecting?: boolean;
  isEnabled?: boolean;
  onToggleEnabled?: () => void;
  apiCredentials?: ApiCredentialField[];
  credentials?: Record<string, string>;
  onCredentialChange?: (fieldName: string, value: string) => void;
  partnerId?: string;
}

export function PartnerCard({
  name,
  description,
  icon,
  connectionStatus,
  category,
  onConnect,
  onViewDetails,
  isConnecting = false,
  isEnabled = false,
  onToggleEnabled,
  apiCredentials = [],
  credentials = {},
  onCredentialChange,
  partnerId = '',
}: PartnerCardProps) {
  const IconComponent = (Icons[icon as keyof typeof Icons] as LucideIcon) || Icons.Box;

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Connected</Badge>;
      case 'connecting':
        return <Badge variant="secondary" className="bg-yellow-600 hover:bg-yellow-700">Connecting</Badge>;
      case 'not_connected':
      default:
        return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...';
    if (connectionStatus === 'connected') return 'View Details';
    return 'Connect';
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
      onClick={onViewDetails}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`enable-${name}`} 
              checked={isEnabled}
              onCheckedChange={(checked) => {
                if (onToggleEnabled) {
                  onToggleEnabled();
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <label
              htmlFor={`enable-${name}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Enable {name}
            </label>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{category}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>

        {/* API Credentials Section - Always Visible */}
        {apiCredentials.length > 0 && (
          <div className="pt-4 border-t space-y-3" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-sm font-semibold text-foreground">API Credentials</h4>
            {apiCredentials.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={`${name}-${field.name}`} className="text-xs">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                <Input
                  id={`${name}-${field.name}`}
                  type={field.type}
                  placeholder={field.label}
                  value={credentials[field.name] || ''}
                  onChange={(e) => {
                    if (onCredentialChange) {
                      onCredentialChange(field.name, e.target.value);
                    }
                  }}
                  className="h-8 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
                {field.helperText && (
                  <p className="text-xs text-muted-foreground">{field.helperText}</p>
                )}
              </div>
            ))}
            
            {/* API Key Manager Component */}
            <APIKeyManager
              partnerId={partnerId}
              partnerName={name}
              credentials={credentials}
              apiCredentials={apiCredentials}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3 pt-4 border-t">
        {getStatusBadge()}
        <Button
          size="sm"
          variant={connectionStatus === 'connected' ? 'outline' : 'default'}
          disabled={isConnecting}
          onClick={(e) => {
            e.stopPropagation();
            onConnect();
          }}
          aria-label={getButtonText()}
        >
          {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
}
