import { useMemo } from 'react';
import { TimeSeriesEntry } from '@/backend';

interface ComplianceScoreChartProps {
  data: TimeSeriesEntry[];
  period: 'day' | 'week' | 'month';
}

export function ComplianceScoreChart({ data, period }: ComplianceScoreChartProps) {
  const { chartData, averageScore, status } = useMemo(() => {
    if (data.length === 0) {
      return { chartData: [], averageScore: 0, status: 'unknown' as const };
    }

    const chartData = data.map(entry => ({
      timestamp: entry.timestamp,
      score: entry.complianceScore * 100, // Convert to percentage
    }));

    const totalScore = data.reduce((sum, entry) => sum + entry.complianceScore, 0);
    const avgScore = (totalScore / data.length) * 100;
    
    const status = avgScore >= 90 ? 'high' : avgScore >= 70 ? 'medium' : 'low';

    return {
      chartData,
      averageScore: avgScore,
      status,
    };
  }, [data]);

  const height = 200;
  const width = 100;
  const padding = 20;
  const chartHeight = height - 40;

  if (chartData.length === 0) {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-2">Compliance Score</h3>
        <p className="text-xs text-muted-foreground mb-4">Compliance tracking over time</p>
        <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No compliance data available
        </div>
      </div>
    );
  }

  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1 || 1)) * (width - 2 * padding) + padding;
    const y = chartHeight - (d.score / 100) * (chartHeight - 2 * padding) + padding;
    return `${x},${y}`;
  }).join(' ');

  const statusColor = status === 'high' ? 'text-success' : status === 'medium' ? 'text-warning' : 'text-destructive';
  const statusLabel = status === 'high' ? 'High Compliance' : status === 'medium' ? 'Medium Compliance' : 'Low Compliance';
  const lineColor = status === 'high' ? 'oklch(var(--success))' : status === 'medium' ? 'oklch(var(--warning))' : 'oklch(var(--destructive))';

  return (
    <div className="w-full rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-1">Compliance Score</h3>
          <p className="text-xs text-muted-foreground">Compliance tracking over time</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{averageScore.toFixed(1)}%</div>
          <div className={`text-xs font-medium ${statusColor}`}>
            {statusLabel}
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
        
        {/* Threshold zones */}
        <rect
          x={padding}
          y={padding}
          width={width - 2 * padding}
          height={(chartHeight - 2 * padding) * 0.1}
          fill="oklch(var(--success))"
          fillOpacity="0.05"
        />
        <rect
          x={padding}
          y={padding + (chartHeight - 2 * padding) * 0.1}
          width={width - 2 * padding}
          height={(chartHeight - 2 * padding) * 0.2}
          fill="oklch(var(--warning))"
          fillOpacity="0.05"
        />
        
        {/* Area fill */}
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill={lineColor}
          fillOpacity="0.1"
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {chartData.map((d, i) => {
          const x = (i / (chartData.length - 1 || 1)) * (width - 2 * padding) + padding;
          const y = chartHeight - (d.score / 100) * (chartHeight - 2 * padding) + padding;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill={lineColor}
            />
          );
        })}
        
        {/* Y-axis labels */}
        <text x={padding - 5} y={padding + 5} fontSize="4" fill="oklch(var(--muted-foreground))" textAnchor="end">
          100%
        </text>
        <text x={padding - 5} y={height - padding + 5} fontSize="4" fill="oklch(var(--muted-foreground))" textAnchor="end">
          0%
        </text>
      </svg>
    </div>
  );
}
