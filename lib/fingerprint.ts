import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export async function getFingerprint() {
  const cookieStore = await cookies()
  let fingerprint = cookieStore.get('fingerprint')?.value

  if (!fingerprint) {
    fingerprint = uuidv4()
    cookieStore.set('fingerprint', fingerprint, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict'
    })
  }

  return fingerprint
} 