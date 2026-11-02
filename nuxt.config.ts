// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/icon', '@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'de',
    fallbackLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: '../content/portfolio',
    locales: [
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'en', language: 'en-GB', file: 'en.json', name: 'English' },
      { code: 'it', language: 'it-IT', file: 'it.json', name: 'Italiano' }
    ],
    detectBrowserLanguage: false
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
