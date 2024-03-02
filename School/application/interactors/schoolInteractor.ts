import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities";
import { ISchoolCategoryInteractor } from "../interfaces/ISchoolCategoryInteractor";
import { ISchoolCategoryRepository } from "../interfaces/ISchoolCategoryRepository";

export class SchoolCategoryInteractor implements ISchoolCategoryInteractor {
  private repository: ISchoolCategoryRepository;

  constructor(repository: ISchoolCategoryRepository) {
    this.repository = repository;
  }
  createSchoolCategory(input: any): Promise<SchoolCategory> {
    return this.repository.create(input);
  }
}