/**
 * Controlled Fan-In utility for ingesting items from multiple async sources
 * into a single queue and processing them with bounded concurrency.
 * 
 * Terminology:
 * - Source: An async producer (e.g., async generator, stream) that yields work items
 * - Work Item: A unit of work ingested from a source and queued for processing
 * 
 * Tracks per-item status, timestamps, errors, and provides cancellation support.
 */

export type ItemStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export interface WorkItem<T = unknown> {
  id: number;
  sourceId: number;
  status: ItemStatus;
  startTime?: number;
  endTime?: number;
  duration?: number;
  result?: T;
  error?: Error;
  data?: unknown; // Original data from source
}

export interface AsyncSource<T = unknown> {
  (): AsyncGenerator<T, void, unknown>;
}

export interface ItemProcessor<T = unknown, R = unknown> {
  (item: T): Promise<R>;
}

export interface FanInMetrics {
  total: number;
  queued: number;
  running: number;
  succeeded: number;
  failed: number;
  cancelled: number;
}

export interface FanInSourceProgress {
  completedSources: number;
  totalSources: number;
}

export interface StatusSummaryOptions {
  includePerSourceTiming?: boolean;
}

export type FanInListener = () => void;

export class ControlledFanIn<T = unknown, R = unknown> {
  private sources: AsyncSource<T>[];
  private processor: ItemProcessor<T, R>;
  private maxConcurrency: number;
  private items: Map<number, WorkItem<R>>;
  private queue: Array<{ id: number; data: T }>;
  private runningCount: number;
  private nextItemId: number;
  private cancelled: boolean;
  private listeners: Set<FanInListener>;
  private abortController: AbortController;
  private ingestionComplete: boolean;
  private completedSourcesCount: number;

  constructor(
    sources: AsyncSource<T>[],
    processor: ItemProcessor<T, R>,
    maxConcurrency: number
  ) {
    this.sources = sources;
    this.processor = processor;
    this.maxConcurrency = Math.max(1, maxConcurrency);
    this.items = new Map();
    this.queue = [];
    this.runningCount = 0;
    this.nextItemId = 0;
    this.cancelled = false;
    this.listeners = new Set();
    this.abortController = new AbortController();
    this.ingestionComplete = false;
    this.completedSourcesCount = 0;
  }

