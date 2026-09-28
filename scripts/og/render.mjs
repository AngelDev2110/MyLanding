// Renders public/img/og-<locale>.png (1200×630) from card.html with headless Chrome.
// Usage: pnpm og   ·   CHROME_PATH overrides the browser location.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const LOCALES = ["en", "es"];
const WIDTH = 1200;
const HEIGHT = 630;
const PORT = 9334;

const chromePath =
  process.env.CHROME_PATH ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));
if (!chromePath) throw new Error("Chrome not found; set CHROME_PATH");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const escapeHtml = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const workDir = mkdtempSync(join(tmpdir(), "og-"));
const chrome = spawn(
  chromePath,
  ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(workDir, "profile")}`, "--hide-scrollbars", "about:blank"],
  { stdio: "ignore" },
);

try {
  let targets;
  for (let i = 0; i < 40 && !targets; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    } catch {
      await sleep(250);
    }
  }
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    pending.get(msg.id)?.(msg);
  };
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });

  const template = readFileSync(join(root, "scripts/og/card.html"), "utf8");
  const photo = pathToFileURL(join(root, "public/img/me.jpeg")).href;

  for (const locale of LOCALES) {
    const messages = JSON.parse(readFileSync(join(root, `i18n/locales/${locale}.json`), "utf8"));
    const [nameFirst, ...rest] = messages.myName.split(" ");
    const values = {
      lang: locale,
      photo,
      nameFirst,
      nameRest: rest.join(" "),
      role: messages.myRole,
      availability: messages.hero.availability,
    };
    const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => escapeHtml(values[key]));
    const file = join(workDir, `card-${locale}.html`);
    writeFileSync(file, html);

    await send("Page.navigate", { url: pathToFileURL(file).href });
    await sleep(500);
    await send("Runtime.evaluate", {
      expression: "Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode())])",
      awaitPromise: true,
    });
    const { result } = await send("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
    });
    const out = join(root, `public/img/og-${locale}.png`);
    writeFileSync(out, Buffer.from(result.data, "base64"));
    console.log(`✓ ${out}`);
  }
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(workDir, { recursive: true, force: true });
}
