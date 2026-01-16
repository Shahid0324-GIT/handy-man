"use client";

import { useState, useRef, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "@/components/ui/code-editor";
import {
  ArrowRightLeft,
  Eraser,
  FileJson,
  FileSpreadsheet,
  Upload,
  Loader2,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useCsvWorker } from "@/hooks/use-csv-worker";

export default function CsvPage() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  const { result, isComputing, error, convertToJson, convertToCsv } =
    useCsvWorker();

  const [lastAction, setLastAction] = useState<"to_json" | "to_csv" | null>(
    null
  );

  useEffect(() => {
    if (result && lastAction === "to_json") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setJson(result);
      toast.success("Converted to JSON");
    } else if (result && lastAction === "to_csv") {
      setCsv(result);
      toast.success("Converted to CSV");
    }
  }, [result, lastAction]);

  const handleJsonConversion = () => {
    if (!csv) return;
    setLastAction("to_json");
    convertToJson(csv);
  };

  const handleCsvConversion = () => {
    if (!json) return;
    setLastAction("to_csv");
    convertToCsv(json);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (file.name.endsWith(".json")) {
        setJson(text);
        toast.success(`Loaded JSON file: ${file.name}`);
      } else {
        setCsv(text);
        toast.success(`Loaded CSV file: ${file.name}`);
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) readFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) readFile(e.dataTransfer.files[0]);
  };

  const handleDownload = (content: string, ext: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `converted.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setCsv("");
    setJson("");
    setLastAction(null);
  };

  return (
    <ToolShell
      title="CSV ↔ JSON Converter"
      description="Convert data formats securely. Supports large files via Web Worker."
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

        {/* LEFT: CSV Input */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <FileSpreadsheet className="size-4" /> CSV Input
            </Label>
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv,.json,.txt"
                onChange={handleFileUpload}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 size-3" /> Upload
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleJsonConversion}
                disabled={!csv || isComputing}
              >
                {isComputing && lastAction === "to_json" ? (
                  <Loader2 className="mr-2 size-3 animate-spin" />
                ) : null}
                To JSON <ArrowRightLeft className="ml-2 size-3" />
              </Button>
            </div>
          </div>

          <div
            className="flex-1 min-h-75 border rounded-md overflow-hidden shadow-sm relative group"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <CodeEditor
              value={csv}
              onChange={(v) => setCsv(v || "")}
              language="text"
              wordWrap="off"
            />
            {/* Drag Overlay Hint */}
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              <div className="bg-popover text-popover-foreground px-4 py-2 rounded-md shadow-lg font-medium border">
                Drop file to load
              </div>
            </div>

            {/* Download Button overlay */}
            {csv && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-4 z-10 shadow-lg opacity-50 hover:opacity-100 transition-opacity"
                onClick={() => handleDownload(csv, "csv")}
                title="Download .csv"
              >
                <Download className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {/* RIGHT: JSON Output */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCsvConversion}
              disabled={!json || isComputing}
            >
              <ArrowRightLeft className="mr-2 size-3" /> To CSV
              {isComputing && lastAction === "to_csv" ? (
                <Loader2 className="ml-2 size-3 animate-spin" />
              ) : null}
            </Button>
            <Label className="flex items-center gap-2">
              <FileJson className="size-4" /> JSON Output
            </Label>
          </div>

          <div className="flex-1 min-h-75 border rounded-md overflow-hidden shadow-sm relative">
            <CodeEditor
              value={json}
              onChange={(v) => setJson(v || "")}
              language="json"
              wordWrap="on"
            />
            {/* Download Button overlay */}
            {json && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-4 z-10 shadow-lg opacity-50 hover:opacity-100 transition-opacity"
                onClick={() => handleDownload(json, "json")}
                title="Download .json"
              >
                <Download className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
