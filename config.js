import { fileURLToPath, URL } from 'node:url'

export const appPath = {
  src: fileURLToPath(new URL('./src', import.meta.url)),
  components: fileURLToPath(new URL('./src/components', import.meta.url)),
  images: fileURLToPath(new URL('./src/images', import.meta.url)),
  build: 'build',
  icons: `src/icons/`,
  fonts: `src/fonts/`
}

export const isDevB = (mode) => {
  return mode === 'devb'
}