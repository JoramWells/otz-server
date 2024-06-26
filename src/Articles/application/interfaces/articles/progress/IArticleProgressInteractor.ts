import { ArticleProgressEntity } from "../../../../domain/entities/articles/ArticleProgessEntity";

export interface IArticleProgressInteractor {
  createArticleProgress: (data: ArticleProgressEntity) => Promise<ArticleProgressEntity>;
  getAllArticleProgress: () => Promise<ArticleProgressEntity[]>;
  getArticleProgressById: (id: string) => Promise<ArticleProgressEntity | null>;
  deleteArticleProgress: (id: string) => Promise<number | null>;

}
