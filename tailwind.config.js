/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'burton': {
          black: 'var(--burton-black)',
          blue: 'var(--burton-blue)',
          white: 'var(--burton-white)',
          purple: 'var(--burton-purple)',
          amber: 'var(--burton-amber)',
          charcoal: 'var(--burton-charcoal)'
        }
      },
      fontFamily: {
        gothic: ['Gothic', 'serif']
      },
      animation: {
        'flicker': 'flicker 2s linear infinite'
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 'var(--flicker-bright)' },
          '50%': { opacity: 'var(--flicker-dim)' }
        }
      }
    }
  },
  plugins: []
}
