import { useState } from 'react';
import { Package, Search, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useMarketplaceItems } from '../../hooks/useQueries';
import { EmptyState } from '../../components/common/EmptyState';
import { LoadingState } from '../../components/common/LoadingState';

export function MarketplaceList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: items, isLoading, isError } = useMarketplaceItems();

  const filteredItems = items?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Banner */}
      <div className="relative mb-8 rounded-lg overflow-hidden">
        <img
          src="/assets/generated/marketplace-banner.dim_1600x600.png"
          alt="Marketplace"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 flex items-center">
          <div className="px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              Digital Marketplace
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover premium AI models, datasets, and tools
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading && <LoadingState />}

      {isError && (
        <Card className="border-destructive/50">
          <CardContent className="p-6 text-center">
            <p className="text-destructive">Failed to load marketplace items. Please try again later.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && (!filteredItems || filteredItems.length === 0) && (
        <EmptyState
          icon={<Package className="w-12 h-12 text-muted-foreground" />}
          title={searchQuery ? 'No items found' : 'No items available'}
          description={searchQuery ? 'Try adjusting your search query' : 'Check back soon for new items'}
        />
      )}

      {!isLoading && !isError && filteredItems && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id.toString()}
              className="hover:border-accent/50 transition-colors cursor-pointer"
              onClick={() => navigate({ to: `/marketplace/${item.id.toString()}` })}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-accent" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-primary">
                    {item.price.toString()} tokens
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
