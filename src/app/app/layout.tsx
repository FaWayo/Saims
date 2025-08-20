"use server"

import React from "react"
import Logo from "@/components/Logo/logo"
import Link from "next/link"
import { Bell, CircleUser, Settings } from "lucide-react"
import { UserInfo } from "../auth/signup/types"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar/Navbar"
import LogoutButton from "@/components/LogoutButton"

async function verifyAuth(): Promise<UserInfo | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return null
    }
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as UserInfo

    return decoded
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await verifyAuth()
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={"/"} className="mt-4">
              <Logo />
            </Link>

            <div className="flex gap-4 text-gray-700">
              <button className="flex items-center gap-3">
                <Settings
                  color="#0D3B66"
                  strokeWidth={3}
                  className="h-4 w-4 md:h-6 md:w-6"
                />
                <p className="hidden md:block">Settings</p>
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <button className="flex items-center gap-3">
                <CircleUser
                  color="#0D3B66"
                  strokeWidth={3}
                  className="h-4 w-4 md:h-6 md:w-6"
                />
                <p className="hidden md:block">{user.firstName}</p>
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <button>
                <Bell
                  color="#0D3B66"
                  strokeWidth={3}
                  className="h-4 w-4 md:h-6 md:w-6"
                />
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>
      <Navbar />
      {children}
    </div>
  )
}

export default AppLayout
