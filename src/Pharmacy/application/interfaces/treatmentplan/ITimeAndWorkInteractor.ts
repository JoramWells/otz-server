import { TimeAndWorkAttributes } from "otz-types";
import { TimeAndWorkResponseInterface } from "../../../entities/TimeAndWorkResponseInterface";

export interface ITimeAndWorkInteractor {
  createTimeAndWork: (
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes>;
  getAllTimeAndWork: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ) => Promise<TimeAndWorkResponseInterface | undefined | null>;
  getTimeAndWorkById: (
    id: string
  ) => Promise<TimeAndWorkAttributes | null | undefined>;
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
