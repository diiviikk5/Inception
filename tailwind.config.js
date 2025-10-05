/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPink: '#ff00ff',
        neonBlue: '#00ffff',
        neonGreen: '#39ff14',
        neonPurple: '#bf00ff',
        neonOrange: '#ff6b35',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        retro: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor',
        'neon-pink': '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff',
        'neon-blue': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
        'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14',
        'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff, 0 0 40px #bf00ff',
        'cyber': '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 255, 255, 0.1)',
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'neon-flicker': 'neon-flicker 2s ease-in-out infinite',
        'cyber-scan': 'cyber-scan 3s linear infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, -2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '50%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, -2px)' },
          '70%': { transform: 'translate(-2px, 2px)' },
          '80%': { transform: 'translate(-2px, -2px)' },
          '90%': { transform: 'translate(2px, -2px)' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'cyber-scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'pulse-neon': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
          '100%': { 
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor, 0 0 50px currentColor',
          },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(45deg, #ff00ff, #00ffff, #39ff14)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
