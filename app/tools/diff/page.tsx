"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "@/components/ui/code-editor";
import { DiffEditor } from "@/components/ui/diff-editor";
import { ArrowRightLeft, Eraser, Split } from "lucide-react";

export default function DiffPage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setShowDiff(false);
  };

  return (
    <ToolShell
      title="Diff Viewer"
      description="Compare two text files side-by-side to find differences."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Eraser className="mr-2 size-4" /> Clear
          </Button>
          <Button
            size="sm"
            onClick={() => setShowDiff(!showDiff)}
            disabled={!original && !modified}
          >
            {showDiff ? (
              <ArrowRightLeft className="mr-2 size-4" />
            ) : (
              <Split className="mr-2 size-4" />
            )}
            {showDiff ? "Edit Inputs" : "Show Differences"}
          </Button>
        </>
      }
    >
      {showDiff ? (
        // DIFF VIEW
        <div className="h-full min-h-125 animate-in fade-in zoom-in-95 duration-200">
          <DiffEditor original={original} modified={modified} language="text" />
        </div>
      ) : (
        // EDIT VIEW
        <div className="grid h-full gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 h-full min-h-75">
            <Label className="text-red-500 font-semibold">Original Text</Label>
            <CodeEditor
              value={original}
              onChange={(v) => setOriginal(v || "")}
              language="text"
              wordWrap="on"
            />
          </div>
          <div className="flex flex-col gap-2 h-full min-h-75">
            <Label className="text-green-500 font-semibold">
              Modified Text
            </Label>
            <CodeEditor
              value={modified}
              onChange={(v) => setModified(v || "")}
              language="text"
              wordWrap="on"
            />
          </div>
        </div>
      )}
    </ToolShell>
  );
}
