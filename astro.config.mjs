import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://baltazarparra.github.io',
  base: '/ai-native-engineering/',
  integrations: [mdx(), react()],
  output: 'static',
});
