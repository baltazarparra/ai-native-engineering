import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(repoRoot, ".env");

/** Strip `# comment` only when `#` is outside quotes — dotenv-aligned enough for RHS length diagnostics. */
function stripUnquotedTrailingHash(value: string): string {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < value.length; i += 1) {
    const ch = value[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === "#" && !inSingle && !inDouble) return value.slice(0, i);
  }
  return value;
}

/**
 * Characters on the RHS of the first matching `KEY=...` line (length only; no secret echoed).
 */
function lineRhsLen(content: string, key: string): { found: boolean; len: number } {
  const escaped = key.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  const reLine = new RegExp(`^[ \\t]*${escaped}[ \\t]*=[ \\t]*(.*)$`);
  for (const rawLine of content.split("\n")) {
    const lineNoCr = rawLine.replace(/\r$/, "").replace(/^\uFEFF/, "");
    const trimmedStart = lineNoCr.trimStart();
    if (!trimmedStart || trimmedStart.startsWith("#")) continue;
    const m = lineNoCr.match(reLine);
    if (!m) continue;
    let rhs = stripUnquotedTrailingHash(m[1].trimEnd());
    if (
      (rhs.startsWith('"') && rhs.endsWith('"') && rhs.length >= 2) ||
      (rhs.startsWith("'") && rhs.endsWith("'") && rhs.length >= 2)
    ) {
      rhs = rhs.slice(1, -1);
    }
    return { found: true, len: rhs.trim().length };
  }
  return { found: false, len: 0 };
}

/**
 * Load `.env` from repo root reliably (BOM-safe, overrides empty injected vars).
 * Never log values — only diagnostic key names when something is missing.
 */
function loadRootEnv(): void {
  if (!fs.existsSync(envPath)) {
    console.error(`[notion-smoke] No file at ${envPath}`);
    console.error("[notion-smoke] Copy `.env.example` → `.env` and set NOTION_* values.");
    process.exit(1);
  }

  const raw = fs.readFileSync(envPath, "utf8");
  const stripped = raw.replace(/^\uFEFF/, "");
  const parsed = dotenv.parse(stripped);

  const notionLike = Object.keys(parsed).filter((k) => /NOTION/i.test(k));
  if (notionLike.length === 0) {
    console.error(
      `[notion-smoke] ${envPath} parses but has no NOTION_* keys. Check variable names (exactly NOTION_TOKEN, NOTION_DATABASE_ID).`,
    );
    process.exit(1);
  }

  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = value;
  }

  const tokenParsed = parsed.NOTION_TOKEN ?? "";
  const dbParsed = parsed.NOTION_DATABASE_ID ?? "";

  const scanTok = lineRhsLen(stripped, "NOTION_TOKEN");
  const scanDb = lineRhsLen(stripped, "NOTION_DATABASE_ID");

  if (!process.env.NOTION_TOKEN?.trim()) {
    console.error("[notion-smoke] NOTION_TOKEN is missing or blank after loading .env.");
    console.error(
      `[notion-smoke] Keys found in file: ${Object.keys(parsed).sort().join(", ")}`,
    );
    console.error(
      `[notion-smoke] Parsed value lengths (secrets not printed): NOTION_TOKEN=${tokenParsed.length} chars, NOTION_DATABASE_ID=${dbParsed.length} chars`,
    );
    console.error(
      `[notion-smoke] Line scan (chars after "="; no secret echoed): NOTION_TOKEN=${scanTok.found ? scanTok.len : "no LINE_KEY="}, DATABASE_ID=${scanDb.found ? scanDb.len : "no LINE_KEY="}`,
    );
    if (
      tokenParsed.length === 0 &&
      dbParsed.length === 0 &&
      scanTok.len === 0 &&
      scanDb.len === 0
    ) {
      console.error(
        "[notion-smoke] Both values are empty. Put the integration secret and UUID on the same line as KEY=.",
      );
      console.error(
        '[notion-smoke] Example:\nNOTION_TOKEN=secret_from_notion\nNOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      );
    } else if (scanTok.len > 0 && tokenParsed.length === 0) {
      console.error(
        "[notion-smoke] Line has characters after '=', but dotenv parsed empty — check malformed quotes / stray #.",
      );
    }
    console.error(
      '[notion-smoke] If the token starts with #, wrap: NOTION_TOKEN="npat_…"',
    );
    console.error(
      "[notion-smoke] Use the Integration's API token (Secrets / Internal integration secret). Do not paste a URL or plain client name.",
    );
    process.exit(1);
  }

  if (!process.env.NOTION_DATABASE_ID?.trim()) {
    console.error("[notion-smoke] NOTION_DATABASE_ID is missing or blank after loading .env.");
    console.error(
      `[notion-smoke] Keys found in file: ${Object.keys(parsed).sort().join(", ")}`,
    );
    console.error(
      `[notion-smoke] Parsed value lengths: NOTION_TOKEN=${tokenParsed.length}, NOTION_DATABASE_ID=${dbParsed.length}`,
    );
    console.error(
      `[notion-smoke] Line scan: NOTION_DATABASE_ID=${scanDb.found ? scanDb.len : "no LINE_KEY="}`,
    );
    process.exit(1);
  }

  console.log(
    `[notion-smoke] Loaded ${envPath} — NOTION_* keys present: ${notionLike.sort().join(", ")}`,
  );
}

loadRootEnv();

async function main(): Promise<void> {
  const { getPosts, getPostBySlug } = await import("./src/lib/notion.ts");

  console.log("Notion smoke — fetching posts…");

  const posts = await getPosts();

  console.log("Published posts count:", posts.length);
  console.table(
    posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      publishedAt: p.publishedAt?.toISOString() ?? "(missing)",
    })),
  );

  const firstSlug = posts[0]?.slug;
  if (!firstSlug) {
    console.log("No published posts with valid slug — add one in Notion and retry.");
    return;
  }

  const detail = await getPostBySlug(firstSlug);
  console.log(`getPostBySlug("${firstSlug}") →`, detail ? "found" : "null");
  console.log("Top-level blocks:", detail?.blocks.length ?? 0);
}

main().catch((err: unknown) => {
  console.error("Notion smoke failed:");
  console.error(err instanceof Error ? err.message : err);
  if (err instanceof Error && err.stack) console.error(err.stack);
  process.exitCode = 1;
});
