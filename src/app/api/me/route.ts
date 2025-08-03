import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/db'
import { users } from '@/db/schema/auth'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value

        if (!token) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        const [user] = await db.select({
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            companyId: users.companyId,
            roleId: users.roleId,
        }).from(users)
            .where(eq(users.id, decoded.userId))
            .limit(1)

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 401 }
            )
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                name: `${user.firstName} ${user.lastName}`,
                companyId: user.companyId,
                roleId: user.roleId,
            },
        })
    } catch (error) {
        console.error('Auth verification error:', error)
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        )
    }
}