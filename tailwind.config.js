/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins','sans-serif'],
      },
      backgroundImage: {
        'boost-mobile': "url('/images/bg-boost-mobile.svg')",

        'boost-desktop': "url('/images/bg-boost-desktop.svg')",

        'shorten-mobile': "url('/images/bg-shorten-mobile.svg')",

        'shorten-desktop': "url('/images/bg-shorten-desktop.svg')",
      },
      colors: {
        'cyan': "hsl(180, 66%, 49%)",

        'dark-violet': "hsl(257, 27%, 26%)",

        'red': "hsl(0, 87%, 67%)",

        'gray': " hsl(0, 0%, 75%)",

        'violet': " hsl(257, 7%, 63%)",

        'very-dark-blue': "hsl(255, 11%, 22%)",
        
        'very-dark-violet': "hsl(260, 8%, 14%)"
      },
    },
  },
  plugins: [],
}

