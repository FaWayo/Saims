import { ApiResponse } from "@/app/auth/signup/types"
import { db } from "@/db"
import { units } from "@/db/schema/products"
import { NextRequest, NextResponse } from "next/server"
import { UserInfo } from "os"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        console.log(body, 'body is here')

        if (!Array.isArray(body)) {
            return NextResponse.json<ApiResponse>(
                {
                    error: { message: 'Request body must be an array of units' },
                    success: false
                },
                { status: 400 }
            )
        }

        const result = await db.transaction(async (tx) => {
            const insertedUnits = []

            for (const u of body) {
                const [insertedUnit] = await tx.insert(units).values({ name: u }).returning()
                insertedUnits.push(insertedUnit)
            }

            return insertedUnits
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            message: `Successfully added ${result.length} units`,
            data: result
        })

    } catch (error) {
        console.error("Add Units Error:", error)

        return NextResponse.json<ApiResponse>(
            {
                error: { message: "Internal server error" },
                success: false
            },
            { status: 500 }
        )
    }
}