import { z } from "zod";

/**
 * Environment variable validation.
 *
 * - Public variables (`NEXT_PUBLIC_*`) are exposed to the browser. They are
 *   referenced literally below so Next.js can statically inline them into the
 *   client bundle.
 * - Server variables are only validated on the server (never shipped to the
 *   client).
 *
 * Defaults are provided for non-secret public values so the app runs
 * out-of-the-box. Remove a `.default(...)` to make a variable strictly
 * required (validation will then fail fast at startup if it is missing).
 */

const clientSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("Valia Web"),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
});

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Example private variable. Optional so builds succeed without a database.
  // Make it required by removing `.optional()`.
  DATABASE_URL: z.url().optional(),
});

const isServer = typeof window === "undefined";

// Reference each NEXT_PUBLIC_* var literally for client-bundle inlining.
const clientEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
}

const parsedClient = clientSchema.safeParse(clientEnv);
if (!parsedClient.success) {
  throw new Error(`Invalid public environment variables:\n${formatIssues(parsedClient.error)}`);
}

let serverData: z.infer<typeof serverSchema> = {} as z.infer<typeof serverSchema>;
if (isServer) {
  const parsedServer = serverSchema.safeParse(process.env);
  if (!parsedServer.success) {
    throw new Error(`Invalid server environment variables:\n${formatIssues(parsedServer.error)}`);
  }
  serverData = parsedServer.data;
}

export const env = {
  ...parsedClient.data,
  ...serverData,
} as z.infer<typeof clientSchema> & z.infer<typeof serverSchema>;
