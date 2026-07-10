import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-2xl shadow-xl overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
