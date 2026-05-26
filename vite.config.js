import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  build: {
    // Cible les navigateurs modernes — bundle plus léger, pas de polyfills inutiles
    target: 'esnext',

    // Seuil d'alerte réduit suite à l'optimisation LazyMotion
    chunkSizeWarningLimit: 400,

    // Inline les petits assets (< 4 KB) en base64 — évite des requêtes HTTP
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks: {
          // framer-motion : séparé pour mise en cache indépendante
          // LazyMotion + domAnimation réduit significativement ce chunk
          'framer-motion': ['framer-motion'],
          // Vendors React stables — hash stable entre déploiements
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Libs formulaire — chargées uniquement quand Contact devient visible
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
        // Noms de fichiers prévisibles pour un meilleur cache HTTP
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  // Supprime console.log et debugger en production
  esbuild: {
    drop: ['console', 'debugger'],
    // Supprime les commentaires pour réduire la taille du bundle
    legalComments: 'none',
  },

  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
    css: false,
  },
})
