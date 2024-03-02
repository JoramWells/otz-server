import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities"

export interface ISchoolCategoryRepository {
    read():Promise<SchoolCategory>
    create(data: SchoolCategory):Promise<SchoolCategory>
}