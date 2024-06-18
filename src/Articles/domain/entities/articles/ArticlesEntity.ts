import { ArticleAttributes } from "../../models/articles/article.model";

export class ArticlesEntity implements ArticleAttributes {
  constructor(
    public id: string,
    public userID: string,
    public chapterID: string,
    public content: string,
    public image: string,
    public title: string,
    public video: string
  ) {}
}
