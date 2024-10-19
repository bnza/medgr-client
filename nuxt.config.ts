// https://nuxt.com/docs/api/configuration/nuxt-config
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
        // From @sidebase/nuxt-auth 0.8 Endpoints requires NOT to have the trailing slash
        // in order to use baseURL
        // @see joinPathToApiURL function
        signIn: { path: 'login', method: 'post' },
        signOut: { path: 'logout', method: 'post' },
        getSession: { path: 'users/me', method: 'get' },
      },
      pages: {
        login: '/login',
      },
      session: {
        dataType: {
          id: 'string',
          email: 'string',
          roles: 'string[]',
          privileges: 'number[]',
        },
      },
    },
    sessionRefresh: {
      // Whether to refresh the session every time the browser window is refocused.
      enableOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enablePeriodically: false,
    },
    disableServerSideAuth: true,
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
  runtimeConfig: {
    public: {
      apiBaseURL: 'http://localhost',
    },
  },
  ssr: false,
})
