import { ChapterAttributes } from "../../models/articles/chapters.model";

export class ChapterEntity implements ChapterAttributes {
  constructor(
    public id: string,
    public bookID: string,
    public thumbnail: string,
    public description: string
  ) {}
}
