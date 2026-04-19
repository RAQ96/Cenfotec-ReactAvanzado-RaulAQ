import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(asyncFn: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<UseAsyncState<T>>({ data: null, loading: false, error: null });
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setState({ data: null, loading: true, error: null });
    asyncFn(controller.signal)
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err });
        }
      });
  }, [asyncFn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    run();
    return () => {
      abortRef.current?.abort();
    };
  }, [run]);

  return { ...state, reload: run };
}
