import type { Metadata } from 'next'
import './globals.css'
import { lato } from './fonts'

export const metadata: Metadata = {
  title: 'Raffby Sales and Purchases Inventory'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lato.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
