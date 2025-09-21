export interface User {
  farcasterId: string;
  walletAddress: string;
  bio?: string;
  profilePicUrl?: string;
  createdAt: Date;
}

export interface Creator {
  id: string;
  userId: string;
  channelName: string;
  description?: string;
  socialLinks?: Record<string, string>;
  verified: boolean;
  createdAt: Date;
}

export interface ContentItem {
  id: string;
  creatorId: string;
  contentUrl: string;
  contentType: 'image' | 'video' | 'text' | 'link';
  title: string;
  description?: string;
  embedUrl?: string;
  creationDate: Date;
}

export interface Tip {
  id: string;
  tipId: string;
  tipsterUserId: string;
  contentItemId: string;
  amount: number;
  currency: string;
  transactionHash: string;
  timestamp: Date;
}

export interface TipRequest {
  contentItemId: string;
  amount: number;
  message?: string;
}

export interface CreatorProfile {
  creator: Creator;
  user: User;
  contentItems: ContentItem[];
  totalTips: number;
  tipCount: number;
}

