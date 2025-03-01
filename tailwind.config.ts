import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // You can customize colors here
            },
            fontFamily: {
                // You can customize fonts here
            },
            screens: {
                // You can customize breakpoints here
            },
            animation: {
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
                orbit: "orbit calc(var(--duration)*1s) linear infinite",
              },
              keyframes: {
                marquee: {
                  from: { transform: "translateX(0)" },
                  to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                  from: { transform: "translateY(0)" },
                  to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
                orbit: {
                  "0%": {
                    transform:
                      "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
                  },
                  "100%": {
                    transform:
                      "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
                  },
                },
              },
        },
    },
    plugins: [],
};

export default config;