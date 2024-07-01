import { ArticleProgressAttributes } from "otz-types";

export interface IArticleProgressRepository {
  create: (data: ArticleProgressAttributes) => Promise<ArticleProgressAttributes>;
  find: () => Promise<ArticleProgressAttributes[]>;
  findAllProgress: (id: string) => Promise<ArticleProgressAttributes[] | null>;
  findById: (id: string) => Promise<ArticleProgressAttributes | null>;
  delete: (id: string) => Promise<number | null>;
}
