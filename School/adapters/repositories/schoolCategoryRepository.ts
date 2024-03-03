import { ISchoolCategoryRepository } from "../../application/interfaces/ISchoolCategoryRepository";
import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities";
const SchoolCategoryDetails = require('../../domain/models/schoolCategory')


export class SchoolCategoryRepository implements ISchoolCategoryRepository {
  create(data: SchoolCategory): Promise<SchoolCategory> {
    return SchoolCategoryDetails.create(data);
  }
  read(): Promise<SchoolCategory> {
    return SchoolCategoryDetails.findAll();
  }
  readById(id: string): Promise<SchoolCategory> {
    return SchoolCategoryDetails.findOne({
      where: {
        id,
      },
    });
  }
  update(data: SchoolCategory): Promise<SchoolCategory> {
    return SchoolCategoryDetails;
  }
}