/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          muted: "#52525b",
          subtle: "#a1a1aa",
        },
        surface: {
          DEFAULT: "#ffffff",
          alt: "#fafafa",
          sunken: "#f4f4f5",
        },
        line: {
          DEFAULT: "#e4e4e7",
          strong: "#d4d4d8",
        },
        accent: {
          DEFAULT: "#0a0a0b",
        },
        signal: {
          stable: "#16a34a",
          tension: "#d97706",
          conflict: "#dc2626",
          war: "#991b1b",
        },
      },
      boxShadow: {
        panel: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        soft: "0 1px 2px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
