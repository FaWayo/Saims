import { getRequest } from "@/lib/auth"
import SignupClient from "./SignUpClient"
import { ApiResponse, BusinessType, Region, SignupGetData } from "./types"

export const dynamic = "force-dynamic"

async function getSignupData(): Promise<SignupGetData> {
  try {
    const response = await getRequest("/api/signup")

    if (!response.ok) {
      throw new Error(
        `Failed to fetch signup data: ${response.status} ${response.statusText}`
      )
    }

    const data: ApiResponse<SignupGetData> = await response.json()

    const businessTypes: BusinessType[] = Array.isArray(
      data.data?.businessTypes
    )
      ? data.data.businessTypes
      : []
    const regions: Region[] = Array.isArray(data.data?.regions)
      ? data.data?.regions
      : []

    return {
      businessTypes,
      regions,
    }
  } catch (error) {
    console.error("using fallback data due to error:", error)

    const fallbackData: SignupGetData = {
      businessTypes: [
        { id: 1, name: "Technology" },
        { id: 2, name: "Healthcare" },
        { id: 3, name: "Finance" },
        { id: 4, name: "Education" },
        { id: 5, name: "Retail" },
        { id: 6, name: "Manufacturing" },
        { id: 7, name: "Services" },
        { id: 8, name: "Other" },
      ],
      regions: [
        { id: 1, name: "North America" },
        { id: 2, name: "Europe" },
        { id: 3, name: "Asia Pacific" },
        { id: 4, name: "Latin America" },
        { id: 5, name: "Africa" },
        { id: 6, name: "Middle East" },
      ],
    }
    return fallbackData
  }
}

export default async function SignupPage(): Promise<JSX.Element> {
  const { businessTypes, regions } = await getSignupData()

  return <SignupClient businessTypes={businessTypes} regions={regions} />
}
