import { LineListCSVInterface } from "otz-types";
import { LineListResponseInterface } from "../../../entities/LineListResponseInterface";

export interface ILineListCSVInteractor {
  createLineList: (data: LineListCSVInterface) => Promise<LineListCSVInterface>;
  getAllLineLists: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<LineListResponseInterface | null | undefined>;
  getLineListById: (id: string) => Promise<LineListCSVInterface | null>;
  // deleteArticleById: (id: string) => Promise<number | null>;
  // editArticle: (data: LineListCSVInterface) => Promise<LineListCSVInterface | null>;
  // getAllArticleChaptersById: (id: string) => Promise<LineListCSVInterface[] | null>;
}
