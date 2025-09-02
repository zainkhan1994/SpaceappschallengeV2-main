import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: { overlay: false },
    watch: {
      ignored: ['**/venv/**', '**/spaceapps_scraper/**', '**/*.py']
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  build: { outDir: 'dist' }
});
