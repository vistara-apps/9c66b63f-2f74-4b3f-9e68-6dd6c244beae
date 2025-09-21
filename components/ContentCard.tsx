'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share, Zap, Play, Music, FileText } from 'lucide-react';
import { ContentItem } from '@/lib/types';
import { cn, formatTimeAgo } from '@/lib/utils';
import { TipInputForm } from './TipInputForm';

interface ContentCardProps {
  content: ContentItem;
  variant?: 'tipable' | 'viewable';
  className?: string;
  onTip?: (contentId: string, amount: number, currency: string) => void;
}

export function ContentCard({ 
  content, 
  variant = 'tipable',
  className,
  onTip 
}: ContentCardProps) {
  const [showTipForm, setShowTipForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getContentIcon = () => {
    switch (content.contentType) {
      case 'video':
        return <Play className="w-6 h-6" />;
      case 'audio':
        return <Music className="w-6 h-6" />;
      case 'text':
        return <FileText className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const handleTipSubmit = (amount: number, currency: string) => {
    onTip?.(content.id, amount, currency);
    setShowTipForm(false);
  };

  return (
    <div className={cn(
      'glass-effect rounded-lg overflow-hidden hover:shadow-card transition-all duration-200',
      className
    )}>
      {/* Content Media */}
      <div className="relative aspect-video bg-surface/50">
        <Image
          src={content.contentUrl}
          alt={content.title}
          fill
          className="object-cover"
        />
        
        {/* Content Type Overlay */}
        {content.contentType !== 'image' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-black/60 rounded-full p-3">
              {getContentIcon()}
            </div>
          </div>
        )}

        {/* Tip Count Badge */}
        {content.totalTips > 0 && (
          <div className="absolute top-3 right-3 bg-accent/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            {content.totalTips} tips
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text truncate">{content.title}</h3>
            <p className="text-sm text-text/60 line-clamp-2 mt-1">
              {content.description}
            </p>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Image
            src={content.creator.user.profilePicUrl || '/placeholder-avatar.png'}
            alt={content.creator.channelName}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm text-text/80">{content.creator.channelName}</span>
          <span className="text-xs text-text/50">•</span>
          <span className="text-xs text-text/50">
            {formatTimeAgo(content.creationDate)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                'flex items-center space-x-1 text-sm transition-colors duration-200',
                isLiked ? 'text-red-500' : 'text-text/60 hover:text-text'
              )}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
              <span>Like</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-text/60 hover:text-text transition-colors duration-200">
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </button>
            
            <button className="flex items-center space-x-1 text-sm text-text/60 hover:text-text transition-colors duration-200">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {variant === 'tipable' && (
            <button
              onClick={() => setShowTipForm(true)}
              className="flex items-center space-x-1 bg-accent text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              <Zap className="w-4 h-4" />
              <span>Tip</span>
            </button>
          )}
        </div>
      </div>

      {/* Tip Form Modal */}
      {showTipForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Tip {content.creator.channelName}</h3>
            <TipInputForm
              onSubmit={handleTipSubmit}
              onCancel={() => setShowTipForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
