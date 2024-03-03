import { SchoolSubCategory } from "../../domain/entities/schoolSubCategoryEntities";

export interface ISchoolSubCategoryInteractor {
  createSchoolSubCategory(input: any): Promise<SchoolSubCategory>;
  readSchoolSubCategories(): Promise<SchoolSubCategory>;
  readSchoolSubCategoryById(id: string): Promise<SchoolSubCategory>;
  updateSchoolSubCategory(data: any): Promise<SchoolSubCategory>;
}