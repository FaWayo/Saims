import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/app/auth/signup/utils"
import { z } from "zod"
import { users } from "@/db/schema/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { ApiResponse, UserInfo } from "@/app/auth/signup/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        password: users.password,
        companyId: users.companyId,
        roleId: users.roleId,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          error: { message: "User not found" },
          success: false,
        },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.password as string
    )

    if (!isValidPassword) {
      return NextResponse.json<ApiResponse>(
        { error: { message: "Invalid password" }, success: false },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: user.companyId,
        roleId: user.roleId,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    const response = NextResponse.json<ApiResponse<UserInfo>>({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        companyId: user.companyId,
        roleId: user.roleId,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse>(
        {
          error: { message: "Validation failed", details: error.message },
          success: false,
        },
        { status: 400 }
      )
    }

    return NextResponse.json<ApiResponse>(
      { error: { message: "Internal server error" }, success: false },
      { status: 500 }
    )
  }
}
