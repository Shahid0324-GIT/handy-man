import { HashAlgorithm } from "@/utils";
import { useState, useEffect, useRef, useCallback } from "react";

interface WorkerState {
  output: string;
  isComputing: boolean;
  error: string | null;
}

export function useHashWorker() {
  const workerRef = useRef<Worker | null>(null);

  const [state, setState] = useState<WorkerState>({
    output: "",
    isComputing: false,
    error: null,
  });

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../app/workers/hash.worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      const { type, value, error } = event.data;

      if (type === "success") {
        setState({ output: value, isComputing: false, error: null });
      } else if (type === "error") {
        setState({ output: "", isComputing: false, error: error });
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const computeHash = useCallback((text: string, algo: HashAlgorithm) => {
    if (!workerRef.current) return;

    if (!text) {
      setState({ output: "", isComputing: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, isComputing: true, error: null }));

    workerRef.current.postMessage({
      type: "hash_text",
      payload: { text, algo },
    });
  }, []);

  return { ...state, computeHash };
}
