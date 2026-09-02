import { env } from "@/lib/env";
import type { Feature, NavItem, SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description:
    "Base de proyecto Next.js 15 lista para producción: App Router, TypeScript estricto, Tailwind v4, ESLint + Prettier.",
  url: env.NEXT_PUBLIC_APP_URL,
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Demo", href: "/items/42?ref=nav" },
  { label: "Next.js", href: "https://nextjs.org", external: true },
];

export const FEATURES: Feature[] = [
  {
    title: "App Router + RSC",
    description: "Server Components por defecto; 'use client' solo cuando es imprescindible.",
    icon: "layers",
  },
  {
    title: "TypeScript estricto",
    description: "Configuración estricta con chequeos adicionales para máxima seguridad de tipos.",
    icon: "shield",
  },
  {
    title: "Tailwind v4",
    description: "Estilos utilitarios con la nueva arquitectura CSS-first de Tailwind.",
    icon: "zap",
  },
  {
    title: "DX cuidada",
    description: "ESLint + Prettier sin conflictos, alias @/*, y utilidad cn().",
    icon: "code",
  },
];
