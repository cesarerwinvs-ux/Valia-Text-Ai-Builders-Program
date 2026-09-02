# Valia Web

Base de proyecto **Next.js 15** lista para producción: App Router, TypeScript
estricto, Tailwind CSS v4, ESLint + Prettier, `lucide-react` y utilidad `cn()`.

## Stack

- **Next.js 15** (App Router) · **React 19**
- **TypeScript** (modo estricto)
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **ESLint 9** (flat config) + **Prettier** (sin conflictos)
- **lucide-react** · **clsx** + **tailwind-merge** (`cn()`)
- **zod** para validación de variables de entorno

## Estructura

```
src/
├── app/                  # Rutas, layouts, server actions (Server Components por defecto)
│   ├── layout.tsx
│   ├── page.tsx
│   └── items/[id]/       # Demo de APIs asíncronas (params, searchParams, headers)
├── components/
│   ├── ui/               # Componentes atómicos (Button, ...)
│   └── shared/           # Navbar, Footer, layout compartido
├── lib/                  # utils.ts (cn), env.ts (validación con zod)
├── hooks/                # Custom hooks (use-media-query, ...)
├── types/                # Tipos e interfaces
└── constants/            # Constantes globales (SITE_CONFIG, NAV_ITEMS, ...)
```

## Requisitos

- Node.js >= 20

## Empezar

```bash
cp .env.example .env.local   # configura tus variables
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando                | Descripción                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Servidor de desarrollo (Turbopack). |
| `npm run build`        | Build de producción.                |
| `npm start`            | Sirve el build de producción.       |
| `npm run lint`         | ESLint.                             |
| `npm run lint:fix`     | ESLint con autofix.                 |
| `npm run typecheck`    | Chequeo de tipos (`tsc --noEmit`).  |
| `npm run format`       | Formatea con Prettier.              |
| `npm run format:check` | Verifica el formato sin escribir.   |

## Convenciones

- **Server Components por defecto**: añade `'use client'` solo cuando necesites
  estado, hooks de React o eventos del DOM (p. ej. `components/shared/navbar.tsx`).
- **APIs asíncronas de Next.js 15**: `params`, `searchParams`, `cookies()` y
  `headers()` son Promesas; úsalas con `await` (ver `src/app/items/[id]/page.tsx`).
- **Variables de entorno**: define y valida en `src/lib/env.ts`. Las públicas
  usan el prefijo `NEXT_PUBLIC_`. Nunca pongas secretos en variables públicas.

## Despliegue

Este proyecto se despliega en Vercel con CI por cada push a `main`. Consulta la
sección correspondiente en la descripción del pull request o la documentación de
Vercel.
