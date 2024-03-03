import { SchoolSubCategory } from "../../domain/entities/schoolSubCategoryEntities";

export interface ISchoolSubCategoryRepository {
  read(): Promise<SchoolSubCategory>;
  readById(input: string): Promise<SchoolSubCategory>;
  create(data: SchoolSubCategory): Promise<SchoolSubCategory>;
  update(data: SchoolSubCategory): Promise<SchoolSubCategory>;
}