export interface Idea {
  id: string;
  title: string;
  description: string;
  votes: number;
  createdAt: Date;
  tags: string[];
}

export const dummyIdeas: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Micro SaaS Generator",
    description: "Platform that creates fully functional SaaS products based on user needs, complete with monetization setup.",
    votes: 142,
    createdAt: new Date(),
    tags: ["AI", "SaaS", "Automation"]
  },
  {
    id: "2",
    title: "No-Code API Marketplace",
    description: "Create and sell APIs without coding. Think Shopify for APIs with built-in monetization and analytics.",
    votes: 98,
    createdAt: new Date(),
    tags: ["API", "No-Code", "Monetization"]
  },
  {
    id: "3",
    title: "AI Content Monetization Platform",
    description: "Automatically repurpose and monetize content across platforms (YouTube to TikTok, Blog to Newsletter, etc.)",
    votes: 87,
    createdAt: new Date(),
    tags: ["AI", "Content", "Monetization"]
  },
  {
    id: "4",
    title: "AI-Powered Niche Finder",
    description: "Tool that identifies profitable niches with low competition using AI and market data analysis.",
    votes: 112,
    createdAt: new Date(),
    tags: ["AI", "Market Research", "Entrepreneurship"]
  },
  {
    id: "5",
    title: "One-Click Affiliate System",
    description: "Automated affiliate marketing platform that creates and manages campaigns with AI-optimized content.",
    votes: 76,
    createdAt: new Date(),
    tags: ["Marketing", "AI", "Affiliate"]
  },
  {
    id: "6",
    title: "AI-Powered Code Monetizer",
    description: "Automatically package and sell your code snippets, components, and libraries as products.",
    votes: 134,
    createdAt: new Date(),
    tags: ["AI", "Code", "Monetization"]
  }
]; 