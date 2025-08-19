"use client"
import React, { useState } from "react"
import { montserrat } from "@/app/fonts"
import Link from "next/link"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../signup/utils"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/form"
import z from "zod"
import { postRequest } from "@/lib/auth"
import { ApiResponse, UserInfo } from "../signup/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/alert"
import { useRouter } from "next/navigation"

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await postRequest("/api/login", values)
      const responseData: ApiResponse<UserInfo> = await response.json()

      if (!responseData.success) {
        throw new Error(responseData.error?.message || "Failed to login")
      }

      router.push("/app/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <header className="text-center space-y-2">
          <h1
            className={`${montserrat.className} text-2xl sm:text-3xl font-bold text-gray-900`}
          >
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Sign in to your account.
          </p>
        </header>

        {error && (
          <Alert variant={"destructive"}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-right text-sm">
                <span className="text-gray-600">Forgotten Password? </span>
                <button
                  type="button"
                  className="text-vividskyblue hover:cursor-pointer hover:text-vividskyblue/90 font-bold focus:outline-none rounded"
                >
                  Reset
                </button>
              </p>
            </div>

            <Button
              className="w-full py-3 text-base sm:text-lg font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Sign up{" "}
                <Link
                  className="text-vividskyblue hover:cursor-pointer hover:text-vividskyblue/90 font-bold focus:outline-none rounded"
                  href="/auth/signup"
                >
                  here
                </Link>{" "}
                if you don{" ' "}t have an account.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
