const form = document.getElementById("builder-form");
const promptEl = document.getElementById("prompt");
const toneEl = document.getElementById("tone");
const formatEl = document.getElementById("format");
const outputEl = document.getElementById("output");
const metaEl = document.getElementById("meta");
const buildBtn = document.getElementById("build-btn");
const copyBtn = document.getElementById("copy-btn");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");

function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function loadOptions() {
  try {
    const res = await fetch("/api/options");
    const { tones, formats } = await res.json();
    toneEl.innerHTML = tones.map((t) => `<option value="${t}">${titleCase(t)}</option>`).join("");
    formatEl.innerHTML = formats.map((f) => `<option value="${f}">${titleCase(f)}</option>`).join("");
  } catch (err) {
    statusText.textContent = "Could not load options";
  }
}

async function checkHealth() {
  try {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error("bad status");
    await res.json();
    statusDot.classList.add("ok");
    statusText.textContent = "Service healthy";
  } catch {
    statusDot.classList.add("bad");
    statusText.textContent = "Service unavailable";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = promptEl.value.trim();
  if (!prompt) {
    outputEl.textContent = "Please enter an idea first.";
    return;
  }

  buildBtn.disabled = true;
  buildBtn.textContent = "Building…";
  outputEl.textContent = "Composing…";
  metaEl.textContent = "";
  copyBtn.hidden = true;

  try {
    const res = await fetch("/api/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, tone: toneEl.value, format: formatEl.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Build failed");

    outputEl.textContent = data.text;
    metaEl.textContent = `${data.meta.wordCount} words · ${data.meta.tone} · ${data.meta.format}`;
    copyBtn.hidden = false;
  } catch (err) {
    outputEl.textContent = `Error: ${err.message}`;
  } finally {
    buildBtn.disabled = false;
    buildBtn.textContent = "Build text";
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  } catch {
    copyBtn.textContent = "Copy failed";
  }
});

loadOptions();
checkHealth();
