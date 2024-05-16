import { type AllergiesInterface } from '../models/allergies.model'

export class AllergiesEntity implements AllergiesInterface {
  constructor (
    public id: string,
    public causativeAgent: string,
    public reaction: string
  ) {}
}
