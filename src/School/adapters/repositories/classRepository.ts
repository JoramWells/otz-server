import { IClassRepository } from "../../application/interfaces/IClassRepository";
import { ClassEntity } from "../../domain/entities/classEntities";
const ClassDetails = require('../../domain/models/class')
const SchoolSubCategory = require('../../domain/models/schoolSubCategory')


export class ClassRepository implements IClassRepository {
  //
  create(data: ClassEntity): Promise<ClassEntity> {
    return ClassDetails.create(data);
  }
  read(): Promise<ClassEntity> {
    return ClassDetails.findAll({
      include: [
        {
          model: SchoolSubCategory,
          attributes: ["subCategoryDescription"],
        },
      ],
    });
  }
  readById(id: string): Promise<ClassEntity> {
    return ClassDetails.findOne({
      where: {
        id,
      },
    });
  }
  update(data: ClassEntity): Promise<ClassEntity> {
    return ClassDetails;
  }
}