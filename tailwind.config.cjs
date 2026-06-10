/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        "black-100": "rgb(var(--color-black-100) / <alpha-value>)",
        "black-200": "rgb(var(--color-black-200) / <alpha-value>)",
        "white-100": "rgb(var(--color-white-100) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-dark": "rgb(var(--color-accent-dark) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-light": "rgb(var(--color-surface-light) / <alpha-value>)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "0 0 30px rgba(79,172,254,0.12)",
        glass: "var(--shadow-glass)",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to bottom, transparent 50%, rgb(var(--color-primary) / 1) 100%), url('/src/assets/herobg.png')",
        "grid-pattern":
          "linear-gradient(rgba(79,172,254,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,172,254,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "scroll-reverse": "scroll-reverse 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "scroll-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
