import { ArticlesCategoryEntity } from "../../../domain/entities/articles/ArticleCategoryEntity";

export interface IArticleCategoryInteractor {
  createArticleCategory: (data: ArticlesCategoryEntity) => Promise<ArticlesCategoryEntity>;
  getAllArticleCategories: () => Promise<ArticlesCategoryEntity[]>;
  getArticleCategoryById: (id: string) => Promise<ArticlesCategoryEntity | null>;
}
