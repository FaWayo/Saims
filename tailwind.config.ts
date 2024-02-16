
import colors from 'tailwindcss/colors'
const config = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      mainblue: "#5DA9E9",
      lightgray: "#f2f2f2",
      lightgray2: "#ABAFB1",
      normaltext: "#5E6366",
      headertext: "#2B2F32",
      success: "#32936F",
      error: "#3F57E77",
      white: "#ffffff",
      gold: "#FFD700"
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      'auth-sm': '14px', 
      'auth-lg': '50px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'authbackground': "url('/assets/backgrounda.jpg')"  
      },
      fontFamily: {
        "header": ['var(--font-montserrat)'],
        "body": ['var(--font-lato)'],
        "body2": ['var(--font-raleway)']
      },
    },
  },
  plugins: [],
}
export default config
