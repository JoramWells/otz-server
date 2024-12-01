import { PatientVisitsInterface } from "otz-types";

export interface PatientVisitResponseInterface {
  data: PatientVisitsInterface[];
  total: number;
  page: number;
  pageSize: number;
}
