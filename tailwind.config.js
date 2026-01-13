/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary neon green palette
                neon: {
                    50: '#e6fff0',
                    100: '#b3ffd6',
                    200: '#80ffbb',
                    300: '#4dffa1',
                    400: '#1aff86',
                    500: '#00FF66', // Primary neon green
                    600: '#00cc52',
                    700: '#00993d',
                    800: '#006629',
                    900: '#003314',
                },
                // Dark base colors
                dark: {
                    50: '#2a2a2a',
                    100: '#1f1f1f',
                    200: '#171717',
                    300: '#121212',
                    400: '#0d0d0d',
                    500: '#0a0a0a', // Primary dark
                    600: '#080808',
                    700: '#050505',
                    800: '#030303',
                    900: '#000000',
                },
                // Glass panel colors
                glass: {
                    light: 'rgba(255, 255, 255, 0.05)',
                    medium: 'rgba(255, 255, 255, 0.08)',
                    strong: 'rgba(255, 255, 255, 0.12)',
                    border: 'rgba(255, 255, 255, 0.1)',
                },
                // Accent colors
                accent: {
                    orange: '#FF6B35',
                    cyan: '#00D4FF',
                    purple: '#9B59B6',
                    pink: '#FF69B4',
                }
            },
            fontFamily: {
                mono: ['Source Code Pro', 'Fira Code', 'JetBrains Mono', 'monospace'],
                sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display-1': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-2': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                'heading-1': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
                'heading-2': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.4' }],
                'body-lg': ['1.125rem', { lineHeight: '1.6' }],
                'body': ['1rem', { lineHeight: '1.6' }],
                'body-sm': ['0.875rem', { lineHeight: '1.5' }],
                'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
                '34': '8.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(0, 255, 102, 0.3), 0 0 40px rgba(0, 255, 102, 0.1)',
                'neon-strong': '0 0 30px rgba(0, 255, 102, 0.5), 0 0 60px rgba(0, 255, 102, 0.2)',
                'neon-inner': 'inset 0 0 20px rgba(0, 255, 102, 0.15)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
                'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
                'card-hover': '0 8px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 102, 0.2)',
            },
            backdropBlur: {
                'xs': '2px',
                '2xl': '40px',
                '3xl': '64px',
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'slide-up': 'slide-up 0.6s ease-out forwards',
                'slide-down': 'slide-down 0.4s ease-out forwards',
                'scale-in': 'scale-in 0.3s ease-out forwards',
                'border-flow': 'border-flow 3s linear infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 102, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 255, 102, 0.5)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-down': {
                    from: { opacity: '0', transform: 'translateY(-20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                'border-flow': {
                    '0%': { strokeDashoffset: '100%' },
                    '100%': { strokeDashoffset: '0%' },
                },
            },
            transitionDuration: {
                'fast': '150ms',
                'normal': '250ms',
                'slow': '400ms',
                'slower': '600ms',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            },
        },
    },
    plugins: [],
}
