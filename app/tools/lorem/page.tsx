"use client";

import { useState, useEffect } from "react";
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
import { CodeEditor } from "@/components/ui/code-editor";
import { generateLorem, type LoremUnit } from "@/lib/lorem";

export default function LoremPage() {
  const [count, setCount] = useState([3]);
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");

  const regenerate = () => {
    const text = generateLorem(count[0], unit, startWithLorem);
    setOutput(text);
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnitChange = (val: LoremUnit) => {
    setUnit(val);
    const newCount = val === "words" ? 50 : val === "sentences" ? 10 : 3;
    setCount([newCount]);
    setOutput(generateLorem(newCount, val, startWithLorem));
  };

  const handleSliderChange = (val: number[]) => {
    setCount(val);
    setOutput(generateLorem(val[0], unit, startWithLorem));
  };

  const handleToggleChange = (checked: boolean) => {
    setStartWithLorem(checked);
    setOutput(generateLorem(count[0], unit, checked));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Text copied to clipboard");
  };

  return (
    <ToolShell
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for layouts and designs."
      actions={
        <Button onClick={regenerate}>
          <RefreshCw className="mr-2 size-4" /> Regenerate
        </Button>
      }
    >
      <div className="grid h-full gap-6 md:grid-cols-12">
        {/* LEFT: Controls */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-4 space-y-6">
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select
                value={unit}
                onValueChange={(v) => handleUnitChange(v as LoremUnit)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Quantity: {count[0]}</Label>
              </div>
              <Slider
                value={count}
                onValueChange={handleSliderChange}
                max={unit === "words" ? 200 : 50}
                step={1}
                min={1}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 border-t pt-4">
              <Label htmlFor="lorem-start" className="flex flex-col gap-1">
                <span>Start with &quot;Lorem ipsum&quot;</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Standard beginning
                </span>
              </Label>
              <Switch
                id="lorem-start"
                checked={startWithLorem}
                onCheckedChange={handleToggleChange}
              />
            </div>

            <Button variant="secondary" className="w-full" onClick={handleCopy}>
              <Copy className="mr-2 size-4" /> Copy Text
            </Button>
          </Card>
        </div>

        {/* RIGHT: Output */}
        <div className="md:col-span-8 h-full min-h-100">
          <div className="relative h-full border rounded-md overflow-hidden bg-background">
            <CodeEditor value={output} language="text" readOnly wordWrap="on" />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
