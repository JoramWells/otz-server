import { TimeAndWorkAttributes } from "otz-types";

export interface ITimeAndWorkRepository {
  create: (data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes>;
  find: () => Promise<TimeAndWorkAttributes[]>;
  findById: (id: string) => Promise<TimeAndWorkAttributes | null>;
  findByPatientId: (id: string) => Promise<TimeAndWorkAttributes | null>;
  findByVisitId: (visitID: string) => Promise<TimeAndWorkAttributes | null | undefined>;
  updateMorningSchedule: (
    id: string,
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes | null>;
  updateEveningSchedule: (
    id: string,
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes | null>;
}
