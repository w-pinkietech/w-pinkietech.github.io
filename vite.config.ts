import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        company: path.resolve(import.meta.dirname, 'company/index.html'),
        en: path.resolve(import.meta.dirname, 'en/index.html'),
        enCompany: path.resolve(import.meta.dirname, 'en/company/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  base: '/',
})

