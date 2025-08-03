import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { currencies, Roles, signupSchema } from "@/app/auth/signup/utils"
import { db } from "@/db"
import { NewCompany, users, businessTypesEnum, companies, NewUser, rolesEnum, businessTypes, regions } from "@/db/schema/auth"
import { eq } from "drizzle-orm"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    const existingUser = await db.select().from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists", success: false },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    console.log(hashedPassword, 'hashed password', validatedData)

    const result = await db.transaction(async (tx) => {
      const newCompany: NewCompany = {
        name: validatedData.companyName,
        business_type_id: Number(validatedData.businessType),
        currency: validatedData.currency
      }

      const [company] = await tx.insert(companies).values(newCompany).returning()

      const newUser: NewUser = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: hashedPassword,
        roleId: 1, //Administrator
        companyId: company.id
      }

      const [user] = await tx.insert(users).values(newUser)
        .returning({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          companyId: users.companyId,
          roleId: users.roleId,
        })

      return { user, company }
    })

    const token = jwt.sign(
      {
        userId: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        companyId: result.user.companyId,
        roleId: result.user.roleId,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        name: `${result.user.firstName} ${result.user.lastName}`,
        companyId: result.user.companyId,
        roleId: result.user.roleId,
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response

  } catch (error) {
    console.error("Signup error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'business-types') {
      const types = await db.select().from(businessTypes)
      return NextResponse.json({ types })
    }

    if (type === 'regions') {
      const regions_data = await db.select().from(regions)
      return NextResponse.json({ regions: regions_data })
    }

    const [business_types, regions_data] = await Promise.all([
      db.select().from(businessTypes),
      db.select().from(regions)
    ])

    return NextResponse.json({
      businessType: business_types,
      region: regions_data
    })

  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    )
  }
}