export interface Creator {
  id: string;
  slug: string;
  name: string;
  handle: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  niche: string;
  followers: number;
  engagementRate: number;
  rate: number;
  recentActivity: string;
  topPosts: Array<{
    id: string;
    imageUrl: string;
    likes: number;
    comments: number;
  }>;
  demographics: {
    ageRange: Array<{ label: string; value: number }>;
    gender: Array<{ label: string; value: number }>;
    topLocations: string[];
  };
  packages: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
  }>;
}

export interface Campaign {
  id: string;
  brandName: string;
  goal: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
}

export const creators: Creator[] = [
  {
    id: '1',
    slug: 'sarah-tech',
    name: 'Sarah Chen',
    handle: '@sarahtech',
    platform: 'instagram',
    niche: 'Tech',
    followers: 125000,
    engagementRate: 8.5,
    rate: 5000,
    recentActivity: 'Active recently',
    topPosts: [
      { id: '1', imageUrl: 'https://images.unsplash.com/photo-1516534775068-bb30115ef585?w=500&h=500&fit=crop', likes: 12400, comments: 342 },
      { id: '2', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop', likes: 10200, comments: 289 },
      { id: '3', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop', likes: 11100, comments: 321 },
    ],
    demographics: {
      ageRange: [
        { label: '18-24', value: 35 },
        { label: '25-34', value: 45 },
        { label: '35-44', value: 15 },
        { label: '45+', value: 5 },
      ],
      gender: [
        { label: 'Female', value: 62 },
        { label: 'Male', value: 38 },
      ],
      topLocations: ['India', 'USA', 'UK'],
    },
    packages: [
      { id: '1', name: '1 Reel + 2 Stories', description: 'Single reel post with 2 story posts', price: 5000 },
      { id: '2', name: 'Dedicated Reel', description: 'Full dedicated reel post with captions', price: 8000 },
      { id: '3', name: 'Monthly Package', description: '3 reels + 8 stories throughout month', price: 20000 },
    ],
  },
  {
    id: '2',
    slug: 'mike-fitness',
    name: 'Mike Johnson',
    handle: '@mikefits',
    platform: 'youtube',
    niche: 'Fitness',
    followers: 250000,
    engagementRate: 6.2,
    rate: 8000,
    recentActivity: 'High response rate',
    topPosts: [
      { id: '1', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop', likes: 25600, comments: 1240 },
      { id: '2', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop', likes: 22100, comments: 980 },
      { id: '3', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop', likes: 20800, comments: 1120 },
    ],
    demographics: {
      ageRange: [
        { label: '18-24', value: 40 },
        { label: '25-34', value: 38 },
        { label: '35-44', value: 18 },
        { label: '45+', value: 4 },
      ],
      gender: [
        { label: 'Female', value: 55 },
        { label: 'Male', value: 45 },
      ],
      topLocations: ['USA', 'India', 'Canada'],
    },
    packages: [
      { id: '1', name: 'Video Feature', description: 'Feature in one video (10-15 sec spot)', price: 8000 },
      { id: '2', name: 'Dedicated Video', description: 'Full dedicated video (4-6 min)', price: 15000 },
      { id: '3', name: 'Series Sponsorship', description: '3 videos over 1 month', price: 35000 },
    ],
  },
  {
    id: '3',
    slug: 'emma-beauty',
    name: 'Emma Rodriguez',
    handle: '@emmabellez',
    platform: 'instagram',
    niche: 'Beauty',
    followers: 185000,
    engagementRate: 7.8,
    rate: 6500,
    recentActivity: 'Active recently',
    topPosts: [
      { id: '1', imageUrl: 'https://images.unsplash.com/photo-1494863853585-4b0882cfb1e8?w=500&h=500&fit=crop', likes: 18900, comments: 567 },
      { id: '2', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop', likes: 17200, comments: 512 },
      { id: '3', imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop', likes: 19100, comments: 598 },
    ],
    demographics: {
      ageRange: [
        { label: '18-24', value: 48 },
        { label: '25-34', value: 38 },
        { label: '35-44', value: 12 },
        { label: '45+', value: 2 },
      ],
      gender: [
        { label: 'Female', value: 88 },
        { label: 'Male', value: 12 },
      ],
      topLocations: ['India', 'USA', 'UAE'],
    },
    packages: [
      { id: '1', name: 'Beauty Tutorial', description: 'Single tutorial/demo post', price: 6500 },
      { id: '2', name: 'Product Review Series', description: '2 posts with in-depth review', price: 12000 },
      { id: '3', name: 'Monthly Collaboration', description: '4 posts + stories throughout month', price: 25000 },
    ],
  },
  {
    id: '4',
    slug: 'alex-fashion',
    name: 'Alex Thompson',
    handle: '@alexstyle',
    platform: 'instagram',
    niche: 'Fashion',
    followers: 95000,
    engagementRate: 9.2,
    rate: 4500,
    recentActivity: 'Micro Influencer',
    topPosts: [
      { id: '1', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', likes: 8700, comments: 245 },
      { id: '2', imageUrl: 'https://images.unsplash.com/photo-1559070352-cd4628902d4a?w=500&h=500&fit=crop', likes: 9100, comments: 267 },
      { id: '3', imageUrl: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop', likes: 8900, comments: 256 },
    ],
    demographics: {
      ageRange: [
        { label: '18-24', value: 52 },
        { label: '25-34', value: 35 },
        { label: '35-44', value: 10 },
        { label: '45+', value: 3 },
      ],
      gender: [
        { label: 'Female', value: 72 },
        { label: 'Male', value: 28 },
      ],
      topLocations: ['India', 'UK', 'Australia'],
    },
    packages: [
      { id: '1', name: 'Outfit Post', description: 'Single outfit/styling post', price: 4500 },
      { id: '2', name: 'Lookbook', description: '3 coordinated outfit posts', price: 10000 },
      { id: '3', name: 'Fashion Series', description: '5 posts over 2 weeks', price: 18000 },
    ],
  },
];

export const campaigns: Campaign[] = [
  {
    id: '1',
    brandName: 'TechPro Solutions',
    goal: 'Launch new gadget line and reach tech enthusiasts',
    budgetMin: 50000,
    budgetMax: 150000,
    deadline: '2024-04-30',
  },
  {
    id: '2',
    brandName: 'FitFlow',
    goal: 'Promote new fitness app to health-conscious audience',
    budgetMin: 40000,
    budgetMax: 100000,
    deadline: '2024-05-15',
  },
  {
    id: '3',
    brandName: 'BeautyBrand Co',
    goal: 'Introduce new makeup line through beauty influencers',
    budgetMin: 60000,
    budgetMax: 180000,
    deadline: '2024-04-20',
  },
  {
    id: '4',
    brandName: 'StyleHub',
    goal: 'Showcase new fashion collection to fashion enthusiasts',
    budgetMin: 30000,
    budgetMax: 80000,
    deadline: '2024-05-01',
  },
];
