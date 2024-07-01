import { BookAttributes } from "otz-types";

export interface IBookRepository {
  create: (data: BookAttributes) => Promise<BookAttributes>;
  find: () => Promise<BookAttributes[]>;
  findById: (id: string) => Promise<BookAttributes | null>;
  delete: (id: string) => Promise<number | null>;
}
