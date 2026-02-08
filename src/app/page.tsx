import Dashboard from '@/components/Dashboard'
import { getClimateData } from '@/lib/api'
import { Suspense } from 'react'

export const revalidate = 3600 // Revalidate every hour

export default async function Page() {
  // Fetch data on the server
  const climateData = await getClimateData()

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="text-center p-20 text-white">Loading data...</div>}>
        <Dashboard initialData={climateData} />
      </Suspense>
    </main>
  )
}
