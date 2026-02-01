'use client'

import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

const filters = ['Tech', 'Beauty', 'Fitness', 'Fashion', 'Micro Influencer', 'Regional']

export default function HomeSearch() {
    const [search, setSearch] = useState('')
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (selectedFilter) params.append('filter', selectedFilter)
        window.location.href = `/creators?${params.toString()}`
    }

    const toggleFilter = (filter: string) => {
        setSelectedFilter(selectedFilter === filter ? null : filter)
    }

    return (
        <section className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-4 text-balance">
                        Discover creators. Build campaigns.
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground text-balance">
                        Connect directly without dashboards, logins, or complexity.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="bg-card rounded-lg border border-border p-4 sm:p-6 shadow-sm">
                    <div className="flex gap-2 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search creators by niche, platform, or location"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2"
                        >
                            <span className="hidden sm:inline">Search</span>
                            <ArrowRight className="w-4 h-4 sm:hidden" />
                        </button>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => toggleFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedFilter === filter
                                        ? 'bg-accent text-accent-foreground'
                                        : 'bg-secondary text-secondary-foreground hover:border-accent border border-border'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
