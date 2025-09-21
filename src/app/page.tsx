'use client'

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/AppShell'
import { ContentCard } from '@/components/ContentCard'
import { TipInputForm } from '@/components/TipInputForm'
import { ContentItem, Creator, User, TipRequest } from '@/types'

interface EnrichedContentItem extends ContentItem {
  creator: Creator | null
  user?: User | null
}

export default function HomePage() {
  const [contentItems, setContentItems] = useState<EnrichedContentItem[]>([])
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null)
  const [isTipping, setIsTipping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content')
      if (response.ok) {
        const data = await response.json()
        setContentItems(data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  const handleTip = (contentId: string) => {
    setSelectedContentId(contentId)
    setIsTipping(true)
  }

  const handleShare = (contentId: string) => {
    // In a real app, this would open a share dialog
    const url = `${window.location.origin}/content/${contentId}`
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  const handleTipSubmit = async (tipRequest: TipRequest) => {
    setIsLoading(true)
    try {
      // In a real app, this would integrate with Base Wallet SDK
      // For demo purposes, we'll simulate a transaction
      const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipsterUserId: 'demo-user', // In real app, get from wallet
          contentItemId: tipRequest.contentItemId,
          amount: tipRequest.amount,
          transactionHash: mockTransactionHash,
          message: tipRequest.message
        }),
      })

      if (response.ok) {
        alert('Tip sent successfully!')
        setIsTipping(false)
        setSelectedContentId(null)
        // Refresh content to show updated tip counts
        fetchContent()
      } else {
        throw new Error('Failed to send tip')
      }
    } catch (error) {
      console.error('Error sending tip:', error)
      alert('Failed to send tip. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTipCancel = () => {
    setIsTipping(false)
    setSelectedContentId(null)
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text mb-4">Discover Content</h2>
        <p className="text-text/70">
          Explore amazing content from creators and show your appreciation with tips.
        </p>
      </div>

      <div className="space-y-6">
        {contentItems.map((item) => (
          <div key={item.id}>
            {item.creator && item.user && (
              <ContentCard
                contentItem={item}
                creator={item.creator}
                user={item.user}
                onTip={handleTip}
                onShare={handleShare}
              />
            )}
          </div>
        ))}
      </div>

      {isTipping && selectedContentId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full">
            <TipInputForm
              contentItemId={selectedContentId}
              onSubmit={handleTipSubmit}
              onCancel={handleTipCancel}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </AppShell>
  )
}
