import { test } from "node:test";
import assert from "node:assert/strict";
import { buildText, availableOptions } from "../src/textBuilder.js";

test("availableOptions exposes tones and formats", () => {
  const opts = availableOptions();
  assert.ok(opts.tones.includes("professional"));
  assert.ok(opts.formats.includes("paragraph"));
  assert.ok(opts.formats.includes("bullets"));
  assert.ok(opts.formats.includes("email"));
});

test("buildText composes a paragraph by default", () => {
  const { text, meta } = buildText({ prompt: "Announce our new product launch" });
  assert.ok(text.length > 0);
  assert.equal(meta.tone, "professional");
  assert.equal(meta.format, "paragraph");
  assert.ok(meta.wordCount > 0);
});

test("buildText renders bullets", () => {
  const { text, meta } = buildText({
    prompt: "First point. Second point. Third point.",
    format: "bullets",
  });
  assert.equal(meta.format, "bullets");
  assert.equal(meta.ideaCount, 3);
  assert.ok(text.split("\n").every((line) => line.startsWith("- ")));
});

test("buildText renders an email with greeting and signoff", () => {
  const { text, meta } = buildText({ prompt: "Follow up on the meeting", format: "email", tone: "friendly" });
  assert.equal(meta.format, "email");
  assert.match(text, /Hi there,/);
  assert.match(text, /The Valia Team/);
});

test("buildText rejects an empty prompt", () => {
  assert.throws(() => buildText({ prompt: "   " }), /prompt is required/);
});

test("buildText rejects unknown tone and format", () => {
  assert.throws(() => buildText({ prompt: "hello", tone: "sassy" }), /unknown tone/);
  assert.throws(() => buildText({ prompt: "hello", format: "haiku" }), /unknown format/);
});
