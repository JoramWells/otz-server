import { createClient } from 'redis'

export class RedisAdapter {
  private readonly redisClient: any
  constructor () {
    this.redisClient = createClient({ url: 'redis://redis:6379' })
  }

  //   connect to redis client
  async connect (): Promise<string | null> {
    // this.redisClient.on('error', (error: any) => {
    //   console.log('Redis Client Error', error)
    // })

    await this.redisClient.connect().then((res: Response) => {
      console.log(res)
    })
      .catch((err: Error) => { console.log(err) })
    return null
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
