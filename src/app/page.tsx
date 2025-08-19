import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import Logo from '@/components/Logo/logo'
import { UserInfo } from './auth/signup/types'


async function verifyAuth(): Promise<UserInfo | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as UserInfo

    return decoded
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

const Home = async () => {
  const user = await verifyAuth()

  if (user) {
    redirect('/app/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <Link href={"/"} className='mt-4'><Logo /></Link> 
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/auth/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </a>
              <a
                href="/auth/signup"
                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-500 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your
              <span className="text-primary block">Sales & Inventory</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A solution for managing your inventory, tracking sales, and growing your business.
              Simple, powerful, and designed for modern businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#features"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Saims</h3> 
            <div className="flex justify-center space-x-6">
              <a href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </a>
              <a href="/auth/signup" className="text-gray-400 hover:text-white transition-colors">
                Sign Up
              </a>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home