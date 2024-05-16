import { type AllergiesInterface } from '../models/allergies.model'

export class AllergiesEntity implements AllergiesInterface {
  constructor (
    public causativeAgent: string,
    public reaction: string,
    public id?: string
  ) {}
}
