
import './globals.css'
import { lato } from './fonts'
import type { Metadata } from 'next'

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
