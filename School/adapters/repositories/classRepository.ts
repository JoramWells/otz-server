import { IClassRepository } from "../../application/interfaces/IClassRepository";
import { ClassEntity } from "../../domain/entities/classEntities";
const SchoolCategoryDetails = require('../../domain/models/schoolCategory')


export class ClassRepository implements IClassRepository {
  //
  create(data: ClassEntity): Promise<ClassEntity> {
    return SchoolCategoryDetails.create(data);
  }
  read(): Promise<ClassEntity> {
    return SchoolCategoryDetails.findAll();
  }
  readById(id: string): Promise<ClassEntity> {
    return SchoolCategoryDetails.findOne({
      where: {
        id,
      },
    });
  }
  update(data: ClassEntity): Promise<ClassEntity> {
    return SchoolCategoryDetails;
  }
}