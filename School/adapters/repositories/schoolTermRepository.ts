import { ISchoolTermRepository } from "../../application/interfaces/ISchoolTermRepository";
import { SchoolTermEntity } from "../../domain/entities/schoolTermEntity";
const SchoolTermDetails = require('../../domain/models/schoolTerm.model')


export class SchoolTermRepository implements ISchoolTermRepository {
  //
  create(data: SchoolTermEntity): Promise<SchoolTermEntity> {
    return SchoolTermDetails.create(data);
  }
  read(): Promise<SchoolTermEntity> {
    return SchoolTermDetails.findAll();
  }
  readById(id: string): Promise<SchoolTermEntity> {
    return SchoolTermDetails.findOne({
      where: {
        id,
      },
    });
  }
  update(data: SchoolTermEntity): Promise<SchoolTermEntity> {
    return SchoolTermDetails;
  }
}