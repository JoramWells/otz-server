import { ArticleCategoryAttributes } from "../../models/articles/articleCategory.model";

export class ArticlesCategoryEntity implements ArticleCategoryAttributes {
  constructor(
    public id: string,
    public description: string,
    public thumbnail: string
  ) {}
}
