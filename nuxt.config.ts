export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
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