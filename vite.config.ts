import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { appPath } from './config'
import createSvgSpritePlugin from 'unplugin-svg-component/vite'

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@': appPath.src,
      components: appPath.components,
      images: appPath.images,
      icons: appPath.icons,
      types: appPath.types
    }
  },
  base: './',
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    outDir: appPath.build,
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2015'
  },
  plugins: [
    vue(),
    createSvgSpritePlugin({
      iconDir: appPath.icons,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      symbolId: `icon-[name]`
    })
  ]
})
