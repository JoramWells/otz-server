import { FacilityMAPSInterface } from "otz-types";

export interface IFacilityMAPRepository {
  create: (data: FacilityMAPSInterface) => Promise<FacilityMAPSInterface>;
  find: (hospitalID: string) => Promise<FacilityMAPSInterface[]>;
  findById: (id: string) => Promise<FacilityMAPSInterface | null>;
  // delete: (id: string) => Promise<number | null>;
  // edit: (data: FacilityMAPSInterface) => Promise<FacilityMAPSInterface | null>;
  // findAllArticleChaptersById: (id: string) => Promise<FacilityMAPSInterface[] | null>;
}
