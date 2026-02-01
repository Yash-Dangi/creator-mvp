'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Instagram, Youtube, TrendingUp } from 'lucide-react'
import CampaignPanel from '@/components/campaign-panel'
import { ICreator } from '@/models/Creator'
import CreatorCard from './creator-card'

export default function CreatorsList({ initialCreators }: { initialCreators: ICreator[] }) {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')?.toLowerCase() || ''
    const filter = searchParams.get('filter')?.toLowerCase() || ''
    const [selectedCreators, setSelectedCreators] = useState<string[]>([])
    const [totalReach, setTotalReach] = useState(0)

    // We can filter client-side for immediate feedback if we have all data, 
    // or rely on server-side initialCreators if we want server-filtered.
    // For this MVP, let's filter the initialCreators client side if the search params change
    // OR strictly use the props if we want server-side search.
    // Given the implementation of getCreators handles search/filter, 
    // we could just display initialCreators, BUT CreatorsList is client-side 
    // and searchParams change triggering a re-render might not refetch server data 
    // unless we use a transition or router.refresh().
    // FOR SIMPLICITY: We will assume initialCreators contains the filtered results 
    // passed from the Server Component wrapper.

    const filteredCreators = initialCreators;

    useEffect(() => {
        const reach = selectedCreators.reduce((sum, id) => {
            const creator = initialCreators.find((c) => c.id === id)
            return sum + (creator ? creator.followers * (creator.engagementRate / 100) : 0)
        }, 0)
        setTotalReach(Math.round(reach))
    }, [selectedCreators, initialCreators])

    const toggleCreator = (id: string) => {
        setSelectedCreators((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
    }

    const getPlatformIcon = (platform: string) => {
        if (platform === 'instagram') return <Instagram className="w-4 h-4" />
        if (platform === 'youtube') return <Youtube className="w-4 h-4" />
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-yellow-100 p-2 text-center text-yellow-800 text-xs font-mono border-b border-yellow-200">
                DEBUG: Creators: {initialCreators?.length ?? 'undefined'}. Filtered: {filteredCreators?.length ?? 'undefined'}.
                Sample: {initialCreators?.[0]?.name ?? 'None'}
            </div>
            {/* Header */}
            <header className="border-b border-border bg-card sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                            CC
                        </div>
                        <span className="font-semibold text-lg text-foreground">CreatorCart</span>
                    </Link>
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

            <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
                <div className="mb-8">
                    <Link href="/" className="text-sm text-accent hover:underline">
                        ← Back
                    </Link>
                    <h1 className="text-4xl font-bold text-foreground mt-4 mb-2">Creator Results</h1>
                    <p className="text-muted-foreground">
                        Found <span className="font-semibold text-foreground">{filteredCreators.length}</span> creators{' '}
                        {search && `matching "${search}"`}
                        {filter && ` in ${filter}`}
                    </p>
                </div>

                {filteredCreators.length === 0 ? (
                    <div className="text-center py-16">
                        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h2 className="text-xl font-semibold text-foreground mb-2">No creators found</h2>
                        <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
                        <Link href="/" className="text-accent hover:underline">
                            Back to home
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
                        {filteredCreators.map((creator) => (
                            <div key={creator.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition group">
                                {/* Card Header */}
                                <Link href={`/creators/${creator.slug}`} className="block">
                                    <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition flex items-end p-4">
                                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                                            {creator.name.charAt(0)}
                                        </div>
                                    </div>
                                </Link>

                                <div className="p-4">
                                    <Link href={`/creators/${creator.slug}`}>
                                        <h3 className="text-lg font-semibold text-foreground hover:text-accent transition mb-1">
                                            {creator.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center gap-2 mb-4 text-sm">
                                        {getPlatformIcon(creator.platform)}
                                        <span className="text-muted-foreground capitalize">{creator.platform}</span>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">{creator.niche}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-2 mb-4 pb-4 border-b border-border">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Followers</span>
                                            <span className="font-semibold text-foreground">{(creator.followers / 1000).toFixed(0)}K</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Engagement</span>
                                            <span className="font-semibold text-foreground">{creator.engagementRate}%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">Starting at</span>
                                            <span className="font-semibold text-foreground">₹{creator.rate.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* New Fields Requested Display */}
                                    <div className="space-y-1 mb-4 pb-2 text-xs text-muted-foreground border-b border-border">
                                        <div className="flex justify-between">
                                            <span>Exp: {creator.experience || 'N/A'}</span>
                                            <span>Deals: {creator.brandDeals || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Posts: {creator.numPosts || 0}</span>
                                            <span className="truncate max-w-[100px]">{creator.geography?.[0] || 'Global'}</span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="text-xs text-muted-foreground">{creator.recentActivity}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => toggleCreator(creator.id)}
                                            className={`w-full py-2 rounded-lg font-medium transition text-sm ${selectedCreators.includes(creator.id)
                                                ? 'bg-accent text-accent-foreground'
                                                : 'bg-secondary text-secondary-foreground border border-border hover:border-accent'
                                                }`}
                                        >
                                            {selectedCreators.includes(creator.id) ? '✓ Added' : 'Add to Campaign'}
                                        </button>
                                        <Link
                                            href={`/creators/${creator.slug}`}
                                            className="block text-center text-sm text-accent hover:underline"
                                        >
                                            View Profile →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Campaign Panel */}
            {selectedCreators.length > 0 && <CampaignPanel selectedCount={selectedCreators.length} totalReach={totalReach} />}
        </div>
    )
}
