import { BookEntity } from "../../../domain/entities/articles/BookEntity";

export interface IBookRepository {
  create: (data: BookEntity) => Promise<BookEntity>;
  find: () => Promise<BookEntity[]>;
  findById: (id: string) => Promise<BookEntity | null>;
  delete: (id: string) => Promise<number | null>;
}
