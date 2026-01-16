"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useFavoritesStore } from "@/hooks/use-favorites-store";

interface ToolShellProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function ToolShell({
  title,
  description,
  actions,
  children,
}: ToolShellProps) {
  const pathname = usePathname();

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(pathname));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background z-10 justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold leading-none tracking-tight truncate">
                {title}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1"
                onClick={() => toggleFavorite(pathname)}
                title={
                  isFavorite ? "Remove from Favorites" : "Add to Favorites"
                }
              >
                <Star
                  className={`size-4 transition-all ${
                    isFavorite
                      ? "fill-yellow-500 text-yellow-500 scale-110"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block truncate">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      </header>
      <main className="flex-1 overflow-hidden p-4 md:p-6 bg-muted/10">
        {children}
      </main>
    </div>
  );
}
