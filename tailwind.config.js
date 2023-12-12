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
      nyanza: '#E4F0D0',
      teagreen: '#C2D8B9'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'authbackground': "url('/assets/background.jpg')"  
      },
    },
  },
  plugins: [],
}
export default config
