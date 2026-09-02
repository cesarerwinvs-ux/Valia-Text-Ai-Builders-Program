import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

/**
 * Demonstrates Next.js 15 async request APIs: `params`, `searchParams`,
 * and `headers()` are all Promises that must be awaited. This is a Server
 * Component (no "use client").
 */

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Item ${id}` };
}

export default async function ItemPage({ params, searchParams }: PageProps) {
  // Next.js 15: these are async and must be awaited.
  const { id } = await params;
  const query = await searchParams;
  const headerList = await headers();

  const ref = typeof query.ref === "string" ? query.ref : "—";
  const userAgent = headerList.get("user-agent") ?? "desconocido";

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/" className="text-sm text-black/60 hover:underline dark:text-white/60">
        ← Volver al inicio
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Item #{id}</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">
        Esta página se renderiza en el servidor y consume las APIs asíncronas de Next.js 15.
      </p>

      <dl className="mt-8 space-y-4">
        <div className="rounded-xl border border-black/[.08] p-4 dark:border-white/[.12]">
          <dt className="text-sm text-black/50 dark:text-white/50">params.id (await params)</dt>
          <dd className="mt-1 font-mono text-lg">{id}</dd>
        </div>
        <div className="rounded-xl border border-black/[.08] p-4 dark:border-white/[.12]">
          <dt className="text-sm text-black/50 dark:text-white/50">
            searchParams.ref (await searchParams)
          </dt>
          <dd className="mt-1 font-mono text-lg">{ref}</dd>
        </div>
        <div className="rounded-xl border border-black/[.08] p-4 dark:border-white/[.12]">
          <dt className="text-sm text-black/50 dark:text-white/50">
            headers().get(&quot;user-agent&quot;) (await headers)
          </dt>
          <dd className="mt-1 font-mono text-sm break-all">{userAgent}</dd>
        </div>
      </dl>

      <div className="mt-8 flex gap-3">
        <Link href="/items/43?ref=next">
          <Button variant="secondary">Siguiente item →</Button>
        </Link>
      </div>
    </div>
  );
}
