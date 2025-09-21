import { ContentItem, Creator, User } from '@/types'
import { formatDate } from '@/lib/utils'
import { Heart, Share2 } from 'lucide-react'

interface ContentCardProps {
  contentItem: ContentItem
  creator: Creator
  user: User
  variant?: 'tipable' | 'viewable'
  onTip?: (contentId: string) => void
  onShare?: (contentId: string) => void
}

export function ContentCard({
  contentItem,
  creator,
  user,
  variant = 'tipable',
  onTip,
  onShare
}: ContentCardProps) {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {user.profilePicUrl && (
            <img
              src={user.profilePicUrl}
              alt={creator.channelName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold text-text">{creator.channelName}</h4>
            <p className="text-sm text-text/60">@{user.farcasterId}</p>
          </div>
        </div>
        <span className="text-sm text-text/50">
          {formatDate(contentItem.creationDate)}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text mb-2">
          {contentItem.title}
        </h3>
        {contentItem.description && (
          <p className="text-text/80 mb-4">{contentItem.description}</p>
        )}

        {contentItem.embedUrl && (
          <div className="mb-4">
            {contentItem.contentType === 'image' && (
              <img
                src={contentItem.embedUrl}
                alt={contentItem.title}
                className="w-full rounded-lg object-cover max-h-96"
              />
            )}
            {contentItem.contentType === 'video' && (
              <video
                src={contentItem.embedUrl}
                controls
                className="w-full rounded-lg max-h-96"
              />
            )}
            {contentItem.contentType === 'link' && (
              <a
                href={contentItem.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                {contentItem.embedUrl}
              </a>
            )}
          </div>
        )}
      </div>

      {variant === 'tipable' && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onTip?.(contentItem.id)}
            className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Heart className="w-4 h-4" />
            Tip Creator
          </button>
          <button
            onClick={() => onShare?.(contentItem.id)}
            className="flex items-center gap-2 bg-surface text-text px-4 py-2 rounded-lg hover:bg-surface/80 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      )}
    </div>
  )
}

