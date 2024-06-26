import { ArticleProgressAttributes } from "../../models/articles/articleProgress.model";

export class ArticleProgressEntity implements ArticleProgressAttributes {
  constructor(
    public id: string,
    public chapterProgressID: string,
    public startTime: string,
    public timeSpentOnArticle: number,

  ) {}
}