  subscribe(listener: FanInListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  getResults(): WorkItem<R>[] {
    return Array.from(this.items.values()).sort((a, b) => a.id - b.id);
  }

  getMetrics(): FanInMetrics {
    const results = this.getResults();
    return {
      total: results.length,
      queued: results.filter((r) => r.status === 'queued').length,
      running: results.filter((r) => r.status === 'running').length,
      succeeded: results.filter((r) => r.status === 'succeeded').length,
      failed: results.filter((r) => r.status === 'failed').length,
      cancelled: results.filter((r) => r.status === 'cancelled').length,
    };
  }

  getSourceProgress(): FanInSourceProgress {
    return {
      completedSources: this.completedSourcesCount,
      totalSources: this.sources.length,
    };
  }

  getWarningCount(): number {
    const metrics = this.getMetrics();
    return metrics.failed + metrics.cancelled;
  }

  getStatusSummary(options?: StatusSummaryOptions): string {
    const sourceProgress = this.getSourceProgress();
    const warningCount = this.getWarningCount();
    const metrics = this.getMetrics();

    const sourcesText = `${sourceProgress.completedSources} of ${sourceProgress.totalSources} sources completed`;
    const warningsText = warningCount === 0 
      ? '0 warnings' 
      : warningCount === 1 
        ? '1 warning' 
        : `${warningCount} warnings`;
    
    const itemsText = metrics.total === 0 
      ? 'no items processed yet' 
      : metrics.total === 1 
        ? '1 item' 
        : `${metrics.total} items`;

    let baseSummary = `${sourcesText}, ${itemsText}, ${warningsText}`;

    // Add per-source timing if requested
    if (options?.includePerSourceTiming) {
      const perSourceTiming = this.getPerSourceTiming();
      if (perSourceTiming.length > 0) {
        baseSummary += ` | Per-source timing: ${perSourceTiming.join(', ')}`;
      }
    }

    return baseSummary;
  }

  private getPerSourceTiming(): string[] {
    const results = this.getResults();
    
    // Group items by sourceId
    const sourceMap = new Map<number, WorkItem<R>[]>();
    for (const item of results) {
      if (!sourceMap.has(item.sourceId)) {
        sourceMap.set(item.sourceId, []);
      }
      sourceMap.get(item.sourceId)!.push(item);
    }

    // Calculate timing stats for each source (only completed items with duration)
    const timingStrings: string[] = [];
    const sortedSourceIds = Array.from(sourceMap.keys()).sort((a, b) => a - b);

    for (const sourceId of sortedSourceIds) {
      const items = sourceMap.get(sourceId)!;
      const completedItems = items.filter(item => item.duration !== undefined);

      if (completedItems.length === 0) {
        timingStrings.push(`Source ${sourceId}: no completed items`);
        continue;
      }

      const durations = completedItems.map(item => item.duration!);
      const avgDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
      const minDuration = Math.min(...durations);
      const maxDuration = Math.max(...durations);

      timingStrings.push(
        `Source ${sourceId}: avg ${avgDuration.toFixed(0)}ms (min ${minDuration.toFixed(0)}ms, max ${maxDuration.toFixed(0)}ms, n=${completedItems.length})`
      );
    }

    return timingStrings;
  }

  async run(): Promise<void> {
    this.cancelled = false;
    this.nextItemId = 0;
    this.runningCount = 0;
    this.queue = [];
    this.items.clear();
    this.ingestionComplete = false;
    this.completedSourcesCount = 0;

    // Start ingestion from all sources concurrently
    const ingestionPromises = this.sources.map((source, sourceId) =>
      this.ingestFromSource(source, sourceId)
    );

    // Start processing workers
    const processingPromises: Promise<void>[] = [];
    for (let i = 0; i < this.maxConcurrency; i++) {
      processingPromises.push(this.processWorker());
    }

    // Wait for all ingestion to complete
    await Promise.all(ingestionPromises);
    this.ingestionComplete = true;

    // Wait for all processing to complete
    await Promise.all(processingPromises);
  }

  private async ingestFromSource(source: AsyncSource<T>, sourceId: number): Promise<void> {
    try {
      const generator = source();
      
      for await (const data of generator) {
        if (this.cancelled) {
          break;
        }

        const itemId = this.nextItemId++;
        
        // Add to queue
        this.queue.push({ id: itemId, data });

        // Track as queued
        this.items.set(itemId, {
          id: itemId,
          sourceId,
          status: 'queued',
          data,
        });

        this.notify();
      }
    } catch (error) {
      // Source ingestion error - log but continue with other sources
      console.error(`Source ${sourceId} ingestion error:`, error);
    } finally {
      // Mark this source as completed
      this.completedSourcesCount++;
      this.notify();
    }
  }

  private async processWorker(): Promise<void> {
    while (true) {
      // Exit if cancelled
      if (this.cancelled) {
        break;
      }

      // Get next item from queue
      const queueItem = this.queue.shift();

      // If no item and ingestion is complete, exit
      if (!queueItem) {
        if (this.ingestionComplete && this.runningCount === 0) {
          break;
        }
        // Wait a bit and try again
        await new Promise((resolve) => setTimeout(resolve, 50));
        continue;
      }

      const { id, data } = queueItem;
      const item = this.items.get(id);
      if (!item) continue;

      // Update status to running
      const startTime = Date.now();
      this.items.set(id, {
        ...item,
        status: 'running',
        startTime,
      });
      this.runningCount++;
      this.notify();

      try {
        // Process the item
        const result = await this.processor(data);

        // Check if cancelled during processing
        if (this.cancelled) {
          this.items.set(id, {
            ...item,
            status: 'cancelled',
            startTime,
            endTime: Date.now(),
            duration: Date.now() - startTime,
          });
        } else {
          this.items.set(id, {
            ...item,
            status: 'succeeded',
            startTime,
            endTime: Date.now(),
            duration: Date.now() - startTime,
            result,
          });
        }
      } catch (error) {
        this.items.set(id, {
          ...item,
          status: 'failed',
          startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      } finally {
        this.runningCount--;
        this.notify();
      }
    }

    // Mark remaining queued items as cancelled if cancellation was requested
    if (this.cancelled) {
      for (const [id, item] of this.items.entries()) {
        if (item.status === 'queued') {
          this.items.set(id, {
            ...item,
            status: 'cancelled',
          });
        }
      }
      this.notify();
    }
  }

  cancel(): void {
    this.cancelled = true;
    this.abortController.abort();
    this.notify();
  }

  reset(): void {
    this.cancelled = false;
    this.nextItemId = 0;
    this.runningCount = 0;
    this.queue = [];
    this.items.clear();
    this.ingestionComplete = false;
    this.completedSourcesCount = 0;
    this.abortController = new AbortController();
    this.notify();
  }

  setMaxConcurrency(value: number): void {
    this.maxConcurrency = Math.max(1, value);
  }

  getAbortSignal(): AbortSignal {
    return this.abortController.signal;
  }
}
