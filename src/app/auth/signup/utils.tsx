import { User, Building2 } from "lucide-react";
import { Step } from "./types";
import { z } from "zod";

export const steps: Step[] = [
  {
    id: 1,
    title: "User Details",
    icon: User,
    description: "Personal information",
  },
  {
    id: 2,
    title: "Company Details",
    icon: Building2,
    description: "Business information",
  },
];

export const businessTypes = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Company (LLC)",
  "Corporation",
  "Non-Profit Organization",
  "Other",
];

export const currencies = [
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
];

export const regions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Brong Ahafo",
];

export const signupSchema = z
  .object({
    // Step 1: Personal Information
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters"),

    businessType: z.string().min(1, "Please select a business type"),

    registrationNumber: z
      .string()
      .optional()
      .or(
        z.string().min(3, "Registration number must be at least 3 characters")
      ),

    tinNumber: z
      .string()
      .min(10, "TIN number must be at least 10 characters")
      .max(20, "TIN number cannot exceed 20 characters")
      .regex(
        /^[A-Z0-9]+$/,
        "TIN number can only contain uppercase letters and numbers"
      ),

    companyEmail: z
      .string()
      .email("Please enter a valid company email address")
      .min(1, "Company email is required"),

    phone: z
      .string()
      .optional()
      .or(
        z
          .string()
          .regex(
            /^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/,
            "Please enter a valid Ghana phone number (+233 XX XXX XXXX)"
          )
      ),

    website: z
      .string()
      .optional()
      .or(z.string().url("Please enter a valid website URL")),

    address: z
      .string()
      .optional()
      .or(z.string().min(10, "Address must be at least 10 characters")),

    region: z.string().optional(),

    gps: z
      .string()
      .optional()
      .or(
        z
          .string()
          .regex(
            /^-?\d+\.?\d*,-?\d+\.?\d*$/,
            "GPS coordinates must be in format: latitude,longitude"
          )
      ),

    currency: z.string().min(1, "Please select a currency"),

    logo: z
      .any()
      .optional()
      .refine((file) => {
        if (!file) return true; // Optional field
        return file instanceof File;
      }, "Please upload a valid file")
      .refine((file) => {
        if (!file) return true;
        return file.size <= 10 * 1024 * 1024; // 10MB
      }, "File size must be less than 10MB")
      .refine((file) => {
        if (!file) return true;
        return ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type);
      }, "Only JPEG, PNG, and SVG files are allowed"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
