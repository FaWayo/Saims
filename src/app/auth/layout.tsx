import React from "react"
import Logo from "@/components/Logo/logo"
import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full p-5">
      <nav className="border-b border-lightgray">
       <Link href={"/"}><Logo /></Link> 
      </nav>

      <div className="">{children}</div>
    </div>
  )
}

export default AuthLayout
