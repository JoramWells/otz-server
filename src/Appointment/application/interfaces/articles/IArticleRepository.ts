import { ArticlesEntity } from "../../../domain/entities/articles/ArticlesEntity";

export interface IArticleRepository {
  create: (data: ArticlesEntity) => Promise<ArticlesEntity>;
  find: () => Promise<ArticlesEntity[]>;
  findById: (id: string) => Promise<ArticlesEntity | null>;
}