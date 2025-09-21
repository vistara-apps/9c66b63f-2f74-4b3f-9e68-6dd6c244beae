export interface User {
  farcasterId: string;
  walletAddress?: string;
  bio?: string;
  profilePicUrl?: string;
  createdAt: Date;
}

export interface Creator {
  userId: string;
  channelName: string;
  description: string;
  socialLinks: string[];
  verified: boolean;
  user: User;
}

export interface ContentItem {
  id: string;
  creatorId: string;
  contentUrl: string;
  contentType: 'video' | 'image' | 'text' | 'audio';
  title: string;
  description: string;
  creationDate: Date;
  embedUrl?: string;
  creator: Creator;
  tips: Tip[];
  totalTips: number;
}

export interface Tip {
  tipId: string;
  tipsterUserId: string;
  contentItemId: string;
  amount: number;
  currency: 'ETH' | 'USDC';
  transactionHash?: string;
  timestamp: Date;
  user: User;
  contentItem: ContentItem;
}

export interface TipFormData {
  amount: number;
  currency: 'ETH' | 'USDC';
  message?: string;
}

export interface CreatorProfile {
  creator: Creator;
  contentItems: ContentItem[];
  totalEarnings: number;
  totalTips: number;
}
