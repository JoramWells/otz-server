import { AdherenceAttributes } from "otz-types";

export interface IPillUptakeRepository {
  create: (data: AdherenceAttributes) => Promise<AdherenceAttributes>
  find: () => Promise<AdherenceAttributes[]>
  findById: (id: string) => Promise<AdherenceAttributes | null>
  findCurrentPillUptake: (id: string) => Promise<AdherenceAttributes | null>
  edit: (id: string, status: boolean, queryString: string) => Promise<AdherenceAttributes | null>
  count: () => Promise<AdherenceAttributes | null>
}
