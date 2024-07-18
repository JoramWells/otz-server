import { FacilityMAPSInterface } from "otz-types";

export interface IFacilityMAPCSVInteractor {
  createFacilityMAP: (data: FacilityMAPSInterface) => Promise<FacilityMAPSInterface>;
  getAllFacilityMAPs: () => Promise<FacilityMAPSInterface[]>;
  getFacilityMAPById: (id: string) => Promise<FacilityMAPSInterface | null>;
  // deleteArticleById: (id: string) => Promise<number | null>;
  // editArticle: (data: FacilityMAPSInterface) => Promise<FacilityMAPSInterface | null>;
  // getAllArticleChaptersById: (id: string) => Promise<FacilityMAPSInterface[] | null>;
}
