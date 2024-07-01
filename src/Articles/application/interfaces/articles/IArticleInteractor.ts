import { ArticleAttributes } from "otz-types";

export interface IArticleInteractor {
  createArticle: (data: ArticleAttributes) => Promise<ArticleAttributes>;
  getAllArticles: () => Promise<ArticleAttributes[]>;
  getArticleById: (id: string) => Promise<ArticleAttributes | null>;
  deleteArticleById: (id: string) => Promise<number | null>;
  editArticle: (data: ArticleAttributes) => Promise<ArticleAttributes | null>;
  getAllArticleChaptersById: (id: string) => Promise<ArticleAttributes[] | null>;
}
