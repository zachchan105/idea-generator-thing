import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Startup Ideas
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Vote for Today's Idea
          </Button>
        </div>
      </div>
    </header>
  );
} 