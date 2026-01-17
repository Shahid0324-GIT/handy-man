"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { CodeEditor } from "@/components/ui/code-editor";

export default function SqlPage() {
  const [input, setInput] = useState(
    "SELECT * FROM users WHERE id = 1 AND active = true",
  );

  const formatSQL = () => {
    const formatted = input
      .replace(/\s+/g, " ")
      .replace(
        /\s+(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|INSERT|UPDATE|DELETE|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN)/gi,
        "\n$1",
      )
      .replace(/\s+(ON|AS|IN|IS|NOT|NULL|VALUES|SET)/gi, " $1")
      .replace(/,/g, ",\n\t")
      .trim();
    setInput(formatted);
    toast.success("SQL Formatted!");
  };

  const copy = () => {
    navigator.clipboard.writeText(input);
    toast.success("Copied to clipboard");
  };

  const handleInputChange = (val: string | undefined) => {
    setInput(val || "");
  };

  return (
    <ToolShell
      title="SQL Formatter"
      description="Beautify and format SQL queries."
    >
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-end gap-2">
          <Button onClick={formatSQL}>Format SQL</Button>
          <Button variant="outline" size="icon" onClick={copy}>
            <Copy className="size-4" />
          </Button>
        </div>
        <CodeEditor
          wordWrap="on"
          language="sql"
          value={input}
          onChange={handleInputChange}
        />
      </div>
    </ToolShell>
  );
}
