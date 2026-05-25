/** Host allowlist for Notion remote images used by `isNotionRemoteImageHost`. */

function hostMatchesNotionSo(hostname: string): boolean {
  return hostname === 'notion.so' || hostname.endsWith('.notion.so');
}

function hostMatchesAws(hostname: string): boolean {
  return hostname.endsWith('.amazonaws.com');
}

function hostMatchesCloudfront(hostname: string): boolean {
  return hostname.endsWith('.cloudfront.net');
}

const HOST_CHECKS = [hostMatchesNotionSo, hostMatchesAws, hostMatchesCloudfront];

/** Whether this URL matches the Notion remote image host allowlist. */
export function isNotionRemoteImageHost(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    return HOST_CHECKS.some((check) => check(parsed.hostname));
  } catch {
    return false;
  }
}
