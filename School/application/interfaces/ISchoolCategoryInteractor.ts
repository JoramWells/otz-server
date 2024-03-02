import {SchoolCategory} from '../../domain/entities/schoolCategoryEntities'

export interface ISchoolCategoryInteractor{
    createSchoolCategory():Promise<SchoolCategory>
}