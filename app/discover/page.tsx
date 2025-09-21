'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { ContentCard } from '@/components/ContentCard';
import { CreatorProfileCard } from '@/components/CreatorProfileCard';
import { Search, Filter, TrendingUp, Clock, Heart } from 'lucide-react';
import { ContentItem, Creator } from '@/lib/types';
import { generateMockData } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function DiscoverPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [isLoading, setIsLoading] = useState(true);

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'popular', label: 'Popular', icon: Heart },
  ];

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const { mockContentItems, mockCreators } = generateMockData();
      setContentItems(mockContentItems);
      setCreators(mockCreators);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleTip = async (contentId: string, amount: number, currency: string) => {
    console.log(`Tipping ${amount} ${currency} to content ${contentId}`);
    alert(`Successfully tipped ${amount} ${currency}!`);
  };

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <AppShell currentPage="discover">
        <div className="container py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-surface rounded-lg"></div>
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-surface rounded-lg flex-1"></div>
              ))}
            </div>
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
    <AppShell currentPage="discover">
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Discover Content</h1>
          <p className="text-text/70">
            Find amazing creators and content to support
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text/50" />
          <input
            type="text"
            placeholder="Search creators, content, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200',
                  activeFilter === filter.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text/60 hover:text-text hover:bg-surface/80'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Creators Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Featured Creators</h2>
          <div className="grid grid-cols-1 gap-4">
            {creators.slice(0, 3).map((creator) => (
              <CreatorProfileCard
                key={creator.userId}
                creator={creator}
                variant="compact"
              />
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {activeFilter === 'trending' && 'Trending Content'}
              {activeFilter === 'recent' && 'Recent Content'}
              {activeFilter === 'popular' && 'Popular Content'}
            </h2>
            <button className="flex items-center space-x-1 text-sm text-text/60 hover:text-text transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-text/50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No content found</h3>
              <p className="text-text/60">
                Try adjusting your search or browse our featured creators
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredContent.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  variant="tipable"
                  onTip={handleTip}
                />
              ))}
            </div>
          )}
        </section>

        {/* Load More */}
        {filteredContent.length > 0 && (
          <div className="text-center pt-6">
            <button className="px-6 py-3 bg-surface border border-white/10 text-text rounded-lg font-medium hover:bg-surface/80 transition-colors duration-200">
              Load More Content
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
