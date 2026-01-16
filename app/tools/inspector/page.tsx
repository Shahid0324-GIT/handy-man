"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InspectorPage() {
  const [text, setText] = useState("");

  const stats = {
    chars: text.length,
    words: text.trim().split(/\s+/).filter(Boolean).length,
    lines: text.split("\n").length,
  };

  const transform = (type: "upper" | "lower" | "camel" | "kebab") => {
    switch (type) {
      case "upper":
        setText(text.toUpperCase());
        break;
      case "lower":
        setText(text.toLowerCase());
        break;
      case "kebab":
        setText(text.toLowerCase().replace(/\s+/g, "-"));
        break;
      case "camel":
        setText(
          text
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) =>
              i === 0 ? w.toLowerCase() : w.toUpperCase()
            )
            .replace(/\s+/g, "")
        );
        break;
    }
  };

  return (
    <ToolShell
      title="Text Inspector"
      description="Analyze text and convert case styles."
    >
      <div className="flex flex-col gap-4 h-full">
        <div className="flex gap-4">
          <Badge variant="outline">Chars: {stats.chars}</Badge>
          <Badge variant="outline">Words: {stats.words}</Badge>
          <Badge variant="outline">Lines: {stats.lines}</Badge>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => transform("upper")}
          >
            UPPER
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => transform("lower")}
          >
            lower
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => transform("kebab")}
          >
            kebab-case
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => transform("camel")}
          >
            camelCase
          </Button>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 font-mono resize-none"
          placeholder="Type or paste text..."
        />
      </div>
    </ToolShell>
  );
}
