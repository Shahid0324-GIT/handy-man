"use client";

import { useState, useRef } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState("image/webp");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleConvert = async () => {
    if (!file || !preview) return;
    setIsConverting(true);

    try {
      // Create an image element to load the file
      const img = new Image();
      img.src = preview;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context failed");

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Convert to new format (quality 0.9 for jpeg/webp)
      const dataUrl = canvas.toDataURL(format, 0.9);

      // Trigger Download
      const link = document.createElement("a");
      link.href = dataUrl;
      const ext = format.split("/")[1];
      link.download = `converted-image.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Converted to ${ext.toUpperCase()}!`);
    } catch (error) {
      toast.error("Conversion failed.");
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile.type.startsWith("image/")) {
        toast.error("Please drop an image file.");
        return;
      }
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  return (
    <ToolShell
      title="Image Converter"
      description="Convert images to WebP, PNG, or JPG entirely in your browser."
    >
      <div className="grid h-full gap-8 lg:grid-cols-2">
        {/* LEFT: Upload Area */}
        <div className="flex flex-col gap-6 h-full">
          <div
            className="flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-colors hover:bg-muted/50 cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />

            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Upload className="size-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Click or Drag Image Here</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Supports PNG, JPG, WebP
            </p>
          </div>
        </div>

        {/* RIGHT: Preview & Actions */}
        <div className="flex flex-col gap-6 h-full">
          <Card className="flex-1 p-6 flex flex-col gap-6 items-center justify-center bg-muted/20 relative overflow-hidden">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="max-h-75 object-contain rounded-md shadow-md z-10"
              />
            ) : (
              <div className="flex flex-col items-center text-muted-foreground/40">
                <ImageIcon className="size-16 mb-2" />
                <span>No image selected</span>
              </div>
            )}
          </Card>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Target Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/webp">
                    WebP (Modern & Small)
                  </SelectItem>
                  <SelectItem value="image/png">PNG (Transparent)</SelectItem>
                  <SelectItem value="image/jpeg">JPG (Standard)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              size="lg"
              onClick={handleConvert}
              disabled={!file || isConverting}
              className="w-full"
            >
              {isConverting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Download className="mr-2 size-4" />
              )}
              {isConverting ? "Converting..." : "Convert & Download"}
            </Button>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
