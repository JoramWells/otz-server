import { ISchoolTermRepository } from "../../application/interfaces/ISchoolTermRepository";
import { SchoolTermEntity } from "../../domain/entities/schoolTermEntity";
const SchoolCategoryDetails = require('../../domain/models/schoolCategory')


export class SchoolTermRepository implements ISchoolTermRepository {
  //
  create(data: SchoolTermEntity): Promise<SchoolTermEntity> {
    return SchoolCategoryDetails.create(data);
  }
  read(): Promise<SchoolTermEntity> {
    return SchoolCategoryDetails.findAll();
  }
  readById(id: string): Promise<SchoolTermEntity> {
    return SchoolCategoryDetails.findOne({
      where: {
        id,
      },
    });
  }
  update(data: SchoolTermEntity): Promise<SchoolTermEntity> {
    return SchoolCategoryDetails;
  }
}