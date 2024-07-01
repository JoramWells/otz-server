import { TimeAndWorkAttributes } from "otz-types";

export interface ITimeAndWorkInteractor {
  createTimeAndWork: (data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes>;
  getAllTimeAndWork: () => Promise<TimeAndWorkAttributes[]>;
  getTimeAndWorkById: (id: string) => Promise<TimeAndWorkAttributes | null>;
  getTimeAndWorkByPatientId: (id: string) => Promise<TimeAndWorkAttributes | null>;
  updateMorningSchedule: (id: string, data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes | null>;
  updateEveningSchedule: (id: string, data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes | null>;
}
