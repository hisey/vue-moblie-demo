import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Listening on all local IPs
    host: true,
    port: 3000,
    // Load proxy configuration from .env
    proxy: {
      '/common': {
        target: 'https://api.apishop.net/common', //mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
