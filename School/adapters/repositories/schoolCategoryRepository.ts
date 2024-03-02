import { ISchoolCategoryRepository } from "../../application/interfaces/ISchoolCategoryRepository";
import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities";
const SchoolCategoryDetails = require('../../domain/models/schoolCategory')


export class SchoolCategoryRepository implements ISchoolCategoryRepository {
  read(): Promise<SchoolCategory> {
        return SchoolCategoryDetails.findAll();
  }
  
  create(data: SchoolCategory): Promise<SchoolCategory> {
        return SchoolCategoryDetails.create(data);
  }
}