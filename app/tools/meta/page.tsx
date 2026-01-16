"use client";
import { useState } from "react";
import { ToolShell } from "@/components/tools/tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CodeEditor } from "@/components/ui/code-editor";

export default function MetaPage() {
  const [title, setTitle] = useState("My Page Title");
  const [desc, setDesc] = useState("Page description goes here.");
  const [img, setImg] = useState("https://example.com/og-image.jpg");

  const code = `
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">

<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${img}">

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
<meta property="twitter:image" content="${img}">
  `.trim();

  return (
    <ToolShell
      title="Meta Tag Generator"
      description="Generate SEO and Social Media meta tags."
    >
      <div className="grid gap-8 md:grid-cols-2 h-full">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Page Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={img} onChange={(e) => setImg(e.target.value)} />
          </div>
        </div>
        <div className="h-full border rounded-md overflow-hidden">
          <CodeEditor value={code} language="html" readOnly />
        </div>
      </div>
    </ToolShell>
  );
}
