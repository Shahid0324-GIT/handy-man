"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Info } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeLevel, setEncodeLevel] = useState<"strict" | "param">("strict");

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        if (encodeLevel === "strict") {
          setOutput(encodeURIComponent(input));
        } else {
          setOutput(encodeURI(input));
        }
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Error: Invalid input for decoding";
      setOutput(msg);
    }
  }, [input, mode, encodeLevel]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Result copied!");
  };

  return (
    <ToolShell
      title="URL Encoder / Decoder"
      description="Intelligent URL formatting with strict and safe modes."
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6 h-full">
        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-muted/20 p-4 rounded-xl border">
          <div className="flex items-center gap-4">
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as "encode" | "decode")}
            >
              <TabsList>
                <TabsTrigger value="encode">Encode</TabsTrigger>
                <TabsTrigger value="decode">Decode</TabsTrigger>
              </TabsList>
            </Tabs>

            {mode === "encode" && (
              <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Mode:
                </span>
                <Tabs
                  value={encodeLevel}
                  onValueChange={(v) => setEncodeLevel(v as "strict" | "param")}
                >
                  <TabsList className="h-9">
                    <TabsTrigger value="strict" className="text-xs">
                      Component
                    </TabsTrigger>
                    <TabsTrigger value="param" className="text-xs">
                      Full URL
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4 text-muted-foreground/70 hover:text-primary transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-semibold mb-1">Which one to choose?</p>
                      <ul className="list-disc pl-4 text-xs space-y-1">
                        <li>
                          <strong>Component:</strong> Encodes everything (for
                          query params). Converts <code>/</code> to{" "}
                          <code>%2F</code>.
                        </li>
                        <li>
                          <strong>Full URL:</strong> Keeps protocol intact. Good
                          for fixing spaces in valid URLs.
                        </li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("")}
            className="ml-auto"
          >
            <RefreshCw className="mr-2 size-4" /> Clear
          </Button>
        </div>

        {/* INPUT / OUTPUT STACK */}
        <div className="grid gap-2 flex-1">
          {/* INPUT */}
          <div className="flex flex-col gap-2 h-full">
            <Label className="pl-1">
              Input {mode === "encode" ? "(Text)" : "(Encoded URL)"}
            </Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "e.g. https://example.com/search?q=hello world"
                  : "e.g. https%3A%2F%2Fexample.com"
              }
              className="flex-1 font-mono text-sm leading-relaxed resize-none p-4 min-h-37.5"
            />
          </div>

          {/* OUTPUT */}
          <div className="flex flex-col gap-2 h-full">
            <div className="flex items-center justify-between pl-1">
              <Label>Result</Label>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
                onClick={handleCopy}
              >
                <Copy className="mr-1 size-3" /> Copy
              </Button>
            </div>
            <div className="relative flex-1">
              <Textarea
                value={output}
                readOnly
                className="absolute inset-0 font-mono text-sm leading-relaxed resize-none bg-muted/30 p-4 border-dashed"
              />
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
