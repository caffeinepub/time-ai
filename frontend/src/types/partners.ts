export type PartnerCategory = 'CRM' | 'Payments' | 'Analytics' | 'Data' | 'Communication' | 'Other';

export type ConnectionStatus = 'connected' | 'not_connected' | 'connecting';

export interface ApiCredentialField {
  name: string;
  label: string;
  type: 'text' | 'password';
  required: boolean;
  helperText?: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: PartnerCategory;
  connectionStatus: ConnectionStatus;
  apiDocUrl?: string;
  configOptions?: Record<string, unknown>;
  apiCredentials?: ApiCredentialField[];
}
