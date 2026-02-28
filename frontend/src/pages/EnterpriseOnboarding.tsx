import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useMyEnterpriseOnboardingRequests,
  useSubmitEnterpriseOnboardingRequest,
  useAllEnterpriseOnboardingRequests,
  useUpdateEnterpriseRequestStatus,
  useIsCallerAdmin,
} from '../hooks/useEnterpriseOnboarding';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { InlineAuthGate } from '../components/auth/InlineAuthGate';
import { AuthActionCTA } from '../components/auth/AuthActionCTA';
import { Building2, Rocket, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import { Variant_pending_approved_rejected, type EnterpriseOnboardingRequest } from '../backend';
import { toast } from 'sonner';

export function EnterpriseOnboarding() {
  const { identity, isInitializing } = useInternetIdentity();
  const [company, setCompany] = useState('');
  const [contract, setContract] = useState('');

  const submitMutation = useSubmitEnterpriseOnboardingRequest();
  const myRequestsQuery = useMyEnterpriseOnboardingRequests();
  const isAdminQuery = useIsCallerAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !contract.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitMutation.mutateAsync({ company: company.trim(), contract: contract.trim() });
      setCompany('');
      setContract('');
    } catch (error) {
      // Error already handled by mutation
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  const getStatusBadge = (status: Variant_pending_approved_rejected) => {
    switch (status) {
      case Variant_pending_approved_rejected.pending:
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case Variant_pending_approved_rejected.approved:
        return (
          <Badge className="gap-1 bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case Variant_pending_approved_rejected.rejected:
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Enterprise Onboarding & Deployment</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Submit your enterprise onboarding request to integrate TIME AI into your organization's infrastructure.
        </p>
      </div>

      {/* Overview Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            What is Enterprise Onboarding?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Our Enterprise Onboarding & Deployment system makes TIME AI plug-and-play for companies, reducing friction
            and accelerating time-to-value. Submit your request below to begin the integration process.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Fast Integration</h3>
              <p className="text-sm text-muted-foreground">
                Streamlined deployment process designed for enterprise environments
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Dedicated Support</h3>
              <p className="text-sm text-muted-foreground">
                Expert guidance throughout the onboarding and deployment journey
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Built to scale with your organization's growing needs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submit Onboarding Request</CardTitle>
          <CardDescription>Provide your company details and contract information to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <InlineAuthGate message="Please log in to submit an enterprise onboarding request">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="Enter your company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contract">Contract Details *</Label>
                <Textarea
                  id="contract"
                  placeholder="Provide contract details, requirements, or any specific integration needs..."
                  value={contract}
                  onChange={(e) => setContract(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" disabled={submitMutation.isPending} className="w-full">
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </form>
          </InlineAuthGate>
        </CardContent>
      </Card>

      {/* My Requests Section */}
      {!isInitializing && identity && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Onboarding Requests</CardTitle>
            <CardDescription>Track the status of your submitted requests</CardDescription>
          </CardHeader>
          <CardContent>
            {myRequestsQuery.isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : myRequestsQuery.data && myRequestsQuery.data.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequestsQuery.data.map((request) => (
                      <TableRow key={request.id.toString()}>
                        <TableCell className="font-medium">{request.company}</TableCell>
                        <TableCell>{formatTimestamp(request.timestamp)}</TableCell>
                        <TableCell>{getStatusBadge(request.onboardingStatus)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No requests submitted yet</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Admin Section */}
      {!isInitializing && identity && isAdminQuery.data && <AdminSection />}
    </div>
  );
}

function AdminSection() {
  const allRequestsQuery = useAllEnterpriseOnboardingRequests();
  const updateStatusMutation = useUpdateEnterpriseRequestStatus();
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editStatus, setEditStatus] = useState<Variant_pending_approved_rejected>(
    Variant_pending_approved_rejected.pending
  );
  const [editNotes, setEditNotes] = useState('');

  const handleEdit = (request: EnterpriseOnboardingRequest) => {
    setEditingId(request.id);
    setEditStatus(request.onboardingStatus);
    setEditNotes(request.notes);
  };

  const handleSave = async (id: bigint) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: editStatus, notes: editNotes });
      setEditingId(null);
    } catch (error) {
      // Error already handled by mutation
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditStatus(Variant_pending_approved_rejected.pending);
    setEditNotes('');
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  const getStatusBadge = (status: Variant_pending_approved_rejected) => {
    switch (status) {
      case Variant_pending_approved_rejected.pending:
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case Variant_pending_approved_rejected.approved:
        return (
          <Badge className="gap-1 bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case Variant_pending_approved_rejected.rejected:
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  return (
    <Card className="border-amber-200 dark:border-amber-900">
      <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
        <CardTitle className="text-amber-900 dark:text-amber-100">Admin: All Onboarding Requests</CardTitle>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          Manage and update enterprise onboarding requests
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {allRequestsQuery.isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : allRequestsQuery.data && allRequestsQuery.data.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRequestsQuery.data.map((request) => (
                  <TableRow key={request.id.toString()}>
                    <TableCell className="font-medium">{request.company}</TableCell>
                    <TableCell className="font-mono text-xs">{request.user.toString().slice(0, 12)}...</TableCell>
                    <TableCell>{formatTimestamp(request.timestamp)}</TableCell>
                    <TableCell>
                      {editingId === request.id ? (
                        <Select
                          value={editStatus}
                          onValueChange={(value) => setEditStatus(value as Variant_pending_approved_rejected)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Variant_pending_approved_rejected.pending}>Pending</SelectItem>
                            <SelectItem value={Variant_pending_approved_rejected.approved}>Approved</SelectItem>
                            <SelectItem value={Variant_pending_approved_rejected.rejected}>Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        getStatusBadge(request.onboardingStatus)
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === request.id ? (
                        <Textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Internal notes..."
                          rows={2}
                          className="min-w-[200px]"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{request.notes || 'No notes'}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === request.id ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSave(request.id)}
                            disabled={updateStatusMutation.isPending}
                          >
                            {updateStatusMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              'Save'
                            )}
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(request)}>
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No requests found</p>
        )}
      </CardContent>
    </Card>
  );
}
