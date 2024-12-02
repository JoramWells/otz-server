import { TimeAndWorkAttributes } from "otz-types";

export interface ITimeAndWorkInteractor {
  createTimeAndWork: (
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes>;
  getAllTimeAndWork: () => Promise<TimeAndWorkAttributes[]>;
  getTimeAndWorkById: (id: string) => Promise<TimeAndWorkAttributes | null | undefined>;
  getTimeAndWorkByPatientId: (
    id: string
  ) => Promise<TimeAndWorkAttributes | null>;
  getTimeAndWorkByVisitId: (
    id: string
  ) => Promise<TimeAndWorkAttributes | null | undefined>;
  updateMorningSchedule: (
    id: string,
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes | null>;
  updateEveningSchedule: (
    id: string,
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes | null>;
  updateSchedule: (
    id: string,
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes | null>;
  deleteTimeAndWork: (id: string) => Promise<number | null>;
}
