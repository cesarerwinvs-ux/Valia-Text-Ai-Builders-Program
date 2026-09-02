"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { NAV_ITEMS, SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b border-black/[.08] backdrop-blur dark:border-white/[.12]">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5" aria-hidden />
          <span>{SITE_CONFIG.name}</span>
        </Link>

        <ul className="flex items-center gap-1 text-sm">
          {NAV_ITEMS.map((item) => {
            const href = item.href.split("?")[0] ?? item.href;
            const isActive =
              !item.external && (href === "/" ? pathname === "/" : pathname.startsWith(href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 transition-colors hover:bg-black/[.05] dark:hover:bg-white/[.08]",
                    isActive && "bg-black/[.06] font-medium dark:bg-white/[.10]"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
