import { Creator } from './mockData'

export function getEstimatedReach(creator: Creator): number {
  return Math.round(creator.followers * (creator.engagementRate / 100))
}

export function getCreatorsByNiche(creators: Creator[], niche: string): Creator[] {
  return creators.filter((creator) => creator.niche.toLowerCase() === niche.toLowerCase())
}

export function getCreatorsByPlatform(creators: Creator[], platform: string): Creator[] {
  return creators.filter((creator) => creator.platform === platform)
}

export function filterCreators(
  creators: Creator[],
  searchQuery: string,
  niche?: string,
  platform?: string
): Creator[] {
  return creators.filter((creator) => {
    const matchesSearch =
      !searchQuery ||
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.platform.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesNiche = !niche || creator.niche.toLowerCase() === niche.toLowerCase()
    const matchesPlatform = !platform || creator.platform === platform

    return matchesSearch && matchesNiche && matchesPlatform
  })
}

export function calculateTotalReach(creators: Creator[]): number {
  return creators.reduce((sum, creator) => sum + getEstimatedReach(creator), 0)
}

export function getPlatformLabel(platform: string): string {
  const labels: { [key: string]: string } = {
    instagram: 'Instagram',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  }
  return labels[platform] || platform
}

export function formatFollowers(followers: number): string {
  if (followers >= 1000000) {
    return `${(followers / 1000000).toFixed(1)}M`
  }
  if (followers >= 1000) {
    return `${(followers / 1000).toFixed(0)}K`
  }
  return followers.toString()
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
