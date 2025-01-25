import { redis } from '@/lib/redis'
import Link from "next/link";

async function getVisits() {
  try {
    const visits = await redis.incr('visits')
    return visits
  } catch (error) {
    console.error('Error incrementing visits:', error)
    return 0
  }
}

export async function Header() {
  const visits = await getVisits()

  return (
    <header className="bg-gradient-to-r from-green-600 to-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          IdeaGen
        </Link>
        <div className="flex gap-4 items-center">
          <div className="text-white text-sm bg-white/10 px-3 py-1 rounded-full">
            👀 {visits.toLocaleString()} views
          </div>
          {/* <Button variant="ghost" className="text-white hover:bg-white/10">
            Vote for Today's Idea
          </Button> */}
        </div>
      </div>
    </header>
  )
} 