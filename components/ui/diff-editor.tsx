"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

const MonacoDiffEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.DiffEditor),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> }
);

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
}

export function DiffEditor({
  original,
  modified,
  language = "text",
}: DiffEditorProps) {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  const theme = resolvedTheme === "dark" ? "vs-dark" : "light";

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 h-full overflow-y-auto p-2">
        <div className="space-y-2">
          <span className="text-xs font-bold text-red-500 uppercase">
            Original
          </span>
          <pre className="p-4 rounded-md border bg-muted/30 text-xs overflow-x-auto">
            {original || "(Empty)"}
          </pre>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-green-500 uppercase">
            Modified
          </span>
          <pre className="p-4 rounded-md border bg-muted/30 text-xs overflow-x-auto">
            {modified || "(Empty)"}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-md border overflow-hidden">
      <MonacoDiffEditor
        height="100%"
        language={language}
        original={original}
        modified={modified}
        theme={theme}
        options={{
          renderSideBySide: true,
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          originalEditable: false,
        }}
      />
    </div>
  );
}
