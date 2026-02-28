import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface APIKeyManagerProps {
  partnerId: string;
  partnerName: string;
  credentials: Record<string, string>;
  apiCredentials?: Array<{
    name: string;
    label: string;
    type: 'text' | 'password';
    required: boolean;
    helperText?: string;
  }>;
}

export function APIKeyManager({
  partnerId,
  partnerName,
  credentials,
  apiCredentials = [],
}: APIKeyManagerProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaving(true);
    setTestResult(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Validate required fields
      const missingFields = apiCredentials
        .filter((field) => field.required && !credentials[field.name])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(', ')}`);
        setIsSaving(false);
        return;
      }

      // Save to localStorage (already handled by parent, but we confirm here)
      toast.success('API credentials saved successfully');
    } catch (error) {
      toast.error('Failed to save API credentials. Please try again.', {
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTesting(true);
    setTestResult(null);

    try {
      // Simulate API connection test
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validate required fields first
      const missingFields = apiCredentials
        .filter((field) => field.required && !credentials[field.name])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        setTestResult('error');
        toast.error('Cannot test connection: Missing required fields', {
          duration: 5000,
        });
        setIsTesting(false);
        return;
      }

      // Simulate random success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setTestResult('success');
        toast.success('Connection test successful');
      } else {
        setTestResult('error');
        toast.error('Connection test failed. Please check your credentials.', {
          duration: 5000,
        });
      }
    } catch (error) {
      setTestResult('error');
      toast.error('Connection test failed. Please check your credentials.', {
        duration: 5000,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 pt-3 border-t" onClick={(e) => e.stopPropagation()}>
      <Button
        size="sm"
        variant="outline"
        disabled={isSaving || isTesting}
        onClick={handleSave}
        className="flex-1"
      >
        {isSaving && <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />}
        Save
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={isSaving || isTesting}
        onClick={handleTestConnection}
        className="flex-1"
      >
        {isTesting && <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />}
        {testResult === 'success' && !isTesting && (
          <CheckCircle2 className="w-3 h-3 mr-1.5 text-green-600" />
        )}
        {testResult === 'error' && !isTesting && (
          <XCircle className="w-3 h-3 mr-1.5 text-destructive" />
        )}
        Test Connection
      </Button>
    </div>
  );
}
