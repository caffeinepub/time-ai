import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { PartnerCategory } from '@/types/partners';

interface PartnerFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  resultsCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const categories: Array<{ value: string; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'CRM', label: 'CRM' },
  { value: 'Payments', label: 'Payments' },
  { value: 'Analytics', label: 'Analytics' },
  { value: 'Data', label: 'Data' },
  { value: 'Communication', label: 'Communication' },
];

const statuses: Array<{ value: string; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'Connected', label: 'Connected' },
  { value: 'Not Connected', label: 'Not Connected' },
];

export function PartnerFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  resultsCount,
  totalCount,
  onClearFilters,
}: PartnerFiltersProps) {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedStatus !== 'All';

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search partners by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div>
        <label className="text-sm font-medium mb-2 block">Connection Status</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={selectedStatus === status.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange(status.value)}
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count and Clear Filters */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-muted-foreground">
          {hasActiveFilters
            ? `Showing ${resultsCount} of ${totalCount} partners`
            : `Showing ${resultsCount} partners`}
        </p>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
