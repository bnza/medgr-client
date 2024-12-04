import { defineNuxtPlugin } from '#app'
import 'vue3-openlayers/styles.css'

import { Map, Layers, Sources } from 'vue3-openlayers'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Map)
  nuxtApp.vueApp.use(Layers)
  nuxtApp.vueApp.use(Sources)
})
