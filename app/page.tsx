
import Link from 'next/link'
import { Suspense } from 'react'
import HomeSearch from '@/components/home-search'
import CreatorCard from '@/components/creator-card'
import { getCreators } from '@/lib/actions'
import { ICreator } from '@/models/Creator'

export default async function Home() {
  let featuredCreators: ICreator[] = []
  try {
    // Fetch top 3 featured creators for homepage
    const allCreators = await getCreators()
    featuredCreators = allCreators.slice(0, 3)
  } catch (error) {
    console.error('Failed to fetch featured creators:', error)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              CC
            </div>
            <span className="font-semibold text-lg text-foreground">CreatorCart</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/campaigns" className="text-sm text-muted-foreground hover:text-foreground transition">
              For Creators
            </Link>
            <Link href="/join" className="text-sm text-muted-foreground hover:text-foreground transition">
              Join as Creator
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Search */}
      <HomeSearch />

      {/* Featured Creators Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Creators</h2>
            <Link href="/creators" className="text-accent hover:underline text-sm font-medium">
              View all creators →
            </Link>
          </div>

          {featuredCreators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCreators.map((creator) => (
                <div key={creator.id} className="h-full">
                  <CreatorCard
                    creator={creator}
                    showAddButton={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No featured creators available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">For Brands</h3>
              <p className="text-muted-foreground text-sm">Find the right creators, build campaigns, and connect in minutes.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">For Creators</h3>
              <p className="text-muted-foreground text-sm">Get discovered by brands without pitching or complex applications.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Direct Connection</h3>
              <p className="text-muted-foreground text-sm">No middlemen. Just straightforward creator-brand collaboration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Ready to start?</h2>
          <p className="text-lg text-muted-foreground mb-8">Browse creators or apply as a creator with no signup required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/creators"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition inline-block"
            >
              Browse Creators
            </Link>
            <Link
              href="/join"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium border border-border hover:border-accent transition inline-block"
            >
              Join as Creator
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
