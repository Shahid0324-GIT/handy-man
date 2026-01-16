"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";

export default function PixelPage() {
  const [base, setBase] = useState(16);
  const [px, setPx] = useState(16);
  const [rem, setRem] = useState(1);

  const handlePxChange = (val: string) => {
    const p = parseFloat(val) || 0;
    setPx(p);
    setRem(parseFloat((p / base).toFixed(4)));
  };

  const handleRemChange = (val: string) => {
    const r = parseFloat(val) || 0;
    setRem(r);
    setPx(parseFloat((r * base).toFixed(2)));
  };

  const handleBaseChange = (val: string) => {
    const b = parseFloat(val) || 16;
    setBase(b);
    setRem(parseFloat((px / b).toFixed(4)));
  };

  return (
    <ToolShell
      title="Pixel to REM Converter"
      description="Convert CSS units for responsive and accessible layouts."
    >
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Base Setting */}
        <Card className="p-6 w-full flex items-center justify-between bg-muted/30">
          <Label className="text-base">Root Font Size (Base)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={base}
              onChange={(e) => handleBaseChange(e.target.value)}
              className="w-24 text-right"
            />
            <span className="text-muted-foreground font-mono">px</span>
          </div>
        </Card>

        {/* Converter Area */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          {/* PX Input */}
          <div className="flex-1 w-full space-y-2">
            <Label className="text-lg font-bold text-primary">Pixels</Label>
            <div className="relative">
              <Input
                type="number"
                value={px}
                onChange={(e) => handlePxChange(e.target.value)}
                className="h-16 text-2xl font-mono px-4"
              />
              <span className="absolute right-4 top-5 text-muted-foreground font-bold">
                px
              </span>
            </div>
          </div>

          <div className="text-muted-foreground">
            <ArrowRightLeft className="size-6 md:rotate-0 rotate-90" />
          </div>

          {/* REM Input */}
          <div className="flex-1 w-full space-y-2">
            <Label className="text-lg font-bold text-primary">REM</Label>
            <div className="relative">
              <Input
                type="number"
                value={rem}
                onChange={(e) => handleRemChange(e.target.value)}
                className="h-16 text-2xl font-mono px-4"
              />
              <span className="absolute right-4 top-5 text-muted-foreground font-bold">
                rem
              </span>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="grid grid-cols-4 gap-4 w-full pt-8 opacity-70">
          {[12, 14, 16, 18, 20, 24, 32, 48].map((val) => (
            <button
              key={val}
              onClick={() => handlePxChange(val.toString())}
              className="flex flex-col items-center p-3 border rounded hover:bg-muted transition-colors"
            >
              <span className="font-bold">{val}px</span>
              <span className="text-xs text-muted-foreground">
                {(val / base).toFixed(3)}rem
              </span>
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
