'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'

interface CampaignPanelProps {
  selectedCount: number
  totalReach: number
}

export default function CampaignPanel({ selectedCount, totalReach }: CampaignPanelProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition z-40"
      >
        View Campaign ({selectedCount})
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Creators Selected</p>
              <p className="text-2xl font-bold text-foreground">{selectedCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Reach</p>
              <p className="text-2xl font-bold text-accent">{(totalReach / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/connect"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Connect with Creators
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-lg transition">
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
