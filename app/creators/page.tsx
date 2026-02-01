
import { Suspense } from 'react'
import { getCreators } from '@/lib/actions'
import { ICreator } from '@/models/Creator'
import CreatorsList from '@/components/creators-list'

// Server Component
export default async function CreatorsPage({ searchParams }: { searchParams: Promise<{ search?: string, filter?: string }> }) {
  const params = await searchParams;
  const search = params.search || ''
  const filter = params.filter || ''

  let creators: ICreator[] = [];
  try {
    creators = await getCreators(search, filter);
  } catch (error) {
    console.error("Failed to fetch creators:", error);
    // Fallback to empty or error state
  }

  return (
    <Suspense fallback={<div className="h-screen bg-background flex items-center justify-center">Loading creators...</div>}>
      <CreatorsList initialCreators={creators} />
    </Suspense>
  )
}
