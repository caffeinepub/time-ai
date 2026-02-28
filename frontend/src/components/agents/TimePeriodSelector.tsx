import { Button } from '@/components/ui/button';

interface TimePeriodSelectorProps {
  selectedPeriod: 'day' | 'week' | 'month';
  onPeriodChange: (period: 'day' | 'week' | 'month') => void;
}

export function TimePeriodSelector({ selectedPeriod, onPeriodChange }: TimePeriodSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Time Period:</span>
      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        <Button
          variant={selectedPeriod === 'day' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onPeriodChange('day')}
          className="h-8 px-3"
        >
          Day
        </Button>
        <Button
          variant={selectedPeriod === 'week' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onPeriodChange('week')}
          className="h-8 px-3"
        >
          Week
        </Button>
        <Button
          variant={selectedPeriod === 'month' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onPeriodChange('month')}
          className="h-8 px-3"
        >
          Month
        </Button>
      </div>
    </div>
  );
}
