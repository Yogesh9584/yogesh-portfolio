/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0c0e14",
          elevated: "#12151e",
          card: "rgba(255, 255, 255, 0.04)",
        },
        accent: {
          indigo: "#6366f1",
          violet: "#8b5cf6",
          cyan: "#22d3ee",
          amber: "#f59e0b",
        },
        muted: "#94a3b8",
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(99, 102, 241, 0.45)",
        card: "0 8px 32px rgba(0, 0, 0, 0.35)",
        "card-hover": "0 20px 50px rgba(99, 102, 241, 0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-gradient":
          "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, transparent 50%, rgba(34,211,238,0.08) 100%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
