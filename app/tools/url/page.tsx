"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Copy,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { CodeEditor } from "@/components/ui/code-editor";

interface QueryParam {
  id: string;
  key: string;
  value: string;
}

export default function UrlBuilderPage() {
  const [urlInput, setUrlInput] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [params, setParams] = useState<QueryParam[]>([]);
  const [error, setError] = useState<string | null>(null);

  const buildUrlString = (base: string, currentParams: QueryParam[]) => {
    if (!base) return "";
    try {
      const urlObj = new URL(base);
      urlObj.search = "";

      currentParams.forEach((p) => {
        if (p.key) urlObj.searchParams.append(p.key, p.value);
      });
      return urlObj.toString();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return base;
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrlInput(newUrl);

    if (!newUrl.trim()) {
      setBaseUrl("");
      setParams([]);
      setError(null);
      return;
    }

    try {
      const validUrl = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
      const urlObj = new URL(validUrl);

      const cleanBase = `${urlObj.origin}${urlObj.pathname}`;
      setBaseUrl(cleanBase);

      const newParams: QueryParam[] = [];
      urlObj.searchParams.forEach((value, key) => {
        newParams.push({ id: crypto.randomUUID(), key, value });
      });

      setParams(newParams);
      setError(null);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : String(e);
      setError(errMsg);
    }
  };

  const updateParam = (
    id: string,
    field: "key" | "value",
    newValue: string
  ) => {
    const newParams = params.map((p) =>
      p.id === id ? { ...p, [field]: newValue } : p
    );
    setParams(newParams);
    setUrlInput(buildUrlString(baseUrl, newParams));
  };

  const addParam = () => {
    const newParams = [
      ...params,
      { id: crypto.randomUUID(), key: "", value: "" },
    ];
    setParams(newParams);
  };

  const removeParam = (id: string) => {
    const newParams = params.filter((p) => p.id !== id);
    setParams(newParams);
    setUrlInput(buildUrlString(baseUrl, newParams));
  };

  const clearAll = () => {
    setUrlInput("");
    setBaseUrl("");
    setParams([]);
    setError(null);
  };

  const copyUrl = () => {
    if (!urlInput) return;
    navigator.clipboard.writeText(urlInput);
    toast.success("URL copied to clipboard");
  };

  return (
    <ToolShell
      title="URL Builder & Parser"
      description="Parse URLs, manage query parameters, and build UTM links."
      actions={
        <Button variant="outline" size="sm" onClick={clearAll}>
          <Trash2 className="mr-2 size-4" /> Clear
        </Button>
      }
    >
      <div className="grid h-full gap-6 md:grid-cols-12">
        {/* LEFT: Builder Interface */}
        <div className="md:col-span-7 flex flex-col gap-6 h-full overflow-hidden">
          <Card className="p-4 space-y-3">
            <Label className="font-semibold flex items-center gap-2">
              <LinkIcon className="size-4" /> Full URL
            </Label>
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/search?q=nextjs"
                className={
                  error ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
              <Button size="icon" variant="secondary" onClick={copyUrl}>
                <Copy className="size-4" />
              </Button>
            </div>
            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="size-3" /> {error}
              </p>
            )}
          </Card>

          <div className="flex flex-col flex-1 min-h-0 border rounded-lg bg-background">
            <div className="flex items-center justify-between p-3 border-b bg-muted/30">
              <Label>Query Parameters</Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={addParam}
                disabled={!baseUrl}
              >
                <Plus className="mr-2 size-4" /> Add Param
              </Button>
            </div>

            <div className="overflow-y-auto p-4 space-y-3 flex-1">
              {!baseUrl ? (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  Enter a valid URL above to start editing parameters.
                </div>
              ) : params.length === 0 ? (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  No parameters detected. Click Add Param to start.
                </div>
              ) : (
                params.map((param) => (
                  <div
                    key={param.id}
                    className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-200"
                  >
                    <Input
                      placeholder="Key"
                      value={param.key}
                      onChange={(e) =>
                        updateParam(param.id, "key", e.target.value)
                      }
                      className="flex-1 font-mono text-sm"
                    />
                    <span className="text-muted-foreground">=</span>
                    <Input
                      placeholder="Value"
                      value={param.value}
                      onChange={(e) =>
                        updateParam(param.id, "value", e.target.value)
                      }
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeParam(param.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="md:col-span-5 flex flex-col gap-4 h-full">
          <Card className="p-4 flex-1 flex flex-col gap-4 bg-muted/10">
            <Label>Breakdown</Label>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Base Path
              </span>
              <div className="p-2 bg-background border rounded-md font-mono text-sm break-all text-muted-foreground">
                {baseUrl || "..."}
              </div>
            </div>

            <Separator />

            <div className="flex-1 flex flex-col gap-2 min-h-50">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Live Result
              </span>
              <div className="flex-1 border rounded-md overflow-hidden relative">
                <CodeEditor
                  value={urlInput}
                  language="text"
                  readOnly
                  wordWrap="on"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ToolShell>
  );
}
