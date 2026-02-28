import { useState, useMemo } from 'react';
import { Package, Search, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { workflowPacks } from '@/content/workflowPacks';
import { toast } from 'sonner';
import { EmptyState } from '@/components/common/EmptyState';

export function WorkflowPackMarketplace() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');

  const handleInstallClick = (packName: string) => {
    toast.info('Coming Soon', {
      description: `Install feature for "${packName}" will be available in a future update.`,
    });
  };

  // Extract unique categories from workflow packs
  const categories = useMemo(() => {
    const uniqueCategories = new Set(workflowPacks.map((pack) => pack.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  // Price range options
  const priceRanges = ['All', 'Free', 'Under $200', '$200-$400', '$400+'];

  // Helper function to extract numeric price from price string
  const extractPrice = (priceString: string): number => {
    if (priceString.toLowerCase() === 'free') return 0;
    const match = priceString.match(/\$(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Filter workflow packs based on search, category, and price range
  const filteredPacks = useMemo(() => {
    return workflowPacks.filter((pack) => {
      // Search filter
      const searchLower = searchText.toLowerCase();
      const matchesSearch =
        searchText === '' ||
        pack.name.toLowerCase().includes(searchLower) ||
        pack.description.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory =
        selectedCategories.size === 0 || selectedCategories.has(pack.category);

      // Price range filter
      let matchesPriceRange = true;
      if (selectedPriceRange !== 'All') {
        const price = extractPrice(pack.price);
        if (selectedPriceRange === 'Free') {
          matchesPriceRange = price === 0;
        } else if (selectedPriceRange === 'Under $200') {
          matchesPriceRange = price > 0 && price < 200;
        } else if (selectedPriceRange === '$200-$400') {
          matchesPriceRange = price >= 200 && price <= 400;
        } else if (selectedPriceRange === '$400+') {
          matchesPriceRange = price > 400;
        }
      }

      return matchesSearch && matchesCategory && matchesPriceRange;
    });
  }, [searchText, selectedCategories, selectedPriceRange]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchText !== '' || selectedCategories.size > 0 || selectedPriceRange !== 'All';

  // Clear all filters
  const clearFilters = () => {
    setSearchText('');
    setSelectedCategories(new Set());
    setSelectedPriceRange('All');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Package className="w-10 h-10 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Workflow Pack Marketplace
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Pre-built workflow templates for enterprise AI automation
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="mb-8 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Label htmlFor="search" className="sr-only">
            Search workflow packs
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search workflow packs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 pr-4 h-12 text-base"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategories.size === 0 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategories(new Set())}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.has(category) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <Button
                key={range}
                variant={selectedPriceRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPriceRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count and Clear Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredPacks.length}</span> of{' '}
            <span className="font-semibold text-foreground">{workflowPacks.length}</span> packs
          </p>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Workflow Pack Grid or Empty State */}
      {filteredPacks.length === 0 ? (
        <EmptyState
          icon={<Package className="w-12 h-12 text-muted-foreground" />}
          title="No workflow packs match your filters"
          description="Try adjusting your search terms or filter selections to find what you're looking for."
          action={{
            label: 'Clear All Filters',
            onClick: clearFilters,
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack) => (
            <Card key={pack.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl">{pack.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {pack.category}
                  </Badge>
                </div>
                <div className="mb-3">
                  <p className="text-2xl font-bold text-primary">{pack.price}</p>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {pack.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => handleInstallClick(pack.name)}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
