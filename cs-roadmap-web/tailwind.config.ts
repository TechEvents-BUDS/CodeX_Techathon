import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F2F7",
        "background-light": "#374151",
        foreground: "#D1D5DA",
        sidebar: "#281934",
        primary: "#9A49D5",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
