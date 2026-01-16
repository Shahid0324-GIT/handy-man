"use client";

import { useEffect, useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { CodeEditor } from "@/components/ui/code-editor";
import { useTheme } from "next-themes";

export default function ShadowPage() {
  const { resolvedTheme } = useTheme();
  const [offsetX, setOffsetX] = useState([0]);
  const [offsetY, setOffsetY] = useState([4]);
  const [blur, setBlur] = useState([10]);
  const [spread, setSpread] = useState([0]);
  const [opacity, setOpacity] = useState([0.2]);
  const [color, setColor] = useState(
    resolvedTheme === "light" ? "#000000" : "#FFFFFF"
  );
  const [inset, setInset] = useState(false);

  // Convert Hex to RGBA for opacity support
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColor(resolvedTheme === "light" ? "#000000" : "#FFFFFF");
  }, [resolvedTheme]);

  const shadowString = `${
    inset ? "inset " : ""
  }${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(
    color,
    opacity[0]
  )}`;

  const cssOutput = `box-shadow: ${shadowString};`;
  const tailwindHint = `shadow-[${shadowString.replace(/ /g, "_")}]`;

  const reset = () => {
    setOffsetX([0]);
    setOffsetY([4]);
    setBlur([10]);
    setSpread([0]);
    setOpacity([0.2]);
    setColor("#000000");
    setInset(false);
  };

  const copyCss = () => {
    navigator.clipboard.writeText(cssOutput);
    toast.success("CSS copied to clipboard");
  };

  return (
    <ToolShell
      title="CSS Shadow Generator"
      description="Create smooth, layered box-shadows visually."
      actions={
        <Button variant="outline" size="sm" onClick={reset}>
          <RefreshCw className="mr-2 size-4" /> Reset
        </Button>
      }
    >
      <div className="grid h-full gap-6 md:grid-cols-12">
        {/* LEFT: Controls */}
        <div className="md:col-span-4 space-y-6 overflow-y-auto pr-2 max-h-[calc(100vh-12rem)]">
          <Card className="p-5 space-y-6">
            {/* Offset X */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Offset X</Label>
                <span className="text-xs text-muted-foreground">
                  {offsetX}px
                </span>
              </div>
              <Slider
                value={offsetX}
                onValueChange={setOffsetX}
                min={-100}
                max={100}
              />
            </div>

            {/* Offset Y */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Offset Y</Label>
                <span className="text-xs text-muted-foreground">
                  {offsetY}px
                </span>
              </div>
              <Slider
                value={offsetY}
                onValueChange={setOffsetY}
                min={-100}
                max={100}
              />
            </div>

            {/* Blur */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Blur Radius</Label>
                <span className="text-xs text-muted-foreground">{blur}px</span>
              </div>
              <Slider value={blur} onValueChange={setBlur} min={0} max={100} />
            </div>

            {/* Spread */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Spread Radius</Label>
                <span className="text-xs text-muted-foreground">
                  {spread}px
                </span>
              </div>
              <Slider
                value={spread}
                onValueChange={setSpread}
                min={-50}
                max={50}
              />
            </div>

            {/* Opacity */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Opacity</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(opacity[0] * 100)}%
                </span>
              </div>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                min={0}
                max={1}
                step={0.01}
              />
            </div>

            {/* Color & Inset */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="uppercase font-mono text-xs"
                    maxLength={7}
                  />
                </div>
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <div className="flex items-center justify-between border rounded-md p-2">
                  <Label className="cursor-pointer" htmlFor="inset-mode">
                    Inset
                  </Label>
                  <Switch
                    id="inset-mode"
                    checked={inset}
                    onCheckedChange={setInset}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT: Preview */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Preview Box */}
          <div className="flex-1 min-h-75 bg-muted/20 border-2 border-dashed rounded-lg flex items-center justify-center p-8 relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div
              className="w-48 h-48 bg-background rounded-xl flex items-center justify-center text-sm font-medium text-muted-foreground transition-all duration-200"
              style={{ boxShadow: shadowString }}
            >
              Preview
            </div>
          </div>

          {/* Code Output */}
          <div className="h-37.5 relative border rounded-md overflow-hidden bg-background">
            <div className="absolute top-2 right-2 z-10">
              <Button size="sm" variant="secondary" onClick={copyCss}>
                <Copy className="mr-2 size-4" /> Copy CSS
              </Button>
            </div>
            <CodeEditor
              value={`${cssOutput}\n\n/* Tailwind Class */\n${tailwindHint}`}
              language="css"
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
