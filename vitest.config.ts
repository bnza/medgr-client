// vitest.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // Or 'node' for server-side tests
    exclude: [
      '**/node_modules/**',
      '**/cypress/**',
      '**/playwright/**',
      '**/server/**',
    ],
    root: fileURLToPath(new URL('./', import.meta.url)),
    globals: true, // Enable globals like describe, it, expect without importing
    coverage: {
      reporter: ['text', 'json-summary', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
})
