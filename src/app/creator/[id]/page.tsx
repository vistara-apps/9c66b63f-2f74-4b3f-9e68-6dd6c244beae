'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { AppShell } from '@/components/AppShell'
import { CreatorProfileCard } from '@/components/CreatorProfileCard'
import { ContentCard } from '@/components/ContentCard'
import { TipInputForm } from '@/components/TipInputForm'
import { Creator, User, ContentItem, TipRequest } from '@/types'
import { dataStore } from '@/lib/store'

interface EnrichedContentItem extends ContentItem {
  creator: Creator | null
  user: User | null
}

export default function CreatorPage() {
  const params = useParams()
  const creatorId = params.id as string

  const [creator, setCreator] = useState<Creator | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [contentItems, setContentItems] = useState<EnrichedContentItem[]>([])
  const [totalTips, setTotalTips] = useState(0)
  const [tipCount, setTipCount] = useState(0)
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null)
  const [isTipping, setIsTipping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (creatorId) {
      fetchCreatorData()
    }
  }, [creatorId]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCreatorData = async () => {
    try {
      // Fetch creator info
      const creatorData = dataStore.getCreator(creatorId)
      if (creatorData) {
        setCreator(creatorData)
        const userData = dataStore.getUser(creatorData.userId)
        setUser(userData || null)

        // Fetch creator's content
        const content = dataStore.getContentItemsByCreator(creatorId)
        const enrichedContent = content.map(item => ({
          ...item,
          creator: creatorData,
          user: userData || null
        }))
        setContentItems(enrichedContent)

        // Fetch analytics
        setTotalTips(dataStore.getTotalTipsForCreator(creatorId))
        setTipCount(dataStore.getTipCountForCreator(creatorId))
      }
    } catch (error) {
      console.error('Error fetching creator data:', error)
    }
  }

  const handleTip = (contentId: string) => {
    setSelectedContentId(contentId)
    setIsTipping(true)
  }

  const handleShare = (contentId: string) => {
    const url = `${window.location.origin}/content/${contentId}`
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  const handleTipSubmit = async (tipRequest: TipRequest) => {
    setIsLoading(true)
    try {
      // Simulate transaction
      const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipsterUserId: 'demo-user',
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
        // Refresh data
        fetchCreatorData()
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

  if (!creator || !user) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <p className="text-text/70">Loading creator profile...</p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mb-8">
        <CreatorProfileCard
          creator={creator}
          user={user}
          totalTips={totalTips}
          tipCount={tipCount}
          variant="detailed"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text mb-4">Content by {creator.channelName}</h2>
      </div>

      <div className="space-y-6">
        {contentItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text/70">No content yet.</p>
          </div>
        ) : (
          contentItems.map((item) => (
            <div key={item.id}>
              <ContentCard
                contentItem={item}
                creator={item.creator!}
                user={item.user!}
                onTip={handleTip}
                onShare={handleShare}
              />
            </div>
          ))
        )}
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
