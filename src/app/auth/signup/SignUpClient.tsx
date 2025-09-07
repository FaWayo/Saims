"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  ApiResponse,
  BusinessType,
  Region,
  SignUpData,
  UserInfo,
} from "./types"
import ProgressStepper from "@/components/stepper/ProgressStepper"
import { montserrat } from "@/app/fonts"
import { Button } from "@/components/button"
import Link from "next/link"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/select"

import { Input } from "@/components/input"
import { steps, currencies, signupSchema } from "./utils"
import z from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/form"
import { useRouter } from "next/navigation"
import { postRequest } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/alert"

interface SignupClientProps {
  businessTypes: BusinessType[]
  regions: Region[]
}

const Signup: React.FC<SignupClientProps> = ({ businessTypes, regions }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      businessType: "",
      currency: "",
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    let fieldsToValidate: (keyof SignUpData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
      ]
    } else if (currentStep === 2) {
      fieldsToValidate = ["companyName", "businessType", "currency"]
    }

    const isValid = await form.trigger(fieldsToValidate)

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await postRequest("/api/signup", data)
      const responseData: ApiResponse<UserInfo> = await response.json()

      if (!responseData.success) {
        throw new Error(
          responseData.error?.message || "Failed to create account"
        )
      }

      router.push("/app/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepComplete = (stepId: number) => {
    const values = form.getValues()
    const errors = form.formState.errors

    if (stepId === 1) {
      return (
        values.firstName &&
        values.lastName &&
        values.email &&
        values.password &&
        values.confirmPassword &&
        !errors.firstName &&
        !errors.lastName &&
        !errors.email &&
        !errors.password &&
        !errors.confirmPassword
      )
    }
    if (stepId === 2) {
      return (
        values.companyName &&
        values.businessType &&
        values.currency &&
        !errors.companyName &&
        !errors.businessType &&
        !errors.currency
      )
    }
    return false
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <ProgressStepper
          steps={steps}
          currentStep={currentStep}
          isStepComplete={isStepComplete}
        />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {error && (
            <Alert variant={"destructive"}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* User Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2
                      className={`${montserrat.className} text-xl lg:text-2xl font-bold text-gray-700 mb-2`}
                    >
                      Personal Information
                    </h2>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a strong password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Company Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2
                      className={`${montserrat.className} text-xl lg:text-2xl font-bold text-gray-700 mb-2`}
                    >
                      Company Information
                    </h2>
                    <p className="text-gray-600">
                      Essential business details to get started
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Business Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {businessTypes.map((type) => (
                                  <SelectItem
                                    key={type.id}
                                    value={type.id.toString()}
                                  >
                                    {type.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="currency"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {currencies.map((currency) => (
                                  <SelectItem
                                    key={currency.code}
                                    value={currency.code}
                                  >
                                    {currency.code} - {currency.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                {currentStep !== 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`
                        w-2 h-2 rounded-full transition-all
                        ${
                          index + 1 === currentStep
                            ? "bg-vividskyblue"
                            : "bg-gray-300"
                        }
                      `}
                    />
                  ))}
                </div>

                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep} size="lg">
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        <div className="text-center mt-8 text-gray-500">
          <p>
            Already have an account?{" "}
            <Link
              className="text-primary hover:cursor-pointer hover:text-primary/90 font-bold underline focus:outline-none rounded"
              href="/auth/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
