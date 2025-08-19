import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { ApiResponse, UserInfo } from "@/app/auth/signup/types"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json<ApiResponse>(
        { error: { message: "No token provided" }, success: false },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // const [user] = await db
    //   .select({
    //     id: users.id,
    //     email: users.email,
    //     firstName: users.firstName,
    //     lastName: users.lastName,
    //     companyId: users.companyId,
    //     roleId: users.roleId,
    //   })
    //   .from(users)
    //   .where(eq(users.id, decoded.userId))
    //   .limit(1)

    if (!decoded) {
      return NextResponse.json<ApiResponse>(
        { error: { message: "User not found" }, success: false },
        { status: 401 }
      )
    }

    return NextResponse.json<ApiResponse<UserInfo>>({
      success: true,
      data: {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        name: `${decoded.firstName} ${decoded.lastName}`,
        companyId: decoded.companyId,
        roleId: decoded.roleId,
      },
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json<ApiResponse>({
        error: { message: "Invalid token" },
        success: false
    }, { status: 401 })
  }
}
