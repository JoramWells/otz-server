import { ArticleAttributes } from "../../models/articles/article.model";

export class ArticlesEntity implements ArticleAttributes {
  constructor(
    public id: string,
    public userID: string,
    public articleCategoryID: string,
    public description: string,
    public image: string
  ) {}
}
