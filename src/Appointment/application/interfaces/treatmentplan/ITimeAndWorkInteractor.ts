import { TimeAndWorkEntity } from "../../../domain/entities/treatmentplan/TimeAndWorkEntity";

export interface ITimeAndWorkInteractor {
  createTimeAndWork: (data: TimeAndWorkEntity) => Promise<TimeAndWorkEntity>;
  getAllTimeAndWork: () => Promise<TimeAndWorkEntity[]>;
  getTimeAndWorkById: (id: string) => Promise<TimeAndWorkEntity | null>;
  updateMorningSchedule: (id: string, data: TimeAndWorkEntity) => Promise<TimeAndWorkEntity | null>;
  updateEveningSchedule: (id: string, data: TimeAndWorkEntity) => Promise<TimeAndWorkEntity | null>;
}
