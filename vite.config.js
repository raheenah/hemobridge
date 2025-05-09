import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          // target: "http://localhost:8100",
          target: "https://hemobridge-project.onrender.com",
          changeOrigin: true,
          secure: false,
          rewrite: (path)=> path.replace(/^\/api/, '')
        },
      },
    },
    resolve: {
      alias: {
        src: "/src",
      },
    }
});