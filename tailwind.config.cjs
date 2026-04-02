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
    },
  },
  plugins: [],
}
