import React from "react"
import Logo from "@/components/Logo/logo"
import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full p-5">
      <nav className="border-b border-lightgray">
       <Link href={"/"}><Logo /></Link> 
      </nav>

      <div className="">{children}</div>
    </main>
  )
}

export default AuthLayout
