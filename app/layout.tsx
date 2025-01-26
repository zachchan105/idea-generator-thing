import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://idea-generator-thing.vercel.app'),
  title: {
    default: 'IdeaGen - AI-Powered Startup Ideas for Makers',
    template: '%s | IdeaGen'
  },
  description: 'Browse through AI-generated startup ideas for builders and tinkerers.',
  keywords: [
    'startup ideas',
    'AI-generated ideas',
    'tech concepts',
    'innovation',
    'maker projects',
    'prototyping',
    'AI-powered startups'
  ],
  authors: [{ name: 'Zach Price', url: 'https://idea-generator-thing.vercel.app' }],
  creator: 'Zach Price',
  publisher: 'Zach Price',
  openGraph: {
    title: 'IdeaGen - AI-Powered Startup Ideas for Makers',
    description: 'Browse through AI-generated startup ideas for builders and tinkerers.',
    url: 'https://idea-generator-thing.vercel.app',
    siteName: 'IdeaGen',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'IdeaGen - AI-Powered Startup Ideas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IdeaGen - AI-Powered Startup Ideas for Makers',
    description: 'Browse through AI-generated startup ideas for builders and tinkerers.',
    creator: '@zachprice',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://idea-generator-thing.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
