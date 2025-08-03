import SignupClient from './SignUpClient'
import { BusinessType, Region, SignupApiGetResponse, SignupGetData } from './types'

export const dynamic = 'force-dynamic'

async function getSignupData(): Promise<SignupGetData> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/signup`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch signup data: ${response.status} ${response.statusText}`)
    }

    const data: SignupApiGetResponse = await response.json()
    console.log('Fetched signup data:', data)

    const businessTypes: BusinessType[] = Array.isArray(data.businessType) ? data.businessType : []
    const regions: Region[] = Array.isArray(data.region) ? data.region : []

    return {
      businessTypes,
      regions
    }
  } catch (error) {
    console.error('Error fetching signup data:', error)
    
    const fallbackData: SignupGetData = {
      businessTypes: [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Healthcare' },
        { id: 3, name: 'Finance' },
        { id: 4, name: 'Education' },
        { id: 5, name: 'Retail' },
        { id: 6, name: 'Manufacturing' },
        { id: 7, name: 'Services' },
        { id: 8, name: 'Other' }
      ],
      regions: [
        { id: 1, name: 'North America' },
        { id: 2, name: 'Europe' },
        { id: 3, name: 'Asia Pacific' },
        { id: 4, name: 'Latin America' },
        { id: 5, name: 'Africa' },
        { id: 6, name: 'Middle East' }
      ]
    }

    console.log('Using fallback data due to API error')
    return fallbackData
  }
}

export default async function SignupPage(): Promise<JSX.Element> {
  const { businessTypes, regions } = await getSignupData()
  
  return (
    <SignupClient 
      businessTypes={businessTypes}
      regions={regions} 
    />
  )
}