'use client';

import { cn } from '@/lib/utils';
import { Zap, Share } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'tip' | 'share';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ 
  variant = 'tip', 
  size = 'md',
  className,
  ...props 
}: IconButtonProps) {
  const Icon = variant === 'tip' ? Zap : Share;
  
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50',
        {
          'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl': variant === 'tip',
          'bg-surface text-text hover:bg-surface/80 border border-white/10 hover:border-white/20': variant === 'share',
        },
        {
          'w-8 h-8': size === 'sm',
          'w-10 h-10': size === 'md',
          'w-12 h-12': size === 'lg',
        },
        className
      )}
      {...props}
    >
      <Icon className={cn(
        {
          'w-3 h-3': size === 'sm',
          'w-4 h-4': size === 'md',
          'w-5 h-5': size === 'lg',
        }
      )} />
    </button>
  );
}
