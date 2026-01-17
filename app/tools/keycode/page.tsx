"use client";

import { useState, useEffect, useRef } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Keyboard, Smartphone, Cpu, Monitor, Wifi } from "lucide-react";
import { toast } from "sonner";

interface KeyInfo {
  key: string;
  code: string;
  which: number;
  location: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

interface HardwareInfo {
  cores: number;
  memory?: number;
  platform: string;
  userAgent: string;
  screenRes: string;
  pixelDepth: number;
  touchSupport: boolean;
  connection?: string;
}

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType: string;
  };
}

export default function KeycodePage() {
  const [event, setEvent] = useState<KeyInfo | null>(null);
  const [hardware, setHardware] = useState<HardwareInfo | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent | React.KeyboardEvent) => {
      setEvent({
        key: e.key === " " ? "(Space)" : e.key,
        code: e.code,
        which: e.which,
        location: e.location,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    const nav = navigator as ExtendedNavigator;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHardware({
      cores: nav.hardwareConcurrency || 0,
      memory: nav.deviceMemory,
      platform: nav.platform,
      userAgent: nav.userAgent,
      screenRes: `${window.screen.width} x ${window.screen.height}`,
      pixelDepth: window.screen.pixelDepth,
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      connection: nav.connection?.effectiveType || "Unknown",
    });

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyToClipboard = (text: string | number) => {
    navigator.clipboard.writeText(text.toString());
    toast.success("Copied!");
  };

  const openMobileKeyboard = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      toast.info("Keyboard opened! Start typing.");
    }
  };

  return (
    <ToolShell
      title="Keycode & System Info"
      description="Inspect keyboard events and system hardware details."
    >
      <div className="flex flex-col gap-12 pb-12">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Keyboard className="size-5 text-primary" /> Input Tester
            </h2>

            <Button
              variant="outline"
              onClick={openMobileKeyboard}
              className="md:hidden"
            >
              <Smartphone className="mr-2 size-4" /> Open Keyboard
            </Button>
          </div>

          <input
            ref={inputRef}
            type="text"
            className="opacity-0 absolute h-0 w-0"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />

          {!event ? (
            <div
              onClick={openMobileKeyboard}
              className="flex flex-col items-center justify-center h-[40vh] text-center space-y-4 animate-in zoom-in-95 duration-300 cursor-pointer"
            >
              <div className="p-8 border-4 border-dashed rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors w-full max-w-lg">
                <h2 className="text-2xl font-bold text-muted-foreground">
                  Press any key
                </h2>
                <p className="text-sm text-muted-foreground mt-2 md:hidden">
                  (Tap here to open virtual keyboard)
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div
                className="relative group cursor-pointer"
                onClick={() => copyToClipboard(event.which)}
              >
                <Card className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-primary/5 border-primary/20 shadow-lg transition-transform group-hover:scale-105">
                  <span className="text-7xl md:text-8xl font-black text-primary">
                    {event.which}
                  </span>
                </Card>
                <div className="absolute -bottom-8 left-0 right-0 text-center text-sm text-muted-foreground font-medium">
                  event.which
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
                <InfoCard
                  label="event.key"
                  value={event.key}
                  onCopy={copyToClipboard}
                />
                <InfoCard
                  label="event.code"
                  value={event.code}
                  onCopy={copyToClipboard}
                />
                <InfoCard
                  label="event.location"
                  value={event.location}
                  onCopy={copyToClipboard}
                />

                <Card className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Modifiers
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {event.ctrlKey && <Badge>Ctrl</Badge>}
                    {event.metaKey && <Badge>Meta</Badge>}
                    {event.shiftKey && <Badge>Shift</Badge>}
                    {event.altKey && <Badge>Alt</Badge>}
                    {!event.ctrlKey &&
                      !event.metaKey &&
                      !event.shiftKey &&
                      !event.altKey && (
                        <span className="text-sm text-muted-foreground italic">
                          None
                        </span>
                      )}
                  </div>
                </Card>
              </div>

              <Button
                variant="ghost"
                onClick={() => setEvent(null)}
                className="text-muted-foreground"
              >
                Reset
              </Button>
            </div>
          )}
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Cpu className="size-5 text-primary" /> System Hardware
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Cpu className="size-5" />{" "}
                <span className="font-semibold">Processing</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Logical Cores</span>
                  <span className="font-mono font-bold">
                    {hardware?.cores || "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>RAM (Approx)</span>
                  <span className="font-mono font-bold">
                    {hardware?.memory ? `~${hardware.memory} GB` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform</span>
                  <span
                    className="font-mono font-bold text-xs truncate max-w-37.5"
                    title={hardware?.platform}
                  >
                    {hardware?.platform || "Unknown"}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Monitor className="size-5" />{" "}
                <span className="font-semibold">Display</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Resolution</span>
                  <span className="font-mono font-bold">
                    {hardware?.screenRes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Color Depth</span>
                  <span className="font-mono font-bold">
                    {hardware?.pixelDepth}-bit
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Touch Screen</span>
                  <Badge
                    variant={hardware?.touchSupport ? "default" : "secondary"}
                  >
                    {hardware?.touchSupport ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Wifi className="size-5" />{" "}
                <span className="font-semibold">Network & Browser</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Connection</span>
                  <span className="font-mono font-bold uppercase">
                    {hardware?.connection}
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-sm">User Agent</span>
                  <div className="text-[10px] text-muted-foreground bg-muted p-2 rounded break-all font-mono leading-tight">
                    {hardware?.userAgent}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </ToolShell>
  );
}

function InfoCard({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string | number;
  onCopy: (v: string | number) => void;
}) {
  return (
    <Card
      className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors group"
      onClick={() => onCopy(value)}
    >
      <span className="text-xs font-semibold text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-xl md:text-2xl font-bold font-mono group-hover:text-primary transition-colors truncate max-w-full">
        {value}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 opacity-0 group-hover:opacity-100 absolute top-2 right-2"
      >
        <Copy className="size-3" />
      </Button>
    </Card>
  );
}
