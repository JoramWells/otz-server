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

  async disconnect () {
      await this.redisClient.quit();
      console.log('Disconnected from redis client!!')
  }

  async get (key: string): Promise<string | null> {
    if(await this.redisClient.connected){
      await this.redisClient.disconnect()
    }
    return await this.redisClient.get(key);

  }

  async del(key: string): Promise<string | null>{
     const status =  await this.redisClient.del(key)

        // if (await this.redisClient.connected) {
        //   await this.redisClient.disconnect();
        // }
     return status
  }

  // async getById (id: string): Promise<string | null> {
  //   return
  // }

  async set (key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);

    if(await this.redisClient.connected){
      await this.redisClient.disconnect()
    }
  }

  //   find: () => Promise<Patient[]>
  //   findById: (id: string) => Promise<Patient>
}
