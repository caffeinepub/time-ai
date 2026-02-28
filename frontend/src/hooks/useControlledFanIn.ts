import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ControlledFanIn,
  AsyncSource,
  ItemProcessor,
  WorkItem,
  FanInMetrics,
  FanInSourceProgress,
} from '../utils/controlledFanIn';

export interface UseControlledFanInOptions<T = unknown, R = unknown> {
  sources: AsyncSource<T>[];
  processor: ItemProcessor<T, R>;
  maxConcurrency: number;
  includePerSourceTiming?: boolean;
}

export interface UseControlledFanInReturn<R = unknown> {
  results: WorkItem<R>[];
  metrics: FanInMetrics;
  sourceProgress: FanInSourceProgress;
  warningCount: number;
  statusSummary: string;
  isRunning: boolean;
  start: () => Promise<void>;
  cancel: () => void;
  reset: () => void;
  setMaxConcurrency: (value: number) => void;
}

export function useControlledFanIn<T = unknown, R = unknown>({
  sources,
  processor,
  maxConcurrency,
  includePerSourceTiming = false,
}: UseControlledFanInOptions<T, R>): UseControlledFanInReturn<R> {
  const fanInRef = useRef<ControlledFanIn<T, R> | null>(null);
  const [results, setResults] = useState<WorkItem<R>[]>([]);
  const [metrics, setMetrics] = useState<FanInMetrics>({
    total: 0,
    queued: 0,
    running: 0,
    succeeded: 0,
    failed: 0,
    cancelled: 0,
  });
  const [sourceProgress, setSourceProgress] = useState<FanInSourceProgress>({
    completedSources: 0,
    totalSources: sources.length,
  });
  const [warningCount, setWarningCount] = useState(0);
  const [statusSummary, setStatusSummary] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Initialize or update the fan-in instance when sources, processor, or concurrency change
  useEffect(() => {
    const fanIn = new ControlledFanIn(sources, processor, maxConcurrency);
    fanInRef.current = fanIn;

    // Subscribe to updates
    const unsubscribe = fanIn.subscribe(() => {
      setResults(fanIn.getResults());
      setMetrics(fanIn.getMetrics());
      setSourceProgress(fanIn.getSourceProgress());
      setWarningCount(fanIn.getWarningCount());
      setStatusSummary(fanIn.getStatusSummary({ includePerSourceTiming }));
    });

    // Initialize state
    setResults(fanIn.getResults());
    setMetrics(fanIn.getMetrics());
    setSourceProgress(fanIn.getSourceProgress());
    setWarningCount(fanIn.getWarningCount());
    setStatusSummary(fanIn.getStatusSummary({ includePerSourceTiming }));

    return () => {
      unsubscribe();
    };
  }, [sources, processor, maxConcurrency, includePerSourceTiming]);

  const start = useCallback(async () => {
    if (!fanInRef.current || isRunning) return;

    setIsRunning(true);
    try {
      await fanInRef.current.run();
    } finally {
      setIsRunning(false);
    }
  }, [isRunning]);

  const cancel = useCallback(() => {
    if (!fanInRef.current) return;
    fanInRef.current.cancel();
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (!fanInRef.current) return;
    fanInRef.current.reset();
    setIsRunning(false);
  }, []);

  const setMaxConcurrencyCallback = useCallback((value: number) => {
    if (!fanInRef.current) return;
    fanInRef.current.setMaxConcurrency(value);
  }, []);

  return {
    results,
    metrics,
    sourceProgress,
    warningCount,
    statusSummary,
    isRunning,
    start,
    cancel,
    reset,
    setMaxConcurrency: setMaxConcurrencyCallback,
  };
}
