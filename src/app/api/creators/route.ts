import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/store'

export async function GET() {
  try {
    const creators = dataStore.getCreators()

    // Enrich with user data and analytics
    const enrichedCreators = creators.map(creator => {
      const user = dataStore.getUser(creator.userId)
      const totalTips = dataStore.getTotalTipsForCreator(creator.id)
      const tipCount = dataStore.getTipCountForCreator(creator.id)

      return {
        ...creator,
        user,
        totalTips,
        tipCount
      }
    })

    return NextResponse.json(enrichedCreators)
  } catch (error) {
    console.error('Error fetching creators:', error)
    return NextResponse.json(
      { error: 'Failed to fetch creators' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, channelName, description, socialLinks } = body

    if (!userId || !channelName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = dataStore.getUser(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if creator already exists
    const existingCreator = dataStore.getCreatorByUserId(userId)
    if (existingCreator) {
      return NextResponse.json(
        { error: 'Creator already exists for this user' },
        { status: 409 }
      )
    }

    const creator = {
      id: `creator-${Date.now()}`,
      userId,
      channelName,
      description,
      socialLinks,
      verified: false,
      createdAt: new Date()
    }

    const created = dataStore.createCreator(creator)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating creator:', error)
    return NextResponse.json(
      { error: 'Failed to create creator' },
      { status: 500 }
    )
  }
}
