import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Saat development aplikasi dibuka di root (http://localhost:5173/).
// Saat build (untuk GitHub Pages) path dasar mengikuti nama repository.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/smi-sekolahmusik/' : '/',
}))
