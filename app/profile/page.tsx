'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { ContentCard } from '@/components/ContentCard';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { Settings, Wallet, TrendingUp, Users, Zap, Edit } from 'lucide-react';
import { ContentItem, User } from '@/lib/types';
import { generateMockData, formatCurrency } from '@/lib/utils';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userContent, setUserContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalTips: 0,
    totalContent: 0,
    followers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const { mockUsers, mockContentItems } = generateMockData();
      
      // Simulate current user
      const currentUser = mockUsers[0];
      const userContentItems = mockContentItems.filter(item => item.creatorId === currentUser.farcasterId);
      
      setUser(currentUser);
      setUserContent(userContentItems);
      setStats({
        totalEarnings: 0.125, // ETH
        totalTips: 35,
        totalContent: userContentItems.length,
        followers: 142,
      });
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <AppShell currentPage="profile">
        <div className="container py-6">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-surface rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-surface rounded w-32"></div>
                <div className="h-4 bg-surface rounded w-24"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-surface rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!user) {
    return (
      <AppShell currentPage="profile">
        <div className="container py-6 text-center">
          <p className="text-text/60">Please connect your wallet to view your profile</p>
          <ButtonPrimary className="mt-4">
            Connect Wallet
          </ButtonPrimary>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="profile">
      <div className="container py-6 space-y-6">
        {/* Profile Header */}
        <div className="glass-effect rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.profilePicUrl || '/placeholder-avatar.png'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-2">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Creator Profile</h1>
                <p className="text-text/60">@creator{user.farcasterId}</p>
                <p className="text-sm text-text/70 mt-1">{user.bio}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Wallet Info */}
          <div className="flex items-center space-x-2 p-3 bg-surface rounded-lg">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Wallet Connected</span>
            <span className="text-sm text-text/60">
              {user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Total Earnings</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalEarnings} ETH</div>
            <div className="text-sm text-text/60">
              ≈ {formatCurrency(stats.totalEarnings * 2500, 'USD')}
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Tips Received</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalTips}</div>
            <div className="text-sm text-text/60">This month</div>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Followers</span>
            </div>
            <div className="text-2xl font-bold">{stats.followers}</div>
            <div className="text-sm text-text/60">+12 this week</div>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Settings className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Content Items</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalContent}</div>
            <div className="text-sm text-text/60">Published</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Tips</h2>
          <div className="space-y-3">
            {[
              { amount: 0.005, currency: 'ETH', from: 'alice.eth', time: '2 hours ago' },
              { amount: 10, currency: 'USDC', from: 'bob.base', time: '5 hours ago' },
              { amount: 0.001, currency: 'ETH', from: 'charlie.fc', time: '1 day ago' },
            ].map((tip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{tip.from}</p>
                    <p className="text-sm text-text/60">{tip.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">+{tip.amount} {tip.currency}</p>
                  {tip.currency === 'ETH' && (
                    <p className="text-sm text-text/60">
                      ≈ {formatCurrency(tip.amount * 2500, 'USD')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Content</h2>
            <ButtonPrimary variant="secondary" size="sm">
              Create New
            </ButtonPrimary>
          </div>
          
          {userContent.length === 0 ? (
            <div className="glass-effect rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-text/50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No content yet</h3>
              <p className="text-text/60 mb-4">
                Start creating content to earn tips from your audience
              </p>
              <ButtonPrimary>
                Create Your First Content
              </ButtonPrimary>
            </div>
          ) : (
            <div className="space-y-6">
              {userContent.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  variant="viewable"
                />
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="glass-effect rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
              <span>Notification Preferences</span>
              <Settings className="w-5 h-5 text-text/50" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
              <span>Privacy Settings</span>
              <Settings className="w-5 h-5 text-text/50" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
              <span>Wallet Management</span>
              <Wallet className="w-5 h-5 text-text/50" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
