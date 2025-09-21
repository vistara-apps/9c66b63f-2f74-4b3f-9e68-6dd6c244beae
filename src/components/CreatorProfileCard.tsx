import { Creator, User } from '@/types'
import { formatAddress } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface CreatorProfileCardProps {
  creator: Creator
  user: User
  totalTips: number
  tipCount: number
  variant?: 'compact' | 'detailed'
}

export function CreatorProfileCard({
  creator,
  user,
  totalTips,
  tipCount,
  variant = 'compact'
}: CreatorProfileCardProps) {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <div className="flex items-start gap-4">
        {user.profilePicUrl && (
          <img
            src={user.profilePicUrl}
            alt={creator.channelName}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-text">{creator.channelName}</h3>
            {creator.verified && <Badge variant="verified">Verified</Badge>}
          </div>

          <p className="text-text/70 mb-2">@{user.farcasterId}</p>
          <p className="text-sm text-text/60 mb-4">
            {formatAddress(user.walletAddress)}
          </p>

          {creator.description && (
            <p className="text-text/80 mb-4">{creator.description}</p>
          )}

          {variant === 'detailed' && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tipCount}</div>
                <div className="text-sm text-text/60">Tips Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{totalTips.toFixed(2)}</div>
                <div className="text-sm text-text/60">Total ETH</div>
              </div>
            </div>
          )}

          {creator.socialLinks && (
            <div className="flex gap-2">
              {Object.entries(creator.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors"
                >
                  {platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

