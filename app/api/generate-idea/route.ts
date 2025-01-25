import { redis } from '@/lib/redis'
import { deepseek } from '@/lib/deepseek'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get existing ideas to prevent duplicates
    const ideaKeys = await redis.keys('idea:*')
    const existingIdeas = await Promise.all(
      ideaKeys.slice(-10).map(async (key) => {
        const idea = await redis.get(key)
        return JSON.parse(idea!)
      })
    )
    const existingTitles = existingIdeas.map(idea => idea.title).join('\n')

    // Validate environment variables
    const systemInstruction = process.env.DEEPSEEK_SYSTEM_INSTRUCTION || ''
    const userPrompt = process.env.DEEPSEEK_USER_PROMPT || ''
    const model = process.env.DEEPSEEK_MODEL || ''

    if (!systemInstruction || !userPrompt || !model) {
      throw new Error('Missing required environment variables')
    }

    // Generate new idea with context of existing titles
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemInstruction
        },
        {
          role: "user",
          content: `Here are the last 10 ideas we've generated:\n${existingTitles}\n\n${userPrompt}`
        }
      ]
    })

    const idea = JSON.parse(completion.choices[0].message.content)
    idea.model = model
    idea.createdAt = new Date().toISOString()
    idea.upvotes = 0
    idea.downvotes = 0

    // Store in Redis with no expiration
    const timestamp = Date.now()
    await redis.set(`idea:${timestamp}`, JSON.stringify(idea))

    return NextResponse.json({ idea })
  } catch (error) {
    console.error('Error generating idea:', error)
    return NextResponse.json({ 
      error: 'Failed to generate idea',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 