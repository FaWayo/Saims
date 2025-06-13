"use client";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Check,
  Upload,
  MapPin,
} from "lucide-react";
import { SignUpData, Step } from "./types";
import ProgressStepper from "@/components/stepper/ProgressStepper";
import { montserrat } from "@/app/fonts";
import { Button } from "@/components/button";
import FileUpload from "@/components/file-upload";
import Link from "next/link";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { steps, businessTypes, regions, currencies, signupSchema } from "./utils";
import z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/form";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
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
      registrationNumber: "",
      tinNumber: "",
      companyEmail: "",
      phone: "",
      website: "",
      address: "",
      region: "",
      gps: "",
      currency: "",
      logo: null,
    },
    mode: "onChange"
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof SignUpData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["firstName", "lastName", "email", "password", "confirmPassword"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["companyName", "businessType", "tinNumber", "companyEmail", "currency"];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    console.log("Form submitted:", data);
    //TODO: Handle form submission
  };

  const isStepComplete = (stepId: number) => {
    const values = form.getValues();
    const errors = form.formState.errors;
    
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
      );
    }
    if (stepId === 2) {
      return (
        values.companyName &&
        values.businessType &&
        values.companyEmail &&
        values.tinNumber &&
        values.currency &&
        !errors.companyName &&
        !errors.businessType &&
        !errors.companyEmail &&
        !errors.tinNumber &&
        !errors.currency
      );
    }
    return false;
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`${montserrat.className} text-2xl mlg:text-3xl font-bold text-gray-700 mb-2`}
          >
            Create Your Business Account
          </h1>
          <p className="text-gray-600 text-base">
            Get insights into your business performance
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressStepper
          steps={steps}
          currentStep={currentStep}
          isStepComplete={isStepComplete}
        />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: User Details */}
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
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
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
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
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
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
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
                          <FormLabel>Password *</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a strong password" {...field} />
                          </FormControl>
                          <FormDescription>
                            Must contain at least 8 characters with uppercase, lowercase, number, and special character
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password *</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Company Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2
                      className={`${montserrat.className} text-xl lg:text-2xl font-bold text-gray-700 mb-2`}
                    >
                      Company Information
                    </h2>
                    <p className="text-gray-600">Tell us about your business</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {businessTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
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

                  {/* Continue with other fields... */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tinNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TIN Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter TIN number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Add remaining fields following the same pattern */}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`
                        w-2 h-2 rounded-full transition-all
                        ${
                          index + 1 === currentStep ? "bg-primary" : "bg-gray-300"
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
                    size="lg"
                    disabled={!form.formState.isValid}
                  >
                    Create Account
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Footer */}
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
  );
};

export default Signup;