import { UptakeEntity } from "../../../domain/entities/treatmentplan/UptakeEntity";

export interface IPillUptakeInteractor {
  createPillUptake: (data: UptakeEntity) => Promise<UptakeEntity>;
  getAllPillUptakes: () => Promise<UptakeEntity[]>;
  getPillUptakeById: (id: string) => Promise<UptakeEntity | null>;
  getDailyPillUptakeCount: () => Promise<UptakeEntity | null>;
}
