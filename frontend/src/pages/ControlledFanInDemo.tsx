import React, { useState, useMemo, useCallback } from 'react';
import { useControlledFanIn } from '../hooks/useControlledFanIn';
import { usePredictableLatencyChannelConfig } from '../hooks/usePredictableLatencyChannelConfig';
import { AsyncSource, ItemProcessor } from '../utils/controlledFanIn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Play, Square, RotateCcw, Workflow } from 'lucide-react';
import { PredictableLatencyChannelStatusSummaryCard } from '../components/controlledFanIn/PredictableLatencyChannelStatusSummaryCard';

// Simulated async source that yields items at a configurable rate
function createSimulatedSource(
  sourceId: number,
  itemCount: number,
  delayMs: number
): AsyncSource<{ sourceId: number; itemId: number; value: string }> {
  return async function* () {
    for (let i = 0; i < itemCount; i++) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      yield {
        sourceId,
        itemId: i + 1,
        value: `Source ${sourceId} - Item ${i + 1}`,
      };
    }
  };
}

// Simulated processor that takes a random duration and may fail
const createProcessor = (
  failureRate: number
): ItemProcessor<{ sourceId: number; itemId: number; value: string }, string> => {
  return async (item) => {
    const duration = Math.random() * 1500 + 300; // 300ms to 1800ms
    await new Promise((resolve) => setTimeout(resolve, duration));

    // Simulate random failures
    if (Math.random() < failureRate) {
      throw new Error(`Processing failed for ${item.value}`);
    }

    return `Processed: ${item.value}`;
  };
};

export function ControlledFanInDemo() {
  const [sourceCount, setSourceCount] = useState(3);
  const [itemsPerSource, setItemsPerSource] = useState(5);
  const [ingestionRate, setIngestionRate] = useState(200); // ms delay between items
  const [concurrency, setConcurrency] = useState(4);
  const [failureRate, setFailureRate] = useState(0.1);

  // Use the dedicated hook for channel configuration with localStorage persistence and presets
  const { 
    config: channelConfig, 
    updateConfig: updateChannelConfig,
    currentPreset,
    applyPreset,
    presets,
  } = usePredictableLatencyChannelConfig();

  // Generate sources based on current settings
  const sources = useMemo(() => {
    return Array.from({ length: sourceCount }, (_, i) =>
      createSimulatedSource(i + 1, itemsPerSource, ingestionRate)
    );
  }, [sourceCount, itemsPerSource, ingestionRate]);

  // Create processor
  const processor = useCallback(createProcessor(failureRate), [failureRate]);

  const { 
    results, 
    metrics, 
    sourceProgress, 
    warningCount, 
    statusSummary, 
    isRunning, 
    start, 
    cancel, 
    reset, 
    setMaxConcurrency 
  } = useControlledFanIn({
    sources,
    processor,
    maxConcurrency: concurrency,
    includePerSourceTiming: channelConfig.includePerSourceTiming,
  });

  const handleConcurrencyChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setConcurrency(num);
      setMaxConcurrency(num);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'queued':
        return <Badge variant="secondary">Queued</Badge>;
      case 'running':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Running</Badge>;
      case 'succeeded':
        return <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDuration = (ms?: number) => {
    if (ms === undefined) return '-';
    return `${ms.toFixed(0)}ms`;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Workflow className="h-10 w-10 text-primary" />
          Controlled Fan-In Demo
        </h1>
        <p className="text-muted-foreground text-lg">
          Demonstrates ingestion from multiple async sources into a single queue with bounded concurrency processing.
        </p>
      </div>

      {/* Configuration Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Configure number of sources, ingestion intensity, processing concurrency, and failure rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sourceCount">Source Count</Label>
              <Input
                id="sourceCount"
                type="number"
                min="1"
                max="10"
                value={sourceCount}
                onChange={(e) => setSourceCount(parseInt(e.target.value, 10) || 1)}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemsPerSource">Items per Source</Label>
              <Input
                id="itemsPerSource"
                type="number"
                min="1"
                max="20"
                value={itemsPerSource}
                onChange={(e) => setItemsPerSource(parseInt(e.target.value, 10) || 1)}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ingestionRate">Ingestion Rate (ms)</Label>
              <Input
                id="ingestionRate"
                type="number"
                min="50"
                max="2000"
                step="50"
                value={ingestionRate}
                onChange={(e) => setIngestionRate(parseInt(e.target.value, 10) || 100)}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concurrency">Max Concurrency</Label>
              <Input
                id="concurrency"
                type="number"
                min="1"
                max="20"
                value={concurrency}
                onChange={(e) => handleConcurrencyChange(e.target.value)}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="failureRate">Failure Rate (%)</Label>
              <Input
                id="failureRate"
                type="number"
                min="0"
                max="100"
                step="5"
                value={Math.round(failureRate * 100)}
                onChange={(e) => setFailureRate((parseInt(e.target.value, 10) || 0) / 100)}
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={start} disabled={isRunning} className="gap-2">
              <Play className="h-4 w-4" />
              Start
            </Button>
            <Button onClick={cancel} disabled={!isRunning} variant="destructive" className="gap-2">
              <Square className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={reset} disabled={isRunning} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Summary Card with Channel Configuration and Presets */}
      <div className="mb-6">
        <PredictableLatencyChannelStatusSummaryCard
          statusSummary={statusSummary}
          warningCount={warningCount}
          channelConfig={channelConfig}
          onChannelConfigChange={updateChannelConfig}
          currentPreset={currentPreset}
          onPresetChange={applyPreset}
          presets={presets}
          disabled={isRunning}
        />
      </div>

      {/* Metrics Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Progress Metrics</CardTitle>
          <CardDescription>Live-updating aggregate progress and status counts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{metrics.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-muted-foreground">{metrics.queued}</div>
              <div className="text-sm text-muted-foreground">Queued</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">{metrics.running}</div>
              <div className="text-sm text-muted-foreground">Running</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{metrics.succeeded}</div>
              <div className="text-sm text-muted-foreground">Succeeded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">{metrics.failed}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-muted-foreground">{metrics.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Work Items ({results.length})</CardTitle>
          <CardDescription>Detailed status and timing for each ingested item</CardDescription>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No items yet. Click Start to begin ingestion and processing.
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="w-24">Source</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Duration</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Source {item.sourceId}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.data && typeof item.data === 'object' && 'value' in item.data
                          ? String(item.data.value)
                          : '-'}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{formatDuration(item.duration)}</TableCell>
                      <TableCell className="text-sm text-destructive">
                        {item.error ? item.error.message : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
