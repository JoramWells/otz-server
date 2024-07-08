import { createClient } from 'redis'

export class RedisAdapter {
  private readonly redisClient: any
  constructor () {
    this.redisClient = createClient({ url: 'redis://redis:6379' })
  }

  //   connect to redis client
  async connect (): Promise<void> {
    // await this.redisClient.on('error', (error: any) => {
    //   console.log('Redis Client Error', error)
    // })

    // this.redisClient.on('connect', err=>{
    //   consol
    // })

    // if(await this.redisClient.connected){
    //   return null
    // }

    if(!this.redisClient.isOpen){
     await this.redisClient
       .connect()
       .then((res: Response) => {
         console.log("connected to redis server");
       })
       .catch((err: Error) => console.log(err));
    }


  }

  async disconnect (): Promise<string> {
      return this.redisClient.disconnect();
  }

  async get (key: string): Promise<string | null> {
 
    await this.connect()
    return await this.redisClient.get(key);

  }

  async del(key: string): Promise<string | null>{
     await this.connect();
    return this.redisClient.del(key)
  }

  // async getById (id: string): Promise<string | null> {
  //   return
  // }

  async set (key: string, value: string): Promise<void> {
    await this.connect();
    await this.redisClient.set(key, value)
  }

  //   find: () => Promise<Patient[]>
  //   findById: (id: string) => Promise<Patient>
}
