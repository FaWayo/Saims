
import colors from 'tailwindcss/colors'
const config = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      slategray: '#738290',
      powderblue: '#A1B5D8',
      babypowder: '#FFFCF7',
      charcoal: '#313E50',
      delftblue: '#23395B',
      nyanza: '#E4F0D0',
      teagreen: '#C2D8B9',
      magnolia: '#ECE8EF',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      aliceblue: '#E7F0FF',
      licroice: '#1F1300'
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
