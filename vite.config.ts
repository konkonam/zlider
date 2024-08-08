import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import unimport from 'unimport/unplugin';

export default defineConfig({
  root: 'playground',

  plugins: [
    vue(),
    unimport.vite({
      presets: [
        'vue',
      ],
      imports: [
        { name: 'defu', from: 'defu' }
      ]
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
