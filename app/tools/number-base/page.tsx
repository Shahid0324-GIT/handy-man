"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NumberBasePage() {
  const [dec, setDec] = useState<string>("");

  const update = (val: string, radix: number) => {
    if (!val) {
      setDec("");
      return;
    }
    const parsed = parseInt(val, radix);
    if (!isNaN(parsed)) setDec(parsed.toString());
  };

  return (
    <ToolShell
      title="Number Base Converter"
      description="Convert between Decimal, Hex, Binary, and Octal."
    >
      <div className="grid gap-6 max-w-xl mx-auto mt-8">
        <div className="space-y-2">
          <Label>Decimal (Base 10)</Label>
          <Input
            value={dec}
            onChange={(e) => update(e.target.value, 10)}
            type="number"
          />
        </div>
        <div className="space-y-2">
          <Label>Hexadecimal (Base 16)</Label>
          <Input
            value={dec ? parseInt(dec).toString(16).toUpperCase() : ""}
            onChange={(e) => update(e.target.value, 16)}
          />
        </div>
        <div className="space-y-2">
          <Label>Binary (Base 2)</Label>
          <Input
            value={dec ? parseInt(dec).toString(2) : ""}
            onChange={(e) => update(e.target.value, 2)}
          />
        </div>
        <div className="space-y-2">
          <Label>Octal (Base 8)</Label>
          <Input
            value={dec ? parseInt(dec).toString(8) : ""}
            onChange={(e) => update(e.target.value, 8)}
          />
        </div>
      </div>
    </ToolShell>
  );
}
