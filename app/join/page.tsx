'use client'

import React, { useState } from "react"
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { registerCreator } from "@/lib/actions"
import { toast } from "sonner" // Assuming sonner is installed as per package.json

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '', // Added name field
    handle: '',
    platform: '',
    niche: '',
    rate: '',
    portfolioUrl: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const result = await registerCreator({
        ...formData,
        rate: Number(formData.rate) || 0
      });

      if (result.success) {
        const newUrl = `${window.location.origin}/creators/${result.data.slug}`
        setProfileUrl(newUrl)
        setSubmitted(true)
      } else {
        setError(result.error || 'Failed to create profile. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
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
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        {!submitted ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Join CreatorCart</h1>
              <p className="text-muted-foreground">Create your profile and get discovered by brands. No signup required.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Creator Handle */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Creator Handle</label>
                  <input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleChange}
                    placeholder="@yourhandle"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Primary Platform */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                  >
                    <option value="">Select platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>

                {/* Niche/Category */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Niche/Category</label>
                  <select
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                  >
                    <option value="">Select niche</option>
                    <option value="Tech">Tech</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Travel">Travel</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                {/* Base Rate */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Base Rate (per post)</label>
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Portfolio URL */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Portfolio/Website (optional)</label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://your-portfolio.com"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Profile...
                    </>
                  ) : 'Create My Profile'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Your profile will be visible to brands immediately. Brands can discover and apply to collaborate with you directly.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Profile Created!</h2>
            <p className="text-muted-foreground mb-6">
              Your CreatorCart profile is now live. Brands can discover and reach out to you directly.
            </p>

            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your profile URL:</p>
              <Link href={profileUrl} className="font-mono text-sm text-accent hover:underline break-all">
                {profileUrl}
              </Link>
            </div>

            <div className="space-y-3">
              <Link
                href="/creators"
                className="block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                View Available Creators
              </Link>
              <Link href="/" className="block text-accent hover:underline">
                Back to home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
