import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [EnvironmentPlugin('all', {prefix: ''}), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://new-qr-epitight-cdaw.vercel.app",
        secure: false,
      },
    },
  },
})
