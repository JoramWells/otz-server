import { ArticlesEntity } from "../../../domain/entities/articles/ArticlesEntity";

export interface IArticleInteractor {
  createArticle: (data: ArticlesEntity) => Promise<ArticlesEntity>;
  getAllArticles: () => Promise<ArticlesEntity[]>;
  getArticleById: (id: string) => Promise<ArticlesEntity | null>;
  deleteArticleById: (id: string) => Promise<number | null>;
}
