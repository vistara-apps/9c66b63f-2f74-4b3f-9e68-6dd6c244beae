'use client';

import { cn } from '@/lib/utils';

interface ButtonPrimaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function ButtonPrimary({ 
  variant = 'default', 
  size = 'md',
  className,
  children,
  ...props 
}: ButtonPrimaryProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50',
        {
          'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl': variant === 'default',
          'bg-surface text-text border border-white/10 hover:bg-surface/80 hover:border-white/20': variant === 'secondary',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
