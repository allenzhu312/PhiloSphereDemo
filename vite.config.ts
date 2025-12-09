import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PhiloSphereDemo/', // GitHub Pages 子路径
  plugins: [react()],
})
