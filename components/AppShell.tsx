'use client';

import { useState } from 'react';
import { Home, Search, User, Settings, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'home' | 'discover' | 'profile' | 'builder';

interface AppShellProps {
  children: React.ReactNode;
  currentPage?: TabType;
}

export function AppShell({ children, currentPage = 'home' }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<TabType>(currentPage);

  const navItems: { id: TabType; icon: any; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'builder', icon: Zap, label: 'Builder' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">TipSpark</h1>
          </div>
          
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10">
        <div className="container">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200',
                    isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-text/60 hover:text-text hover:bg-white/5'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
