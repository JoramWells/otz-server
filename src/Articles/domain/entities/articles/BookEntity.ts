import { BookAttributes } from "../../models/articles/books.model";

export class BookEntity implements BookAttributes {
  constructor(
    public id: string,
    public description: string,
    public thumbnail: string
  ) {}
}
