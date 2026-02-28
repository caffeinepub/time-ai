import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Vote, Plus } from 'lucide-react';
import { useProposals, useCreateProposal, useVote } from '../../hooks/useGovernance';
import { toast } from 'sonner';
import { SectionHeader } from '../../components/common/SectionHeader';
import { LoadingState } from '../../components/common/LoadingState';
import { Badge } from '../../components/ui/badge';
import { InlineAuthGate } from '../../components/auth/InlineAuthGate';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export function Governance() {
  const { identity } = useInternetIdentity();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { data: proposals, isLoading } = useProposals();
  const createMutation = useCreateProposal();
  const voteMutation = useVote();

  const handleCreateProposal = () => {
    if (!title || !description) {
      toast.error('Please fill in all fields');
      return;
    }
    createMutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setTitle('');
          setDescription('');
        },
      }
    );
  };

  const handleVote = (proposalId: bigint, support: boolean) => {
    voteMutation.mutate({ proposalId, support });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Governance"
        subtitle="Participate in platform governance and vote on proposals"
        icon={<Vote className="w-8 h-8" />}
      />

      <div className="mb-6 flex justify-end">
        <InlineAuthGate
          fallback={
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              Log In to Create Proposal
            </Button>
          }
        >
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Proposal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Proposal</DialogTitle>
                <DialogDescription>
                  Submit a new governance proposal for community voting
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="proposal-title">Title</Label>
                  <Input
                    id="proposal-title"
                    placeholder="Proposal title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="proposal-description">Description</Label>
                  <Textarea
                    id="proposal-description"
                    placeholder="Describe your proposal..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>
                <Button
                  onClick={handleCreateProposal}
                  disabled={createMutation.isPending}
                  className="w-full"
                >
                  {createMutation.isPending ? 'Creating...' : 'Submit Proposal'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </InlineAuthGate>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <LoadingState count={3} className="h-32" />
        ) : proposals && proposals.length > 0 ? (
          proposals.map((proposal) => (
            <Card key={proposal.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{proposal.title}</CardTitle>
                    <CardDescription className="mt-2">{proposal.description}</CardDescription>
                  </div>
                  <Badge>{proposal.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">For: {proposal.votesFor.toString()}</span>
                      <span className="text-muted-foreground">Against: {proposal.votesAgainst.toString()}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${
                            Number(proposal.votesFor) + Number(proposal.votesAgainst) > 0
                              ? (Number(proposal.votesFor) / (Number(proposal.votesFor) + Number(proposal.votesAgainst))) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <InlineAuthGate
                    fallback={
                      <div className="flex gap-2">
                        <Button size="sm" disabled>Vote For</Button>
                        <Button size="sm" variant="outline" disabled>Vote Against</Button>
                      </div>
                    }
                  >
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleVote(proposal.id, true)}
                        disabled={voteMutation.isPending || proposal.status !== 'active'}
                      >
                        Vote For
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(proposal.id, false)}
                        disabled={voteMutation.isPending || proposal.status !== 'active'}
                      >
                        Vote Against
                      </Button>
                    </div>
                  </InlineAuthGate>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>No proposals yet</p>
              <p className="text-sm mt-2">Be the first to create a governance proposal</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
