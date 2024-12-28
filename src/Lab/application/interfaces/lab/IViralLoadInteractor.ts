import { ViralLoadInterface } from "otz-types";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";

export interface IViralLoadInteractor {
  createViralLoad: (data: ViralLoadInterface) => Promise<ViralLoadInterface>;
  getAllViralLoads: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
    vlResults: string,
    vlJustification: string,
    status: string
  ) => Promise<ViralLoadResponseInterface | null | undefined>;
  getViralLoadById: (
    id: string
  ) => Promise<ViralLoadInterface | null | undefined>;
  getAllViralLoadByPatientID: (
    id: string
  ) => Promise<ViralLoadInterface[] | null | undefined>;

  getViralLoadByPatientID: (
    patientID: string
  ) => Promise<ViralLoadInterface | null | undefined>;
  // getViralLoadTest: (id: string) => Promise<ViralLoadInterface | null>;
  getAllVlCategories: (
    hospitalID: string
  ) => Promise<ViralLoadInterface[] | null | undefined>;
  getAllVlReasons: (
    hospitalID: string,
    dateQuery: string
  ) => Promise<ViralLoadInterface[] | null | undefined>;
  getSuppressionRate: (
    hospitalID: string,
    startDate: Date | string,
    endDate: Date | string
  ) => Promise<ViralLoadInterface[] | null | undefined>;

  //
  //
  getStarredViralLoad: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<ViralLoadResponseInterface | null | undefined>;

  //
  getRecentViralLoad: (
    hospitalID: string | undefined
  ) => Promise<ViralLoadInterface[] | undefined | null>;
}
