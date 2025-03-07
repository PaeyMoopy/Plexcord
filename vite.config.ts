import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // This is needed to prevent process is not defined error
    'process.env': {}
  },
  server: {
    port: 3000,
    proxy: {
      '/webhook': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});