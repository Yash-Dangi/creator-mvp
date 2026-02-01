'use client'

import { useState } from 'react'
import Link from 'next/link'
import { campaigns } from '@/lib/mockData'
import { ArrowLeft, CheckCircle, Briefcase } from 'lucide-react'

export default function CampaignsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [applied, setApplied] = useState<string[]>([])

  const handleApply = (campaignId: string) => {
    if (!applied.includes(campaignId)) {
      setApplied([...applied, campaignId])
      console.log('[CreatorCart] Applied to campaign:', campaignId)
      setTimeout(() => {
        setApplied((prev) => prev.filter((id) => id !== campaignId))
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
          <Link href="/" className="text-accent hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              CC
            </div>
            <span className="font-semibold text-lg text-foreground">CreatorCart</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/join" className="text-sm text-muted-foreground hover:text-foreground transition">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Brand Campaigns</h1>
          <p className="text-muted-foreground">Find and apply to brand collaboration opportunities. No signup required.</p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No campaigns available</h2>
            <p className="text-muted-foreground">Check back soon for new opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{campaign.brandName}</h3>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Campaign Goal</p>
                    <p className="text-foreground">{campaign.goal}</p>
                  </div>

                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-2">Budget Range</p>
                    <p className="text-lg font-semibold text-accent">{campaign.budgetRange}</p>
                  </div>

                  {selectedCampaign === campaign.id && (
                    <div className="mb-4 p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-foreground">{campaign.description}</p>
                      <p className="text-xs text-muted-foreground mt-3">
                        Posted on {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                      className="flex-1 text-sm text-accent hover:underline font-medium"
                    >
                      {selectedCampaign === campaign.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button
                      onClick={() => handleApply(campaign.id)}
                      disabled={applied.includes(campaign.id)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition text-sm flex items-center justify-center gap-1 ${
                        applied.includes(campaign.id)
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary text-primary-foreground hover:opacity-90'
                      }`}
                    >
                      {applied.includes(campaign.id) ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Applied
                        </>
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
