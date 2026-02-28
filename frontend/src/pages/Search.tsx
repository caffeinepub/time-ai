import { useState, useEffect } from 'react';
import { Search as SearchIcon, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { searchContent } from '../utils/search';
import { useNavigate } from '@tanstack/react-router';
import { getUrlParameter } from '../utils/urlParams';
import { resolveNavigation } from '../utils/omnibox';

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Initialize from URL parameter
  useEffect(() => {
    const urlQuery = getUrlParameter('q');
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, []);

  const results = searchContent(query);
  const navigationMatch = resolveNavigation(query);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && navigationMatch) {
      navigate({ to: navigationMatch.path });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <SearchIcon className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Unified Search
          </h1>
          <p className="text-lg text-muted-foreground">
            Search content or navigate directly by typing a route or page name
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search or navigate (e.g., 'trade/market' or 'AI Notary')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 text-lg h-14"
              autoFocus
            />
          </div>
          
          {/* Navigation hint */}
          {navigationMatch && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowRight className="w-4 h-4 text-accent" />
              <span>
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Enter</kbd> to navigate to{' '}
                <span className="font-medium text-foreground">{navigationMatch.label}</span>
              </span>
            </div>
          )}
        </div>

        {/* Results */}
        {!query.trim() && (
          <div className="text-center py-12">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Enter a search query to explore the ecosystem
            </p>
            <p className="text-sm text-muted-foreground">
              Or type a route path (e.g., "/trade/market") or page name to navigate directly
            </p>
          </div>
        )}

        {query.trim() && results.length === 0 && !navigationMatch && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">
              No results found for "{query}"
            </p>
            <p className="text-sm text-muted-foreground">
              Try different keywords or browse our solutions
            </p>
          </div>
        )}

        {query.trim() && (results.length > 0 || navigationMatch) && (
          <div className="space-y-4">
            {/* Navigation match card (priority display) */}
            {navigationMatch && (
              <Card
                className="border-accent bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer"
                onClick={() => navigate({ to: navigationMatch.path })}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-accent/20 border-accent">
                          Direct Navigation
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {navigationMatch.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Navigate to {navigationMatch.path}
                      </p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Content search results */}
            {results.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
                {results.map((result, idx) => (
                  <Card
                    key={idx}
                    className="hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => navigate({ to: result.path })}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {result.category}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {result.title}
                          </h3>
                          {result.description && (
                            <p className="text-sm text-muted-foreground">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        View →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
