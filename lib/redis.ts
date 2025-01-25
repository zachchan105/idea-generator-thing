import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL
})

redis.on('error', (err) => console.error('Redis Client Error', err))

// Connect to Redis
await redis.connect()

export { redis } 