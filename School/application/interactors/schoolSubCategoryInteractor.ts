import { SchoolSubCategory } from "../../domain/entities/schoolSubCategoryEntities";
import { ISchoolSubCategoryInteractor } from "../interfaces/ISchoolSubCategoryInteractor";
import { ISchoolSubCategoryRepository } from "../interfaces/ISchoolSubCategoryRepository";

export class SchoolSubCategoryInteractor implements ISchoolSubCategoryInteractor {
  private repository: ISchoolSubCategoryRepository;

  constructor(repository: ISchoolSubCategoryRepository) {
    this.repository = repository;
  }
  createSchoolSubCategory(input: any): Promise<SchoolSubCategory> {
    return this.repository.create(input);
  }
  readSchoolSubCategories(): Promise<SchoolSubCategory> {
    return this.repository.read()
  }
  readSchoolSubCategoryById(id: string): Promise<SchoolSubCategory> {
    return this.repository.readById(id)
  }
  updateSchoolSubCategory(data: any): Promise<SchoolSubCategory> {
    throw new Error("Method not implemented.");
  }
}