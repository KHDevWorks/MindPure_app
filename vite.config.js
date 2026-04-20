import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.match(/node_modules[/\\]recharts([/\\]|$)/)) return 'vendor_recharts';
            return 'vendor';
          }
        },
      },
    },
  },
});
