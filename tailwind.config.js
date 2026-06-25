/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0F19",
          50: "#F4F5F7",
          100: "#E4E6EB",
          200: "#C8CCD6",
          300: "#9CA3B5",
          400: "#6B7280",
          500: "#4B5263",
          600: "#374151",
          700: "#1F2530",
          800: "#141925",
          900: "#0B0F19",
          950: "#060810",
        },
        paper: "#F7F7F5",
        // Brand navy, sampled from the ReemDigiTech logo mark (#002245).
        // Kept under the "indigo" token name so every existing component
        // class (bg-indigo-500, text-indigo-600, etc.) picks up the new
        // brand color automatically without needing to touch each file.
        indigo: {
          DEFAULT: "#126DCE",
          50: "#F4F7FA",
          100: "#DFEAF6",
          200: "#B7D3F0",
          300: "#84B6EB",
          400: "#4996E9",
          500: "#126DCE",
          600: "#0E5CAF",
          700: "#09488B",
          800: "#043162",
          900: "#012346",
        },
        // Brand accent green, sampled from the logo's dot and "TECH"
        // wordmark (#69BD27). Use 500-600 on dark backgrounds (icons,
        // badges, dots) and 700-800 for small text on light backgrounds.
        "brand-green": {
          DEFAULT: "#6AB82E",
          50: "#F1FCE9",
          100: "#DEF6CB",
          200: "#BCEA9A",
          300: "#9CDC6A",
          400: "#7BCE3B",
          500: "#6AB82E",
          600: "#579924",
          700: "#44791B",
          800: "#315912",
        },
        amber: {
          DEFAULT: "#F5A623",
          50: "#FEF6E9",
          100: "#FDE9C3",
          200: "#FAD088",
          300: "#F8BC57",
          400: "#F5A623",
          500: "#D98C0E",
          600: "#B0700A",
        },
        slate: {
          DEFAULT: "#64748B",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
