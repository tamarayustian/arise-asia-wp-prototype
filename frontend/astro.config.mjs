import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const adapter = process.env.VERCEL
  ? (await import('@astrojs/vercel')).default()
  : (await import('@astrojs/node')).default({ mode: 'standalone' });

export default defineConfig({
  output: 'server',
  adapter,
  integrations: [icon(), react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id', 'zh-TW'],
    routing: { prefixDefaultLocale: true },
  },
});
