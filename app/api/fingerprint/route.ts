import { getFingerprint } from '@/lib/fingerprint'
import { NextResponse } from 'next/server'

export async function GET() {
  const fingerprint = await getFingerprint()
  return NextResponse.json({ fingerprint })
} 