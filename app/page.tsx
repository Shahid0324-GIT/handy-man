"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { SiteFooter } from "@/components/landing/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import Aurora from "@/components/Aurora";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const COLORS_LIGHT = ["#FFFFFF", "#BFDBFE", "#A7F3D0"];

  const COLORS_DARK = ["#FF3232", "#FF94B4", "#3A29FF"];

  const currentColors =
    mounted && resolvedTheme === "light" ? COLORS_LIGHT : COLORS_DARK;

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          key={mounted ? resolvedTheme : "loading"}
          colorStops={currentColors}
          blend={0.6}
          amplitude={1}
          speed={0.8}
        />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <Hero />
        <FeatureGrid />
        <SiteFooter />
      </div>
    </main>
  );
}
