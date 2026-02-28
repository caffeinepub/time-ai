/**
 * Controlled Fan-Out utility for running async tasks with bounded concurrency.
 * Tracks per-task status, timestamps, errors, and provides cancellation support.
 */

export type TaskStatus = 'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled';

export interface TaskResult<T = unknown> {
  id: number;
  status: TaskStatus;
  startTime?: number;
  endTime?: number;
  duration?: number;
  result?: T;
  error?: Error;
}

export interface TaskFactory<T = unknown> {
  (): Promise<T>;
}

export interface FanOutMetrics {
  total: number;
  queued: number;
  running: number;
  succeeded: number;
  failed: number;
  cancelled: number;
}

export type FanOutListener = () => void;

export class ControlledFanOut<T = unknown> {
  private tasks: TaskFactory<T>[];
  private maxConcurrency: number;
  private results: Map<number, TaskResult<T>>;
  private runningCount: number;
  private nextTaskIndex: number;
  private cancelled: boolean;
  private listeners: Set<FanOutListener>;
  private abortController: AbortController;

  constructor(tasks: TaskFactory<T>[], maxConcurrency: number) {
    this.tasks = tasks;
    this.maxConcurrency = Math.max(1, maxConcurrency);
    this.results = new Map();
    this.runningCount = 0;
    this.nextTaskIndex = 0;
    this.cancelled = false;
    this.listeners = new Set();
    this.abortController = new AbortController();

    // Initialize all tasks as queued
    for (let i = 0; i < tasks.length; i++) {
      this.results.set(i, { id: i, status: 'queued' });
    }
  }

  subscribe(listener: FanOutListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  getResults(): TaskResult<T>[] {
    return Array.from(this.results.values()).sort((a, b) => a.id - b.id);
  }

  getMetrics(): FanOutMetrics {
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

  async run(): Promise<void> {
    this.cancelled = false;
    this.nextTaskIndex = 0;
    this.runningCount = 0;

    // Start initial batch up to maxConcurrency
    const initialBatch = Math.min(this.maxConcurrency, this.tasks.length);
    const promises: Promise<void>[] = [];

    for (let i = 0; i < initialBatch; i++) {
      promises.push(this.runNextTask());
    }

    // Wait for all tasks to complete
    await Promise.all(promises);
  }

  private async runNextTask(): Promise<void> {
    while (this.nextTaskIndex < this.tasks.length && !this.cancelled) {
      const taskId = this.nextTaskIndex++;
      const taskFactory = this.tasks[taskId];

      if (!taskFactory) continue;

      // Update status to running
      const startTime = Date.now();
      this.results.set(taskId, {
        id: taskId,
        status: 'running',
        startTime,
      });
      this.runningCount++;
      this.notify();

      try {
        // Execute the task
        const result = await taskFactory();

        // Check if cancelled during execution
        if (this.cancelled) {
          this.results.set(taskId, {
            id: taskId,
            status: 'cancelled',
            startTime,
            endTime: Date.now(),
            duration: Date.now() - startTime,
          });
        } else {
          this.results.set(taskId, {
            id: taskId,
            status: 'succeeded',
            startTime,
            endTime: Date.now(),
            duration: Date.now() - startTime,
            result,
          });
        }
      } catch (error) {
        this.results.set(taskId, {
          id: taskId,
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

    // Mark remaining queued tasks as cancelled if cancellation was requested
    if (this.cancelled) {
      for (let i = this.nextTaskIndex; i < this.tasks.length; i++) {
        const current = this.results.get(i);
        if (current?.status === 'queued') {
          this.results.set(i, {
            id: i,
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
    this.nextTaskIndex = 0;
    this.runningCount = 0;
    this.abortController = new AbortController();

    // Reset all tasks to queued
    for (let i = 0; i < this.tasks.length; i++) {
      this.results.set(i, { id: i, status: 'queued' });
    }
    this.notify();
  }

  setMaxConcurrency(value: number): void {
    this.maxConcurrency = Math.max(1, value);
  }

  getAbortSignal(): AbortSignal {
    return this.abortController.signal;
  }
}
