// import { type Patient } from '../../domain/entities/PatientEntity'
import { ArticleAttributes } from 'otz-types';
import { IArticleInteractor } from '../../interfaces/articles/IArticleInteractor';
import { IArticleRepository } from '../../interfaces/articles/IArticleRepository';


export class ArticleInteractor implements IArticleInteractor {
  private readonly repository: IArticleRepository;

  constructor(repository: IArticleRepository) {
    this.repository = repository;
  }
  async editArticle (data: ArticleAttributes):Promise<ArticleAttributes | null>{
    return await this.repository.edit(data)
  }

  async getArticleById(id: string): Promise<ArticleAttributes | null> {
    return await this.repository.findById(id);
  }

  async getAllArticleChaptersById(id: string): Promise<ArticleAttributes[] | null> {
    return await this.repository.findAllArticleChaptersById(id);
  }

  async createArticle(patientData: ArticleAttributes): Promise<ArticleAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllArticles(): Promise<ArticleAttributes[]> {
    return await this.repository.find();
  }

  async deleteArticleById(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
