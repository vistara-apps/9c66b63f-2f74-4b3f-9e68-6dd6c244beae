import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'tip' | 'share'
}

export function IconButton({
  children,
  variant = 'tip',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'text-primary hover:bg-primary/10 focus:ring-primary': variant === 'tip',
          'text-text hover:bg-surface focus:ring-surface': variant === 'share'
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

