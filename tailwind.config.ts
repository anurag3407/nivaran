import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#FAFAFA",
        muted: "#1A1A1A",
        mutedForeground: "#737373",
        accent: {
          DEFAULT: "#FF3D00",
          foreground: "#0A0A0A",
          hover: "#E03500",
        },
        border: {
          DEFAULT: "#262626",
          hover: "#404040",
          thick: "#FF3D00",
        },
        input: "#1A1A1A",
        card: {
          DEFAULT: "#0F0F0F",
          foreground: "#FAFAFA",
        },
        ring: "#FF3D00",
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "Inter Tight", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],        // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],    // 14px
        base: ["1rem", { lineHeight: "1.6rem" }],       // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],    // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],     // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],      // 24px
        "3xl": ["2rem", { lineHeight: "2.25rem" }],     // 32px
        "4xl": ["2.5rem", { lineHeight: "2.75rem" }],   // 40px
        "5xl": ["3.5rem", { lineHeight: "1.1" }],       // 56px
        "6xl": ["4.5rem", { lineHeight: "1.05" }],      // 72px
        "7xl": ["6rem", { lineHeight: "1" }],           // 96px
        "8xl": ["8rem", { lineHeight: "1" }],           // 128px
        "9xl": ["10rem", { lineHeight: "1" }],          // 160px
      },
      letterSpacing: {
        tighter: "-0.06em",
        tight: "-0.04em",
        normal: "-0.01em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.2em",
      },
      maxWidth: {
        "5xl": "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
