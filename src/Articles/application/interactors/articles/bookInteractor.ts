import { BookEntity } from "../../../domain/entities/articles/BookEntity";
import { IBookInteractor } from "../../interfaces/articles/IBookInteractor";
import { IBookRepository } from "../../interfaces/articles/IBookRepository";



export class BookInteractor implements IBookInteractor {
  private readonly repository: IBookRepository;

  constructor(repository: IBookRepository) {
    this.repository = repository;
  }

  async getBookById(
    id: string
  ): Promise<BookEntity | null> {
    return await this.repository.findById(id);
  }

  async createBook(
    patientData: BookEntity
  ): Promise<BookEntity> {
    return await this.repository.create(patientData);
  }

  async getAllArticleCategories(): Promise<BookEntity[]> {
    return await this.repository.find();
  }
  async deleteBook(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
