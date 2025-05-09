/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { glob } from 'glob';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // コンテンツファイルからルートを動的に生成
  const contentFiles = await glob('src/content/*.md');
  const blogRoutes = contentFiles
    .filter((filename) => filename.includes('.md'))
    .map((file) => {
      const slug = file.replace('src/content/', '').replace('.md', '');
      return `/post/${slug}`;
    });

  return {
    build: {
      target: ['es2020'],
    },
    resolve: {
      mainFields: ['module'],
    },
    publicDir: 'src/assets',
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.webp', '**/*.svg', '**/*.ico'],
    plugins: [
      analog({
        content: {
          highlighter: 'shiki',
          shikiOptions: {
            highlighter: {
              additionalLangs: [
                'yaml',
                'yml',
                'markdown',
                'pug',
                'python',
                'sql',
                'nim',
                'typescript',
                'terraform',
              ],
            },
          },
        },
        prerender: {
          routes: ['/', ...blogRoutes],
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
