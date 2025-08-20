"use client"

import { postRequest } from "@/lib/auth"
import { LogOut } from "lucide-react"
import React, { useState } from "react"
import { GradientSpinner } from "./loaders"

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    setIsLoading(true)
    try {
      const response = await postRequest("/api/logout")
      if (!response.ok) {
        console.error("Logout failed")
      }
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={() => handleLogout()}
      className="flex items-center gap-3"
      disabled={isLoading}
    >
      <p className="hidden md:block text-[#C75146]">Logout</p>
      {isLoading ? (
        <GradientSpinner className="h-6 w-6" />
      ) : (
        <LogOut
          color="#C75146"
          strokeWidth={3}
          className="h-4 w-4 md:h-6 md:w-6"
        />
      )}
    </button>
  )
}

export default LogoutButton
