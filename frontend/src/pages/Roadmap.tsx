import { useState } from 'react';
import { Target, TrendingUp, Clock, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCurrentUserRoadmap } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { routes } from '../router/routes';
import type { RoadmapItem } from '../backend';

export function Roadmap() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: roadmap, isLoading } = useCurrentUserRoadmap();

  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('high');

  const getItemsByPriority = (priority: 'high' | 'medium' | 'low'): RoadmapItem[] => {
    if (!roadmap) return [];
    switch (priority) {
      case 'high':
        return roadmap.highPriority || [];
      case 'medium':
        return roadmap.mediumPriority || [];
      case 'low':
        return roadmap.lowPriority || [];
    }
  };

  const currentItems = getItemsByPriority(selectedPriority);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Authentication Required
            </h2>
            <p className="text-muted-foreground mb-6">
              Please log in to create and manage your personal roadmap
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
          <Target className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          My Roadmap
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Track your selected strategic additions and prioritize your implementation plan
        </p>
      </div>

      {/* Add Items CTA */}
      <Card className="mb-8 bg-gradient-to-br from-card to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Build Your Roadmap
              </h3>
              <p className="text-sm text-muted-foreground">
                {roadmap
                  ? 'Add more items to your roadmap or adjust priorities'
                  : 'Start by selecting platform additions to create your roadmap'}
              </p>
            </div>
            <Button onClick={() => navigate({ to: routes.recommendedAdditions.path })} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Items
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading roadmap...</p>
        </div>
      )}

      {!isLoading && !roadmap && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">
              No Roadmap Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Create your first roadmap by selecting platform additions
            </p>
            <Button onClick={() => navigate({ to: routes.recommendedAdditions.path })}>
              Browse Platform Additions
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && roadmap && (
        <>
          {/* Priority Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant={selectedPriority === 'high' ? 'default' : 'outline'}
              onClick={() => setSelectedPriority('high')}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              High Priority ({roadmap.highPriority?.length || 0})
            </Button>
            <Button
              variant={selectedPriority === 'medium' ? 'default' : 'outline'}
              onClick={() => setSelectedPriority('medium')}
              className="gap-2"
            >
              <Clock className="w-4 h-4" />
              Medium Priority ({roadmap.mediumPriority?.length || 0})
            </Button>
            <Button
              variant={selectedPriority === 'low' ? 'default' : 'outline'}
              onClick={() => setSelectedPriority('low')}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Low Priority ({roadmap.lowPriority?.length || 0})
            </Button>
          </div>

          {/* Items List */}
          {currentItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No items in {selectedPriority} priority
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentItems.map((item) => (
                <Card key={item.id.toString()}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge
                            variant={
                              item.highPriority
                                ? 'default'
                                : item.lowPriority
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {item.highPriority ? 'High' : item.lowPriority ? 'Low' : 'Medium'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{item.description}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {/* Summary */}
          <Alert className="mt-8">
            <AlertDescription>
              <strong>Total Items:</strong>{' '}
              {(roadmap.highPriority?.length || 0) +
                (roadmap.mediumPriority?.length || 0) +
                (roadmap.lowPriority?.length || 0)}{' '}
              platform additions selected
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}
