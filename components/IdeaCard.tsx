'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useToast } from '@/hooks/use-toast'

interface Idea {
  title: string
  description: string
  tags: string[]
  model?: string
  createdAt: string
  upvotes?: number
  downvotes?: number
}

export default function IdeaCard({ idea }: { idea: Idea }) {
  const [upvotes, setUpvotes] = useState(Number(idea.upvotes) || 0)
  const [downvotes, setDownvotes] = useState(Number(idea.downvotes) || 0)
  const { toast } = useToast()

  const handleVote = async (type: 'upvote' | 'downvote') => {
    try {
      // Get fingerprint
      const fingerprintResponse = await fetch('/api/fingerprint')
      if (!fingerprintResponse.ok) {
        throw new Error('Failed to get fingerprint')
      }
      const { fingerprint } = await fingerprintResponse.json()

      // Send vote
      const voteResponse = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ideaId: new Date(idea.createdAt).toISOString(),
          type,
          fingerprint
        })
      })

      if (!voteResponse.ok) {
        const errorData = await voteResponse.json()
        // Show toast without throwing error
        toast({
          variant: 'destructive',
          title: 'Vote failed',
          description: errorData.error || 'Failed to vote',
        })
        return // Exit the function
      }

      const result = await voteResponse.json()
      
      // Update state with the exact count from the server
      if (type === 'upvote') {
        setUpvotes(result.newCount)
      } else {
        setDownvotes(result.newCount)
      }

      toast({
        title: 'Vote recorded!',
        description: `Your ${type} was successfully counted.`,
      })
    } catch (error) {
      console.error('Error voting:', error)
      toast({
        variant: 'destructive',
        title: 'Vote failed',
        description: error instanceof Error ? error.message : 'Failed to vote',
      })
    }
  }

  // Convert createdAt to Date object if it's a string
  const createdAt = typeof idea.createdAt === 'string' 
    ? new Date(idea.createdAt) 
    : idea.createdAt

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{idea.title}</CardTitle>
        <CardDescription>{idea.description}</CardDescription>
        <div className="flex gap-2 mt-2 flex-wrap">
          {idea.tags.map((tag: string) => (
            <Badge variant="outline" key={tag}>{tag}</Badge>
          ))}
          {idea.model && (
            <Badge variant="secondary" className="ml-auto">
              {idea.model}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => handleVote('upvote')}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{upvotes}</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => handleVote('downvote')}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>{downvotes}</span>
          </Button>
        </div>
        <span className="text-sm text-gray-500">
          {createdAt.toLocaleDateString()}
        </span>
      </CardFooter>
    </Card>
  )
} 