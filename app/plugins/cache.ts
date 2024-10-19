import { defineNuxtPlugin } from '#app'
import Cache from '~/utils/cache/Cache'

export default defineNuxtPlugin({
  name: 'cache',
  async setup() {
    const cache = new Cache()
    return {
      provide: {
        cache,
      },
    }
  },
})
