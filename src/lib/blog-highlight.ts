import { codeToHtml } from 'shiki';

const NOTION_LANGUAGE_ALIASES: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  yml: 'yaml',
  md: 'markdown',
  plaintext: 'text',
  plain: 'text',
  text: 'text',
};

function normalizeNotionLanguage(language?: string): string {
  const raw = (language ?? '').trim().toLowerCase();
  if (!raw) return 'text';
  return NOTION_LANGUAGE_ALIASES[raw] ?? raw;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function plainCodeFallback(plainText: string, language?: string): string {
  const langClass = language?.trim()
    ? ` class="language-${normalizeNotionLanguage(language)}"`
    : '';
  return `<pre><code${langClass}>${escapeHtml(plainText)}</code></pre>`;
}

/** Build-time Shiki HTML for Notion code blocks (no line numbers). */
export async function highlightNotionCode(
  plainText: string,
  language?: string,
): Promise<string> {
  const lang = normalizeNotionLanguage(language);
  try {
    return await codeToHtml(plainText, {
      lang,
      theme: 'github-light',
    });
  } catch {
    try {
      return await codeToHtml(plainText, {
        lang: 'text',
        theme: 'github-light',
      });
    } catch {
      return plainCodeFallback(plainText, language);
    }
  }
}
