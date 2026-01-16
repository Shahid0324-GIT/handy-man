"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { IdType } from "@/utils";
import { generateIds } from "@/lib/generators";

export default function UuidPage() {
  const [type, setType] = useState<IdType>("uuid");
  const [count, setCount] = useState([1]);
  const [quotes, setQuotes] = useState(false);

  const [ids, setIds] = useState<string[]>(() => generateIds(1, "uuid"));

  const handleTypeChange = (newType: IdType) => {
    setType(newType);
    setIds(generateIds(count[0], newType));
  };

  const handleCountChange = (newCount: number[]) => {
    setCount(newCount);
    setIds(generateIds(newCount[0], type));
  };

  const handleRegenerate = () => {
    setIds(generateIds(count[0], type));
    toast.success("Regenerated IDs");
  };

  const copyOne = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied ID to clipboard");
  };

  const copyAll = () => {
    const text = ids.map((id) => (quotes ? `"${id}",` : id)).join("\n");
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${ids.length} IDs`);
  };

  return (
    <ToolShell
      title="UUID & ID Generator"
      description="Generate random UUIDs, MongoDB ObjectIDs, and NanoIDs in bulk."
      actions={
        <Button onClick={handleRegenerate}>
          <RefreshCw className="mr-2 size-4" /> Regenerate
        </Button>
      }
    >
      <div className="grid h-full gap-6 md:grid-cols-12">
        {/* LEFT: Settings Panel */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-4 space-y-6">
            <div className="space-y-2">
              <Label>ID Type</Label>
              <Select
                value={type}
                onValueChange={(v) => handleTypeChange(v as IdType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uuid">UUID v4 (Standard)</SelectItem>
                  <SelectItem value="objectid">MongoDB ObjectId</SelectItem>
                  <SelectItem value="nanoid">NanoID (URL Safe)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Quantity: {count[0]}</Label>
              </div>
              <Slider
                value={count}
                onValueChange={handleCountChange}
                max={50}
                step={1}
                min={1}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 border-t pt-4">
              <Label htmlFor="quotes-mode" className="flex flex-col gap-1">
                <span>SQL/JSON Mode</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Wrap IDs in quotes
                </span>
              </Label>
              <Switch
                id="quotes-mode"
                checked={quotes}
                onCheckedChange={setQuotes}
              />
            </div>

            <Button variant="secondary" className="w-full" onClick={copyAll}>
              <Copy className="mr-2 size-4" /> Copy All
            </Button>
          </Card>
        </div>

        {/* RIGHT: Results List */}
        <div className="md:col-span-8 h-full min-h-100">
          <div className="grid gap-2 overflow-y-auto max-h-[calc(100vh-16rem)] pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
            {ids.map((id, index) => (
              <div
                key={`${id}-${index}`}
                className="group flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors cursor-pointer select-all"
                onClick={() => copyOne(id)}
              >
                <code className="font-mono text-sm text-primary break-all">
                  {quotes ? `"${id}",` : id}
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
