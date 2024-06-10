import { createClient } from 'redis'

export class RedisAdapter {
  private readonly redisClient: any
  constructor () {
    this.redisClient = createClient({ url: 'redis://redis:6379' })
  }

  //   connect to redis client
  async connect (): Promise<string | null> {
    // await this.redisClient.on('error', (error: any) => {
    //   console.log('Redis Client Error', error)
    // })

    // this.redisClient.on('connect', err=>{
    //   consol
    // })

    // if(await this.redisClient.connected){
    //   return null
    // }

     await this.redisClient
       .connect()
       .then((res: Response)=>{
        console.log(res)
       })
       .catch((err: Error) => console.log(err));
     return null
  }

  async disconnect (): Promise<string> {
      return this.redisClient.disconnect();
  }

  async get (key: string): Promise<string | null> {
    if(await this.redisClient.connected){
      await this.redisClient.disconnect()
    }
    return await this.redisClient.get(key);

  }

  async del(key: string): Promise<string | null>{
    if (await this.redisClient.connected) {
          await this.redisClient.disconnect();
        }
    return this.redisClient.del(key)
  }

  // async getById (id: string): Promise<string | null> {
  //   return
  // }

  async set (key: string, value: string): Promise<void> {
    if(await this.redisClient.connected){
      await this.redisClient.disconnect()
    }
    await this.redisClient.set(key, value)
  }

  //   find: () => Promise<Patient[]>
  //   findById: (id: string) => Promise<Patient>
}
