import './main.postcss'
import { createApp } from 'vue'
import { store } from './_store'
import installPlugins from './plugins'

import App from './App.vue'

const app = createApp(App)

installPlugins(app)

// true for hydrate
app.use(store)
app.mount('#app', true)
