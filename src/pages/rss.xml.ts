import rss from '@astrojs/rss';
import { getPublishedBlogPosts, trimMetaDescription } from '../lib/blog';
import { withBase } from '../lib/i18n';

export async function GET(context: { site: URL | undefined }) {
  const site = context.site ?? new URL('https://ai-native-engineers.com');
  const posts = await getPublishedBlogPosts('pt-BR');

  return rss({
    title: 'AI-Native Engineers Blog',
    description:
      'Artigos sobre engenharia orientada por IA — contexto, validação e fluxo.',
    site: site.href,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: trimMetaDescription(post.data.summary),
      link: new URL(withBase(`blog/${post.data.slug}/`), site).href,
    })),
    customData: '<language>pt-br</language>',
  });
}
