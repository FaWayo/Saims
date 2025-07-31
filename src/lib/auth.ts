// import { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import bcrypt from "bcryptjs"
// import { z } from "zod"
// import { Prisma, PrismaClient } from "@prisma/client"

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(Prisma),
//   providers: [
//     // Credentials provider for email/password login
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           const validatedCredentials = loginSchema.parse(credentials)
          
//           const user = await Prisma.user.findUnique({
//             where: { email: validatedCredentials.email },
//             include: {
//               company: true,
//               role: true,
//             }
//           })

//           if (!user || !user.password) {
//             return null
//           }

//           const isValidPassword = await bcrypt.compare(
//             validatedCredentials.password,
//             user.password
//           )

//           if (!isValidPassword) {
//             return null
//           }

//           // Update last login
//           await prisma.user.update({
//             where: { id: user.id },
//             data: { lastLogin: new Date() }
//           })

//           return {
//             id: user.id,
//             email: user.email,
//             name: `${user.firstName} ${user.lastName}`,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             avatar: user.avatar,
//             companyId: user.companyId,
//             roleId: user.roleId,
//             isActive: user.isActive,
//           }
//         } catch (error) {
//           console.error("Auth error:", error)
//           return null
//         }
//       }
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },

//   callbacks: {
//     async jwt({ token, user, account }) {
//       // Initial sign in
//       if (user) {
//         token.firstName = user.firstName
//         token.lastName = user.lastName
//         token.companyId = user.companyId
//         token.roleId = user.roleId
//         token.isActive = user.isActive
//       }

//       // For OAuth providers, create company if needed
//       if (account?.provider === "google" && user) {
//         // You might want to create a default company or handle this differently
//         // This is just an example
//       }

//       return token
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.sub!
//         session.user.firstName = token.firstName as string
//         session.user.lastName = token.lastName as string
//         session.user.companyId = token.companyId as string
//         session.user.roleId = token.roleId as string
//         session.user.isActive = token.isActive as boolean
//       }
//       return session
//     },

//     async signIn({ user, account, profile }) {
//       // For OAuth providers, you might want to auto-create users
//       if (account?.provider === "google") {
//         try {
//           const existingUser = await prisma.user.findUnique({
//             where: { email: user.email! }
//           })

//           if (!existingUser) {
//             // Auto-create user from OAuth
//             const [firstName, ...lastNameParts] = (user.name || "").split(" ")
//             const lastName = lastNameParts.join(" ")

//             await prisma.user.create({
//               data: {
//                 email: user.email!,
//                 firstName: firstName || "User",
//                 lastName: lastName || "",
//                 avatar: user.image,
//                 isActive: true,
//                 emailVerified: new Date(),
//               }
//             })
//           }
//         } catch (error) {
//           console.error("Error creating OAuth user:", error)
//           return false
//         }
//       }

//       return true
//     }
//   },

//   pages: {
//     signIn: "/auth/login",
//     signUp: "/auth/signup",
//     error: "/auth/error",
//   },

//   events: {
//     async signIn({ user, account, profile, isNewUser }) {
//       // Log sign in events, send welcome emails, etc.
//       console.log(`User ${user.email} signed in with ${account?.provider}`)
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// }

// // Helper function to hash passwords for registration
// export async function hashPassword(password: string): Promise<string> {
//   return bcrypt.hash(password, 12)
// }

// // Helper function to create a new user (for your signup form)
// export async function createUser(data: {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   companyName: string
//   businessType: string
//   currency: string
// }) {
//   try {
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: data.email }
//     })

//     if (existingUser) {
//       throw new Error("User already exists")
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(data.password)

//     // Find or create business type
//     let businessType = await prisma.businessType.findFirst({
//       where: { name: data.businessType }
//     })

//     if (!businessType) {
//       businessType = await prisma.businessType.create({
//         data: { name: data.businessType }
//       })
//     }

//     // Create company and user in a transaction
//     const result = await prisma.$transaction(async (tx) => {
//       // Create company
//       const company = await tx.company.create({
//         data: {
//           name: data.companyName,
//           businessTypeId: businessType!.id,
//           currency: data.currency,
//         }
//       })

//       // Create user
//       const user = await tx.user.create({
//         data: {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.email,
//           password: hashedPassword,
//           companyId: company.id,
//           isActive: false, // Requires email verification
//         },
//         include: {
//           company: true,
//         }
//       })

//       return { user, company }
//     })

//     return result
//   } catch (error) {
//     console.error("Error creating user:", error)
//     throw error
//   }
// }