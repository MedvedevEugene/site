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
        },
        cream: {
          DEFAULT: "#f8f7e4",
          bg: "#f9f8e8",
        },
        muted: "#5d5d7b",
        light: "#f1f1f3",
        border: "#efefef",
      },
      fontFamily: {
        heading: ["var(--font-unbounded)", "Unbounded", "sans-serif"],
        body: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
