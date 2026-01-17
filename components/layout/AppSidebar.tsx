"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator, // Added
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NAV_ITEMS } from "@/lib/constants";
import { ChevronRight, Search, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFavoritesStore } from "@/hooks/use-favorites-store";
import Image from "next/image";

export function AppSidebar() {
  const pathname = usePathname();
  const sidebar = useSidebar();

  const favorites = useFavoritesStore((state) => state.favorites);

  const [isMounted, setIsMounted] = useState(false);

  const allTools = useMemo(() => NAV_ITEMS.flatMap((g) => g.items), []);

  const favoriteTools = useMemo(() => {
    return allTools.filter((tool) => favorites.includes(tool.url));
  }, [allTools, favorites]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const openCommandMenu = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      ctrlKey: true,
    });
    document.dispatchEvent(event);
  };

  const [metaKey, setMetaKey] = useState("Ctrl");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      if (isAppleDevice) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMetaKey("⌘");
      }
    }
  }, []);

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent hover:text-primary"
            >
              <Link href="/">
                <Image
                  src={"/logo_wide.png"}
                  width={300}
                  height={80}
                  alt="logo"
                  className="object-contain"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {sidebar.open && (
          <div className="px-2 mt-2">
            <button
              onClick={openCommandMenu}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-muted/50 hover:bg-muted/80 border rounded-md transition-colors text-left"
            >
              <Search className="size-4" />
              <span className="flex-1">Search...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">{metaKey}</span>K
              </kbd>
            </button>
          </div>
        )}
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {/* --- FAVORITES SECTION (New) --- */}
        {isMounted && favoriteTools.length > 0 && (
          <SidebarGroup>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Favorites">
                      <Star className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">
                        Favorites
                      </span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {favoriteTools.map((tool) => (
                        <SidebarMenuSubItem key={tool.url}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === tool.url}
                          >
                            <Link href={tool.url}>
                              <span>{tool.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
            <SidebarSeparator className="my-2" />
          </SidebarGroup>
        )}

        {/* --- REGULAR TOOLS --- */}
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((group) => {
              // Check if any child is active to keep group open
              const isGroupActive = group.items.some(
                (item) => pathname === item.url,
              );

              return (
                <Collapsible
                  key={group.title}
                  asChild
                  defaultOpen={isGroupActive} // Keep open if we are on a tool inside it
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {/* The Trigger (Parent Category) */}
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={group.title}>
                        <group.icon />
                        <span>{group.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {/* The Content (Sub Items) */}
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.items.map((item) => {
                          const isActive = pathname === item.url;
                          return (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton asChild isActive={isActive}>
                                <Link href={item.url}>
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
