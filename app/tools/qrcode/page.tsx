"use client";

import { useState, useEffect, useMemo } from "react";
import QRCode from "qrcode";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

export default function QrCodePage() {
  const [text, setText] = useState("https://handyman.dev");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [colorDark, setColorDark] = useState("#000000");
  const [colorLight, setColorLight] = useState("#ffffff");

  const qrConfig = useMemo(
    () => ({
      text,
      colorDark,
      colorLight,
    }),
    [text, colorDark, colorLight]
  );

  const debouncedConfig = useDebounce(qrConfig, 200);

  // 3. Effect depends ONLY on the stable, debounced config
  useEffect(() => {
    if (!debouncedConfig.text) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQrDataUrl(null);
      return;
    }

    // No manual timeout needed here anymore!
    QRCode.toDataURL(debouncedConfig.text, {
      width: 400,
      margin: 2,
      color: {
        dark: debouncedConfig.colorDark,
        light: debouncedConfig.colorLight,
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [debouncedConfig]); // Runs only when the debounce settles

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded");
  };

  return (
    <ToolShell
      title="QR Code Generator"
      description="Create customizable QR codes for URLs, text, and more."
    >
      <div className="grid h-full gap-8 md:grid-cols-12">
        {/* LEFT: Settings */}
        <div className="md:col-span-5 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <LinkIcon className="size-4" /> Content
              </Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Foreground</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colorDark}
                    onChange={(e) => setColorDark(e.target.value)}
                    className="w-12 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={colorDark}
                    onChange={(e) => setColorDark(e.target.value)}
                    className="uppercase font-mono text-xs"
                    maxLength={7}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={colorLight}
                    onChange={(e) => setColorLight(e.target.value)}
                    className="w-12 h-9 p-1 cursor-pointer"
                  />
                  <Input
                    value={colorLight}
                    onChange={(e) => setColorLight(e.target.value)}
                    className="uppercase font-mono text-xs"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={downloadQr}
              disabled={!qrDataUrl}
            >
              <Download className="mr-2 size-4" /> Download PNG
            </Button>
          </Card>
        </div>

        {/* RIGHT: Preview */}
        <div className="md:col-span-7 flex flex-col items-center justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
            <div className="relative bg-white p-4 rounded-lg shadow-xl min-h-70 min-w-70 flex items-center justify-center">
              {qrDataUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={qrDataUrl}
                  alt="Generated QR Code"
                  className="w-64 h-64 md:w-80 md:h-80 object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground/50 animate-pulse">
                  <Loader2 className="size-8 animate-spin mb-2" />
                  <span className="text-sm font-medium">Generating...</span>
                </div>
              )}
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Scan with your phone camera to test.
          </p>
        </div>
      </div>
    </ToolShell>
  );
}
