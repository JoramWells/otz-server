// import { type Patient } from '../../domain/entities/PatientEntity'
import { ArticlesCategoryEntity } from '../../../domain/entities/articles/ArticleCategoryEntity';
import { IArticleCategoryInteractor } from '../../interfaces/articles/IArticleCategoryInteractor';
import { IArticleCategoryRepository } from '../../interfaces/articles/IArticleCategoryRepository';


export class ArticleCategoryInteractor implements IArticleCategoryInteractor {
  private readonly repository: IArticleCategoryRepository;

  constructor(repository: IArticleCategoryRepository) {
    this.repository = repository;
  }

  async getArticleCategoryById(
    id: string
  ): Promise<ArticlesCategoryEntity | null> {
    return await this.repository.findById(id);
  }

  async createArticleCategory(
    patientData: ArticlesCategoryEntity
  ): Promise<ArticlesCategoryEntity> {
    return await this.repository.create(patientData);
  }

  async getAllArticleCategories(): Promise<ArticlesCategoryEntity[]> {
    return await this.repository.find();
  }
  async deleteBook(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
