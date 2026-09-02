const TONES = {
  professional: {
    opener: (topic) => `Here is a polished, professional take on "${topic}".`,
    connectors: ["Furthermore", "In addition", "As a result", "To that end"],
    closer: "Please let me know if any refinements would be helpful.",
  },
  friendly: {
    opener: (topic) => `Hey! Here are some warm, friendly thoughts on "${topic}".`,
    connectors: ["Also", "On top of that", "And honestly", "Best of all"],
    closer: "Hope this hits the spot — happy to tweak anything!",
  },
  persuasive: {
    opener: (topic) => `Consider this: "${topic}" matters more than you might think.`,
    connectors: ["More importantly", "Crucially", "Beyond that", "The bottom line is"],
    closer: "Now is the moment to act on this.",
  },
  concise: {
    opener: (topic) => `${topic}, in brief:`,
    connectors: ["Next", "Then", "Also", "Finally"],
    closer: "That's the essence.",
  },
};

const FORMATS = ["paragraph", "bullets", "email"];

export function availableOptions() {
  return { tones: Object.keys(TONES), formats: [...FORMATS] };
}

function splitIdeas(prompt) {
  const parts = prompt
    .split(/[.;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return [prompt.trim()];
  return parts;
}

function sentenceCase(text) {
  const t = text.trim();
  if (!t) return t;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Compose text locally from a prompt. This is a deterministic "builder" so the
 * app works end to end with zero external dependencies or API keys.
 */
export function buildText({ prompt, tone = "professional", format = "paragraph" } = {}) {
  if (typeof prompt !== "string" || prompt.trim().length === 0) {
    throw new Error("prompt is required");
  }
  if (!TONES[tone]) {
    throw new Error(`unknown tone: ${tone}`);
  }
  if (!FORMATS.includes(format)) {
    throw new Error(`unknown format: ${format}`);
  }

  const cleanPrompt = prompt.trim();
  const topic = cleanPrompt.length > 60 ? `${cleanPrompt.slice(0, 57)}...` : cleanPrompt;
  const ideas = splitIdeas(cleanPrompt).map(sentenceCase);
  const t = TONES[tone];

  let body;
  if (format === "bullets") {
    body = ideas.map((idea, i) => `- ${t.connectors[i % t.connectors.length]}: ${idea}.`).join("\n");
  } else if (format === "email") {
    const lines = ideas.map(
      (idea, i) => `${t.connectors[i % t.connectors.length]}, ${idea.toLowerCase()}.`
    );
    body = ["Hi there,", "", t.opener(topic), "", ...lines, "", t.closer, "", "Best regards,", "The Valia Team"].join("\n");
  } else {
    const sentences = ideas.map(
      (idea, i) => `${t.connectors[i % t.connectors.length]}, ${idea.toLowerCase()}.`
    );
    body = [t.opener(topic), ...sentences, t.closer].join(" ");
  }

  const wordCount = body.split(/\s+/).filter(Boolean).length;
  return {
    text: body,
    meta: {
      tone,
      format,
      wordCount,
      ideaCount: ideas.length,
      engine: "local",
    },
  };
}
