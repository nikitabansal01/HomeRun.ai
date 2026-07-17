/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        night: {
          950: '#060709',
          900: '#0A0B10',
          850: '#0E1015',
          800: '#13151D',
          700: '#1B1E29',
        },
        line: 'rgba(255,255,255,0.07)',
        pulse: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        glow: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        // validated categorical slots for data marks (dark surface #0E1015)
        cat: {
          1: '#0891B2',
          2: '#F43F5E',
          3: '#059669',
          4: '#8B5CF6',
          5: '#D97706',
        },
        status: {
          good: '#10B981',
          warning: '#F59E0B',
          critical: '#F43F5E',
        },
      },
      boxShadow: {
        'glow-violet': '0 0 40px rgba(139, 92, 246, 0.25)',
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.18)',
        panel: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        waveform: 'waveform 0.9s ease-in-out infinite',
      },
      keyframes: {
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
