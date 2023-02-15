import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { appPath } from './config.js'
import createSvgSpritePlugin from 'unplugin-svg-component/vite'
// import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      '@': appPath.src,
      components: appPath.components,
      images: appPath.images,
      icons: appPath.icons
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
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2015'
  },
  plugins: [
    vue(),
    vueJsx(),
    createSvgSpritePlugin({
      symbolId: 'icon-[name]',
      iconDir: appPath.icons
      // include: `${appPath.icons}/**.svg`
      // svgo: {
      //   plugins: [
      //     'preset-default',
      //     'prefixIds',
      //     'removeDesc',
      //     'mergePaths',
      //
      //     // or by expanded notation which allows to configure plugin
      //     {
      //       name: 'sortAttrs',
      //       params: {
      //         xmlnsOrder: 'alphabetical'
      //       }
      //     },
      //     {
      //       name: 'cleanupIDs',
      //       params: {
      //         minify: true
      //       }
      //     },
      //     {
      //       name: 'removeViewBox',
      //       active: false
      //     }
      //   ]
      // }
    })
  ]
})
