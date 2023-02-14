import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {appPath, isDevB} from "./config.js";

// https://vitejs.dev/config/

export default defineConfig(({mode}) => {
  return {
    resolve: {
      alias: {
        '@': appPath.src,
        'components': appPath.components,
        'images': appPath.images,
      }
    },
    envDir: '/',
    base: './',
    server: {
      port: 3000,
      strictPort: true
    },
    build: {
      outDir: appPath.build,
      manifest: isDevB(mode),
      sourcemap: isDevB(mode),
      minify: isDevB(mode) ? false : 'esbuild',
      target: 'es2015',
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `assets/[name].[ext]`,
          compact: isDevB(mode) ? '--no-compact' : '--compact'
        }
      },
    },
    plugins: [vue(), vueJsx()],
  }
})
