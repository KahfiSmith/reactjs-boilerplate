/// <reference types="vite/client" />

import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() as unknown as PluginOption,
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
