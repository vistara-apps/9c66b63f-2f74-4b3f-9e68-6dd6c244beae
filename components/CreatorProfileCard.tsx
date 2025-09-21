'use client';

import Image from 'next/image';
import { Badge, CheckCircle, ExternalLink } from 'lucide-react';
import { Creator } from '@/lib/types';
import { cn, formatAddress } from '@/lib/utils';

interface CreatorProfileCardProps {
  creator: Creator;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export function CreatorProfileCard({ 
  creator, 
  variant = 'compact',
  className 
}: CreatorProfileCardProps) {
  const isDetailed = variant === 'detailed';

  return (
    <div className={cn(
      'glass-effect rounded-lg p-4 hover:shadow-card transition-all duration-200',
      className
    )}>
      <div className="flex items-start space-x-3">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={creator.user.profilePicUrl || '/placeholder-avatar.png'}
            alt={creator.channelName}
            width={isDetailed ? 64 : 48}
            height={isDetailed ? 64 : 48}
            className="rounded-full object-cover"
          />
          {creator.verified && (
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Creator Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className={cn(
              'font-semibold text-text truncate',
              isDetailed ? 'text-lg' : 'text-base'
            )}>
              {creator.channelName}
            </h3>
            {creator.verified && (
              <Badge className="w-4 h-4 text-primary" />
            )}
          </div>
          
          <p className="text-sm text-text/60 truncate">
            {formatAddress(creator.user.walletAddress || '')}
          </p>

          {isDetailed && (
            <>
              <p className="text-sm text-text/80 mt-2 line-clamp-2">
                {creator.description}
              </p>
              
              {creator.socialLinks.length > 0 && (
                <div className="flex items-center space-x-2 mt-3">
                  {creator.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Social</span>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Follow Button (for detailed variant) */}
        {isDetailed && (
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
