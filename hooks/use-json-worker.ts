import { useEffect, useRef, useState, useCallback } from "react";

interface WorkerState {
  isFormatting: boolean;
  error: string | null;
  formattedData: string | null;
}

export function useJsonWorker() {
  const workerRef = useRef<Worker | null>(null);
  const [state, setState] = useState<WorkerState>({
    isFormatting: false,
    error: null,
    formattedData: null,
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../app/workers/json.worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      const { type, value, error } = event.data;

      if (type === "success") {
        setState({ isFormatting: false, error: null, formattedData: value });
      } else {
        setState({ isFormatting: false, error: error, formattedData: null });
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const formatJson = useCallback((rawJson: string) => {
    if (!workerRef.current) return;

    setState((prev) => ({ ...prev, isFormatting: true, error: null }));
    workerRef.current.postMessage(rawJson);
  }, []);

  return { ...state, formatJson };
}
