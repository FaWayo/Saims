"use client"

import { postRequest } from "@/lib/auth"
import { LogOut } from "lucide-react"
import React from "react"

function LogoutButton() {
  async function handleLogout() {
    try {
      const response = await postRequest("/api/logout")
      if (!response.ok) {
        console.error("Logout failed")
      }
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }
  return (
    <button onClick={() => handleLogout()} className="flex items-center gap-3">
      <p className="hidden md:block text-[#C75146]">Logout</p>
      <LogOut color="#C75146" strokeWidth={3} />
    </button>
  )
}

export default LogoutButton
