import { ArticlesCategoryEntity } from "../../../domain/entities/articles/ArticleCategoryEntity";

export interface IArticleCategoryRepository {
  create: (data: ArticlesCategoryEntity) => Promise<ArticlesCategoryEntity>;
  find: () => Promise<ArticlesCategoryEntity[]>;
  findById: (id: string) => Promise<ArticlesCategoryEntity | null>;
  delete: (id: string) => Promise<number | null>;
}
