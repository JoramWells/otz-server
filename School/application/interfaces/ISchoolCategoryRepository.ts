import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities"

export interface ISchoolCategoryRepository {
    read()
    create(data: SchoolCategory):Promise<SchoolCategory>
}