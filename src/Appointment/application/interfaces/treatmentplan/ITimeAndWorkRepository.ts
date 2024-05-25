import { TimeAndWorkEntity } from "../../../domain/entities/treatmentplan/TimeAndWorkEntity";

export interface ITimeAndWorkRepository {
  create: (data: TimeAndWorkEntity) => Promise<TimeAndWorkEntity>;
  find: () => Promise<TimeAndWorkEntity[]>;
  findById: (id: string) => Promise<TimeAndWorkEntity | null>;
  findByPatientId: (id: string) => Promise<TimeAndWorkEntity | null>;
  updateMorningSchedule: (id: string, data: TimeAndWorkEntity) => Promise<TimeAndWorkEntity | null>;
  updateEveningSchedule: (id: string, data: TimeAndWorkEntity) => Promise<TimeAndWorkEntity | null>;
}
