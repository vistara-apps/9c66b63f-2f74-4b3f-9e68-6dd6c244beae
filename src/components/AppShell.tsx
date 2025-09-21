import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">TipSpark</h1>
          <p className="text-lg text-text/80">Spark joy with personalized content tips</p>
        </header>
        <main className="space-y-8">
          {children}
        </main>
      </div>
    </div>
  )
}

