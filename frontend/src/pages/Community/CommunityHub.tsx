import { Users, Newspaper, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { routes } from '../../router/routes';

export function CommunityHub() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Community Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with the TIME AI ecosystem and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate({ to: routes.news.path })}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-accent" />
                  News & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Stay informed with the latest announcements, feature releases, and ecosystem developments.
                </p>
                <Button variant="outline" size="sm">
                  View News
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate({ to: routes.aiTalk.path })}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  AI Talk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Discuss AI topics, share insights, and engage with fellow community members.
                </p>
                <Button variant="outline" size="sm">
                  Join Discussion
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Community Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  Upcoming Events
                </h4>
                <p className="text-sm text-muted-foreground">
                  Join webinars, AMAs, and community calls to learn more about TIME AI and connect with the team.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Access comprehensive guides, tutorials, and API documentation to make the most of the platform.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Support</h4>
                <p className="text-sm text-muted-foreground">
                  Get help from our support team and community experts through multiple channels.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
