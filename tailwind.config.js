/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on your project structure
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: 0 },  // Fully transparent at start and end
          '50%': { opacity: 1 },       // Fully opaque in the middle
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 1s ease-in-out infinite',  // Custom animation
      },
    },
  },
  plugins: [],
}


