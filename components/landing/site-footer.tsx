"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent backdrop-blur-sm py-12 my-12 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Top Section: Links & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 md:mb-24">
          {/* LEFT: Social Links */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-500 transition-colors"
            >
              <Link
                href="https://github.com/Shahid0324-GIT"
                target="_blank"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-500 transition-colors"
            >
              <Link
                href="https://www.linkedin.com/in/mohammed-shahid1/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </Link>
            </Button>
          </div>

          {/* RIGHT: Credits & Date */}
          <div className="flex flex-col items-center md:items-end gap-1 text-sm text-muted-foreground font-medium">
            <p>
              Built by{" "}
              <span className="text-foreground font-semibold">
                Jameel Shahid Mohammed
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span>&copy; {currentYear} Handyman</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>All rights reserved.</span>
            </p>
          </div>
        </div>

        {/* BOTTOM: Big Typographic Brand */}
        <div className="relative w-full flex justify-center items-end border-t border-muted/20 pt-8">
          <h1 className="text-[18vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter select-none cursor-default transition-all duration-700 ease-out text-transparent bg-clip-text bg-linear-to-b from-slate-400 to-slate-200/80 dark:from-slate-700 dark:to-slate-900/80 opacity-70 blur-0 scale-100 md:from-slate-300 md:to-slate-100/50 md:dark:from-slate-800 md:dark:to-slate-950/50 md:opacity-30 md:blur-[1px] md:scale-95 md:hover:opacity-100 md:hover:blur-none md:hover:scale-100 md:hover:bg-linear-to-r  md:hover:from-[#3A29FF] md:hover:to-[#34D399] md:dark:hover:from-[#FF3232] md:dark:hover:via-[#FF94B4] md:dark:hover:to-[#3A29FF]">
            HANDYMAN
          </h1>
        </div>
      </div>
    </footer>
  );
}
