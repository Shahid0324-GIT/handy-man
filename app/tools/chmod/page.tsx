"use client";
import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export default function ChmodPage() {
  const [perms, setPerms] = useState<boolean[][]>([
    [true, true, true],
    [true, false, true],
    [true, false, true],
  ]);

  const calculate = (group: boolean[]) => {
    let score = 0;
    if (group[0]) score += 4;
    if (group[1]) score += 2;
    if (group[2]) score += 1;
    return score;
  };

  const code = `${calculate(perms[0])}${calculate(perms[1])}${calculate(perms[2])}`;
  const text =
    (perms[0][0] ? "r" : "-") +
    (perms[0][1] ? "w" : "-") +
    (perms[0][2] ? "x" : "-") +
    (perms[1][0] ? "r" : "-") +
    (perms[1][1] ? "w" : "-") +
    (perms[1][2] ? "x" : "-") +
    (perms[2][0] ? "r" : "-") +
    (perms[2][1] ? "w" : "-") +
    (perms[2][2] ? "x" : "-");

  const toggle = (gIdx: number, pIdx: number) => {
    const newPerms = [...perms];
    newPerms[gIdx][pIdx] = !newPerms[gIdx][pIdx];
    setPerms(newPerms);
  };

  const LABELS = ["Read (4)", "Write (2)", "Execute (1)"];
  const GROUPS = ["Owner", "Group", "Public"];

  return (
    <ToolShell
      title="Chmod Calculator"
      description="Unix file permissions calculator."
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex gap-4 justify-center">
          <Card className="p-6 w-40 text-center space-y-2 bg-primary/5">
            <div className="text-sm text-muted-foreground">Octal</div>
            <div className="text-4xl font-mono font-bold">{code}</div>
          </Card>
          <Card className="p-6 w-40 text-center space-y-2">
            <div className="text-sm text-muted-foreground">Symbolic</div>
            <div className="text-xl font-mono font-medium pt-2">{text}</div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {GROUPS.map((group, gIdx) => (
            <Card key={group} className="p-4 space-y-4">
              <div className="font-semibold text-center pb-2 border-b">
                {group}
              </div>
              {LABELS.map((label, pIdx) => (
                <div key={label} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${gIdx}-${pIdx}`}
                    checked={perms[gIdx][pIdx]}
                    onCheckedChange={() => toggle(gIdx, pIdx)}
                  />
                  <label
                    htmlFor={`${gIdx}-${pIdx}`}
                    className="text-sm leading-none cursor-pointer"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
