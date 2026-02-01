'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, ArrowLeft } from 'lucide-react'
import { ICreator } from '@/models/Creator'

interface CreatorProfileProps {
    creator: ICreator
}

export default function CreatorProfile({ creator }: CreatorProfileProps) {
    const platformIcon = creator.platform === 'instagram' ? <Instagram className="w-5 h-5" /> : <Youtube className="w-5 h-5" />

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
                    <Link href="/creators" className="text-accent hover:underline text-sm flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                            CC
                        </div>
                        <span className="font-semibold text-lg text-foreground">CreatorCart</span>
                    </Link>
                    <div className="w-20" />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
                {/* Creator Header */}
                <div className="mb-12">
                    <div className="bg-gradient-to-br from-accent/20 to-accent/5 h-32 rounded-lg mb-6" />

                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-end mb-6">
                        <div className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-2xl font-bold -mt-16 relative z-10">
                            {creator.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-foreground mb-2">{creator.name}</h1>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    {platformIcon}
                                    <span className="capitalize">{creator.platform}</span>
                                </div>
                                <span>•</span>
                                <span>{creator.niche}</span>
                            </div>
                        </div>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Followers</p>
                            <p className="text-2xl font-bold text-foreground">{(creator.followers / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Engagement</p>
                            <p className="text-2xl font-bold text-accent">{creator.engagementRate}%</p>
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Starting Rate</p>
                            <p className="text-2xl font-bold text-foreground">₹{(creator.rate / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="bg-card border border-border p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <p className="text-sm font-semibold text-foreground">{creator.recentActivity}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Posts */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Top Performing Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {creator.topPosts.map((post) => (
                            <div key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition">
                                <div className="relative w-full h-48 bg-secondary">
                                    <Image
                                        src={post.imageUrl || "/placeholder.svg"}
                                        alt="Post"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-muted-foreground">
                                        {post.likes.toLocaleString()} likes • {post.comments} comments
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Audience Demographics */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Audience Demographics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age Range */}
                        <div className="bg-card border border-border p-6 rounded-lg">
                            <h3 className="font-semibold text-foreground mb-4">Age Range</h3>
                            <div className="space-y-3">
                                {creator.demographics.ageRange.map((age) => (
                                    <div key={age.label}>
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">{age.label}</span>
                                            <span className="font-semibold text-foreground">{age.value}%</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div className="bg-accent h-2 rounded-full" style={{ width: `${age.value}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gender Split */}
                        <div className="bg-card border border-border p-6 rounded-lg">
                            <h3 className="font-semibold text-foreground mb-4">Gender Split</h3>
                            <div className="space-y-3">
                                {creator.demographics.gender.map((gender) => (
                                    <div key={gender.label}>
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">{gender.label}</span>
                                            <span className="font-semibold text-foreground">{gender.value}%</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-2">
                                            <div className="bg-accent h-2 rounded-full" style={{ width: `${gender.value}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Locations */}
                        <div className="bg-card border border-border p-6 rounded-lg md:col-span-2">
                            <h3 className="font-semibold text-foreground mb-4">Top Locations</h3>
                            <div className="flex flex-wrap gap-2">
                                {creator.demographics.topLocations.map((location) => (
                                    <span key={location} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                                        {location}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Pre-set Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {creator.packages.map((pkg) => (
                            <div key={pkg.id} className="bg-card border border-border p-6 rounded-lg hover:shadow-md transition">
                                <h3 className="font-semibold text-foreground mb-2">{pkg.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                                <div className="mb-4 pt-4 border-t border-border">
                                    <p className="text-2xl font-bold text-accent">₹{pkg.price.toLocaleString()}</p>
                                </div>
                                <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
                                    Add to Campaign
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12">
                    <Link
                        href="/connect"
                        className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition inline-block"
                    >
                        Connect with {creator.name}
                    </Link>
                </section>
            </main>
        </div>
    )
}
