module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fontFamily: {
          playfair: ['"Playfair Display"', "serif"],
        },
        textColor: {
          "0%, 100%": { color: "#ffffff" },
          "25%": { color: "#ffa600" },
          "50%": { color: "#ff6b6b" },
          "75%": { color: "#4ecdc4" },
        },
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(-2px)" },
          "50%": { transform: "translateY(2px)" },
        },
        "slow-zoom": {
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            transition: "2s ease-in-out",
          },
        },
      },

      animation: {
        "fade-in": "fade-in 1s ease-out",
        "slide-down": "slide-down 1s ease-out",
        "slide-right": "slide-right 1s ease-out",
        "slow-zoom": "slow-zoom 20s ease-in-out forwards infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "status-transition": "fadeIn 0.5s ease-in-out",
        textColor: "textColor 5s ease infinite",
        "fade-in-down": "fade-in-down 0.3s ease-in-out",
        rotation: "1s linear infinite",
      },
    },
  },
};
