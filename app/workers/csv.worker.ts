import Papa from "papaparse";

type CsvMessage =
  | { type: "to_json"; payload: string }
  | { type: "to_csv"; payload: string };

self.onmessage = (event: MessageEvent<CsvMessage>) => {
  const { type, payload } = event.data;

  try {
    if (type === "to_json") {
      Papa.parse(payload, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            self.postMessage({
              type: "error",
              error: results.errors[0].message,
            });
          } else {
            // Pretty print JSON with 2 spaces
            const jsonStr = JSON.stringify(results.data, null, 2);
            self.postMessage({ type: "success", value: jsonStr });
          }
        },
        error: (err: Error) => {
          self.postMessage({ type: "error", error: err.message });
        },
      });
    } else if (type === "to_csv") {
      try {
        const data = JSON.parse(payload);
        const csv = Papa.unparse(data);
        self.postMessage({ type: "success", value: csv });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        self.postMessage({ type: "error", error: msg });
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    self.postMessage({
      type: "error",
      error: msg,
    });
  }
};
