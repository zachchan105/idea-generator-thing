import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Zach Price
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/zachchan105/idea-generator-thing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>Open Source on GitHub</span>
          </Link>
          
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Privacy
          </Link>
          
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
} 