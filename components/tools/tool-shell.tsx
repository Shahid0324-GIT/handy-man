"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ToolShellProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function ToolShell({
  title,
  description,
  actions,
  className,
  children,
}: ToolShellProps) {
  return (
    <div className={cn("flex flex-col h-[calc(100vh-8rem)] gap-4", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
