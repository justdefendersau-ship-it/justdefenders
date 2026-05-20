// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\tailwind.config.js
// Timestamp: 16 May 2026 08:00 Sydney
// ====================================================================

module.exports = {

  darkMode:
    ["class"],

  content: [

    "./pages/**/*.{js,ts,jsx,tsx}",

    "./components/**/*.{js,ts,jsx,tsx}",

    "./app/**/*.{js,ts,jsx,tsx}",

    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {

    extend: {

      borderRadius: {

        xl:
          "1rem",

        "2xl":
          "1.5rem",

        "3xl":
          "2rem"
      },

      boxShadow: {

        operational:
          "0 10px 40px rgba(0,0,0,0.45)"
      }
    }
  },

  plugins: []
}