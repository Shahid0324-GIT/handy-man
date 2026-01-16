"use client";
import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AspectRatioPage() {
  const [w, setW] = useState(1920);
  const [h, setH] = useState(1080);

  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(w, h);
  const ratio = `${w / divisor}:${h / divisor}`;

  return (
    <ToolShell
      title="Aspect Ratio Calculator"
      description="Calculate aspect ratios and resize dimensions."
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="flex gap-4 items-end">
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              type="number"
              value={w}
              onChange={(e) => setW(Number(e.target.value))}
              className="w-32 text-center"
            />
          </div>
          <span className="pb-2 text-2xl text-muted-foreground">×</span>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              type="number"
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-32 text-center"
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground uppercase tracking-widest">
            Aspect Ratio
          </div>
          <div className="text-6xl font-black text-primary">{ratio}</div>
        </div>
      </div>
    </ToolShell>
  );
}
