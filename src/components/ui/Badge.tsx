import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'verified' | 'primary'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        {
          'bg-surface text-text': variant === 'default',
          'bg-primary text-background': variant === 'primary',
          'bg-accent text-background': variant === 'verified'
        },
        className
      )}
    >
      {children}
    </span>
  )
}

