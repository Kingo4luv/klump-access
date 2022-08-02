export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect', href: 'https://fonts.googleapis.com'
      },
      {
       href: 'https://fonts.gstatic.com', crossOrigin: true
      },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
      }
    ],
    script: [{
      src: process.env.APP_NODE_ENV === 'production' ? 'https://js.useklump.com/klump.js' : 'https://staging-js.useklump.com/klump.js',
      ssr: false,
      body: true
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env: {
    APP_CLIENT_ID: process.env.APP_CLIENT_ID || 'merchant_dashboard',
    APP_CLIENT_KEY: process.env.APP_CLIENT_KEY || 'merchant_dashboard',
    APP_CLIENT_SECRET: process.env.APP_CLIENT_SECRET || '1kLKaAyxeMb3=M1290647xs'
  }, 

  publicRuntimeConfig: {
      axios: {
        browserBaseURL: process.env.APP_API_URL || 'https://staging-api.useklump.com/v1',
      }
    },

    privateRuntimeConfig: {
      axios: {
        baseURL: process.env.APP_API_URL || 'https://staging-api.useklump.com/v1',
      }
    },
}