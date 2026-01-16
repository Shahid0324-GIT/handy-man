"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, CheckCircle2, XCircle, WrapText } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { useHashWorker } from "@/hooks/use-hash-worker";
import { HashAlgorithm } from "@/utils";

export default function HashPage() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState<HashAlgorithm>("SHA256");
  const [compareHash, setCompareHash] = useState("");
  const [isWrapping, setIsWrapping] = useState(true);

  const { output, isComputing, computeHash } = useHashWorker();
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    computeHash(debouncedInput, algo);
  }, [debouncedInput, algo, computeHash]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Hash copied to clipboard");
  };

  const isMatch = compareHash && output && compareHash.trim() === output.trim();
  const isMismatch = compareHash && output && !isMatch;

  return (
    <ToolShell
      title="Hash Generator"
      description="Generate MD5, SHA, and Bcrypt hashes. Use the compare box to verify integrity."
    >
      <div className="grid h-full gap-4 md:grid-cols-2">
        {/* LEFT: Inputs */}
        <div className="flex flex-col gap-4 h-full">
          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select
              value={algo}
              onValueChange={(v) => setAlgo(v as HashAlgorithm)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MD5">MD5 (Legacy)</SelectItem>
                <SelectItem value="SHA1">SHA-1 (Legacy)</SelectItem>
                <SelectItem value="SHA256">SHA-256 (Standard)</SelectItem>
                <SelectItem value="SHA512">SHA-512 (Secure)</SelectItem>
                <SelectItem value="BCRYPT">Bcrypt (Password)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-h-50">
            <Label>Input Text</Label>
            <CodeEditor
              value={input}
              onChange={(v) => setInput(v || "")}
              language="text"
              wordWrap="on"
            />
          </div>
        </div>

        {/* RIGHT: Output */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-2 flex-1 min-h-50">
            <div className="flex items-center justify-between">
              <Label>Generated Hash</Label>
              <div className="flex items-center gap-2">
                {isComputing && (
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                )}

                {/* Wrap Toggle Button */}
                <Button
                  variant={isWrapping ? "secondary" : "ghost"}
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsWrapping(!isWrapping)}
                  title="Toggle Text Wrapping"
                >
                  <WrapText className="size-3" />
                </Button>
              </div>
            </div>

            <div className="relative flex-1 border rounded-md overflow-hidden">
              <CodeEditor
                value={output}
                readOnly
                language="text"
                wordWrap={isWrapping ? "on" : "off"}
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 z-10 opacity-70 hover:opacity-100"
                onClick={handleCopy}
                disabled={!output}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>

          {/* Comparison Box */}
          <div
            className={`space-y-2 p-4 border rounded-lg transition-colors duration-300 ${
              isMatch
                ? "bg-green-500/10 border-green-500/50"
                : isMismatch
                ? "bg-red-500/10 border-red-500/50"
                : "bg-muted/20"
            }`}
          >
            <Label className="flex items-center justify-between">
              Compare with...
              {isMatch && (
                <span className="flex items-center text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-right-2">
                  <CheckCircle2 className="mr-1 size-4" /> Match
                </span>
              )}
              {isMismatch && (
                <span className="flex items-center text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-right-2">
                  <XCircle className="mr-1 size-4" /> Mismatch
                </span>
              )}
            </Label>
            <Input
              placeholder="Paste a hash here to verify integrity..."
              value={compareHash}
              onChange={(e) => setCompareHash(e.target.value)}
              className="bg-background"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
