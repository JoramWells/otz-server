import { ChapterProgressAttributes } from "../../models/articles/chapterProgress.model";

export class ChapterProgressEntity implements ChapterProgressAttributes {
  constructor(
    public id: string,
    public courseID: string,
    public chapterID: string,
    public startDate: string,
    public endDate: string,
    public isComplete: boolean
  ) {}
}
