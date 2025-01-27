import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_SECRET!,
  baseURL: process.env.DEEPSEEK_API_URL
})

function parseDeepseekResponse(content: string) {
  try {
    // Remove Markdown code block formatting if present
    const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(cleanedContent)
  } catch (error) {
    console.error('Failed to parse Deepseek response:', error)
    throw new Error('Invalid response format from Deepseek')
  }
}

export async function POST(request: Request) {
  try {
    // Read body once and store in variable
    const body = await request.json()
    const { prompt, secret } = body
    
    // Validate secret
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid secret'
      }, { status: 401 })
    }

    // Get existing ideas to prevent duplicates
    const ideaKeys = await redis.keys('idea:*')
    const existingIdeas = await Promise.all(
      ideaKeys.slice(-10).map(async (key) => {
        const idea = await redis.get(key)
        return JSON.parse(idea!)
      })
    )
    const existingTitles = existingIdeas.map(idea => idea.title).join('\n')

    console.log('Starting idea generation...')
    
    const completion = await deepseek.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL!,
      messages: [
        {
          role: "system",
          content: process.env.DEEPSEEK_SYSTEM_INSTRUCTION!
        },
        {
          role: "user",
          content: `Here are the last 10 ideas we've generated:\n${existingTitles}\n\n${prompt || process.env.DEEPSEEK_USER_PROMPT!}`
        }
      ]
    })

    console.log('Deepseek response:', completion)

    if (!completion?.choices?.[0]?.message?.content) {
      console.error('Invalid completion format:', completion)
      throw new Error('Invalid response format from Deepseek')
    }

    const idea = parseDeepseekResponse(completion.choices[0].message.content)
    idea.model = process.env.DEEPSEEK_MODEL
    idea.createdAt = new Date().toISOString()
    idea.upvotes = 0
    idea.downvotes = 0

    console.log('Generated idea:', idea)

    // Store in Redis
    await redis.set(`idea:${idea.createdAt}`, JSON.stringify(idea))

    return NextResponse.json({ 
      success: true,
      idea
    })
  } catch (error) {
    console.error('Error generating idea:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to generate idea',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 