import { process } from 'std-env'
export default defineNuxtConfig({
  app: {
    baseURL: '/app',
    head: {
      link: [
        {
          rel: 'icon',
          href: '/app/favicon.ico',
        },
      ],
    },
  },
  auth: {
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/token/invalidate' },
        getSession: { path: '/users/me', method: 'get' },
      },
      refresh: {
        isEnabled: true,
        refreshOnlyToken: false,
        endpoint: {
          path: '/token/refresh',
        },
        token: {
          signInResponseRefreshTokenPointer: '/refresh_token',
          refreshRequestTokenPointer: '/refresh_token',
        },
      },
      pages: {
        login: '/login',
      },
      session: {
        dataType: {
          id: 'string',
          email: 'string',
          roles: 'ApiRole[]',
          privileges: 'Record<number,number>[]',
        },
      },
    },
    sessionRefresh: {
      // Whether to refresh the session every time the browser window is refocused.
      enableOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enablePeriodically: false,
    },
    disableServerSideAuth: false,
    globalAppMiddleware: true,
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL
      ? process.env.NUXT_PUBLIC_API_BASE_URL + '/api'
      : 'http://localhost/api',
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/styles/index.css'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Montserrat: true,
        },
      },
    ],
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
  ],
  router: {
    options: {
      hashMode: true,
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost',
    },
  },
  ssr: false,
})
