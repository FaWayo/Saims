import { NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import { z } from "zod"
import { signupSchema } from "@/app/auth/signup/utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validatedData = signupSchema.parse(body)
    
    const result = await createUser({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: validatedData.password,
      companyName: validatedData.companyName,
      businessType: validatedData.businessType,
      currency: validatedData.currency,
    })

    // await sendVerificationEmail(result.user.email, result.user.id)

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
        },
        company: {
          id: result.company.id,
          name: result.company.name,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error },
        { status: 400 }
      )
    }
    
    if (error instanceof Error) {
      if (error.message === "User already exists") {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
