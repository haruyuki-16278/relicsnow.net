/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'main': 'var(--color-main)',
        'sub': 'var(--color-sub)',
        'text': 'var(--color-text)',
        'text-sub': 'var(--color-text-sub)',
        'link': 'var(--color-link)',
        'focused': 'var(--color-focused)',
        'background': 'var(--color-background)',
      },
      backgroundImage: {
        'marker-main': 'linear-gradient(transparent 50%, var(--color-main) 50%, var(--color-main) 80%, transparent 80%)',
        'marker-sub': 'linear-gradient(transparent 50%, var(--color-sub) 50%, var(--color-sub) 80%, transparent 80%)',
        'marker-link': 'linear-gradient(transparent 50%, var(--color-link) 50%, var(--color-link) 80%, transparent 80%)',
        'marker-focused': 'linear-gradient(transparent 50%, var(--color-focused) 50%, var(--color-focused) 80%, transparent 80%)',
        'marker': 'linear-gradient(transparent 50%, var(--marker-color) 50%, var(--marker-color) 80%, transparent 80%)',
      }
    },
  },
  plugins: [],
}

