import { ApiResponse } from "@/app/auth/signup/types"
import { db } from "@/db"
import { units } from "@/db/schema/products"
import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json<ApiResponse>(
                {
                    error: { message: 'Unit ID is required' },
                    success: false
                },
                { status: 400 }
            )
        }

        const result = await db.transaction(async (tx) => {
            const [deletedUnit] = await tx
                .delete(units)
                .where(eq(units.id, parseInt(id)))
                .returning()

            if (!deletedUnit) {
                throw new Error(`Unit with id ${id} not found`)
            }

            return deletedUnit
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Unit deleted successfully",
            data: result
        })

    } catch (error) {
        console.error("Delete Unit Error:", error)

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
                error: { message: "Failed to delete unit" },
                success: false
            },
            { status: 500 }
        )
    }
}