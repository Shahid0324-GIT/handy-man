import { useState, useEffect, useRef, useCallback } from "react";

interface WorkerState {
  output: string;
  isComputing: boolean;
  error: string | null;
}

export function useAesWorker() {
  const workerRef = useRef<Worker | null>(null);

  const [state, setState] = useState<WorkerState>({
    output: "",
    isComputing: false,
    error: null,
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../app/workers/aes.worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      const { type, value, error } = event.data;
      if (type === "success") {
        setState({ output: value, isComputing: false, error: null });
      } else {
        setState({ output: "", isComputing: false, error: error });
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  const runAes = useCallback(
    (text: string, key: string, mode: "encrypt" | "decrypt") => {
      if (!workerRef.current) return;

      if (!text || !key) {
        setState({ output: "", isComputing: false, error: null });
        return;
      }

      setState((prev) => ({ ...prev, isComputing: true, error: null }));

      workerRef.current.postMessage({
        type: mode,
        payload: { text, key },
      });
    },
    []
  );

  return { ...state, runAes };
}
