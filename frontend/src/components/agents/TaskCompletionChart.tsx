import { useMemo } from 'react';
import { TimeSeriesEntry } from '@/backend';

interface TaskCompletionChartProps {
  data: TimeSeriesEntry[];
  period: 'day' | 'week' | 'month';
}

export function TaskCompletionChart({ data, period }: TaskCompletionChartProps) {
  const { chartData, completionRate, trend } = useMemo(() => {
    if (data.length === 0) {
      return { chartData: [], completionRate: 0, trend: 'neutral' as const };
    }

    const chartData = data.map(entry => ({
      timestamp: entry.timestamp,
      completed: Number(entry.completedTasks),
    }));

    const totalCompleted = data.reduce((sum, entry) => sum + Number(entry.completedTasks), 0);
    const avgCompleted = totalCompleted / data.length;
    
    // Calculate trend (comparing first half vs second half)
    const midpoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midpoint);
    const secondHalf = data.slice(midpoint);
    
    const firstAvg = firstHalf.reduce((sum, e) => sum + Number(e.completedTasks), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, e) => sum + Number(e.completedTasks), 0) / secondHalf.length;
    
    const trend = secondAvg > firstAvg * 1.1 ? 'up' : secondAvg < firstAvg * 0.9 ? 'down' : 'neutral';

    return {
      chartData,
      completionRate: avgCompleted,
      trend,
    };
  }, [data]);

  const height = 200;
  const width = 100;
  const padding = 20;
  const chartHeight = height - 40;

  if (chartData.length === 0) {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-2">Task Completion Rate</h3>
        <p className="text-xs text-muted-foreground mb-4">Completed tasks over time</p>
        <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No task data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map(d => d.completed), 1);
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1 || 1)) * (width - 2 * padding) + padding;
    const y = chartHeight - (d.completed / maxValue) * (chartHeight - 2 * padding) + padding;
    return `${x},${y}`;
  }).join(' ');

  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div className="w-full rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-1">Task Completion Rate</h3>
          <p className="text-xs text-muted-foreground">Completed tasks over time</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{completionRate.toFixed(1)}</div>
          <div className={`text-xs font-medium ${trendColor}`}>
            {trendIcon} {trend === 'neutral' ? 'Stable' : trend === 'up' ? 'Increasing' : 'Decreasing'}
          </div>
        </div>
      </div>
      
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height: `${height}px` }}
      >
        {/* Grid lines */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="oklch(var(--border))" strokeWidth="0.5" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="oklch(var(--border))" strokeWidth="0.5" />
        
        {/* Area fill */}
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="oklch(var(--primary))"
          fillOpacity="0.1"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="oklch(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {chartData.map((d, i) => {
          const x = (i / (chartData.length - 1 || 1)) * (width - 2 * padding) + padding;
          const y = chartHeight - (d.completed / maxValue) * (chartHeight - 2 * padding) + padding;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="oklch(var(--primary))"
            />
          );
        })}
        
        {/* Y-axis labels */}
        <text x={padding - 5} y={padding + 5} fontSize="4" fill="oklch(var(--muted-foreground))" textAnchor="end">
          {maxValue.toFixed(0)}
        </text>
        <text x={padding - 5} y={height - padding + 5} fontSize="4" fill="oklch(var(--muted-foreground))" textAnchor="end">
          0
        </text>
      </svg>
    </div>
  );
}
