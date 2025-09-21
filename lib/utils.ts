import { clsx, type ClassValue } from 'clsx';
import type { User, Creator, ContentItem } from './types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'ETH' ? 'USD' : currency,
    minimumFractionDigits: currency === 'ETH' ? 6 : 2,
    maximumFractionDigits: currency === 'ETH' ? 6 : 2,
  }).format(amount);
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}

export function generateMockData() {
  const mockUsers: User[] = [
    {
      farcasterId: '1',
      walletAddress: '0x1234567890123456789012345678901234567890',
      bio: 'Digital artist and content creator',
      profilePicUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=JD',
      createdAt: new Date('2024-01-15'),
    },
    {
      farcasterId: '2',
      walletAddress: '0x2345678901234567890123456789012345678901',
      bio: 'Tech educator and blockchain enthusiast',
      profilePicUrl: 'https://via.placeholder.com/100x100/7C3AED/FFFFFF?text=AS',
      createdAt: new Date('2024-02-01'),
    },
    {
      farcasterId: '3',
      walletAddress: '0x3456789012345678901234567890123456789012',
      bio: 'Music producer and NFT creator',
      profilePicUrl: 'https://via.placeholder.com/100x100/059669/FFFFFF?text=MK',
      createdAt: new Date('2024-01-20'),
    },
  ];

  const mockCreators: Creator[] = mockUsers.map((user, index) => ({
    userId: user.farcasterId,
    channelName: ['ArtFlow', 'TechTalks', 'BeatDrop'][index],
    description: user.bio || '',
    socialLinks: [`https://twitter.com/creator${index + 1}`],
    verified: index < 2,
    user,
  }));

  const mockContentItems: ContentItem[] = [
    {
      id: '1',
      creatorId: '1',
      contentUrl: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Digital+Art',
      contentType: 'image',
      title: 'Ethereal Landscapes #1',
      description: 'A mesmerizing digital landscape that captures the essence of dreams',
      creationDate: new Date('2024-03-01'),
      creator: mockCreators[0],
      tips: [],
      totalTips: 12,
    },
    {
      id: '2',
      creatorId: '2',
      contentUrl: 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Tech+Video',
      contentType: 'video',
      title: 'Understanding Smart Contracts',
      description: 'A comprehensive guide to smart contract development on Base',
      creationDate: new Date('2024-03-05'),
      creator: mockCreators[1],
      tips: [],
      totalTips: 8,
    },
    {
      id: '3',
      creatorId: '3',
      contentUrl: 'https://via.placeholder.com/400x300/059669/FFFFFF?text=Music+Track',
      contentType: 'audio',
      title: 'Cosmic Vibes',
      description: 'An ambient electronic track perfect for coding sessions',
      creationDate: new Date('2024-03-03'),
      creator: mockCreators[2],
      tips: [],
      totalTips: 15,
    },
  ];

  return { mockUsers, mockCreators, mockContentItems };
}
