'use client'

import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'
import { ICreator } from '@/models/Creator'

interface CreatorCardProps {
  creator: ICreator
  isSelected?: boolean
  onToggle?: (id: string) => void
  showAddButton?: boolean
}

export default function CreatorCard({ creator, isSelected = false, onToggle, showAddButton = true }: CreatorCardProps) {
  const getPlatformIcon = (platform: string) => {
    if (platform === 'instagram') return <Instagram className="w-4 h-4" />
    if (platform === 'youtube') return <Youtube className="w-4 h-4" />
    return null
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition group h-full flex flex-col">
      {/* Card Header */}
      <Link href={`/creators/${creator.slug}`} className="block">
        <div className="h-32 bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition flex items-end p-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            {creator.name.charAt(0)}
          </div>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/creators/${creator.slug}`} className="block">
          <h3 className="text-lg font-semibold text-foreground hover:text-accent transition mb-1">
            {creator.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-4 text-sm">
          {getPlatformIcon(creator.platform)}
          <span className="text-muted-foreground capitalize">{creator.platform}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground line-clamp-1">{Array.isArray(creator.niche) ? creator.niche.join(', ') : creator.niche}</span>
        </div>

        {/* Stats */}
        <div className="space-y-2 mb-4 pb-4 border-b border-border flex-1">
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

        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-muted-foreground">{creator.recentActivity}</span>
        </div>

        {/* Actions */}
        <div className="space-y-2 mt-auto">
          {showAddButton && onToggle && (
            <button
              onClick={() => onToggle(creator.id)}
              className={`w-full py-2 rounded-lg font-medium transition text-sm ${isSelected
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-secondary-foreground border border-border hover:border-accent'
                }`}
            >
              {isSelected ? '✓ Added' : 'Add to Campaign'}
            </button>
          )}
          <Link
            href={`/creators/${creator.slug}`}
            className="block text-center text-sm text-accent hover:underline"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  )
}
