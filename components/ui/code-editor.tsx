"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full bg-muted/30" />,
});

interface CodeEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
  wordWrap?: "off" | "on";
}

export function CodeEditor({
  value,
  onChange,
  language = "json",
  readOnly = false,
  wordWrap = "off",
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();

  const editorTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  if (isMobile) {
    return (
      <textarea
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        autoCapitalize="none"
        autoComplete="off"
        spellCheck="false"
        className={cn(
          "h-full w-full resize-none bg-background p-4 font-mono text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "border rounded-md",
          readOnly && "bg-muted/30 text-muted-foreground",
          wordWrap === "on" ? "break-all whitespace-pre-wrap" : "whitespace-pre"
        )}
        placeholder={`Enter ${language} here...`}
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value}
        theme={editorTheme}
        onChange={onChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          fontFamily: "var(--font-mono), monospace",
          renderLineHighlight: "none",
          contextmenu: false,
          wordWrap: wordWrap,
          fixedOverflowWidgets: true,
        }}
      />
    </div>
  );
}
