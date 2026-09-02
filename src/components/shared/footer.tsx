import { SITE_CONFIG } from "@/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.12]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-black/60 sm:flex-row dark:text-white/60">
        <p>
          © {year} {SITE_CONFIG.name}. Todos los derechos reservados.
        </p>
        <p>
          Construido con <span className="font-medium">Next.js 15</span> ·{" "}
          <span className="font-medium">Tailwind v4</span>
        </p>
      </div>
    </footer>
  );
}
