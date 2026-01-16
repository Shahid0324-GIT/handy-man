"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NAV_ITEMS, APP_CONFIG } from "@/lib/constants";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        {" "}
        {/* Added padding to header */}
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
                  {" "}
                  {/* Added margin left */}
                  <span className="font-bold text-base">{APP_CONFIG.name}</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    v{APP_CONFIG.version}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {" "}
        {/* Removed default gap to handle it manually */}
        {NAV_ITEMS.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className={`
                          my-0.5 h-9 transition-all duration-200 ease-in-out
                          ${
                            isActive
                              ? "font-medium bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3 px-2"
                        >
                          {" "}
                          {/* Added gap-3 here */}
                          <item.icon
                            className={`size-4 ${
                              isActive ? "text-indigo-500" : ""
                            }`}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
