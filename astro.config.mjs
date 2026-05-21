import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ai-native-engineers.com',
  // Notion file URLs (S3 / CloudFront) and external notion.so links — see docs-blog/blog-plan.md
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
    ],
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !page.includes('kitchen-sink'),
    }),
  ],
  output: 'static',
});
