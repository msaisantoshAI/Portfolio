import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus)', 'sans-serif'],
        serif: ['var(--font-outfit)', 'serif'],
      },
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        'surface-elevated': "var(--color-surface-elevated)",
        'surface-glass': "var(--color-surface-glass)",
        'text-primary': "var(--color-text-primary)",
        'text-secondary': "var(--color-text-secondary)",
        'text-tertiary': "var(--color-text-tertiary)",
        'border-token': "var(--color-border)",
        'border-subtle': "var(--color-border-subtle)",
        'accent-token': "var(--color-accent)",
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'glass': 'var(--shadow-glass)',
      },
      maxWidth: {
        'prose-normal': '65ch',
        'prose-wide': '68ch',
        'container': '1240px',
      },
    },
  },
  plugins: [],
};
export default config;
