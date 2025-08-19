import "./globals.css"
import { lato } from "./fonts"
import type { Metadata } from "next"
import { UserProvider } from "@/hooks/UserContext"

export const metadata: Metadata = {
  title: "Raffby Sales and Purchases Inventory",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lato.className}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
