import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/beg-alms/', // 这里要与你的仓库名一致
  build: {
    outDir: 'dist'
  }
})
