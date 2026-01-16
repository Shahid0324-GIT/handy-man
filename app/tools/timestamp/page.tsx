"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function TimestampPage() {
  const [now, setNow] = useState(() => Date.now());
  const [input, setInput] = useState<string>("");
  const [mode, setMode] = useState<"seconds" | "milliseconds">("seconds");
  const [outputDate, setOutputDate] = useState<string>("");
  const [outputRelative, setOutputRelative] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOutputDate("-");
      setOutputRelative("-");
      return;
    }

    let timestamp = parseInt(input);

    if (mode === "seconds") timestamp *= 1000;

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      setOutputDate("Invalid Date");
      setOutputRelative("-");
    } else {
      // Format: "Mon, Jan 16 2026, 10:30:00 PM"
      setOutputDate(
        new Intl.DateTimeFormat("en-US", {
          dateStyle: "full",
          timeStyle: "medium",
        }).format(date)
      );

      // Relative: "5 minutes ago"
      const diff = (Date.now() - date.getTime()) / 1000;
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

      if (Math.abs(diff) < 60)
        setOutputRelative(rtf.format(-Math.round(diff), "second"));
      else if (Math.abs(diff) < 3600)
        setOutputRelative(rtf.format(-Math.round(diff / 60), "minute"));
      else if (Math.abs(diff) < 86400)
        setOutputRelative(rtf.format(-Math.round(diff / 3600), "hour"));
      else setOutputRelative(rtf.format(-Math.round(diff / 86400), "day"));
    }
  }, [input, mode]);

  const setInputToNow = () => {
    const ts = mode === "seconds" ? Math.floor(Date.now() / 1000) : Date.now();
    setInput(ts.toString());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <ToolShell
      title="Unix Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates."
    >
      <div className="grid h-full gap-8 lg:grid-cols-2">
        {/* LEFT: Input */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground uppercase tracking-wider text-xs font-bold">
                Current Unix Time
              </Label>
              <div className="font-mono text-sm text-primary animate-pulse">
                {Math.floor(now / 1000)}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Enter Timestamp</Label>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. 1768600000"
                  className="font-mono"
                />
                <Select
                  value={mode}
                  onValueChange={(v: "seconds" | "milliseconds") => setMode(v)}
                >
                  <SelectTrigger className="w-35">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="milliseconds">Millis (ms)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={setInputToNow}
            >
              <RefreshCw className="mr-2 size-4" /> Reset to Now
            </Button>
          </Card>
        </div>

        {/* RIGHT: Output */}
        <div className="flex flex-col gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-card border p-8 rounded-xl shadow-xl flex flex-col gap-8">
              <div className="space-y-2">
                <Label className="text-muted-foreground uppercase text-xs font-bold">
                  Human Date
                </Label>
                <div
                  className="text-2xl md:text-3xl font-bold tracking-tight text-foreground cursor-pointer hover:underline decoration-dashed underline-offset-4"
                  onClick={() => copyToClipboard(outputDate)}
                >
                  {outputDate || "-"}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground uppercase text-xs font-bold">
                  Relative
                </Label>
                <div className="flex items-center gap-2 text-lg font-medium text-amber-600 dark:text-amber-400">
                  <Clock className="size-5" />
                  {outputRelative || "-"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div
                  className="space-y-1 cursor-pointer group/item"
                  onClick={() =>
                    copyToClipboard(
                      new Date(
                        parseInt(input) * (mode === "seconds" ? 1000 : 1)
                      ).toISOString()
                    )
                  }
                >
                  <Label className="text-[10px] text-muted-foreground">
                    ISO 8601
                  </Label>
                  <p className="font-mono text-xs truncate group-hover/item:text-primary transition-colors">
                    {input
                      ? new Date(
                          parseInt(input) * (mode === "seconds" ? 1000 : 1)
                        ).toISOString()
                      : "-"}
                  </p>
                </div>
                <div
                  className="space-y-1 cursor-pointer group/item"
                  onClick={() =>
                    copyToClipboard(
                      new Date(
                        parseInt(input) * (mode === "seconds" ? 1000 : 1)
                      ).toUTCString()
                    )
                  }
                >
                  <Label className="text-[10px] text-muted-foreground">
                    UTC
                  </Label>
                  <p className="font-mono text-xs truncate group-hover/item:text-primary transition-colors">
                    {input
                      ? new Date(
                          parseInt(input) * (mode === "seconds" ? 1000 : 1)
                        ).toUTCString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
