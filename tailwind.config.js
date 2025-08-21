/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}', './*.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2A4E',
          50: '#E8EBF3',
          100: '#D1D7E7',
          200: '#A3AFCF',
          300: '#7587B7',
          400: '#475F9F',
          500: '#1B2A4E',
          600: '#16223E',
          700: '#11192F',
          800: '#0C111F',
          900: '#070810',
        },
        secondary: {
          DEFAULT: '#C9A13B',
          50: '#F7F1E3',
          100: '#EFE3C7',
          200: '#DFC78F',
          300: '#CFAB57',
          400: '#C9A13B',
          500: '#A0812F',
          600: '#776123',
          700: '#4E4117',
          800: '#25200B',
          900: '#0C0A04',
        },
        background: '#F7F8FC',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.05)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.1)',
        strong: '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
