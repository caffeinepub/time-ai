import { Newspaper, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export function News() {
  const newsItems = [
    {
      id: 1,
      title: 'TIME AI Platform Launch',
      date: '2026-02-01',
      category: 'Platform',
      excerpt: 'Introducing the world\'s first AI Notary with blockchain verification and dual-token economy.',
    },
    {
      id: 2,
      title: 'Dual-Token Economy Explained',
      date: '2026-02-05',
      category: 'Tokenomics',
      excerpt: 'Learn how TIME AI and TRAV AI tokens work together to power enterprise and personal AI experiences.',
    },
    {
      id: 3,
      title: 'Agent Registry Now Live',
      date: '2026-02-10',
      category: 'Feature',
      excerpt: 'Design and deploy your own AI agents with built-in governance controls and policy enforcement.',
    },
    {
      id: 4,
      title: 'Marketplace Beta Opens',
      date: '2026-02-12',
      category: 'Marketplace',
      excerpt: 'Access premium AI models, datasets, and tools through our governed digital marketplace.',
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-accent" />
            News & Updates
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest announcements and developments
          </p>
        </div>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Evidence & Compliance Map for regulatory workflows</li>
              <li>• Advanced analytics dashboard with real-time metrics</li>
              <li>• Cross-chain bridge for multi-blockchain support</li>
              <li>• Mobile app for iOS and Android</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
