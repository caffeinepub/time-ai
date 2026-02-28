import { useState } from 'react';
import { MessageSquare, Plus, Clock, MessageCircle, Lock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useCommunityTopics, useCreateCommunityTopic } from '../../hooks/useCommunity';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';

export function AITalk() {
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const { data: topics, isLoading, isError, isFetched, refetch } = useCommunityTopics();
  const createTopic = useCreateCommunityTopic();

  const handleCreateTopic = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      await createTopic.mutateAsync({ title: newTitle, content: newContent });
      setNewTitle('');
      setNewContent('');
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-primary" />
              AI Talk
            </h1>
            <p className="text-lg text-muted-foreground">
              Discuss AI topics and share insights with the community
            </p>
          </div>

          {isAuthenticated && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Topic
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Topic</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      placeholder="Enter topic title..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <Button
                    onClick={handleCreateTopic}
                    disabled={!newTitle.trim() || !newContent.trim() || createTopic.isPending}
                    className="w-full"
                  >
                    {createTopic.isPending ? 'Creating...' : 'Create Topic'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {!isAuthenticated && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">
                Log in to create topics and join discussions
              </p>
              <Button onClick={login}>Log In</Button>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <LoadingState count={3} className="h-32 w-full" />
        )}

        {isError && (
          <Card className="border-destructive/50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
              <p className="text-destructive mb-4">Failed to load topics. Please try again.</p>
              <Button onClick={() => refetch()} variant="outline">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && isFetched && (!topics || topics.length === 0) && (
          <EmptyState
            icon={<MessageSquare className="w-12 h-12 text-muted-foreground" />}
            title="No topics yet"
            description="Be the first to start a discussion!"
            action={
              isAuthenticated
                ? {
                    label: 'Create First Topic',
                    onClick: () => setDialogOpen(true),
                  }
                : undefined
            }
          />
        )}

        {!isLoading && !isError && topics && topics.length > 0 && (
          <div className="space-y-4">
            {topics.map((topic) => (
              <Card
                key={topic.id.toString()}
                className="hover:border-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate({ to: `/community/ai-talk/${topic.id.toString()}` })}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTimestamp(topic.timestamp)}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {topic.replyCount.toString()} {topic.replyCount === 1n ? 'reply' : 'replies'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{topic.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
