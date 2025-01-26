import { redis } from "./redis"

export async function getIdeas(tag?: string) {
  const ideaKeys = await redis.keys('idea:*')
  const ideas = await Promise.all(
    ideaKeys.map(async (key) => {
      const idea = await redis.get(key)
      return JSON.parse(idea!)
    })
  )

  // Sort by date
  ideas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Filter by tag if provided
  if (tag) {
    return ideas.filter(idea => idea.tags.includes(tag))
  }

  return ideas
} 