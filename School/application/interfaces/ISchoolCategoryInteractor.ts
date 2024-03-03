import {SchoolCategory} from '../../domain/entities/schoolCategoryEntities'

export interface ISchoolCategoryInteractor {
  createSchoolCategory(input: any): Promise<SchoolCategory>;
  readSchoolCategories(): Promise<SchoolCategory>;
  readSchoolCategoryById(id: string): Promise<SchoolCategory>;
  updateSchoolCategory(data: any): Promise<SchoolCategory>;
}