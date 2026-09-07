import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0D1E",
          900: "#0F1330",
          800: "#161B3D",
          700: "#1F254E",
          600: "#2A3163",
        },
        mist: {
          100: "#F6F5FF",
          300: "#C9C7E8",
          500: "#8E8CB8",
        },
        bloom: {
          400: "#FF7CB9",
          500: "#FF4FA0",
          600: "#E8267F",
        },
        violet: {
          400: "#8B7BFF",
          500: "#6C4CE0",
          600: "#5236B8",
        },
        dawn: {
          400: "#FFD37A",
        },
        ember: {
          400: "#FF9D5C",
          500: "#FF7A30",
          600: "#E85D0A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(246,245,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(246,245,255,0.06) 1px, transparent 1px)",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-25px, 25px) scale(0.95)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(4deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(255,79,160,0.45)" },
          "50%": { opacity: "0.85", boxShadow: "0 0 0 10px rgba(255,79,160,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        blob: "blob 12s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        "spin-reverse": "spin-reverse 24s linear infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        marquee: "marquee 28s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      backgroundSize: {
        "300%": "300% 100%",
      },
    },
  },
  plugins: [],
};
export default config;
