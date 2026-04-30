import React from "react";
import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string, iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <div className={cn("flex items-end gap-[0.15em] text-inherit", className)}>
        <div className="w-[0.25em] h-[0.8em] bg-current rounded-sm"></div>
        <div className="w-[0.4em] h-[0.4em] bg-[#F59E0B] rounded-full mb-[0.05em]"></div>
      </div>
    );
  }
  return (
    <div className={cn("flex items-baseline text-inherit", className)}>
      <span className="font-extrabold tracking-tighter lowercase font-heading">landed.</span>
      <span className="w-[0.6em] h-[0.6em] bg-[#F59E0B] rounded-full ml-[0.1em]"></span>
    </div>
  );
}
