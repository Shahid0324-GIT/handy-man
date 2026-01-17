"use client";

import { cn } from "@/lib/utils";

export default function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden opacity-50 perspective-[200px]",
        className,
      )}
    >
      {/* Grid Layer */}
      <div className="absolute inset-0 transform-[rotateX(35deg)]">
        <div
          className={cn(
            "animate-grid",
            "bg-repeat bg-size-[60px_60px]",
            "h-[300%] inset-[0%_0px] ml-[-50%] origin-[100%_0_0] w-[600%]",

            "bg-[linear-gradient(to_right,rgba(37,99,235,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(37,99,235,0.2)_1px,transparent_0)]",

            "dark:bg-[linear-gradient(to_right,rgba(234,179,8,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(234,179,8,0.2)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Gradient Fade Overlay (Fade to White or Black) */}
      <div className="absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
}
