import { BookAttributes } from "otz-types";

export interface IBookInteractor {
  createBook: (data: BookAttributes) => Promise<BookAttributes>;
  getAllArticleCategories: () => Promise<BookAttributes[]>;
  getBookById: (id: string) => Promise<BookAttributes | null>;
  deleteBook: (id: string) => Promise<number | null>;

}
