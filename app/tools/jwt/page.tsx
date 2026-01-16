"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { CodeEditor } from "@/components/ui/code-editor";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { decodeJwt } from "@/lib/jwt";
import { JwtParts } from "@/utils";

export default function JwtPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JwtParts | null>(null);

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDecoded(null);
      return;
    }
    setDecoded(decodeJwt(token));
  }, [token]);

  const isValid = decoded && decoded.header && decoded.payload;

  return (
    <ToolShell
      title="JWT Decoder"
      description="Decode JSON Web Tokens securely in your browser. No server calls."
    >
      <div className="grid h-full gap-8 lg:grid-cols-2">
        {/* LEFT: Input (Encoded) */}
        <div className="flex flex-col gap-3 h-full min-h-100">
          <div className="flex items-center justify-between px-1">
            <Label className="text-base font-semibold">Encoded Token</Label>
            {token &&
              (isValid ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/30"
                >
                  <ShieldCheck className="size-3 mr-1" /> Valid Structure
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-red-600 border-red-200 bg-red-50 dark:bg-red-950/30"
                >
                  <ShieldAlert className="size-3 mr-1" /> Invalid Token
                </Badge>
              ))}
          </div>
          <div className="flex-1 border rounded-md shadow-sm overflow-hidden">
            <CodeEditor
              value={token}
              onChange={(v) => setToken(v || "")}
              language="text"
              wordWrap="on"
            />
          </div>
        </div>

        {/* RIGHT: Output (Decoded) */}
        <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-4">
          {/* HEADER (Yellow/Amber) */}
          <div className="flex flex-col gap-2">
            <Label className="text-amber-500 dark:text-amber-400 font-bold px-1 text-base">
              Header
            </Label>
            <div className="h-35 border-l-4 border-amber-500 rounded-r-md border shadow-sm overflow-hidden bg-background">
              <CodeEditor
                value={
                  decoded?.header ? JSON.stringify(decoded.header, null, 2) : ""
                }
                language="json"
                readOnly
              />
            </div>
          </div>

          {/* PAYLOAD (Teal) */}
          <div className="flex flex-col gap-2 flex-1 min-h-50">
            <Label className="text-teal-500 dark:text-teal-400 font-bold px-1 text-base">
              Payload
            </Label>
            <div className="h-full border-l-4 border-teal-500 rounded-r-md border shadow-sm overflow-hidden bg-background">
              <CodeEditor
                value={
                  decoded?.payload
                    ? JSON.stringify(decoded.payload, null, 2)
                    : ""
                }
                language="json"
                readOnly
              />
            </div>
          </div>

          {/* SIGNATURE (Green/Emerald) */}
          <div className="flex flex-col gap-2">
            <Label className="text-emerald-500 dark:text-emerald-400 font-bold px-1 text-base">
              Signature
            </Label>
            <div className="p-4 rounded-md bg-emerald-50/50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 border text-sm font-mono text-muted-foreground break-all shadow-sm">
              {decoded?.signature ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    HMACSHA256
                  </span>
                  (
                  <br />
                  &nbsp;&nbsp;base64UrlEncode(header) + &quot;.&quot; +
                  <br />
                  &nbsp;&nbsp;base64UrlEncode(payload),
                  <br />
                  &nbsp;&nbsp;
                  <span className="bg-background px-1 border rounded inline-block mt-1">
                    your-256-bit-secret
                  </span>
                  <br />)
                </>
              ) : (
                <span className="opacity-50 italic">
                  Enter a valid token to view signature structure.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
