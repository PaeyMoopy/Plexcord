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
    host: '0.0.0.0', // Listen on all network interfaces
    port: 3000, // Ensure this port is open in the firewall
    proxy: {
      '/webhook': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});