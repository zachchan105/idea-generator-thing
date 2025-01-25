import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function POST(request: Request) {
  try {
    const { secret } = await request.json()
    
    // Validate secret
    if (secret !== process.env.MANUAL_GENERATION_SECRET) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid secret'
      }, { status: 401 })
    }

    // Get all keys
    const keys = await redis.keys('*')
    
    // Delete all keys
    if (keys.length > 0) {
      await redis.del(keys)
    }

    return NextResponse.json({ 
      success: true,
      message: `Reset complete. Deleted ${keys.length} keys.`
    })
  } catch (error) {
    console.error('Error during reset:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to reset database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 