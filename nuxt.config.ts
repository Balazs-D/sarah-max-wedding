// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/scss/main.scss',
  ],
  compatibilityDate: '2025-07-15',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables" as *;
          `,
        },
      },
    },
  },
  fonts: {
    families: [
      {
        name: 'Lato',
        provider: 'local',
        weights: [400],
        styles: ['normal', 'italic'],
      },
      {
        name: 'Paris-Forbel',
        provider: 'local',
        weights: [400],
      },
    ],
  },
  i18n: {
    defaultLocale: 'de',

    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.json',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
    ],
    experimental: {
      typedOptionsAndMessages: 'default',
    } },
})
