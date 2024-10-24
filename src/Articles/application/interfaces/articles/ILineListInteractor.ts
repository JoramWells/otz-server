import { LineListCSVInterface } from "otz-types";

export interface ILineListCSVInteractor {
  createLineList: (data: LineListCSVInterface) => Promise<LineListCSVInterface>;
  getAllLineLists: () => Promise<LineListCSVInterface[]>;
  getLineListById: (id: string) => Promise<LineListCSVInterface | null>;
  // deleteArticleById: (id: string) => Promise<number | null>;
  // editArticle: (data: LineListCSVInterface) => Promise<LineListCSVInterface | null>;
  // getAllArticleChaptersById: (id: string) => Promise<LineListCSVInterface[] | null>;
}
