// import { type Patient } from '../../domain/entities/PatientEntity'
import { ArticlesEntity } from '../../../domain/entities/articles/ArticlesEntity';
import { IArticleInteractor } from '../../interfaces/articles/IArticleInteractor';
import { IArticleRepository } from '../../interfaces/articles/IArticleRepository';


export class ArticleInteractor implements IArticleInteractor {
  private readonly repository: IArticleRepository;

  constructor(repository: IArticleRepository) {
    this.repository = repository;
  }

  async getArticleById(id: string): Promise<ArticlesEntity | null> {
    return await this.repository.findById(id);
  }

  async getAllArticleChaptersById(id: string): Promise<ArticlesEntity[] | null> {
    return await this.repository.findAllArticleChaptersById(id);
  }

  async createArticle(patientData: ArticlesEntity): Promise<ArticlesEntity> {
    return await this.repository.create(patientData);
  }

  async getAllArticles(): Promise<ArticlesEntity[]> {
    return await this.repository.find();
  }

  async deleteArticleById(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
