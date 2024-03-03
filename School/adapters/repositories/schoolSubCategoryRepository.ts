import { ISchoolSubCategoryRepository } from "../../application/interfaces/ISchoolSubCategoryRepository";
import { SchoolSubCategory } from "../../domain/entities/schoolSubCategoryEntities";
const SchoolSubCategoryDetails = require("../../domain/models/schoolSubCategory");
const SchoolCategory = require("../../domain/models/schoolCategory");

export class SchoolSubCategoryRepository implements ISchoolSubCategoryRepository {
  read(): Promise<SchoolSubCategory> {
    return SchoolSubCategoryDetails.findAll({
      include:[
        {
          model:SchoolCategory,
          attributes:['*']
        }
      ]
    })
  }
  readById(input: string): Promise<SchoolSubCategory> {
    return SchoolSubCategoryDetails.findOne({
      where:{
        input
      }
    })
  }
  create(data: SchoolSubCategory): Promise<SchoolSubCategory> {
    return SchoolSubCategoryDetails.create(data)
  }
  update(data: SchoolSubCategory): Promise<SchoolSubCategory> {
    return SchoolSubCategoryDetails;
  }

}