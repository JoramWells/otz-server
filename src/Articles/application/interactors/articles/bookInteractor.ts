import { BookAttributes } from "otz-types";
import { IBookInteractor } from "../../interfaces/articles/IBookInteractor";
import { IBookRepository } from "../../interfaces/articles/IBookRepository";



export class BookInteractor implements IBookInteractor {
  private readonly repository: IBookRepository;

  constructor(repository: IBookRepository) {
    this.repository = repository;
  }

  async getBookById(
    id: string
  ): Promise<BookAttributes | null> {
    return await this.repository.findById(id);
  }

  async createBook(
    patientData: BookAttributes
  ): Promise<BookAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllArticleCategories(): Promise<BookAttributes[]> {
    return await this.repository.find();
  }
  async deleteBook(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
