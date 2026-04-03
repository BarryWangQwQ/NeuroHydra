/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Filled from App.jsx via visualViewport — consistent Chrome/Safari & multi-monitor
      height: {
        slide: 'var(--app-vh, 100dvh)',
      },
      minHeight: {
        slide: 'var(--app-vh, 100dvh)',
      },
      maxHeight: {
        slide: 'var(--app-vh, 100dvh)',
      },
      /* Fluid content width — more viewport on desktop, capped for readability */
      maxWidth: {
        slide: 'min(92vw, 1440px)',
        'slide-lg': 'min(94vw, 1600px)',
        'slide-md': 'min(90vw, 1200px)',
        readable: 'min(65ch, min(92vw, 48rem))',
      },
      /* Fluid section insets — replace fixed px-20/py-20 */
      spacing: {
        'slide-x': 'clamp(1rem, 4.2vw, 3rem)',
        'slide-y': 'clamp(0.75rem, 3vh, 2.5rem)',
      },
      gap: {
        section: 'clamp(1.25rem, 2.8vh, 2rem)',
        'section-lg': 'clamp(1.5rem, 3.5vw, 2.75rem)',
      },
    },
  },
  plugins: [],
}
