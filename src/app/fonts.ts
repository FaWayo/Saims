import { Montserrat, Raleway, Lato, Nova_Oval, Faustina, Noto_Sans_Lydian } from 'next/font/google'

export const montserrat = Montserrat({
    display: 'swap',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: '600'
  });
  
  export const lato = Lato({
    display: 'swap',
    weight: '300',
    subsets: ['latin'],
    variable: '--font-lato'
  });
  
  export const raleway = Raleway({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-raleway'
  });

  export const novaOval = Nova_Oval({
    weight: '400',
    display: 'auto',
    subsets: ['latin']
  })

  export const faustina = Faustina({
    weight: '400',
    display: 'auto',
    subsets: ['latin']
  })
