import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { useCreateWorkflowRun } from '../../hooks/useWorkflowEvidence';

interface WorkflowRunCreateDialogProps {
  onSuccess?: () => void;
}

export function WorkflowRunCreateDialog({ onSuccess }: WorkflowRunCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createWorkflowRun = useCreateWorkflowRun();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      await createWorkflowRun.mutateAsync({
        name,
        description,
        evidenceItemIds: [], // Start with empty evidence list
      });

      // Reset form and close dialog
      setName('');
      setDescription('');
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create workflow run:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Workflow Run
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workflow Run</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Workflow Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Q1 2026 Compliance Audit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose of this workflow run..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1.5 resize-none"
            />
          </div>

          {createWorkflowRun.isError && (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to create workflow run. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || createWorkflowRun.isPending}
            >
              {createWorkflowRun.isPending ? 'Creating...' : 'Create Workflow Run'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
