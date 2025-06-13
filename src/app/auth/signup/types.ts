import { LucideProps } from "lucide-react"

export type SignUpData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string

    //company details
    companyName: string
    businessType: string
    registrationNumber: string
    tinNumber: string
    companyEmail: string
    phone: string
    website: string
    address: string
    region: string
    gps: string
    currency: string
    logo: null | File
}

export type Step = {
    id: number
    title: string
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    description: string
}