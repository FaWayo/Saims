import { LucideProps } from "lucide-react"

export type SignUpData = {
    // Personal Information
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    //Company Details
    companyName: string
    businessType: string
    currency: string
}

export type CompleteProfileData = {
    registrationNumber?: string
    tinNumber?: string
    companyEmail?: string
    phone?: string
    website?: string
    address?: string
    region?: string
    gps?: string
    logo?: File | null
}

export type FullUserProfile = SignUpData & CompleteProfileData


export type UserData = SignUpData | (SignUpData & CompleteProfileData)

export type Step = {
    id: number
    title: string
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    description: string
}


// Enums
export enum CustomerType {
    INDIVIDUAL = 1,
    BUSINESS = 2
  }
  
  export enum PurchaseOrderStatus {
    PENDING = 1,
    ORDERED = 2,
    RECEIVED = 3,
    CANCELLED = 4
  }
  
  export enum SalesOrderStatus {
    PENDING = 1,
    CONFIRMED = 2,
    SHIPPED = 3,
    DELIVERED = 4,
    CANCELLED = 5
  }
  
  export enum PaymentStatus {
    PENDING = 1,
    PARTIAL = 2,
    PAID = 3
  }
  
  export enum TransactionType {
    PURCHASE = 1,
    SALE = 2,
    ADJUSTMENT = 3,
    TRANSFER = 4,
    RETURN = 5
  }
  
  export enum ReferenceType {
    PURCHASE_ORDER = 1,
    SALES_ORDER = 2,
    MANUAL_ADJUSTMENT = 3,
    STOCK_TRANSFER = 4
  }