import { ArticleProgressAttributes } from "otz-types";

export interface IArticleProgressInteractor {
  createArticleProgress: (data: ArticleProgressAttributes) => Promise<ArticleProgressAttributes>;
  getAllArticleProgress: () => Promise<ArticleProgressAttributes[]>;
  getAllArticleProgressByChapterID: (id:string) => Promise<ArticleProgressAttributes[] | null>;
  getArticleProgressById: (id: string) => Promise<ArticleProgressAttributes | null>;
  deleteArticleProgress: (id: string) => Promise<number | null>;

}
