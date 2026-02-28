import { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Search, ArrowRight, Lightbulb } from 'lucide-react';
import { useSolutions } from '../../hooks/useSolutionsAdditions';
import { SectionHeader } from '../../components/common/SectionHeader';
import { LoadingState } from '../../components/common/LoadingState';

export function SolutionsIndex() {
  const navigate = useNavigate();
  const { solutions, isLoading } = useSolutions();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSolutions = useMemo(() => {
    if (!searchQuery.trim()) {
      return solutions;
    }

    const query = searchQuery.toLowerCase();
    return solutions.filter(
      (solution) =>
        solution.title.toLowerCase().includes(query) ||
        solution.description.toLowerCase().includes(query) ||
        solution.category.toLowerCase().includes(query) ||
        solution.searchKeywords.some((keyword) => keyword.toLowerCase().includes(query))
    );
  }, [solutions, searchQuery]);

  const sortedSolutions = useMemo(() => {
    return [...filteredSolutions].sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  }, [filteredSolutions]);

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Solutions Catalog"
            subtitle="Industry-specific solutions and optimizations for leading organizations"
          />

          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search solutions by name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {isLoading ? (
            <LoadingState count={6} className="h-48" />
          ) : sortedSolutions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No solutions found matching "{searchQuery}"
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {sortedSolutions.map((solution) => (
                  <Card
                    key={solution.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow group"
                    onClick={() => navigate({ to: solution.path })}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <solution.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <Badge variant="secondary" className="text-xs">
                          {solution.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-accent transition-colors">
                        {solution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {solution.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Next Strategic Step
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Explore industry-specific solutions to understand how TIME AI addresses real-world challenges across logistics, finance, technology, and blockchain sectors. Each solution demonstrates proven optimization strategies and implementation patterns.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent">
                    <span>Review solutions in your industry to identify optimization opportunities</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
