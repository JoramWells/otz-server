import { ArticleProgressEntity } from "../../../../domain/entities/articles/ArticleProgessEntity";

export interface IArticleProgressRepository {
  create: (data: ArticleProgressEntity) => Promise<ArticleProgressEntity>;
  find: () => Promise<ArticleProgressEntity[]>;
  findAllProgress: (id: string) => Promise<ArticleProgressEntity[] | null>;
  findById: (id: string) => Promise<ArticleProgressEntity | null>;
  delete: (id: string) => Promise<number | null>;
}
