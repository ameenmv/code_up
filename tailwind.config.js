/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#8B5CF6',
          violet: '#7C3AED',
          indigo: '#4F46E5',
          cyan: '#06B6D4',
          emerald: '#10B981',
          pink: '#EC4899',
        },
        dark: {
          950: '#05050F',
          900: '#0A0A1A',
          800: '#0F0F24',
          700: '#161630',
          600: '#1E1E45',
          500: '#252550',
        },
      },
      backgroundImage: {
        'mesh-1': 'radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
        'mesh-2': 'radial-gradient(ellipse at 60% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 10% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
        'glow-purple': 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #05050F 0%, #0F0F24 50%, #05050F 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-sm': '0 0 15px rgba(139, 92, 246, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(139, 92, 246, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.7)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
