"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface KeyInfo {
  key: string;
  code: string;
  which: number;
  location: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

export default function KeycodePage() {
  const [event, setEvent] = useState<KeyInfo | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setEvent({
        key: e.key === " " ? "(Space)" : e.key,
        code: e.code,
        which: e.which,
        location: e.location,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyToClipboard = (text: string | number) => {
    navigator.clipboard.writeText(text.toString());
    toast.success("Copied!");
  };

  if (!event) {
    return (
      <ToolShell
        title="Keycode Info"
        description="Press any key to see its JavaScript event codes."
      >
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="p-8 border-4 border-dashed rounded-2xl bg-muted/30">
            <h2 className="text-3xl font-bold text-muted-foreground">
              Press any key
            </h2>
          </div>
        </div>
      </ToolShell>
    );
  }

  return (
    <ToolShell
      title="Keycode Info"
      description="JavaScript KeyboardEvent properties."
    >
      <div className="flex flex-col items-center gap-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Main "Which" Code (Big Display) */}
        <div
          className="relative group cursor-pointer"
          onClick={() => copyToClipboard(event.which)}
        >
          <Card className="flex items-center justify-center w-48 h-48 bg-primary/5 border-primary/20 shadow-lg transition-transform group-hover:scale-105">
            <span className="text-8xl font-black text-primary">
              {event.which}
            </span>
          </Card>
          <div className="absolute -bottom-8 left-0 right-0 text-center text-sm text-muted-foreground font-medium">
            event.which
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
          <InfoCard
            label="event.key"
            value={event.key}
            onCopy={copyToClipboard}
          />
          <InfoCard
            label="event.code"
            value={event.code}
            onCopy={copyToClipboard}
          />
          <InfoCard
            label="event.location"
            value={event.location}
            onCopy={copyToClipboard}
          />

          {/* Modifiers */}
          <Card className="p-4 flex flex-col items-center justify-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Modifiers
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {event.ctrlKey && <Badge>Ctrl</Badge>}
              {event.metaKey && <Badge>Meta</Badge>}
              {event.shiftKey && <Badge>Shift</Badge>}
              {event.altKey && <Badge>Alt</Badge>}
              {!event.ctrlKey &&
                !event.metaKey &&
                !event.shiftKey &&
                !event.altKey && (
                  <span className="text-sm text-muted-foreground italic">
                    None
                  </span>
                )}
            </div>
          </Card>
        </div>
      </div>
    </ToolShell>
  );
}

function InfoCard({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string | number;
  onCopy: (v: string | number) => void;
}) {
  return (
    <Card
      className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors group"
      onClick={() => onCopy(value)}
    >
      <span className="text-xs font-semibold text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-2xl font-bold font-mono group-hover:text-primary transition-colors">
        {value}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
      >
        <Copy className="size-3" />
      </Button>
    </Card>
  );
}
