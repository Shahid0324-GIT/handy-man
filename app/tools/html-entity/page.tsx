"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function HtmlEntityPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    const textarea = document.createElement("textarea");
    textarea.innerText = input;
    setOutput(textarea.innerHTML);
  };

  const decode = () => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = input;
    setOutput(textarea.value);
  };

  return (
    <ToolShell
      title="HTML Entity Encoder"
      description="Escape special characters for safe HTML usage."
    >
      <div className="grid gap-6 md:grid-cols-2 h-full">
        <div className="flex flex-col gap-2">
          <Label>Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 font-mono resize-none"
            placeholder="<div class='test'>&..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-2">
            <Button size="sm" onClick={encode}>
              Escape
            </Button>
            <Button size="sm" variant="secondary" onClick={decode}>
              Unescape
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="flex-1 font-mono resize-none bg-muted/50"
          />
        </div>
      </div>
    </ToolShell>
  );
}
