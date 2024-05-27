import { UptakeEntity } from "../../../domain/entities/treatmentplan/UptakeEntity";

export interface IPillUptakeInteractor {
  createPillUptake: (data: UptakeEntity) => Promise<UptakeEntity>;
  getAllPillUptakes: () => Promise<UptakeEntity[]>;
  getPillUptakeById: (id: string) => Promise<UptakeEntity | null>;
  editPillUptake: (id: string, status: boolean, queryString: ParsedQs) => Promise<UptakeEntity | null>;
  getDailyPillUptakeCount: () => Promise<UptakeEntity | null>;
}
