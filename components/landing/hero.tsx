"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <>
      <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-transparent font-sans">
        <div className="z-10 px-4 text-center w-full max-w-4xl mx-auto space-y-8">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm rounded-full border-2  bg-white/50 dark:bg-black/50 backdrop-blur-sm border-blue-200 text-blue-700  dark:border-yellow-500/30 dark:text-yellow-400"
            >
              <span className="mr-2">🔨</span> A tool for everyone
            </Badge>
          </motion.div>

          {/* Main Heading with Theme-Specific Gradients */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pointer-events-none whitespace-pre-wrap bg-clip-text text-center text-6xl font-bold leading-tight tracking-tighter text-transparent md:text-8xl bg-linear-to-b from-black to-slate-500 dark:from-white dark:to-slate-400"
          >
            The{" "}
            <span className="text-blue-600 dark:text-yellow-500">Ultimate</span>
            <br />
            Developer{" "}
            <span className="text-green-600 dark:text-red-500">Toolkit.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            25+ essential tools in one offline-capable PWA.
            <br className="hidden md:block" />
            Encryption, conversions, and code generation—entirely client-side.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              asChild
              className="h-12 px-8 text-base font-semibold
              bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20
              dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400 dark:shadow-yellow-500/20"
            >
              <Link href="/tools/json">
                Start Using Tools <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 px-8 text-base border-2 hover:bg-muted/50"
            >
              <Link
                href="https://github.com/Shahid0324-GIT/handy-man"
                target="_blank"
              >
                <Terminal className="mr-2 size-4" /> GitHub Repo
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
