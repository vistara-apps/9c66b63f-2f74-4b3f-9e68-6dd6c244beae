import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary text-background hover:bg-primary/90 focus:ring-primary': variant === 'primary',
          'bg-surface text-text hover:bg-surface/80 focus:ring-surface': variant === 'secondary'
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

