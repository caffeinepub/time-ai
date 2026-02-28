import { useMemo } from 'react';

interface DataPoint {
  timestamp: bigint;
  value: number;
}

interface MetricsChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
  height?: number;
  showArea?: boolean;
}

export function MetricsChart({ 
  data, 
  title, 
  color = 'oklch(var(--primary))', 
  height = 200,
  showArea = false 
}: MetricsChartProps) {
  const { points, maxValue, minValue } = useMemo(() => {
    if (data.length === 0) {
      return { points: '', maxValue: 0, minValue: 0 };
    }

    const values = data.map(d => d.value);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = max - min || 1;

    const width = 100;
    const chartHeight = height - 40;
    const padding = 20;

    const pointsArray = data.map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * (width - 2 * padding) + padding;
      const y = chartHeight - ((d.value - min) / range) * (chartHeight - 2 * padding) + padding;
      return `${x},${y}`;
    });

    return {
      points: pointsArray.join(' '),
      maxValue: max,
      minValue: min,
    };
  }, [data, height]);

  if (data.length === 0) {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      <svg
        viewBox={`0 0 100 ${height}`}
        className="w-full"
        style={{ height: `${height}px` }}
      >
        {/* Grid lines */}
        <line x1="20" y1="20" x2="20" y2={height - 20} stroke="oklch(var(--border))" strokeWidth="0.5" />
        <line x1="20" y1={height - 20} x2="80" y2={height - 20} stroke="oklch(var(--border))" strokeWidth="0.5" />
        
        {/* Area fill */}
        {showArea && points && (
          <polygon
            points={`20,${height - 20} ${points} 80,${height - 20}`}
            fill={color}
            fillOpacity="0.1"
          />
        )}
        
        {/* Line */}
        {points && (
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        
        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * 60 + 20;
          const y = (height - 40) - ((d.value - minValue) / (maxValue - minValue || 1)) * (height - 60) + 20;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill={color}
            />
          );
        })}
        
        {/* Labels */}
        <text x="10" y="25" fontSize="4" fill="oklch(var(--muted-foreground))" textAnchor="end">
          {maxValue.toFixed(0)}
        </text>
        <text x="10" y={height - 15} fontSize="4" fill="oklch(var(--muted-foreground))" textAnchor="end">
          {minValue.toFixed(0)}
        </text>
      </svg>
    </div>
  );
}
