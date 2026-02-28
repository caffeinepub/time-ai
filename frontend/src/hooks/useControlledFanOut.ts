import { useState, useEffect, useCallback, useRef } from 'react';
import { ControlledFanOut, TaskFactory, TaskResult, FanOutMetrics } from '../utils/controlledFanOut';

export interface UseControlledFanOutOptions<T = unknown> {
  tasks: TaskFactory<T>[];
  maxConcurrency: number;
}

export interface UseControlledFanOutReturn<T = unknown> {
  results: TaskResult<T>[];
  metrics: FanOutMetrics;
  isRunning: boolean;
  start: () => Promise<void>;
  cancel: () => void;
  reset: () => void;
  setMaxConcurrency: (value: number) => void;
}

export function useControlledFanOut<T = unknown>({
  tasks,
  maxConcurrency,
}: UseControlledFanOutOptions<T>): UseControlledFanOutReturn<T> {
  const fanOutRef = useRef<ControlledFanOut<T> | null>(null);
  const [results, setResults] = useState<TaskResult<T>[]>([]);
  const [metrics, setMetrics] = useState<FanOutMetrics>({
    total: 0,
    queued: 0,
    running: 0,
    succeeded: 0,
    failed: 0,
    cancelled: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  // Initialize or update the fan-out instance when tasks or concurrency change
  useEffect(() => {
    const fanOut = new ControlledFanOut(tasks, maxConcurrency);
    fanOutRef.current = fanOut;

    // Subscribe to updates
    const unsubscribe = fanOut.subscribe(() => {
      setResults(fanOut.getResults());
      setMetrics(fanOut.getMetrics());
    });

    // Initialize state
    setResults(fanOut.getResults());
    setMetrics(fanOut.getMetrics());

    return () => {
      unsubscribe();
    };
  }, [tasks, maxConcurrency]);

  const start = useCallback(async () => {
    if (!fanOutRef.current || isRunning) return;

    setIsRunning(true);
    try {
      await fanOutRef.current.run();
    } finally {
      setIsRunning(false);
    }
  }, [isRunning]);

  const cancel = useCallback(() => {
    if (!fanOutRef.current) return;
    fanOutRef.current.cancel();
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (!fanOutRef.current) return;
    fanOutRef.current.reset();
    setIsRunning(false);
  }, []);

  const setMaxConcurrencyCallback = useCallback((value: number) => {
    if (!fanOutRef.current) return;
    fanOutRef.current.setMaxConcurrency(value);
  }, []);

  return {
    results,
    metrics,
    isRunning,
    start,
    cancel,
    reset,
    setMaxConcurrency: setMaxConcurrencyCallback,
  };
}
