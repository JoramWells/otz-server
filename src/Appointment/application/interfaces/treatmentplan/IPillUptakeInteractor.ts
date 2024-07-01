import { UptakeAttributes } from "otz-types";

export interface IPillUptakeInteractor {
  createPillUptake: (data: UptakeAttributes) => Promise<UptakeAttributes>;
  getAllPillUptakes: () => Promise<UptakeAttributes[]>;
  getPillUptakeById: (id: string) => Promise<UptakeAttributes | null>;
  editPillUptake: (id: string, status: boolean, queryString: string) => Promise<UptakeAttributes | null>;
  getDailyPillUptakeCount: () => Promise<UptakeAttributes | null>;
}
