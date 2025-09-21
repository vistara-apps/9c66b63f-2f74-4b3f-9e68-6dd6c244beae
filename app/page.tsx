'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { ContentCard } from '@/components/ContentCard';
import { CreatorProfileCard } from '@/components/CreatorProfileCard';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { Sparkles, TrendingUp, Users } from 'lucide-react';
import { ContentItem, Creator } from '@/lib/types';
import { generateMockData } from '@/lib/utils';

export default function HomePage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { mockContentItems, mockCreators } = generateMockData();
      setContentItems(mockContentItems);
      setFeaturedCreators(mockCreators.slice(0, 2));
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleTip = async (contentId: string, amount: number, currency: string) => {
    console.log(`Tipping ${amount} ${currency} to content ${contentId}`);
    // Here you would integrate with the actual tipping logic
    // For now, we'll just show a success message
    alert(`Successfully tipped ${amount} ${currency}!`);
  };

  if (isLoading) {
    return (
      <AppShell currentPage="home">
        <div className="container py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-surface rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="home">
      <div className="container py-6 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to TipSpark</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Spark joy with{' '}
            <span className="gradient-text">personalized content tips</span>
          </h1>
          <p className="text-lg text-text/70 mb-6 max-w-2xl mx-auto">
            Discover amazing creators and show your appreciation with crypto tips. 
            Support the content you love and help build a sustainable creator economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonPrimary size="lg" className="space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Start Tipping</span>
            </ButtonPrimary>
            <ButtonPrimary variant="secondary" size="lg">
              Become a Creator
            </ButtonPrimary>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-3 gap-4">
          <div className="glass-effect rounded-lg p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-text">1.2K</div>
            <div className="text-sm text-text/60">Tips Sent</div>
          </div>
          <div className="glass-effect rounded-lg p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg mx-auto mb-2">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div className="text-2xl font-bold text-text">350</div>
            <div className="text-sm text-text/60">Creators</div>
          </div>
          <div className="glass-effect rounded-lg p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg mx-auto mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-text">5.8K</div>
            <div className="text-sm text-text/60">Content Items</div>
          </div>
        </section>

        {/* Featured Creators */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Creators</h2>
            <ButtonPrimary variant="secondary" size="sm">
              View All
            </ButtonPrimary>
          </div>
          <div className="space-y-4">
            {featuredCreators.map((creator) => (
              <CreatorProfileCard
                key={creator.userId}
                creator={creator}
                variant="detailed"
              />
            ))}
          </div>
        </section>

        {/* Trending Content */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Trending Content</h2>
            <ButtonPrimary variant="secondary" size="sm">
              See More
            </ButtonPrimary>
          </div>
          <div className="space-y-6">
            {contentItems.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                variant="tipable"
                onTip={handleTip}
              />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="glass-effect rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to start tipping?</h3>
          <p className="text-text/70 mb-6">
            Connect your wallet and start supporting your favorite creators today.
          </p>
          <ButtonPrimary size="lg">
            Connect Wallet
          </ButtonPrimary>
        </section>
      </div>
    </AppShell>
  );
}
