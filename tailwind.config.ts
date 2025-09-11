import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Ocean palette
        "ocean-deep": "hsl(var(--ocean-deep))",
        "ocean-blue": "hsl(var(--ocean-blue))",
        "ocean-medium": "hsl(var(--ocean-medium))",
        "ocean-light": "hsl(var(--ocean-light))",
        "ocean-surface": "hsl(var(--ocean-surface))",
        
        // Mangrove palette
        "mangrove-dark": "hsl(var(--mangrove-dark))",
        "mangrove-green": "hsl(var(--mangrove-green))",
        "mangrove-medium": "hsl(var(--mangrove-medium))",
        "mangrove-light": "hsl(var(--mangrove-light))",
        "mangrove-surface": "hsl(var(--mangrove-surface))",
        
        // Trust palette
        "trust-gold": "hsl(var(--trust-gold))",
        "trust-sunrise": "hsl(var(--trust-sunrise))",
        "trust-amber": "hsl(var(--trust-amber))",
        
        // Neutral palette
        "neutral-50": "hsl(var(--neutral-50))",
        "neutral-100": "hsl(var(--neutral-100))",
        "neutral-200": "hsl(var(--neutral-200))",
        "neutral-300": "hsl(var(--neutral-300))",
        "neutral-400": "hsl(var(--neutral-400))",
        "neutral-500": "hsl(var(--neutral-500))",
        "neutral-600": "hsl(var(--neutral-600))",
        "neutral-700": "hsl(var(--neutral-700))",
        "neutral-800": "hsl(var(--neutral-800))",
        "neutral-900": "hsl(var(--neutral-900))",
        
        // Standard shadcn colors
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-ocean": "var(--gradient-ocean)",
        "gradient-trust": "var(--gradient-trust)",
        "gradient-nature": "var(--gradient-nature)",
        "gradient-premium": "var(--gradient-premium)",
        "gradient-surface": "var(--gradient-surface)",
      },
      boxShadow: {
        "soft": "var(--shadow-soft)",
        "medium": "var(--shadow-medium)",
        "strong": "var(--shadow-strong)",
        "ocean": "var(--shadow-ocean)",
        "success": "var(--shadow-success)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
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
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.8",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
