import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    name: string
    companyId: string
    roleId: string
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as any
    } catch (error) {
        throw new Error('Invalid token')
    }
}

export function generateToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return null
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        return {
            id: decoded.userId,
            email: decoded.email,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            name: `${decoded.firstName} ${decoded.lastName}`,
            companyId: decoded.companyId,
            roleId: decoded.roleId,
        }
    } catch (error) {
        return null
    }
}
