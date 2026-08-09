import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const excludedSitemapPaths = [
  'kitchen-sink',
  '/blog/harness-no-dia-a-dia/',
  '/en/blog/harness-in-daily-work/',
  '/harness-engineering/',
];

export default defineConfig({
  site: 'https://ai-native-engineers.com',
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) =>
        !excludedSitemapPaths.some((path) => page.includes(path)),
    }),
  ],
  output: 'static',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
