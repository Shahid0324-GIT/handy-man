"use client";

import { useState, useMemo } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Regex } from "lucide-react";
import { toast } from "sonner";
import { PATTERNS } from "@/lib/constants";

// Interfaces for strict typing
interface RegexMatch {
  index: number;
  value: string;
  groups: string[];
}

interface RegexFlags {
  g: boolean;
  i: boolean;
  m: boolean;
}

export default function RegexPage() {
  const [pattern, setPattern] = useState("\\b\\w+\\b");
  const [text, setText] = useState(
    "Hello world! This is a test string. Contact: test@example.com"
  );
  const [flags, setFlags] = useState<RegexFlags>({
    g: true,
    i: true,
    m: false,
  });

  const { matches, error } = useMemo(() => {
    try {
      const flagStr = Object.keys(flags)
        .filter((k) => flags[k as keyof RegexFlags])
        .join("");

      const regex = new RegExp(pattern, flagStr);
      const results: RegexMatch[] = [];

      if (flags.g) {
        let match;
        while ((match = regex.exec(text)) !== null) {
          results.push({
            index: match.index,
            value: match[0],
            groups: match.slice(1),
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        const match = regex.exec(text);
        if (match) {
          results.push({
            index: match.index,
            value: match[0],
            groups: match.slice(1),
          });
        }
      }
      return { matches: results, error: null };
    } catch (e) {
      return {
        matches: [],
        error: e instanceof Error ? e.message : "Invalid Regex",
      };
    }
  }, [pattern, text, flags]);

  const highlightedText = useMemo(() => {
    if (!matches.length || error) return text;

    let lastIndex = 0;
    const parts = [];

    matches.forEach((m, i) => {
      if (m.index > lastIndex) {
        parts.push(
          <span key={`pre-${i}`}>{text.slice(lastIndex, m.index)}</span>
        );
      }
      parts.push(
        <mark
          key={`match-${i}`}
          className="bg-yellow-200 dark:bg-yellow-900/50 text-foreground rounded-[2px] px-0.5 border-b-2 border-yellow-500"
        >
          {m.value}
        </mark>
      );
      lastIndex = m.index + m.value.length;
    });

    if (lastIndex < text.length) {
      parts.push(<span key="post">{text.slice(lastIndex)}</span>);
    }

    return parts;
  }, [text, matches, error]);

  const insertPattern = (p: string) => {
    setPattern(p);
    toast.success("Pattern applied!");
  };

  return (
    <ToolShell
      title="Regex Studio"
      description="Test, debug, and generate Regular Expressions."
    >
      <div className="grid h-full gap-6 lg:grid-cols-12">
        {/* LEFT: Input & Controls */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-2">
            <Label>Regular Expression</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground font-mono text-lg">
                  /
                </span>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className={`font-mono text-lg pl-6 pr-6 ${
                    error ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                />
                <span className="absolute right-3 top-2.5 text-muted-foreground font-mono text-lg">
                  /
                </span>
              </div>
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-md border">
                {(["g", "i", "m"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() =>
                      setFlags((prev) => ({ ...prev, [f]: !prev[f] }))
                    }
                    className={`w-8 h-8 rounded text-xs font-bold uppercase transition-colors ${
                      flags[f]
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
          </div>

          <div className="grid grid-rows-2 gap-4 flex-1 min-h-100">
            <div className="flex flex-col gap-2 h-full">
              <Label>Test String</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 font-mono resize-none leading-relaxed"
                placeholder="Paste your text here..."
              />
            </div>

            <div className="flex flex-col gap-2 h-full">
              <div className="flex items-center justify-between">
                <Label>Match Preview</Label>
                <Badge variant="secondary">
                  {matches.length} matches found
                </Badge>
              </div>
              <div className="flex-1 border rounded-md p-3 font-mono bg-muted/10 overflow-y-auto whitespace-pre-wrap break-all leading-relaxed">
                {highlightedText}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Generator / Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full border-l pl-0 lg:pl-6">
          <div className="flex flex-col gap-3 max-h-[40%] overflow-hidden">
            <Label>Captured Groups</Label>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {matches.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No matches found.
                </p>
              ) : (
                matches.map((m, i) => (
                  <Card key={i} className="p-3 text-sm space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Match #{i + 1}</span>
                      <span>Index: {m.index}</span>
                    </div>
                    <div className="font-mono font-medium truncate bg-muted/50 p-1 rounded">
                      {m.value}
                    </div>
                    {m.groups.length > 0 && (
                      <div className="pl-2 border-l-2 border-primary/20 mt-2 space-y-1">
                        {m.groups.map((g, gi) => (
                          <div
                            key={gi}
                            className="text-xs grid grid-cols-[20px_1fr] gap-2"
                          >
                            <span className="text-muted-foreground">
                              ${gi + 1}
                            </span>
                            <span className="font-mono truncate">{g}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-col gap-3 flex-1 overflow-hidden">
            <Label className="flex items-center gap-2">
              <Regex className="size-4" /> Quick Patterns
            </Label>
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {PATTERNS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => insertPattern(item.pattern)}
                  className="w-full text-left p-3 rounded-md border hover:bg-muted/50 hover:border-primary/50 transition-all group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{item.name}</span>
                    <Plus className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono truncate bg-muted/30 p-1 rounded">
                    /{item.pattern}/
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
