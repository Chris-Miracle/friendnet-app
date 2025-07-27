export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Recognizing Friendly Faces.',
      titleTemplate: '%s | Friendly',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Custom built Deep CNN Model to recognize and classify friendly faces' 
        },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://friendly.chrismba.com/' },
        { property: 'og:title', content: 'Friendly - Recognizing Friendly Faces.' },
        { property: 'og:description', content: 'Custom built Deep CNN Model to recognize and classify friendly faces' },
        { property: 'og:image', content: 'https://friendly.chrismba.com/images/home.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://friendly.chrismba.com/' },
        { name: 'twitter:title', content: 'Friendly - Recognizing Friendly Faces.' },
        { name: 'twitter:description', content: 'Custom built Deep CNN Model to recognize and classify friendly faces' },
        { name: 'twitter:image', content: 'https://friendly.chrismba.com/images/home.png' },
        // Additional SEO meta tags
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Friendly' },
        { name: 'keywords', content: 'friendly-model, artificial intelligence, friendnet, cnn,software machine learning, backend developer, AI cnn, web development, Laravel, PHP, Vue.js, Nuxt.js, Canada' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/images/favicon.png' },
        { rel: 'canonical', href: 'https://friendly.chrismba.com' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Chris',
            jobTitle: 'Software Engineer',
            url: 'https://chrismba.com',
            sameAs: [
              'https://github.com/chris-miracle',
              'https://www.linkedin.com/in/miracle-chris-mba-379076115/'
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Fanshawe College'
            }
          })
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  tailwindcss: {
    config: {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            'ai-primary': {
              50: '#f0f9ff',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              900: '#1e3a8a'
            },
            'ai-accent': {
              500: '#8b5cf6',
              600: '#7c3aed'
            },
            'ai-dark': {
              800: '#1f2937',
              900: '#111827'
            }
          },
          animation: {
            'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
            'float': 'float 3s ease-in-out infinite',
            'scan': 'scan 2s linear infinite'
          },
          keyframes: {
            'pulse-glow': {
              'from': { boxShadow: '0 0 20px #3b82f6' },
              'to': { boxShadow: '0 0 40px #3b82f6, 0 0 60px #3b82f6' }
            },
            'float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' }
            },
            'scan': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' }
            }
          }
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000'
    }
  }
})