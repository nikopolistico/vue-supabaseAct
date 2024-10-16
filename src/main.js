import { createApp } from 'vue'
import Auth from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(Auth)
  .use(vuetify)
  .mount('#app')
