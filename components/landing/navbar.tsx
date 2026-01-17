"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-8 overflow-hidden rounded-lg bg-primary/10 border border-white/10 shadow-inner flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Handyman
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((group) => (
            <div key={group.title} className="group relative">
              {/* Trigger */}
              <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group-hover:text-primary py-4">
                <group.icon className="size-4" />
                {group.title}
                <ChevronDown className="size-3 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute top-full left-1/2 -translate-x-1/2 w-70 origin-top scale-95 opacity-0 transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100 pt-2">
                <div className="rounded-xl border bg-popover p-2 shadow-xl shadow-black/5 ring-1 ring-black/5">
                  <div className="grid gap-1">
                    {group.items.map((tool) => (
                      <Link
                        key={tool.title}
                        href={tool.url}
                        className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted/50 transition-colors group/item"
                      >
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors group-hover/item:border-primary/30 group-hover/item:text-primary">
                          <tool.icon className="size-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground group-hover/item:text-primary flex items-center gap-1">
                            {tool.title}
                            <ArrowRight className="size-2.5 opacity-0 -translate-x-1 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                          </div>
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </nav>
        {/* --- RIGHT: Actions --- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 sm:w-100 overflow-y-auto"
            >
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <span className="font-bold">Menu</span>
                </SheetTitle>
              </SheetHeader>

              <Accordion type="single" collapsible className="w-full px-4">
                {NAV_ITEMS.map((group) => (
                  <AccordionItem key={group.title} value={group.title}>
                    <AccordionTrigger className="text-sm">
                      <div className="flex items-center gap-2">
                        <group.icon className="size-4 text-muted-foreground" />
                        {group.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-1 pl-4 border-l ml-2">
                        {group.items.map((tool) => (
                          <Link
                            key={tool.title}
                            href={tool.url}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between rounded-md py-2 px-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <span>{tool.title}</span>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
