"use client";

import { useState, useCallback } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Trash2, Upload, ArrowRightLeft, WrapText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [isWrapping, setIsWrapping] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const handleProcess = () => {
    if (!input) return;
    try {
      const result = mode === "encode" ? btoa(input) : atob(input);
      setOutput(result);
      toast.success(`Successfully ${mode}d`);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to process or the input is invalid.";
      toast.error(msg);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setOutput(result);
      toast.success("File converted to Base64");
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const swapMode = () => setMode(mode === "encode" ? "decode" : "encode");

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <ToolShell
      title="Base64 Helper"
      description="Encode and decode text or convert files to Base64 strings."
    >
      <Tabs defaultValue="text" className="h-full flex flex-col">
        <TabsList className="w-fit mb-4">
          <TabsTrigger value="text">Text String</TabsTrigger>
          <TabsTrigger value="file">File / Image</TabsTrigger>
        </TabsList>

        {/* TEXT MODE */}
        <TabsContent value="text" className="flex-1 mt-0">
          <div className="grid h-full gap-4 md:grid-cols-2">
            {/* INPUT */}
            <div className="flex flex-col gap-2 h-full min-h-75">
              <div className="flex justify-between items-center">
                <Label>Input {mode === "encode" ? "(Text)" : "(Base64)"}</Label>
                <Button variant="ghost" size="sm" onClick={() => setInput("")}>
                  <Trash2 className="size-4 text-muted-foreground" />
                </Button>
              </div>
              <CodeEditor
                value={input}
                onChange={(v) => setInput(v || "")}
                language="text"
                wordWrap={isWrapping ? "on" : "off"}
              />
            </div>

            {/* OUTPUT */}
            <div className="flex flex-col gap-2 h-full min-h-75">
              <div className="flex justify-between items-center">
                <Label>
                  Output {mode === "encode" ? "(Base64)" : "(Text)"}
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={isWrapping ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsWrapping(!isWrapping)}
                    title="Toggle Text Wrapping"
                  >
                    <WrapText className="size-4" />
                  </Button>

                  <Button variant="outline" size="sm" onClick={swapMode}>
                    <ArrowRightLeft className="mr-2 size-4" />
                    Switch
                  </Button>
                  <Button size="sm" onClick={handleProcess}>
                    Run
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOutput("")}
                  >
                    <Trash2 className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              <div className="relative flex-1 border rounded-md overflow-hidden">
                <CodeEditor
                  value={output}
                  readOnly
                  language="text"
                  wordWrap={isWrapping ? "on" : "off"}
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 z-10 opacity-50 hover:opacity-100 transition-opacity"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* FILE MODE (DRAG & DROP) */}
        <TabsContent value="file" className="h-full">
          <div
            className={cn(
              "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 h-75 transition-colors duration-200 cursor-pointer",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 bg-muted/20 hover:bg-muted/30"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload
              className={cn(
                "size-10 mb-4 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground"
              )}
            />

            <h3 className="text-lg font-semibold">
              {isDragging ? "Drop file here" : "Upload a file"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
              Drag and drop an image or file here, or click to select.
              <br />
              (Converts to Base64 Data URI)
            </p>

            {/* Hidden Input */}
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {output && (
            <div className="mt-8 space-y-2 h-75 flex flex-col">
              <div className="flex items-center justify-between">
                <Label>Base64 Result</Label>
                <Button
                  variant={isWrapping ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setIsWrapping(!isWrapping)}
                >
                  <WrapText className="mr-2 size-4" />
                  {isWrapping ? "Unwrap" : "Wrap"}
                </Button>
              </div>
              <div className="flex-1 border rounded-md relative overflow-hidden">
                <CodeEditor
                  value={output}
                  readOnly
                  language="text"
                  wordWrap={isWrapping ? "on" : "off"}
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 z-10"
                  onClick={handleCopy}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </ToolShell>
  );
}
