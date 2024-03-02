import { ISchoolCategoryRepository } from "../../application/interfaces/ISchoolCategoryRepository";
import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities";
const SchoolCategoryDetails = require('../../domain/models/schoolCategory')


export class SchoolCategoryRepository implements ISchoolCategoryRepository{
    async read(data: SchoolCategory) {
        return SchoolCategoryDetails.create(data)
    }
    create(data: SchoolCategory): Promise<SchoolCategory> {
        throw new Error("Method not implemented.");
    }
}