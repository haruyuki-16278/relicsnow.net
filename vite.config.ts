/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { glob } from 'glob';
import { generateRssFeed } from './src/server/rss';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // コンテンツファイルからルートを動的に生成
  const contentFiles = await glob('src/content/*.md');
  const blogRoutes = contentFiles.map(file => {
    const slug = file.replace('src/content/', '').replace('.md', '');
    return `/blog/${slug}`;
  });

  // ビルド後にRSSフィードを生成
  if (mode === 'production') {
    await generateRssFeed();
  }

  return {
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    plugins: [
      analog({
        content: {
          highlighter: 'shiki',
        },
        prerender: {
          routes: [
            '/',
            '/blog',
            ...blogRoutes,
          ],
        },
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
