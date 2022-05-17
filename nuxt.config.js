export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Aspired',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss'
  ],

  pageTransition: {
    name: 'page'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', ssr: true },
    { src: '@/plugins/vue-the-mask', ssr: true },
    { src: '@/plugins/v-viewer', ssr: true },
    { src: '@/plugins/vue-js-modal', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/svg-sprite'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/http',
    '@nuxtjs/proxy'
  ],

  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },

  router: {
    extendRoutes (routes) {
      for (const route of routes) {
        if (route.path.includes('/about')) {
          route.name = 'О нас'
        }
        if (route.path.includes('/reviews')) {
          route.name = 'Отзывы'
        }
        if (route.path.includes('/privacy')) {
          route.name = 'Политика конфиденциальности'
        }
        if (route.path.includes('/contacts')) {
          route.name = 'Контакты'
        }
        if (route.path.includes('/team')) {
          route.name = 'Команда'
        }
        if (route.path.includes('/portfolio')) {
          route.name = 'Портфолио'
          route.meta = { filters: true }
        }
        if (route.path.includes('/development')) {
          route.name = 'Разработка'
          route.meta = { link: '/portfolio' }
        }
        if (route.path.includes('/marketing')) {
          route.name = 'Интернет-маркетинг'
          route.meta = { link: '/portfolio' }
        }
        if (route.path.includes('/design')) {
          route.name = 'Дизайн'
          route.meta = { link: '/portfolio' }
        }
      }
      return routes
    }
  }
}
