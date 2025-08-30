import { ApiResponse } from "@/app/auth/signup/types"
import { db } from "@/db"
import { units } from "@/db/schema/products"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const allUnits = await db.select().from(units)

        return NextResponse.json<ApiResponse>({
            success: true,
            message: `Retrieved ${allUnits.length} units`,
            data: allUnits
        })

    } catch (error) {
        console.error("Get Units Error:", error)

        return NextResponse.json<ApiResponse>(
            {
                error: { message: "Failed to retrieve units" },
                success: false
            },
            { status: 500 }
        )
    }
}