import { ViralLoadInterface } from "otz-types";

export interface IViralLoadInteractor {
  createViralLoad: (data: ViralLoadInterface) => Promise<ViralLoadInterface>;
  getAllViralLoads: (
    hospitalID: string
  ) => Promise<ViralLoadInterface[] | null>;
  getViralLoadById: (id: string) => Promise<ViralLoadInterface | null>;
  getAllViralLoadByPatientID: (id: string) => Promise<ViralLoadInterface[] | null>;
  // getViralLoadTest: (id: string) => Promise<ViralLoadInterface | null>;
  getAllVlCategories: (hospitalID: string) => Promise<ViralLoadInterface[] | null>;
}
