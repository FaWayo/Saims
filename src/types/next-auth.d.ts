import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      companyId: string | null
      roleId: string | null
      isActive: boolean
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    firstName: string
    lastName: string
    companyId: string | null
    roleId: string | null
    isActive: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    firstName: string
    lastName: string
    companyId: string | null
    roleId: string | null
    isActive: boolean
  }
}