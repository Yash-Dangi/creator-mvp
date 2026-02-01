
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCreatorBySlug } from '@/lib/actions'
import CreatorProfile from '@/components/creator-profile'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CreatorProfilePage({ params }: PageProps) {
  const { slug } = await params
  const creator = await getCreatorBySlug(slug)

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center gap-2">
            <Link href="/creators" className="text-accent hover:underline text-sm flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Creator not found</h1>
            <Link href="/creators" className="text-accent hover:underline">
              Back to creators
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <CreatorProfile creator={creator} />
}
