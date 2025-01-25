import { redis } from '@/lib/redis'
import IdeaCard from '@/components/IdeaCard'

async function getIdeas() {
  try {
    const ideaKeys = await redis.keys('idea:*')
    const ideas = await Promise.all(
      ideaKeys.map(async (key) => {
        const idea = await redis.get(key)
        return JSON.parse(idea!)
      })
    )
    
    // Sort by timestamp (newest first)
    return ideas.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error fetching ideas:', error)
    return []
  }
}

export default async function Home() {
  const ideas = await getIdeas()

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
        </div>

        {/* Right Column - Personal Intro */}
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hey, I&apos;m Zach</h2>
          <div className="space-y-3 text-base md:text-lg text-gray-600">
            <p>
              I&apos;m Zach Price - a software enthusiast and maker who loves using code to prototype 
              innovative ideas. I&apos;ve had the chance to work on exciting crypto projects like 
              Meowcoin and Telestai, focusing on building simple, effective, and informative 
              products.
            </p>
            <p>
              What draws me to crypto is its &quot;wild west&quot; vibe—a space where finance and 
              connectivity evolve rapidly. Along the way, I&apos;ve met some incredible people 
              who inspire me to keep creating.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <IdeaCard key={idea.createdAt} idea={idea} />
        ))}
      </div>
    </main>
  )
}
