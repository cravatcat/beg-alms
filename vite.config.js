import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/beg-alms/', // 这里要与你的仓库名一致
  build: {
    outDir: 'dist'
  }
})
