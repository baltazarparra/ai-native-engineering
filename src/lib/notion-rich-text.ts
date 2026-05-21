import type { RichTextItemResponse } from "@notionhq/client";

/** Concatenate Notion rich_text segments — plain MVP. */
export function notionRichPlain(items: RichTextItemResponse[]): string {
  return items.map((t) => t.plain_text).join("");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** True when every non-empty segment is Notion inline code (common “code” paragraph pattern). */
export function isAllCodeRichText(items: RichTextItemResponse[]): boolean {
  if (!items.length) return false;
  if (!notionRichPlain(items).trim()) return false;
  return items.every((t) => t.annotations?.code === true);
}

function wrapRichTextSegment(item: RichTextItemResponse): string {
  let html = escapeHtml(item.plain_text);
  const a = item.annotations;
  if (a?.code) html = `<code>${html}</code>`;
  if (a?.bold) html = `<strong>${html}</strong>`;
  if (a?.italic) html = `<em>${html}</em>`;
  if (a?.strikethrough) html = `<s>${html}</s>`;
  if (item.type === "text" && item.text.link?.url) {
    const href = escapeHtml(item.text.link.url);
    html = `<a href="${href}" rel="noopener noreferrer">${html}</a>`;
  }
  return html;
}

/** Minimal inline rich text HTML (code, bold, italic, strike, links). */
export function notionRichHtml(items: RichTextItemResponse[]): string {
  return items.map(wrapRichTextSegment).join("");
}
