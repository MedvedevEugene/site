import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b3758",
          dark: "#272344",
          footer: "#221d3b",
          card: "#302b4d",
        },
        cream: {
          DEFAULT: "#f8f7e4",
          bg: "#f9f8e8",
          soft: "#f7f3e9",
          pill: "#faf7f0",
        },
        muted: "#5d5d7b",
        light: "#f1f1f3",
        border: "#efefef",
        accent: {
          purple: "#7b57e4",
          lavender: "#eef2ff",
        },
      },
      fontFamily: {
        heading: ["var(--font-unbounded)", "Unbounded", "sans-serif"],
        body: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
