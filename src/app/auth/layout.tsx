import React from 'react'
import Image from 'next/image'
import authCartoon from '../../../public/assets/auth-vector.png'

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className='flex h-screen'>
      <section className='flex-1 items-center justify-center bg-powderblue'>
        <Image className='flex justify-center' src={authCartoon} alt="money-art" />
      </section>
      <section className='flex-1 bg-babypowder'>
        {children}
      </section>
    </main>
  )
}
