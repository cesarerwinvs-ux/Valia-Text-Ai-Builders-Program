import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { buildText, availableOptions } from "./src/textBuilder.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/options", (_req, res) => {
  res.json(availableOptions());
});

app.post("/api/build", (req, res) => {
  try {
    const result = buildText(req.body || {});
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Only listen when run directly (not when imported by tests).
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  app.listen(PORT, () => {
    console.log(`Valia Text AI Builder running on http://localhost:${PORT}`);
  });
}

export { app };
