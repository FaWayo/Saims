import { ApiResponse } from "@/app/auth/signup/types"
import { db } from "@/db"
import { units } from "@/db/schema/products"
import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as {id: number; name: string}

        if (!body.id || !body.name) {
            return NextResponse.json<ApiResponse>(
                {
                    error: { message: 'Both id and name are required' },
                    success: false
                },
                { status: 400 }
            )
        }

        const result = await db.transaction(async (tx) => {
            const [updatedUnit] = await tx
                .update(units)
                .set({ name: body.name })
                .where(eq(units.id, body.id))
                .returning()

            if (!updatedUnit) {
                throw new Error(`Unit with id ${body.id} not found`)
            }

            return updatedUnit
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Unit updated successfully",
            data: result
        })

    } catch (error) {
        console.error("Update Unit Error:", error)

        if (error instanceof Error && error.message.includes('not found')) {
            return NextResponse.json<ApiResponse>(
                {
                    error: { message: error.message },
                    success: false
                },
                { status: 404 }
            )
        }

        return NextResponse.json<ApiResponse>(
            {
                error: { message: "Failed to update unit" },
                success: false
            },
            { status: 500 }
        )
    }
}
