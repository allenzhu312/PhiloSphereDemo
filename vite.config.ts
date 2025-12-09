import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: '/PhiloSphereDemo/',   // ⭐⭐ 关键：GitHub Pages 子路径
  plugins: [react()],
})
