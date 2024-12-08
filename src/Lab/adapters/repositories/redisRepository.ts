import { type RedisAdapter } from './redisAdapter'

export class RedisRepository {
  private readonly adapter: RedisAdapter

  constructor (adapter: RedisAdapter) {
    this.adapter = adapter
  }

  async getAllPatients (): Promise<string | null> {
    return await this.adapter.get('patientData')
  }

  async cacheAllPatientData (data: string): Promise<void> {
    await this.adapter.set('patientData', data)
  }
}
