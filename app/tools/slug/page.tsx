"use client";
import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SlugPage() {
  const [input, setInput] = useState("Hello World! This is a Post Title.");

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <ToolShell
      title="Slug Generator"
      description="Generate URL-friendly slugs from strings."
    >
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-2">
          <Label>Title / Text</Label>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>URL Slug</Label>
          <div className="flex items-center gap-2 bg-muted p-3 rounded-md font-mono text-primary">
            {slug}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
