'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    campaignGoal: '',
    budgetRange: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[CreatorCart] Campaign submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ campaignGoal: '', budgetRange: '', email: '' })
    }, 3000)
  }

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

      <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        {!submitted ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Connect with Creators</h1>
              <p className="text-muted-foreground">Share your campaign details. Selected creators will be notified directly.</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campaign Goal */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Campaign Goal</label>
                  <textarea
                    name="campaignGoal"
                    value={formData.campaignGoal}
                    onChange={handleChange}
                    placeholder="e.g., Launch new product line, increase brand awareness, seasonal promotion"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground resize-none"
                    rows={4}
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                  >
                    <option value="">Select budget range</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                    <option value="₹2,50,000+">₹2,50,000+</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Send Campaign to Creators
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Your campaign details will be shared directly with the selected creators. No signup or login required.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Your campaign has been shared with the selected creators. They'll review your details and get back to you directly via email.
            </p>
            <Link href="/creators" className="text-accent hover:underline">
              Back to browsing creators
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
