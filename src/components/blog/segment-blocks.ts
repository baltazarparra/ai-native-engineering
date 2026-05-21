/**
 * Groups consecutive sibling list items for valid <ul>/<ol> markup (blog Phase B5).
 */
import type { BlogBlockWithChildren } from "../../lib/notion";

export type BlockSegment =
  | { kind: "single"; block: BlogBlockWithChildren }
  | { kind: "bullets"; blocks: BlogBlockWithChildren[] }
  | { kind: "numbered"; blocks: BlogBlockWithChildren[] };

export function segmentListRuns(blocks: BlogBlockWithChildren[]): BlockSegment[] {
  const out: BlockSegment[] = [];
  let i = 0;

  while (i < blocks.length) {
    const b = blocks[i]!;

    if (b.type === "bulleted_list_item") {
      const run: BlogBlockWithChildren[] = [];
      while (i < blocks.length && blocks[i]!.type === "bulleted_list_item") {
        run.push(blocks[i]!);
        i++;
      }
      out.push({ kind: "bullets", blocks: run });
      continue;
    }

    if (b.type === "numbered_list_item") {
      const run: BlogBlockWithChildren[] = [];
      while (i < blocks.length && blocks[i]!.type === "numbered_list_item") {
        run.push(blocks[i]!);
        i++;
      }
      out.push({ kind: "numbered", blocks: run });
      continue;
    }

    out.push({ kind: "single", block: b });
    i++;
  }

  return out;
}
