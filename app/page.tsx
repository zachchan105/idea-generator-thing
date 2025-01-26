import { redis } from '@/lib/redis'
import IdeaCard from '@/components/IdeaCard'
import { BookOpen, Heart } from 'lucide-react'
import Link from 'next/link'

async function getIdeas(tag?: string) {
  try {
    const ideaKeys = await redis.keys('idea:*')
    const ideas = await Promise.all(
      ideaKeys.map(async (key) => {
        const idea = await redis.get(key)
        return JSON.parse(idea!)
      })
    )
    
    // Sort by timestamp (newest first)
    ideas.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Filter by tag if provided
    if (tag) {
      return ideas.filter(idea => idea.tags.includes(tag))
    }

    return ideas
  } catch (error) {
    console.error('Error fetching ideas:', error)
    return []
  }
}

export const revalidate = 0 // Disable caching

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const tag = Array.isArray(params.tag) 
    ? params.tag[0] 
    : params.tag
  const ideas = await getIdeas(tag)
  const allTags = Array.from(new Set(ideas.flatMap(idea => idea.tags)))

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-8">
            Startup Ideas for Makers
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
            A collection of tech ideas for builders and tinkerers. These are concepts 
            I think could be fun to prototype and might actually work in the real world. 
            Some are AI-powered, others are just clever hacks - all are meant to inspire.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
            This site uses AI to generate unique startup ideas, which you can explore, 
            upvote, and share. New ideas are added regularly, so check back often for 
            fresh inspiration!
          </p>
        </div>

        {/* Right Column - Personal Intro */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hey, I&apos;m Zach</h2>
          <div className="space-y-3 text-base md:text-lg text-gray-600">
            <p>
              I&apos;m Zach Price - a software enthusiast and maker who loves using code to prototype 
              a wide range of ideas. I&apos;ve had the chance to work on exciting crypto projects like 
              Meowcoin, Telestai, AIPG, and Helium. I focus on building simple, effective, and informative 
              products.
            </p>
            <p>
              What draws me to crypto is its &quot;wild west&quot; vibe—a space where finance and 
              connectivity evolve rapidly. Along the way, I&apos;ve met some incredible people 
              who inspire me to keep creating.
            </p>
          </div>

          {/* Links Section */}
          <div className="mt-4 pt-1">
            <div className="flex flex-row space-x-4">
              <a
                href="https://zachprice.info"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span>Read my blog</span>
              </a>
              <a
                href="https://patreon.com/ZachPrice"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-800 transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Support me on Patreon</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="my-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Filter by Tags</h3>
          {tag && (
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear Filters
            </Link>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tagItem => (
            <Link
              key={tagItem}
              href={`/?tag=${encodeURIComponent(tagItem)}`}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                tag === tagItem
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              {tagItem}
            </Link>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <IdeaCard key={idea.createdAt} idea={idea} />
        ))}
      </div>
    </main>
  )
}
