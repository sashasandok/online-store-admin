import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'heroui-vendor': ['@heroui/react'],
          'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'icons-vendor': ['@tabler/icons-react'],
        },
      },
    },
  },
})
