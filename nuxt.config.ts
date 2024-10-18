// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/app",
    head: {
      link: [
        {
          rel: "icon",
          href: "/app/favicon.ico",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  css: ["~/assets/styles/index.css"],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "vuetify-nuxt-module",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: true,
        },
      },
    ],
    "@pinia/nuxt",
  ],
  ssr: false,
});
