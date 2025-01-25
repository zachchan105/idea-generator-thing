import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { ideaId, type, fingerprint } = await request.json()
  
  // Validate vote type
  if (!['upvote', 'downvote'].includes(type)) {
    return NextResponse.json({ 
      error: 'Invalid vote type. Please try again.' 
    }, { status: 400 })
  }

  // Check if user has already voted
  const hasVoted = await redis.get(`vote:${fingerprint}:${ideaId}`)
  if (hasVoted) {
    return NextResponse.json({ 
      error: 'You have already voted on this idea.' 
    }, { status: 400 })
  }

  try {
    // Get current idea data - use the exact ideaId from the request
    const ideaKey = `idea:${ideaId}`
    const ideaData = await redis.get(ideaKey)
    
    if (!ideaData) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 })
    }

    const idea = JSON.parse(ideaData)
    
    // Initialize counts if they don't exist
    idea.upvotes = Number(idea.upvotes) || 0
    idea.downvotes = Number(idea.downvotes) || 0

    // Update vote counts
    if (type === 'upvote') {
      idea.upvotes = idea.upvotes + 1
    } else {
      idea.downvotes = idea.downvotes + 1
    }

    // Save updated idea
    await redis.set(ideaKey, JSON.stringify(idea))

    // Store fingerprint to prevent duplicate votes
    await redis.set(`vote:${fingerprint}:${ideaId}`, type, { EX: 86400 })

    return NextResponse.json({ 
      success: true,
      newCount: type === 'upvote' ? idea.upvotes : idea.downvotes
    })
  } catch (error) {
    console.error('Error processing vote:', error)
    return NextResponse.json({ 
      error: 'Failed to process vote',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 