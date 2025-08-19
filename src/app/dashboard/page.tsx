"use client"
import { postRequest } from '@/lib/auth'
import React from 'react'

function Dashboard() {
  const handleLogout = async () => {
    try {
      const response = await postRequest('/api/logout')

      if (response.ok) {
        window.location.href = '/'
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hello there Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome to your dashboard! You are successfully logged in.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard