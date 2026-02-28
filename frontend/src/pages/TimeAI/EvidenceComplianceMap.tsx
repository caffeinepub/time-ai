import { useState } from 'react';
import { Shield, FileCheck, Clock, Plus, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Separator } from '../../components/ui/separator';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import {
  useWorkflowRuns,
  useWorkflowRunEvidence,
  formatTimestamp,
  parseControlFromDescription,
} from '../../hooks/useWorkflowEvidence';
import { complianceFrameworks, getFrameworkById } from '../../content/complianceFrameworks';
import { WorkflowRunCreateDialog } from '../../components/timeai/WorkflowRunCreateDialog';
import { EvidenceItemForm } from '../../components/timeai/EvidenceItemForm';
import { NotaryProofDetails } from '../../components/timeai/NotaryProofDetails';
import type { WorkflowRun, EvidenceItem } from '../../backend';

export function EvidenceComplianceMap() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [selectedFramework, setSelectedFramework] = useState<string>('eu-ai-act');
  const [selectedRun, setSelectedRun] = useState<WorkflowRun | null>(null);
  const [showAddEvidence, setShowAddEvidence] = useState(false);

  const { data: workflowRuns, isLoading: runsLoading } = useWorkflowRuns();
  const { data: runEvidence, isLoading: evidenceLoading } = useWorkflowRunEvidence(
    selectedRun?.id || null
  );

  const framework = getFrameworkById(selectedFramework);

  // Group evidence by control
  const evidenceByControl = new Map<string, EvidenceItem[]>();
  if (runEvidence) {
    runEvidence.forEach((item) => {
      const controlId = parseControlFromDescription(item.description);
      if (controlId) {
        const existing = evidenceByControl.get(controlId) || [];
        evidenceByControl.set(controlId, [...existing, item]);
      }
    });
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Authentication Required
            </h3>
            <p className="text-muted-foreground">
              Please log in to access the Evidence & Compliance Map
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-amber-600 dark:text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Evidence & Compliance Map
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Automatically generate audit-ready evidence for enterprise AI workflows. 
          Map evidence to compliance frameworks including EU AI Act and ISO 42001.
        </p>
      </div>

      {/* Framework Selector */}
      <Card className="mb-6 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium text-foreground whitespace-nowrap">
              Compliance Framework:
            </Label>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="max-w-xs bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {complianceFrameworks.map((fw) => (
                  <SelectItem key={fw.id} value={fw.id}>
                    {fw.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {framework && (
              <span className="text-sm text-muted-foreground">
                {framework.description}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Runs List */}
        <Card className="lg:col-span-1 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Workflow Runs</CardTitle>
              <WorkflowRunCreateDialog />
            </div>
          </CardHeader>
          <CardContent>
            {runsLoading && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Loading workflow runs...
              </p>
            )}

            {!runsLoading && (!workflowRuns || workflowRuns.length === 0) && (
              <div className="text-center py-8">
                <FileCheck className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No workflow runs yet. Create your first one!
                </p>
              </div>
            )}

            {!runsLoading && workflowRuns && workflowRuns.length > 0 && (
              <div className="space-y-2">
                {workflowRuns.map((run) => (
                  <Card
                    key={run.id.toString()}
                    className={`cursor-pointer transition-colors hover:bg-accent/10 ${
                      selectedRun?.id === run.id
                        ? 'border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                    onClick={() => setSelectedRun(run)}
                  >
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        {run.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(run.timestamp)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workflow Run Details */}
        <Card className="lg:col-span-2 border-neutral-200 dark:border-neutral-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {selectedRun ? selectedRun.name : 'Select a Workflow Run'}
              </CardTitle>
              {selectedRun && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddEvidence(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Evidence
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selectedRun && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Select a workflow run from the list to view compliance controls and evidence
                </p>
              </div>
            )}

            {selectedRun && evidenceLoading && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Loading evidence...
              </p>
            )}

            {selectedRun && !evidenceLoading && framework && (
              <div className="space-y-4">
                {/* Controls List */}
                {framework.controls.map((control) => {
                  const evidence = evidenceByControl.get(control.id) || [];
                  const hasEvidence = evidence.length > 0;

                  return (
                    <Card
                      key={control.id}
                      className={`border ${
                        hasEvidence
                          ? 'border-green-600/30 dark:border-green-500/30 bg-green-50/50 dark:bg-green-950/20'
                          : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {hasEvidence ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-neutral-400 dark:text-neutral-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm text-foreground">
                                {control.title}
                              </h4>
                              <Badge
                                variant={hasEvidence ? 'default' : 'outline'}
                                className={
                                  hasEvidence
                                    ? 'bg-green-600 dark:bg-green-700 text-white'
                                    : 'text-neutral-600 dark:text-neutral-400'
                                }
                              >
                                {hasEvidence ? 'Has Evidence' : 'Missing'}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              {control.description}
                            </p>

                            {/* Evidence Items */}
                            {hasEvidence && (
                              <div className="mt-3 space-y-2">
                                <Separator className="my-2" />
                                <p className="text-xs font-medium text-foreground">
                                  Evidence ({evidence.length}):
                                </p>
                                {evidence.map((item) => {
                                  // Remove control tag from display
                                  const displayDescription = item.description.replace(
                                    /\[CONTROL:[^\]]+\]\s*/,
                                    ''
                                  );

                                  return (
                                    <div
                                      key={item.id.toString()}
                                      className="pl-3 border-l-2 border-amber-600 dark:border-amber-500"
                                    >
                                      <p className="text-xs text-foreground mb-1">
                                        {displayDescription}
                                      </p>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{formatTimestamp(item.timestamp)}</span>
                                      </div>
                                      <NotaryProofDetails
                                        notarizationRecordId={item.notarizationRecordId || null}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Evidence Dialog */}
      <Dialog open={showAddEvidence} onOpenChange={setShowAddEvidence}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Evidence to {selectedRun?.name}</DialogTitle>
          </DialogHeader>
          {framework && (
            <EvidenceItemForm
              controls={framework.controls}
              onSuccess={() => setShowAddEvidence(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
