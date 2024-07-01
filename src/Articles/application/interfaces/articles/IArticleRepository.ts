import { ArticleAttributes } from "otz-types";

export interface IArticleRepository {
  create: (data: ArticleAttributes) => Promise<ArticleAttributes>;
  find: () => Promise<ArticleAttributes[]>;
  findById: (id: string) => Promise<ArticleAttributes | null>;
  delete: (id: string) => Promise<number | null>;
  edit: (data: ArticleAttributes) => Promise<ArticleAttributes | null>;
  findAllArticleChaptersById: (id: string) => Promise<ArticleAttributes[] | null>;
}
