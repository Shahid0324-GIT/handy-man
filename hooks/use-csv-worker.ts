import { useState, useEffect, useRef, useCallback } from "react";

interface WorkerState {
  result: string;
  isComputing: boolean;
  error: string | null;
}

export function useCsvWorker() {
  const workerRef = useRef<Worker | null>(null);

  const [state, setState] = useState<WorkerState>({
    result: "",
    isComputing: false,
    error: null,
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../app/workers/csv.worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      const { type, value, error } = event.data;
      if (type === "success") {
        setState({ result: value, isComputing: false, error: null });
      } else if (type === "error") {
        setState({ result: "", isComputing: false, error: error });
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  const convertToJson = useCallback((csv: string) => {
    if (!workerRef.current || !csv.trim()) return;
    setState((prev) => ({ ...prev, isComputing: true, error: null }));
    workerRef.current.postMessage({ type: "to_json", payload: csv });
  }, []);

  const convertToCsv = useCallback((json: string) => {
    if (!workerRef.current || !json.trim()) return;
    setState((prev) => ({ ...prev, isComputing: true, error: null }));
    workerRef.current.postMessage({ type: "to_csv", payload: json });
  }, []);

  return { ...state, convertToJson, convertToCsv };
}
