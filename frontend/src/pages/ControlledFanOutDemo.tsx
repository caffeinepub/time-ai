import React, { useState, useMemo } from 'react';
import { useControlledFanOut } from '../hooks/useControlledFanOut';
import { TaskFactory } from '../utils/controlledFanOut';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Play, Square, RotateCcw, Zap } from 'lucide-react';

// Simulated task that takes a random duration and may fail
function createSimulatedTask(id: number, failureRate: number = 0.1): TaskFactory<string> {
  return async () => {
    const duration = Math.random() * 2000 + 500; // 500ms to 2500ms
    await new Promise((resolve) => setTimeout(resolve, duration));

    // Simulate random failures
    if (Math.random() < failureRate) {
      throw new Error(`Task ${id} failed (simulated error)`);
    }

    return `Task ${id} completed successfully`;
  };
}

export function ControlledFanOutDemo() {
  const [taskCount, setTaskCount] = useState(20);
  const [concurrency, setConcurrency] = useState(3);
  const [failureRate, setFailureRate] = useState(0.15);

  // Generate tasks based on current settings
  const tasks = useMemo(() => {
    return Array.from({ length: taskCount }, (_, i) => createSimulatedTask(i + 1, failureRate));
  }, [taskCount, failureRate]);

  const { results, metrics, isRunning, start, cancel, reset, setMaxConcurrency } = useControlledFanOut({
    tasks,
    maxConcurrency: concurrency,
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
          <Zap className="h-10 w-10 text-primary" />
          Controlled Fan-Out Demo
        </h1>
        <p className="text-muted-foreground text-lg">
          Demonstrates bounded concurrency with per-task status tracking, error handling, and cancellation support.
        </p>
      </div>

      {/* Configuration Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Configure task count, concurrency limit, and failure rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="taskCount">Task Count</Label>
              <Input
                id="taskCount"
                type="number"
                min="1"
                max="100"
                value={taskCount}
                onChange={(e) => setTaskCount(parseInt(e.target.value, 10) || 1)}
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

          {metrics.total > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Progress</span>
                <span>
                  {metrics.succeeded + metrics.failed + metrics.cancelled} / {metrics.total}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${((metrics.succeeded + metrics.failed + metrics.cancelled) / metrics.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Task Status Timeline</CardTitle>
          <CardDescription>Per-task status, timestamps, duration, and error details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-20">Task ID</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="w-32">Duration</TableHead>
                    <TableHead>Result / Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No tasks configured. Adjust settings and click Start.
                      </TableCell>
                    </TableRow>
                  ) : (
                    results.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-mono">#{result.id + 1}</TableCell>
                        <TableCell>{getStatusBadge(result.status)}</TableCell>
                        <TableCell className="font-mono text-sm">{formatDuration(result.duration)}</TableCell>
                        <TableCell className="text-sm">
                          {result.status === 'succeeded' && (
                            <span className="text-green-600 dark:text-green-400">{result.result}</span>
                          )}
                          {result.status === 'failed' && (
                            <span className="text-destructive">{result.error?.message || 'Unknown error'}</span>
                          )}
                          {result.status === 'running' && (
                            <span className="text-blue-500 animate-pulse">Executing...</span>
                          )}
                          {result.status === 'queued' && <span className="text-muted-foreground">Waiting...</span>}
                          {result.status === 'cancelled' && (
                            <span className="text-muted-foreground">Task was cancelled</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
