import { TimeAndWorkAttributes } from "otz-types";

export interface ITimeAndWorkRepository {
  create: (data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes>;
  find: () => Promise<TimeAndWorkAttributes[]>;
  findById: (id: string) => Promise<TimeAndWorkAttributes | null>;
  findByPatientId: (id: string) => Promise<TimeAndWorkAttributes | null>;
  updateMorningSchedule: (id: string, data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes | null>;
  updateEveningSchedule: (id: string, data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes | null>;
  editSchedule: (id: string, data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes | null>;
}
