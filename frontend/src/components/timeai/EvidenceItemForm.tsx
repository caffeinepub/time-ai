import { useState } from 'react';
import { FileText, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { useMyNotarizationRecords } from '../../hooks/useQueries';
import { useCreateEvidenceItem, buildDescriptionWithControl } from '../../hooks/useWorkflowEvidence';
import type { ComplianceControl } from '../../content/complianceFrameworks';

interface EvidenceItemFormProps {
  controls: ComplianceControl[];
  onSuccess?: () => void;
}

export function EvidenceItemForm({ controls, onSuccess }: EvidenceItemFormProps) {
  const [description, setDescription] = useState('');
  const [selectedControl, setSelectedControl] = useState<string>('');
  const [selectedNotarizationId, setSelectedNotarizationId] = useState<string>('');

  const { data: notarizationRecords } = useMyNotarizationRecords();
  const createEvidence = useCreateEvidenceItem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !selectedControl) {
      return;
    }

    try {
      const fullDescription = buildDescriptionWithControl(description, selectedControl);
      const notarizationRecordId = selectedNotarizationId
        ? BigInt(selectedNotarizationId)
        : null;

      await createEvidence.mutateAsync({
        description: fullDescription,
        notarizationRecordId,
      });

      // Reset form
      setDescription('');
      setSelectedControl('');
      setSelectedNotarizationId('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create evidence item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="control" className="text-sm font-medium">
          Control / Check <span className="text-destructive">*</span>
        </Label>
        <Select value={selectedControl} onValueChange={setSelectedControl}>
          <SelectTrigger id="control" className="mt-1.5">
            <SelectValue placeholder="Select a control..." />
          </SelectTrigger>
          <SelectContent>
            {controls.map((control) => (
              <SelectItem key={control.id} value={control.id}>
                {control.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Select the compliance control this evidence addresses
        </p>
      </div>

      <div>
        <Label htmlFor="description" className="text-sm font-medium">
          Evidence Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe the evidence and how it addresses the selected control..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1.5 resize-none"
        />
      </div>

      <div>
        <Label htmlFor="notarization" className="text-sm font-medium">
          Link Notarization Record (Optional)
        </Label>
        <Select value={selectedNotarizationId} onValueChange={setSelectedNotarizationId}>
          <SelectTrigger id="notarization" className="mt-1.5">
            <SelectValue placeholder="No notarization record" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No notarization record</SelectItem>
            {notarizationRecords?.map((record) => (
              <SelectItem key={record.id.toString()} value={record.id.toString()}>
                ID: {record.id.toString()} - {record.contentText?.substring(0, 50) || 'No text'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Optionally link an existing notarization record as proof
        </p>
      </div>

      {createEvidence.isError && (
        <Alert variant="destructive">
          <AlertDescription>
            Failed to create evidence item. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!description.trim() || !selectedControl || createEvidence.isPending}
        className="w-full"
      >
        {createEvidence.isPending ? 'Creating...' : 'Add Evidence Item'}
      </Button>
    </form>
  );
}
