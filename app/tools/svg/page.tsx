"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Eraser } from "lucide-react";
import { toast } from "sonner";
import { svgToJsx, wrapInComponent } from "@/lib/transformers";

export default function SvgConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isComponent, setIsComponent] = useState(true);
  const [componentName, setComponentName] = useState("MyIcon");

  useEffect(() => {
    if (!input.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOutput("");
      return;
    }

    let result = svgToJsx(input);

    if (isComponent) {
      result = wrapInComponent(result, componentName);
    }

    setOutput(result);
  }, [input, isComponent, componentName]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("JSX copied to clipboard");
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <ToolShell
      title="SVG to JSX"
      description="Convert raw SVG code into React components instantly."
    >
      <div className="grid h-full gap-6 md:grid-cols-2">
        {/* LEFT: Input */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <Label>Raw SVG</Label>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <Eraser className="mr-2 size-4" /> Clear
            </Button>
          </div>
          <div className="flex-1 min-h-75">
            <CodeEditor
              value={input}
              onChange={(v) => setInput(v || "")}
              language="xml"
              wordWrap="on"
            />
          </div>
        </div>

        {/* RIGHT: Output & Settings */}
        <div className="flex flex-col gap-4 h-full">
          {/* Settings Bar */}
          <div className="flex items-center gap-4 p-4 bg-muted/30 border rounded-lg">
            <div className="flex items-center gap-2">
              <Switch
                id="comp-mode"
                checked={isComponent}
                onCheckedChange={setIsComponent}
              />
              <Label htmlFor="comp-mode">React Component</Label>
            </div>

            {isComponent && (
              <div className="flex items-center gap-2 flex-1">
                <Label
                  htmlFor="comp-name"
                  className="whitespace-nowrap text-xs text-muted-foreground"
                >
                  Name:
                </Label>
                <Input
                  id="comp-name"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  className="h-8 font-mono text-sm"
                  placeholder="IconName"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 flex-1 min-h-75">
            <div className="flex items-center justify-between">
              <Label>React / JSX Output</Label>
            </div>
            <div className="relative flex-1 border rounded-md overflow-hidden">
              <CodeEditor
                value={output}
                readOnly
                language="typescript"
                wordWrap="on"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 z-10"
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
