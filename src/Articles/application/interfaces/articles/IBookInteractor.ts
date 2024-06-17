import { BookEntity } from "../../../domain/entities/articles/BookEntity";

export interface IBookInteractor {
  createBook: (data: BookEntity) => Promise<BookEntity>;
  getAllArticleCategories: () => Promise<BookEntity[]>;
  getBookById: (id: string) => Promise<BookEntity | null>;
  deleteBook: (id: string) => Promise<number | null>;

}
