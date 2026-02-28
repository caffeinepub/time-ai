import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Clock, MessageCircle, Send, Lock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { routes } from '../../router/routes';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useCommunityTopic, useCommunityReplies, useAddCommunityReply } from '../../hooks/useCommunity';
import { LoadingState } from '../../components/common/LoadingState';

export function TopicDetail() {
  const navigate = useNavigate();
  const { topicId } = useParams({ from: '/community/topic/$topicId' });
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [replyContent, setReplyContent] = useState('');

  const { data: topic, isLoading: topicLoading, isError: topicError, isFetched: topicFetched, refetch: refetchTopic } = useCommunityTopic(topicId);
  const { data: replies, isLoading: repliesLoading, isError: repliesError, isFetched: repliesFetched, refetch: refetchReplies } = useCommunityReplies(topicId);
  const addReply = useAddCommunityReply();

  const handleAddReply = async () => {
    if (!replyContent.trim()) return;

    try {
      await addReply.mutateAsync({ topicId: BigInt(topicId), content: replyContent });
      setReplyContent('');
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString();
  };

  if (topicLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <LoadingState count={3} className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (topicError || (topicFetched && !topic)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-destructive/50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-3" />
              <p className="text-destructive mb-4">
                {topicError ? 'Failed to load topic. Please try again.' : 'Topic not found.'}
              </p>
              <div className="flex gap-2 justify-center">
                {topicError && (
                  <Button onClick={() => refetchTopic()} variant="outline">
                    Retry
                  </Button>
                )}
                <Button onClick={() => navigate({ to: routes.aiTalk.path })}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to AI Talk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Type guard: if we reach here, topic must exist
  if (!topic) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate({ to: routes.aiTalk.path })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AI Talk
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{topic.title}</CardTitle>
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
            <p className="text-foreground whitespace-pre-wrap">{topic.content}</p>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Replies</h2>

          {repliesLoading && (
            <LoadingState count={2} className="h-24 w-full" />
          )}

          {repliesError && (
            <Card className="border-destructive/50">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
                <p className="text-destructive text-sm mb-4">Failed to load replies. Please try again.</p>
                <Button onClick={() => refetchReplies()} variant="outline" size="sm">
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {!repliesLoading && !repliesError && repliesFetched && (!replies || replies.length === 0) && (
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No replies yet. Be the first to respond!</p>
              </CardContent>
            </Card>
          )}

          {!repliesLoading && !repliesError && replies && replies.length > 0 && (
            <div className="space-y-4">
              {replies.map((reply) => (
                <Card key={reply.id.toString()}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(reply.timestamp)}
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{reply.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Reply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your thoughts..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
              />
              <Button
                onClick={handleAddReply}
                disabled={!replyContent.trim() || addReply.isPending}
                className="w-full"
              >
                {addReply.isPending ? (
                  'Posting...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post Reply
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">
                Log in to reply to this topic
              </p>
              <Button onClick={login}>Log In</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
