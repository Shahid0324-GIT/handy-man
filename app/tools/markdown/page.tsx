"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { ComponentPropsWithoutRef } from "react";

export default function MarkdownPage() {
  const [input, setInput] = useState(
    `# Hello World

This is a live markdown preview.

- [x] Task 1
- [ ] Task 2

| Feature         | Status       |
|-----------------|--------------|
| Tables          | ✅           |
| Strikethrough   | ~~Fixed~~    |

\`\`\`javascript
console.log("Hello, world!");
\`\`\`

\`\`\`python
def greet():
    print("Hello!")
\`\`\`

\`\`\`tsx
const App = () => <div>Hello React!</div>;
\`\`\`

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
\`\`\`
  `
  );

  return (
    <ToolShell
      title="Markdown Preview"
      description="Live preview for Markdown editing with syntax highlighting."
    >
      <div className="grid gap-6 md:grid-cols-2 h-full">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="font-mono resize-none h-full leading-relaxed p-4"
          placeholder="Type markdown here..."
        />

        <div className="prose dark:prose-invert max-w-none border rounded-md p-6 overflow-y-auto bg-card h-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({
                className,
                children,
                ...props
              }: ComponentPropsWithoutRef<"code">) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "";
                const codeContent = String(children).replace(/\n$/, "");

                if (!match) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <SyntaxHighlighter
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    style={oneDark as any}
                    language={language}
                    PreTag="div"
                    {...props}
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {input}
          </ReactMarkdown>
        </div>
      </div>
    </ToolShell>
  );
}
