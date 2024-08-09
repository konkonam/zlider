import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  root: 'playground',

  plugins: [
    vue(),
    AutoImport({
      include: /\.(vue|js|ts|)($|\?)/,
      imports: [
          'vue',
      ],

      dts: '../node_modules/.vite/auto-imports.d.ts',
      vueTemplate: true,
    }),
  ],

  resolve: {
    alias: {
      zlider: resolve(__dirname, 'src'),
    }
  },

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'zlider',
      fileName: 'zlider'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
