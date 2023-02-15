import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import SvgIcon from '~virtual/svg-component'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.component(SvgIcon.name, SvgIcon)

app.mount('#app')
