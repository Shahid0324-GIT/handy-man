"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ColorPage() {
  const [hex, setHex] = useState("#4F46E5");
  const [rgb, setRgb] = useState("rgb(79, 70, 229)");

  const handleHex = (val: string) => {
    setHex(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      const r = parseInt(val.substring(1, 3), 16);
      const g = parseInt(val.substring(3, 5), 16);
      const b = parseInt(val.substring(5, 7), 16);
      setRgb(`rgb(${r}, ${g}, ${b})`);
    }
  };

  return (
    <ToolShell
      title="Color Converter"
      description="Convert between Hex and RGB."
    >
      <div className="max-w-xl mx-auto grid gap-6">
        {/* Visual Preview */}
        <div
          className="h-32 rounded-xl shadow-inner border"
          style={{ backgroundColor: hex }}
        />

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Hex Code</Label>
            <Input
              value={hex}
              onChange={(e) => handleHex(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>RGB</Label>
            <Input value={rgb} readOnly className="font-mono bg-muted" />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
