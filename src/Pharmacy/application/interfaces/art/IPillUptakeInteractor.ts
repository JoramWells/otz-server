import { AdherenceAttributes } from "otz-types";

export interface IPillUptakeInteractor {
  createPillUptake: (data: AdherenceAttributes) => Promise<AdherenceAttributes>
  getAllPillUptakes: () => Promise<AdherenceAttributes[]>
  getPillUptakeById: (id: string) => Promise<AdherenceAttributes | null>
  getCurrentPillUptake: (id: string) => Promise<AdherenceAttributes | null>
  editPillUptake: (id: string, status: boolean, queryString: string) => Promise<AdherenceAttributes | null>
  getDailyPillUptakeCount: () => Promise<AdherenceAttributes | null>
}
