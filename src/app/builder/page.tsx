'use client'

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/AppShell'
import { Button } from '@/components/ui/Button'
import { Creator, ContentItem } from '@/types'
import { dataStore } from '@/lib/store'

export default function BuilderPage() {
  const [creator, setCreator] = useState<Creator | null>(null)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contentUrl: '',
    contentType: 'text' as 'text' | 'image' | 'video' | 'link',
    embedUrl: ''
  })

  useEffect(() => {
    // For demo purposes, use the first creator
    const creators = dataStore.getCreators()
    if (creators.length > 0) {
      setCreator(creators[0])
      setContentItems(dataStore.getContentItemsByCreator(creators[0].id))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!creator) return

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorId: creator.id,
          ...formData
        }),
      })

      if (response.ok) {
        const newContent = await response.json()
        setContentItems(prev => [...prev, newContent])
        setFormData({
          title: '',
          description: '',
          contentUrl: '',
          contentType: 'text',
          embedUrl: ''
        })
        setIsCreating(false)
        alert('Content created successfully!')
      } else {
        throw new Error('Failed to create content')
      }
    } catch (error) {
      console.error('Error creating content:', error)
      alert('Failed to create content. Please try again.')
    }
  }

  if (!creator) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <p className="text-text/70">Loading builder...</p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text mb-4">Builder Mode</h2>
        <p className="text-text/70">
          Manage your content and creator profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-text">Your Content</h3>
            <Button onClick={() => setIsCreating(!isCreating)}>
              {isCreating ? 'Cancel' : 'Add Content'}
            </Button>
          </div>

          {isCreating && (
            <div className="bg-surface rounded-lg p-6">
              <h4 className="text-lg font-semibold text-text mb-4">Create New Content</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-text mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-text mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="contentType" className="block text-sm font-medium text-text mb-2">
                    Content Type *
                  </label>
                  <select
                    id="contentType"
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="link">Link</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contentUrl" className="block text-sm font-medium text-text mb-2">
                    Content URL
                  </label>
                  <input
                    type="url"
                    id="contentUrl"
                    name="contentUrl"
                    value={formData.contentUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {(formData.contentType === 'image' || formData.contentType === 'video') && (
                  <div>
                    <label htmlFor="embedUrl" className="block text-sm font-medium text-text mb-2">
                      Embed URL
                    </label>
                    <input
                      type="url"
                      id="embedUrl"
                      name="embedUrl"
                      value={formData.embedUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="submit">Create Content</Button>
                  <Button type="button" variant="secondary" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-4">
            {contentItems.map((item) => (
              <div key={item.id} className="bg-surface rounded-lg p-4">
                <h4 className="font-semibold text-text">{item.title}</h4>
                <p className="text-sm text-text/70 mt-1">{item.description}</p>
                <p className="text-xs text-text/50 mt-2">
                  Type: {item.contentType} • Created: {item.creationDate.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Creator Profile */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-text">Creator Profile</h3>

          <div className="bg-surface rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text mb-4">Profile Information</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-text/70">Channel Name</label>
                <p className="text-text">{creator.channelName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text/70">Description</label>
                <p className="text-text">{creator.description || 'No description'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text/70">Verified</label>
                <p className="text-text">{creator.verified ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text mb-4">Analytics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {dataStore.getTipCountForCreator(creator.id)}
                </div>
                <div className="text-sm text-text/60">Total Tips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {dataStore.getTotalTipsForCreator(creator.id).toFixed(2)}
                </div>
                <div className="text-sm text-text/60">Total ETH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

