import Link from "next/link";
import { Code2, Layers, Shield, Zap, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FEATURES, SITE_CONFIG } from "@/constants";
import type { Feature } from "@/types";

const ICONS: Record<Feature["icon"], LucideIcon> = {
  zap: Zap,
  shield: Shield,
  layers: Layers,
  code: Code2,
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <section className="flex flex-col items-center text-center">
        <span className="rounded-full border border-black/[.10] px-4 py-1 text-sm text-black/60 dark:border-white/[.16] dark:text-white/60">
          Next.js 15 · TypeScript · Tailwind v4
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-pretty text-black/70 dark:text-white/70">
          {SITE_CONFIG.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/items/42?ref=hero">
            <Button size="lg">Ver ruta demo</Button>
          </Link>
          <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary">
              Documentación
            </Button>
          </a>
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <article
              key={feature.title}
              className="rounded-2xl border border-black/[.08] p-6 transition-colors hover:bg-black/[.02] dark:border-white/[.12] dark:hover:bg-white/[.04]"
            >
              <Icon className="h-6 w-6" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
              <p className="mt-1 text-sm text-black/60 dark:text-white/60">{feature.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
