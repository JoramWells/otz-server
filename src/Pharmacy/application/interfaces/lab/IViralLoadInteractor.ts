import { ViralLoadInterface } from "otz-types";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";

export interface IViralLoadInteractor {
  createViralLoad: (data: ViralLoadInterface) => Promise<ViralLoadInterface>;
  getAllViralLoads: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<ViralLoadResponseInterface | null | undefined>;
  getViralLoadById: (id: string) => Promise<ViralLoadInterface | null>;
  getAllViralLoadByPatientID: (
    id: string
  ) => Promise<ViralLoadInterface[] | null>;
  // getViralLoadTest: (id: string) => Promise<ViralLoadInterface | null>;
  getAllVlCategories: (
    hospitalID: string
  ) => Promise<ViralLoadInterface[] | null>;
  getSuppressionRate: (
    hospitalID: string,
    startDate: Date | string,
    endDate: Date | string
  ) => Promise<ViralLoadInterface[] | null | undefined>;
}
