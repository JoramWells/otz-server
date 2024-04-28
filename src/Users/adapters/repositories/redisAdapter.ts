import { createClient } from 'redis'

export class RedisAdapter {
  private readonly redisClient: any
  constructor () {
    this.redisClient = createClient({ url: 'redis://redis:6379' })
  }

  //   connect to redis client
  async connect (): Promise<string> {
    this.redisClient.on('error', (error: any) => {
      console.log('Redis Client Error', error)
    })

    return this.redisClient.connect()
  }

  async disconnect (): Promise<string> {
    return this.redisClient.disconnect()
  }

  async get (key: string): Promise<string | null> {
    return this.redisClient.get(key)
  }

  // async getById (id: string): Promise<string | null> {
  //   return
  // }

  async set (key: string, value: string): Promise<void> {
    this.redisClient.set(key, value)
  }

  //   find: () => Promise<Patient[]>
  //   findById: (id: string) => Promise<Patient>
}
