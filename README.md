# Valia-Text-Ai-Builders-Program

**Valia Text AI Builder** is a small full-stack web app that turns a rough idea into
polished copy. Pick a tone (professional, friendly, persuasive, concise) and a
format (paragraph, bullets, email), and the builder composes text for you.

The composition engine runs entirely locally, so the app works end to end with
no external API keys or services.

## Tech stack

- **Runtime:** Node.js (>= 20)
- **Server:** Express
- **Frontend:** static HTML/CSS/JS (no build step)
- **Tests:** Node's built-in test runner (`node --test`)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start with auto-reload on http://localhost:3000
# or
npm start        # start once on http://localhost:3000
```

Then open http://localhost:3000.

## Scripts

| Command       | Description                                   |
| ------------- | --------------------------------------------- |
| `npm start`   | Run the server on port `3000` (or `$PORT`).   |
| `npm run dev` | Run the server with `--watch` auto-reload.    |
| `npm test`    | Run the unit tests for the text engine.       |

## API

| Method | Path           | Description                                              |
| ------ | -------------- | -------------------------------------------------------- |
| `GET`  | `/api/health`  | Health check (`{ status: "ok" }`).                       |
| `GET`  | `/api/options` | Available tones and formats.                             |
| `POST` | `/api/build`   | Build text from `{ prompt, tone, format }`.              |

Example:

```bash
curl -s -X POST http://localhost:3000/api/build \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"Announce our spring sale","tone":"persuasive","format":"bullets"}'
```

## Project layout

```
server.js              # Express server + API routes
src/textBuilder.js     # local text composition engine
public/                # frontend (index.html, styles.css, app.js)
test/                  # unit tests
.cursor/environment.json  # Cloud Agent environment config
```

## Cloud Agent environment

The [.cursor/environment.json](.cursor/environment.json) config installs
dependencies with `npm install` and starts the dev server (`npm run dev`) in a
`dev-server` terminal, exposing port `3000`.
