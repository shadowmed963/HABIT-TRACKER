import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* Premium design system colors */
        calm: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e", /* Primary green */
          600: "#16a34a",
          700: "#15803d",
        },
        serene: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#3b82f6", /* Secondary blue */
          600: "#2563eb",
          700: "#1d4ed8",
        },
        neutral: {
          50: "#f9fafb", /* Off-white background */
          900: "#111827", /* Dark gray text */
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],

        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 0.25rem)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(109, 94, 252, 0.22)",
        floating: "0 24px 80px rgba(77, 73, 122, 0.14)",
      },
      backgroundImage: {
        "hero-soft":
          "radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(240,237,255,0.9) 38%, rgba(216,250,237,0.72) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        /* Mobile-first animations */
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-down": {
          from: {
            transform: "translateY(-20px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "scale-bounce": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            "box-shadow": "0 0 0 0 rgba(34, 197, 94, 0.7)",
          },
          "50%": {
            opacity: "0.8",
            "box-shadow": "0 0 0 10px rgba(34, 197, 94, 0)",
          },
        },
        "fire-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "count-up": {
          from: { "counter-set": "num var(--num)" },
          to: { "counter-set": "num var(--num)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
        "ripple": {
          to: {
            transform: "scale(4)",
            opacity: "0",
          },
        },
        /* Premium animations */
        "progress-circle-fill": {
          "0%": {
            "stroke-dasharray": "1000",
            "stroke-dashoffset": "1000",
          },
          "100%": {
            "stroke-dasharray": "1000",
            "stroke-dashoffset": "0",
          },
        },
        "day-toggle-spring": {
          "0%": {
            transform: "scale(0.85)",
            opacity: "0",
          },
          "70%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "modal-slide-up": {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "modal-fade-in": {
          "0%": {
            opacity: "0",
            "backdrop-filter": "blur(0px)",
          },
          "100%": {
            opacity: "1",
            "backdrop-filter": "blur(8px)",
          },
        },
        "glow-pulse": {
          "0%": {
            "box-shadow": "0 0 0 0 rgba(34, 197, 94, 0.7)",
          },
          "50%": {
            "box-shadow": "0 0 0 8px rgba(34, 197, 94, 0.3)",
          },
          "100%": {
            "box-shadow": "0 0 0 12px rgba(34, 197, 94, 0)",
          },
        },
        "breathe": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.02)",
          },
        },
        "fab-glow": {
          "0%, 100%": {
            "box-shadow": "0 8px 24px rgba(34, 197, 94, 0.3)",
          },
          "50%": {
            "box-shadow": "0 8px 32px rgba(34, 197, 94, 0.5)",
          },
        },
        "slide-left": {
          "0%": {
            transform: "translateX(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "scale-up": {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "confetti-fall": {
          "0%": {
            transform: "translateY(0) rotateZ(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(500px) rotateZ(720deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "slide-down": "slide-down 0.4s ease-out",
        "scale-bounce": "scale-bounce 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        "fire-bounce": "fire-bounce 0.6s ease-out",
        "count-up": "count-up 1s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "ripple": "ripple 0.6s ease-out",
        /* Premium animations */
        "progress-circle-fill": "progress-circle-fill 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "day-toggle-spring": "day-toggle-spring 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "modal-slide-up": "modal-slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "modal-fade-in": "modal-fade-in 0.3s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-out forwards",
        "breathe": "breathe 3s ease-in-out infinite",
        "fab-glow": "fab-glow 2s ease-in-out infinite",
        "slide-left": "slide-left 0.4s ease-out forwards",
        "slide-right": "slide-right 0.4s ease-out forwards",
        "scale-up": "scale-up 0.4s ease-out forwards",
        "confetti": "confetti-fall 2.5s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
