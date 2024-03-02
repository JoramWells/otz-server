import {SchoolCategory} from '../../domain/entities/schoolCategoryEntities'

export interface ISchoolCategoryInteractor{
    createSchoolCategory(input: any):Promise<SchoolCategory>
}