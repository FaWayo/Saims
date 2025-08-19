import jwt from "jsonwebtoken"

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as any
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export function generateToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" })
}

export const getRequest = async (url: string) => {
  const response = await fetch(`${url}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response
}

export const postRequest = async (url: string, data?: unknown) => {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response
}
