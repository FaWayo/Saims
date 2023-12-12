import React from 'react'

interface Props {
    children : React.ReactNode
}

export default function AuthLayout({children}: Props) {
  return (
    <section>
      <div>{children}</div>
    </section>
  )
}
