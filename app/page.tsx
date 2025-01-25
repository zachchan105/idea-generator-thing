import { dummyIdeas } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left Column */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Startup Ideas for Makers
          </h1>
          <p className="text-2xl text-gray-600 leading-relaxed">
            A collection of tech ideas for builders and tinkerers. These are concepts 
            I think could be fun to prototype and might actually work in the real world. 
            Some are AI-powered, others are just clever hacks - all are meant to inspire.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Share Your Idea</Button>
            <Button size="lg" variant="outline">How This Works</Button>
          </div>
        </div>

        {/* Right Column - Personal Intro */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold mb-6">Hey, I'm Zach</h2>
          <div className="space-y-4 text-lg text-gray-600">
            <p>
              I'm Zach Price - a software enthusiast and maker who loves using code to prototype 
              innovative ideas. I've had the chance to work on exciting crypto projects like 
              Meowcoin and Telestai, focusing on building simple, effective, and informative 
              products.
            </p>
            <p>
              What draws me to crypto is its "wild west" vibe—a space where finance and 
              connectivity evolve rapidly. Along the way, I've met some incredible people 
              who inspire me to keep creating.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyIdeas.map((idea) => (
          <Card key={idea.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{idea.title}</CardTitle>
              <CardDescription>{idea.description}</CardDescription>
              <div className="flex gap-2 mt-2 flex-wrap">
                {idea.tags.map((tag) => (
                  <Badge variant="outline" key={tag}>{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <Button variant="outline">
                <ThumbsUp className="mr-2 h-4 w-4" />
                {idea.votes} Votes
              </Button>
              <span className="text-sm text-gray-500">
                {new Date(idea.createdAt).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
