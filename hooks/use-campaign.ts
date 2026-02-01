'use client'

import { useState, useEffect } from 'react'

interface CampaignState {
  selectedCreators: string[]
  totalReach: number
}

export function useCampaign() {
  const [campaign, setCampaign] = useState<CampaignState>({
    selectedCreators: [],
    totalReach: 0,
  })
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('creatorCart_campaign')
    if (saved) {
      try {
        setCampaign(JSON.parse(saved))
      } catch (e) {
        console.error('[CreatorCart] Failed to load campaign from localStorage:', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage when campaign changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('creatorCart_campaign', JSON.stringify(campaign))
    }
  }, [campaign, isHydrated])

  const addCreator = (creatorId: string) => {
    setCampaign((prev) => ({
      ...prev,
      selectedCreators: [...prev.selectedCreators, creatorId],
    }))
  }

  const removeCreator = (creatorId: string) => {
    setCampaign((prev) => ({
      ...prev,
      selectedCreators: prev.selectedCreators.filter((id) => id !== creatorId),
    }))
  }

  const clearCampaign = () => {
    setCampaign({ selectedCreators: [], totalReach: 0 })
  }

  return {
    campaign,
    addCreator,
    removeCreator,
    clearCampaign,
    isHydrated,
  }
}
