import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "DM Serif Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        body: [
          "Inter",
          "Noto Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        accent: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
          soft: "rgba(245, 158, 11, 0.12)",
        },
        surface: {
          bg: "#000000",
          elevated: "#0a0a0a",
          card: "#111111",
          "card-hover": "#161616",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          hover: "rgba(255, 255, 255, 0.12)",
        },
        "text-primary": "#ffffff",
        "text-secondary": "#9ca3af",
        "text-muted": "#6b7280",
      },
    },
  },
  plugins: [],
};

export default config;
