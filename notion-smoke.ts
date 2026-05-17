import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import { getPosts, getPostBySlug } from "./src/lib/notion.ts";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(repoRoot, ".env");

/** Prefer repo `.env` over any stale NOTION_* already set in the shell (Windows/user env). */
const dotenvResult = dotenv.config({ path: envPath, override: true });
if (dotenvResult.error) {
  console.warn(`dotenv: could not read ${envPath}: ${dotenvResult.error.message}`);
}

async function main(): Promise<void> {
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
