import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/PhiloSphereDemo/',   // ⭐⭐ 关键：你的仓库名123
  plugins: [react()],
})
