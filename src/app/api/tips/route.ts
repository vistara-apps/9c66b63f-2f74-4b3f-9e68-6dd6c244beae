import { NextRequest, NextResponse } from 'next/server'
import { dataStore } from '@/lib/store'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contentItemId = searchParams.get('contentItemId')
    const creatorId = searchParams.get('creatorId')

    let tips
    if (contentItemId) {
      tips = dataStore.getTipsByContentItem(contentItemId)
    } else if (creatorId) {
      tips = dataStore.getTipsByCreator(creatorId)
    } else {
      tips = dataStore.getTips()
    }

    return NextResponse.json(tips)
  } catch (error) {
    console.error('Error fetching tips:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tips' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tipsterUserId, contentItemId, amount, currency = 'ETH', transactionHash } = body

    if (!tipsterUserId || !contentItemId || !amount || !transactionHash) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify content item exists
    const contentItem = dataStore.getContentItem(contentItemId)
    if (!contentItem) {
      return NextResponse.json(
        { error: 'Content item not found' },
        { status: 404 }
      )
    }

    // Verify tipster user exists
    const tipsterUser = dataStore.getUser(tipsterUserId)
    if (!tipsterUser) {
      return NextResponse.json(
        { error: 'Tipster user not found' },
        { status: 404 }
      )
    }

    const tip = {
      id: `tip-${Date.now()}`,
      tipId: `tip-${Date.now()}`,
      tipsterUserId,
      contentItemId,
      amount: parseFloat(amount),
      currency,
      transactionHash,
      timestamp: new Date()
    }

    const created = dataStore.createTip(tip)
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating tip:', error)
    return NextResponse.json(
      { error: 'Failed to create tip' },
      { status: 500 }
    )
  }
}
