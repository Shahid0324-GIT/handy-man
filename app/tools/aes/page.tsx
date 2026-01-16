"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { CodeEditor } from "@/components/ui/code-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Lock,
  Unlock,
  KeyRound,
  ArrowRightLeft,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAesWorker } from "@/hooks/use-aes-worker";

export default function AesPage() {
  const [input, setInput] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const { output, isComputing, error, runAes } = useAesWorker();

  const handleRun = () => {
    if (!input) return toast.error("Please enter some text");
    if (!secretKey) return toast.error("A Secret Key is required!");

    runAes(input, secretKey, mode);
  };

  const swapMode = () => {
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    // Clear outputs on swap to avoid confusion
    setInput("");
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Result copied to clipboard");
  };

  return (
    <ToolShell
      title="AES Encryption"
      description="Encrypt and decrypt sensitive text using a secret key (AES-256)."
    >
      <div className="grid h-full gap-4 md:grid-cols-2">
        {/* LEFT COLUMN: Inputs */}
        <div className="flex flex-col gap-4 h-full">
          {/* Secret Key Input (Crucial for AES) */}
          <div className="space-y-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <Label className="flex items-center gap-2 text-primary font-semibold">
              <KeyRound className="size-4" /> Secret Key
            </Label>
            <Input
              type="password"
              placeholder="Enter a strong password..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              You must use this exact key to decrypt the message later.
            </p>
          </div>

          {/* Text Input */}
          <div className="flex flex-col gap-2 flex-1 min-h-50">
            <Label>
              Input {mode === "encrypt" ? "(Plaintext)" : "(Encrypted String)"}
            </Label>
            <CodeEditor
              value={input}
              onChange={(v) => setInput(v || "")}
              language="text"
              wordWrap="on"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Output & Actions */}
        <div className="flex flex-col gap-4 h-full">
          {/* Action Bar */}
          <div className="flex items-center justify-between gap-2 p-2 bg-muted/30 rounded-lg border">
            <Button variant="ghost" size="sm" onClick={swapMode}>
              <ArrowRightLeft className="mr-2 size-4" />
              Switch to {mode === "encrypt" ? "Decrypt" : "Encrypt"}
            </Button>

            <Button onClick={handleRun} disabled={isComputing || !secretKey}>
              {mode === "encrypt" ? (
                <Lock className="mr-2 size-4" />
              ) : (
                <Unlock className="mr-2 size-4" />
              )}
              {mode === "encrypt" ? "Encrypt" : "Decrypt"}
            </Button>
          </div>

          {/* Output Area */}
          <div className="flex flex-col gap-2 flex-1 min-h-50">
            <Label>Output Result</Label>

            <div className="relative flex-1 border rounded-md overflow-hidden">
              {error ? (
                <div className="absolute inset-0 bg-red-50/50 dark:bg-red-900/10 p-4 font-mono text-sm text-red-600 dark:text-red-400 flex flex-col items-center justify-center text-center gap-2">
                  <AlertCircle className="size-8" />
                  <p className="font-bold">Decryption Failed</p>
                  <p>{error}</p>
                </div>
              ) : (
                <CodeEditor
                  value={output}
                  readOnly
                  language="text"
                  wordWrap="on"
                />
              )}

              {!error && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2 z-10 opacity-70 hover:opacity-100"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  <Copy className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
