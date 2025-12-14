export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: "#0a0a0a",
        accentBlue: "#60A5FA",
        accentRed: "#F87171",
      },
      boxShadow: {
        glow: "0 0 40px rgba(96,165,250,0.4)",
        redGlow: "0 0 40px rgba(248,113,113,0.4)",
      },
    },
  },
  plugins: [],
}
