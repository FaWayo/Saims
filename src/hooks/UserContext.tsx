"use client"

import { ApiResponse, UserInfo } from "@/app/auth/signup/types"
import { getRequest } from "@/lib/auth"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface UserContextType {
  user: UserInfo | null
  loading: boolean
  getCurrentUser: () => Promise<UserInfo | null>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(false)

  async function getCurrentUser(): Promise<UserInfo | null> {
    setLoading(true)
    try {
      const response = await getRequest("/api/me")
      if (!response.ok) {
        return null
      }

      const responseData: ApiResponse<UserInfo> = await response.json()
      if (!responseData.success) {
        return null
      }

      const returnedUser = responseData.data ?? null
      setUser(() => returnedUser)

      return returnedUser
    } catch (error) {
      console.error("getCurrentUser in context error:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUser()
    }

    fetchData()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, getCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useCurrentUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useCurrentUser must be within an UserProvider")
  }

  return context
}
