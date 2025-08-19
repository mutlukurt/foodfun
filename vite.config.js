import { defineConfig } from 'vite'

export default defineConfig({
  base: '/foodfun/',   // For GitHub Pages project site
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
