import React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false, light = false }: { className?: string, iconOnly?: boolean, light?: boolean }) {
  if (iconOnly) {
    return (
      <div className={cn("flex items-end gap-[0.15em]", className)}>
        <div className={cn("w-[0.25em] h-[0.8em] rounded-sm", light ? "bg-white" : "bg-[#0A1628]")}></div>
        <div className="w-[0.4em] h-[0.4em] bg-[#F59E0B] rounded-full mb-[0.05em]"></div>
      </div>
    );
  }
  return (
    <div className={cn("flex items-baseline", className)}>
      <span className={cn("font-extrabold tracking-tighter lowercase font-heading", light ? "text-white" : "text-[#0A1628]")}>landed.</span>
      <span className="w-[0.6em] h-[0.6em] bg-[#F59E0B] rounded-full ml-[0.1em]"></span>
    </div>
  );
}
