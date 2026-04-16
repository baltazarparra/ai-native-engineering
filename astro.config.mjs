import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://baltazarparra.github.io',
  base: '/ai-native-engineering/',
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !page.includes('kitchen-sink'),
    }),
  ],
  output: 'static',
});
