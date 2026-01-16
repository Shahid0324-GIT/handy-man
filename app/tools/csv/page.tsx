"use client";

import { useState } from "react";
import Papa from "papaparse";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "@/components/ui/code-editor";
import {
  ArrowRightLeft,
  Eraser,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

export default function CsvPage() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [error, setError] = useState<string | null>(null);

  const convertToJson = () => {
    if (!csv.trim()) return;
    setError(null);

    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(results.errors[0].message);
        } else {
          setJson(JSON.stringify(results.data, null, 2));
          toast.success("Converted to JSON");
        }
      },
    });
  };

  const convertToCsv = () => {
    if (!json.trim()) return;
    setError(null);

    try {
      const data = JSON.parse(json);
      const csvOutput = Papa.unparse(data);
      setCsv(csvOutput);
      toast.success("Converted to CSV");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    }
  };

  const clearAll = () => {
    setCsv("");
    setJson("");
    setError(null);
  };

  return (
    <ToolShell
      title="CSV ↔ JSON Converter"
      description="Convert data between Comma Separated Values and JSON objects."
      actions={
        <Button variant="ghost" size="sm" onClick={clearAll}>
          <Eraser className="mr-2 size-4" /> Clear
        </Button>
      }
    >
      <div className="grid h-full gap-4 md:grid-cols-2 relative">
        {/* Error Banner */}
        {error && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 text-sm text-center font-medium rounded-md animate-in slide-in-from-top-2">
            Error: {error}
          </div>
        )}

        {/* LEFT: CSV */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <FileSpreadsheet className="size-4" /> CSV Input
            </Label>
            <Button
              size="sm"
              variant="secondary"
              onClick={convertToJson}
              disabled={!csv}
            >
              Convert to JSON <ArrowRightLeft className="ml-2 size-3" />
            </Button>
          </div>
          <div className="flex-1 min-h-75 border rounded-md overflow-hidden shadow-sm">
            <CodeEditor
              value={csv}
              onChange={(v) => setCsv(v || "")}
              language="text"
              wordWrap="off"
            />
          </div>
        </div>

        {/* RIGHT: JSON */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              variant="secondary"
              onClick={convertToCsv}
              disabled={!json}
            >
              <ArrowRightLeft className="mr-2 size-3" /> Convert to CSV
            </Button>
            <Label className="flex items-center gap-2">
              <FileJson className="size-4" /> JSON Output
            </Label>
          </div>
          <div className="flex-1 min-h-75 border rounded-md overflow-hidden shadow-sm">
            <CodeEditor
              value={json}
              onChange={(v) => setJson(v || "")}
              language="json"
              wordWrap="on"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
