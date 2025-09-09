// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/image'
  ],

  css: ['~/assets/styles/main.scss'],

  icon: {
    collections: ['material-symbols'],
  },

  fonts: {
    defaults: {
      weights: [400, 500, 700, 800, 900],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
  },

  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      redirectOn: 'root',
      fallbackLocale: 'en',
      cookieKey: 'i18n_redirected',
      useCookie: true,
    },
    restructureDir: '',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'pt',
        file: 'pt.json',
        name: 'Português',
      },
    ],
  },

  image: {
    provider: 'ipx',
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true
    }
  }
})