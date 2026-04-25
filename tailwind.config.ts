import type { Config } from "tailwindcss";

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: withOpacity("--bg-base"),
        surface: {
          DEFAULT: withOpacity("--bg-surface"),
          2: withOpacity("--bg-surface-2"),
          elevated: withOpacity("--bg-elevated"),
        },
        border: {
          subtle: withOpacity("--border-subtle"),
          strong: withOpacity("--border-strong"),
        },
        ink: {
          primary: withOpacity("--text-primary"),
          secondary: withOpacity("--text-secondary"),
          muted: withOpacity("--text-muted"),
        },
        accent: {
          DEFAULT: withOpacity("--accent"),
          soft: withOpacity("--accent-soft"),
          fg: withOpacity("--accent-foreground"),
        },
        positive: withOpacity("--positive"),
        negative: withOpacity("--negative"),
        warning: withOpacity("--warning"),
      },
      borderColor: {
        DEFAULT: withOpacity("--border-subtle"),
      },
      ringColor: {
        DEFAULT: withOpacity("--ring"),
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(var(--shadow-color) / 0.04), 0 8px 24px -12px rgb(var(--shadow-color) / 0.18)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
