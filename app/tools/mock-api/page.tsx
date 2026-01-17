"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";
import { CodeEditor } from "@/components/ui/code-editor";
import { generators } from "@/utils/mock-api-gen";

export default function MockApiPage() {
  const [resource, setResource] = useState<keyof typeof generators>("users");
  const [count, setCount] = useState(10);
  const [output, setOutput] = useState("");

  const generate = () => {
    const data = generators[resource](count);
    setOutput(JSON.stringify(data, null, 2));
    toast.success(`Generated ${count} ${resource}`);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied JSON to clipboard");
  };

  return (
    <ToolShell
      title="Mock API Generator"
      description="Generate realistic JSON data for prototyping."
    >
      <div className="flex flex-col h-full gap-4">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-muted/30 p-4 rounded-xl border">
          <div className="space-y-2 md:col-span-1">
            <Label>Resource Type</Label>
            <Select
              value={resource}
              onValueChange={(v) => setResource(v as keyof typeof generators)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="posts">Posts</SelectItem>
                <SelectItem value="groups">Groups</SelectItem>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="todos">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-1">
            <Label>Quantity (1-1000)</Label>
            <Input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="flex gap-2 md:col-span-2">
            <Button onClick={generate} className="flex-1">
              <RefreshCw className="mr-2 size-4" /> Generate JSON
            </Button>
            <Button variant="outline" onClick={copy}>
              <Copy className="size-4" />
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-100 border rounded-xl overflow-hidden shadow-sm">
          <CodeEditor wordWrap="on" language="json" value={output} />
        </div>
      </div>
    </ToolShell>
  );
}
