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
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NAV_ITEMS, APP_CONFIG } from "@/lib/constants";
import { Terminal, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
                  <Terminal className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none ml-2">
                  <span className="font-bold text-base">{APP_CONFIG.name}</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    v{APP_CONFIG.version}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
      </SidebarHeader>

      {/* CONTENT (Collapsible Groups) */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((group) => {
              // Check if any child is active to keep group open
              const isGroupActive = group.items.some(
                (item) => pathname === item.url
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
