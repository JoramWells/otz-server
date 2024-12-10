import { TimeAndWorkAttributes } from "otz-types";
import { TimeAndWorkResponseInterface } from "../../../entities/TimeAndWorkResponseInterface";

export interface ITimeAndWorkRepository {
  create: (data: TimeAndWorkAttributes) => Promise<TimeAndWorkAttributes>;
  find: (
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ) => Promise<TimeAndWorkResponseInterface | undefined | null>;
  findById: (id: string) => Promise<TimeAndWorkAttributes | null | undefined>;
  findByPatientId: (id: string) => Promise<TimeAndWorkAttributes | null>;
  findByVisitId: (
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
  editSchedule: (
    id: string,
    data: TimeAndWorkAttributes
  ) => Promise<TimeAndWorkAttributes | null>;
  delete: (id: string) => Promise<number | null>;
}
