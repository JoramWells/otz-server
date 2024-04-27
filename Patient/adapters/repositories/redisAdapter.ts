import { createClient } from 'redis'

export class RedisAdapter {
  private readonly redisClient: any
  constructor () {
    this.redisClient = createClient({ url: 'redis://redis:6379' })
  }

  //   connect to redis client
  async connect (): Promise<string | null> {
    return this.redisClient.connect()
  }

  async get (key: string): Promise<string | null> {
    return this.redisClient.get(key)
  }

  async set (key: string, value: string): Promise<void> {
    this.redisClient.set(key, value)
  }
//   find: () => Promise<Patient[]>
//   findById: (id: string) => Promise<Patient>
}
