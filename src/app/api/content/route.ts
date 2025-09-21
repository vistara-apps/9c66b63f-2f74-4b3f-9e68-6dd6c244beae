import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/store'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const creatorId = searchParams.get('creatorId')

    let contentItems
    if (creatorId) {
      contentItems = dataStore.getContentItemsByCreator(creatorId)
    } else {
      contentItems = dataStore.getContentItems()
    }

    // Enrich with creator and user data
    const enrichedContent = contentItems.map(contentItem => {
      const creator = dataStore.getCreator(contentItem.creatorId)
      const user = creator ? dataStore.getUser(creator.userId) : null

      return {
        ...contentItem,
        creator,
        user
      }
    })

    return NextResponse.json(enrichedContent)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { creatorId, contentUrl, contentType, title, description, embedUrl } = body

    if (!creatorId || !title || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const contentItem = {
      id: `content-${Date.now()}`,
      creatorId,
      contentUrl,
      contentType,
      title,
      description,
      embedUrl,
      creationDate: new Date()
    }

    const created = dataStore.createContentItem(contentItem)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    )
  }
}
