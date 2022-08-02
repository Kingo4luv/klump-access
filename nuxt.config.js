export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	server: {
		port: 3001 // default: 3000
	},

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
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com'
			},
			{
				href: 'https://fonts.gstatic.com',
				crossOrigin: true
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxtjs/tailwindcss'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/axios'],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	env: {
		VUE_APP_CLIENT_ID: process.env.VUE_APP_CLIENT_ID,
		VUE_APP_CLIENT_KEY: process.env.VUE_APP_CLIENT_KEY,
		VUE_APP_CLIENT_SECRET: process.env.VUE_APP_CLIENT_SECRET
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: process.env.VUE_APP_API_URL
		}
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.VUE_APP_API_URL
		}
	}
};
