import { useState } from 'react';
import { Search, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { recommendedAdditions } from '../content/recommendedAdditions';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateUserRoadmap, useCurrentUserRoadmap } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { routes } from '../router/routes';
import type { RoadmapItem } from '../backend';

export function RecommendedAdditions() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Map<string, 'high' | 'medium' | 'low'>>(
    new Map()
  );

  const createRoadmap = useCreateUserRoadmap();
  const { data: existingRoadmap } = useCurrentUserRoadmap();

  const allAdditions = recommendedAdditions.flatMap((categoryObj) =>
    categoryObj.additions.map((addition) => ({
      ...addition,
      categoryName: categoryObj.name,
    }))
  );

  const filteredAdditions = allAdditions.filter((addition) => {
    const matchesSearch =
      !searchQuery ||
      addition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addition.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (addition.keywords && addition.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = !selectedCategory || addition.categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(recommendedAdditions.map((cat) => cat.name)));

  const handleToggleItem = (title: string, priority: 'high' | 'medium' | 'low') => {
    const newSelected = new Map(selectedItems);
    if (newSelected.has(title) && newSelected.get(title) === priority) {
      newSelected.delete(title);
    } else {
      newSelected.set(title, priority);
    }
    setSelectedItems(newSelected);
  };

  const handleSaveRoadmap = async () => {
    if (selectedItems.size === 0) return;

    const high: RoadmapItem[] = [];
    const medium: RoadmapItem[] = [];
    const low: RoadmapItem[] = [];

    let id = 0;
    selectedItems.forEach((priority, title) => {
      const addition = allAdditions.find((a) => a.title === title);
      if (!addition) return;

      const item: RoadmapItem = {
        id: BigInt(id++),
        category: addition.categoryName,
        description: addition.description,
        highPriority: priority === 'high',
        lowPriority: priority === 'low',
        assignedTo: identity!.getPrincipal(),
      };

      if (priority === 'high') high.push(item);
      else if (priority === 'medium') medium.push(item);
      else low.push(item);
    });

    try {
      await createRoadmap.mutateAsync({ high, medium, low });
      navigate({ to: routes.nextUpgrade.path });
    } catch (error) {
      console.error('Failed to save roadmap:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Platform Additions
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Strategic expansion modules across financial services, supply chain, enterprise operations, 
          healthcare, manufacturing, cybersecurity, and payments
        </p>
      </div>

      {/* Step 1 Completion Gate Notice */}
      <Alert className="mb-8 border-accent/50 bg-accent/5">
        <AlertCircle className="h-5 w-5 text-accent" />
        <AlertTitle className="text-lg font-semibold">Step 1: Platform Additions Catalog</AlertTitle>
        <AlertDescription className="mt-2 text-sm">
          This is the first step in the platform expansion process. Review the complete catalog of strategic additions below. 
          The next step requires explicit confirmation before proceeding with implementation.
        </AlertDescription>
      </Alert>

      {/* Roadmap Builder CTA */}
      {isAuthenticated && (
        <Card className="mb-8 bg-gradient-to-br from-card to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Build Your Roadmap
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedItems.size > 0
                    ? `${selectedItems.size} item${selectedItems.size !== 1 ? 's' : ''} selected`
                    : 'Select additions and assign priorities to create your roadmap'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {existingRoadmap && (
                  <Button variant="outline" onClick={() => navigate({ to: routes.nextUpgrade.path })}>
                    View Roadmap
                  </Button>
                )}
                <Button
                  onClick={handleSaveRoadmap}
                  disabled={selectedItems.size === 0 || createRoadmap.isPending}
                  className="gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  {createRoadmap.isPending ? 'Saving...' : 'Save Roadmap'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search additions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Additions Grid */}
      {filteredAdditions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No additions match your search criteria
            </p>
          </CardContent>
        </Card>
      )}

      {filteredAdditions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAdditions.map((addition, idx) => {
            const isSelected = selectedItems.has(addition.title);
            const priority = selectedItems.get(addition.title);

            return (
              <Card
                key={idx}
                className={`transition-colors ${
                  isSelected ? 'border-accent/50 bg-accent/5' : 'border-border'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline">{addition.categoryName}</Badge>
                    {isSelected && (
                      <Badge
                        variant={
                          priority === 'high'
                            ? 'default'
                            : priority === 'low'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {priority}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{addition.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {addition.description}
                  </p>

                  {addition.keywords && addition.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {addition.keywords.slice(0, 3).map((keyword, kidx) => (
                        <Badge key={kidx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {isAuthenticated && (
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant={priority === 'high' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleItem(addition.title, 'high')}
                        className="flex-1"
                      >
                        High
                      </Button>
                      <Button
                        variant={priority === 'medium' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleItem(addition.title, 'medium')}
                        className="flex-1"
                      >
                        Med
                      </Button>
                      <Button
                        variant={priority === 'low' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleItem(addition.title, 'low')}
                        className="flex-1"
                      >
                        Low
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Summary Footer */}
      <Card className="bg-gradient-to-br from-card to-primary/5">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Strategic Value
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            These platform additions represent strategic expansion opportunities across multiple industries. 
            Each module is designed to extend TIME AI and TRAV AI capabilities into new sectors, 
            creating additional revenue streams and use cases.
          </p>
          <p className="text-sm text-muted-foreground">
            Select additions that align with your business goals and add them to your roadmap for prioritized implementation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
