"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Play, Copy, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useJsonWorker } from "@/hooks/use-json-worker";
import { useDebounce } from "@/hooks/use-debounce";

const AUTO_FORMAT_LIMIT = 20000;

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [showLargeFileHint, setShowLargeFileHint] = useState(false);

  const { formatJson, formattedData, isFormatting, error } = useJsonWorker();

  const handleInputChange = (value: string | undefined) => {
    const val = value || "";
    setInput(val);

    if (val.length > AUTO_FORMAT_LIMIT) {
      setShowLargeFileHint(true);
    } else {
      setShowLargeFileHint(false);
    }
  };

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedInput && debouncedInput.length <= AUTO_FORMAT_LIMIT) {
      formatJson(debouncedInput);
    }
  }, [debouncedInput, formatJson]);

  const handleManualFormat = () => {
    if (!input.trim()) return;
    formatJson(input);
    setShowLargeFileHint(false);
    toast.info("Formatting large file...");
  };

  const handleCopy = () => {
    if (!formattedData) return;
    navigator.clipboard.writeText(formattedData);
    toast.success("Copied result to clipboard");
  };

  const handleClear = () => {
    setInput("");
    setShowLargeFileHint(false);
    formatJson("");
  };

  return (
    <ToolShell
      title="JSON Formatter"
      description="Format, validate, and minify JSON data instantly."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="mr-2 size-4" /> Clear
          </Button>
          <Button
            size="sm"
            onClick={handleManualFormat}
            disabled={isFormatting}
          >
            {isFormatting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Play className="mr-2 size-4" />
            )}
            Format
          </Button>
        </>
      }
    >
      <div className="grid h-full gap-4 md:grid-cols-2">
        {/* Input Area */}
        <div className="flex flex-col gap-2 h-full min-h-75 relative">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-muted-foreground">
              Input
            </label>
            {showLargeFileHint && (
              <span className="text-xs text-amber-500 animate-pulse">
                Large file detected. Press Format manually.
              </span>
            )}
          </div>

          <CodeEditor
            value={input}
            onChange={handleInputChange}
            language="json"
          />
        </div>

        {/* Output Area */}
        <div className="flex flex-col gap-2 h-full min-h-75">
          <div className="flex items-center justify-between">
            <label
              className={cn(
                "text-sm font-medium",
                error ? "text-red-500" : "text-muted-foreground"
              )}
            >
              {error ? "Error" : "Output"}
            </label>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCopy}
              disabled={!formattedData}
            >
              <Copy className="size-3" />
            </Button>
          </div>

          <div className="relative flex-1 h-full overflow-hidden rounded-md border">
            {error ? (
              <div className="absolute inset-0 bg-red-50/50 dark:bg-red-900/10 p-4 font-mono text-sm text-red-600 dark:text-red-400">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <AlertCircle className="size-4" />
                  Parse Error
                </div>
                {error}
              </div>
            ) : (
              <CodeEditor
                value={formattedData || ""}
                language="json"
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
