const redis = require('redis')

export class RedisAdapter {
  private readonly client: any
  constructor () {
    this.client = redis.createClient({ url: 'redis://redis:6379' })
  }

  //   connect to redis client
  async connect () {
    await new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => { resolve() })
      this.client.on('error', (error: Error) => { reject(error) })
    })
  }

  async get (key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async set (key: string, value: string): Promise<void> {
    this.client.set(key, value)
  }
//   find: () => Promise<Patient[]>
//   findById: (id: string) => Promise<Patient>
}
