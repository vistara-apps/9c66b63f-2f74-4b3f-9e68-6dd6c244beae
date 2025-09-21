import { User, Creator, ContentItem, Tip } from '@/types'

// Mock data store - in production, this would be a database
class DataStore {
  private users: Map<string, User> = new Map()
  private creators: Map<string, Creator> = new Map()
  private contentItems: Map<string, ContentItem> = new Map()
  private tips: Map<string, Tip> = new Map()

  // Initialize with some mock data
  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    // Mock users
    const user1: User = {
      farcasterId: 'alice',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      bio: 'Content creator passionate about tech and art',
      profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
      createdAt: new Date('2024-01-01')
    }

    const user2: User = {
      farcasterId: 'bob',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44f',
      bio: 'Digital artist and NFT collector',
      profilePicUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      createdAt: new Date('2024-01-15')
    }

    this.users.set(user1.farcasterId, user1)
    this.users.set(user2.farcasterId, user2)

    // Mock creators
    const creator1: Creator = {
      id: 'creator-1',
      userId: user1.farcasterId,
      channelName: 'Alice Tech',
      description: 'Exploring the intersection of technology and creativity',
      socialLinks: {
        twitter: 'https://twitter.com/alicetech',
        website: 'https://alicetech.com'
      },
      verified: true,
      createdAt: new Date('2024-01-01')
    }

    const creator2: Creator = {
      id: 'creator-2',
      userId: user2.farcasterId,
      channelName: 'Bob Art',
      description: 'Digital art and NFT creations',
      socialLinks: {
        twitter: 'https://twitter.com/bobart'
      },
      verified: false,
      createdAt: new Date('2024-01-15')
    }

    this.creators.set(creator1.id, creator1)
    this.creators.set(creator2.id, creator2)

    // Mock content items
    const content1: ContentItem = {
      id: 'content-1',
      creatorId: creator1.id,
      contentUrl: 'https://example.com/post/1',
      contentType: 'text',
      title: 'The Future of Web3 Content Creation',
      description: 'Exploring how blockchain technology is revolutionizing content creation and monetization.',
      creationDate: new Date('2024-09-01')
    }

    const content2: ContentItem = {
      id: 'content-2',
      creatorId: creator2.id,
      contentUrl: 'https://example.com/art/1',
      contentType: 'image',
      title: 'Digital Dreamscape #001',
      description: 'A journey through algorithmic art and generative design.',
      embedUrl: 'https://picsum.photos/800/600?random=1',
      creationDate: new Date('2024-09-05')
    }

    this.contentItems.set(content1.id, content1)
    this.contentItems.set(content2.id, content2)
  }

  // User methods
  getUser(farcasterId: string): User | undefined {
    return this.users.get(farcasterId)
  }

  createUser(user: User): User {
    this.users.set(user.farcasterId, user)
    return user
  }

  // Creator methods
  getCreator(id: string): Creator | undefined {
    return this.creators.get(id)
  }

  getCreators(): Creator[] {
    return Array.from(this.creators.values())
  }

  getCreatorByUserId(userId: string): Creator | undefined {
    return Array.from(this.creators.values()).find(c => c.userId === userId)
  }

  createCreator(creator: Creator): Creator {
    this.creators.set(creator.id, creator)
    return creator
  }

  // Content methods
  getContentItem(id: string): ContentItem | undefined {
    return this.contentItems.get(id)
  }

  getContentItems(): ContentItem[] {
    return Array.from(this.contentItems.values())
  }

  getContentItemsByCreator(creatorId: string): ContentItem[] {
    return Array.from(this.contentItems.values()).filter(c => c.creatorId === creatorId)
  }

  createContentItem(contentItem: ContentItem): ContentItem {
    this.contentItems.set(contentItem.id, contentItem)
    return contentItem
  }

  // Tip methods
  getTips(): Tip[] {
    return Array.from(this.tips.values())
  }

  getTipsByContentItem(contentItemId: string): Tip[] {
    return Array.from(this.tips.values()).filter(t => t.contentItemId === contentItemId)
  }

  getTipsByCreator(creatorId: string): Tip[] {
    const creatorContent = this.getContentItemsByCreator(creatorId)
    const contentIds = creatorContent.map(c => c.id)
    return Array.from(this.tips.values()).filter(t => contentIds.includes(t.contentItemId))
  }

  createTip(tip: Tip): Tip {
    this.tips.set(tip.id, tip)
    return tip
  }

  // Analytics methods
  getTotalTipsForCreator(creatorId: string): number {
    const tips = this.getTipsByCreator(creatorId)
    return tips.reduce((sum, tip) => sum + tip.amount, 0)
  }

  getTipCountForCreator(creatorId: string): number {
    return this.getTipsByCreator(creatorId).length
  }
}

export const dataStore = new DataStore()

